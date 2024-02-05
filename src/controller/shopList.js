import { baseUrl, baseImgPath } from '@/config/env'
import {
  cityGuess,
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant
} from '@/api/getData'
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      categoryOptions: [],
      selectedCategory: [],
      address: {}
    }
  },
  created() {
    this.initData()
    console.log(11111)
  },
  methods: {
    async initData() {
      try {
        this.city = await cityGuess()
        const countData = await getResturantsCount()
        if (countData.status == 1) {
          this.count = countData.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getResturants()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async getCategory() {
      try {
        const categories = await foodCategory()
        categories.forEach((item) => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            }
            item.sub_categories.forEach((subitem, index) => {
              if (index == 0) {
                return
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              })
            })
            this.categoryOptions.push(addnew)
          }
        })
      } catch (err) {
        console.log('获取商铺种类失败', err)
      }
    },
    async getResturants() {
      const { latitude, longitude } = this.city
      const restaurants = await getResturants({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit
      })
      this.tableData = []
      restaurants.forEach((item) => {
        const tableData = {}
        tableData.name = item.name
        tableData.address = item.address
        tableData.description = item.description
        tableData.id = item.id
        tableData.phone = item.phone
        tableData.rating = item.rating
        tableData.recent_order_num = item.recent_order_num
        tableData.category = item.category
        tableData.image_path = item.image_path
        this.tableData.push(tableData)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getResturants()
    },
    handleEdit(index, row) {
      this.selectTable = row
      this.address.address = row.address
      this.dialogFormVisible = true
      this.selectedCategory = row.category.split('/')
      if (!this.categoryOptions.length) {
        this.getCategory()
      }
    },
    addFood(index, row) {
      this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id } })
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteResturant(row.id)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '删除店铺成功'
          })
          this.tableData.splice(index, 1)
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.message
        })
        console.log('删除店铺失败')
      }
    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        try {
          const cityList = await searchplace(this.city.id, queryString)
          if (cityList instanceof Array) {
            cityList.map((item) => {
              item.value = item.address
              return item
            })
            cb(cityList)
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    addressSelect(vale) {
      const { address, latitude, longitude } = vale
      this.address = { address, latitude, longitude }
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    async updateShop() {
      this.dialogFormVisible = false
      try {
        Object.assign(this.selectTable, this.address)
        this.selectTable.category = this.selectedCategory.join('/')
        const res = await updateResturant(this.selectTable)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '更新店铺信息成功'
          })
          this.getResturants()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      } catch (err) {
        console.log('更新餐馆信息失败', err)
      }
    }
  }
}
