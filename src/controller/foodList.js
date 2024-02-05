import { baseUrl, baseImgPath } from '@/config/env'
import {
  getFoods,
  getFoodsCount,
  getMenu,
  updateFood,
  deleteFood,
  getResturantDetail,
  getMenuById
} from '@/api/getData'
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,
      specsForm: {
        specs: '',
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: '请输入规格', trigger: 'blur' }]
      },
      specsFormVisible: false,
      expendRow: []
    }
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id
    this.initData()
  },
  computed: {
    specs: function () {
      let specs = []
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach((item) => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          })
        })
      }
      return specs
    }
  },
  methods: {
    async initData() {
      try {
        const countData = await getFoodsCount({
          restaurant_id: this.restaurant_id
        })
        if (countData.status == 1) {
          this.count = countData.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getFoods()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async getMenu() {
      this.menuOptions = []
      try {
        const menu = await getMenu({
          restaurant_id: this.selectTable.restaurant_id,
          allMenu: true
        })
        menu.forEach((item, index) => {
          this.menuOptions.push({
            label: item.name,
            value: item.id,
            index
          })
        })
      } catch (err) {
        console.log('获取食品种类失败', err)
      }
    },
    async getFoods() {
      const Foods = await getFoods({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      })
      this.tableData = []
      Foods.forEach((item, index) => {
        const tableData = {}
        tableData.name = item.name
        tableData.item_id = item.item_id
        tableData.description = item.description
        tableData.rating = item.rating
        tableData.month_sales = item.month_sales
        tableData.restaurant_id = item.restaurant_id
        tableData.category_id = item.category_id
        tableData.image_path = item.image_path
        tableData.specfoods = item.specfoods
        tableData.index = index
        this.tableData.push(tableData)
      })
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return 'info-row'
      } else if (index === 3) {
        return 'positive-row'
      }
      return ''
    },
    addspecs() {
      this.specs.push({ ...this.specsForm })
      this.specsForm.specs = ''
      this.specsForm.packing_fee = 0
      this.specsForm.price = 20
      this.specsFormVisible = false
    },
    deleteSpecs(index) {
      this.specs.splice(index, 1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getFoods()
    },
    expand(row, status) {
      if (status) {
        this.getSelectItemData(row)
      } else {
        const index = this.expendRow.indexOf(row.index)
        this.expendRow.splice(index, 1)
      }
    },
    handleEdit(row) {
      this.getSelectItemData(row, 'edit')
      this.dialogFormVisible = true
    },
    async getSelectItemData(row, type) {
      const restaurant = await getResturantDetail(row.restaurant_id)
      const category = await getMenuById(row.category_id)
      this.selectTable = {
        ...row,
        ...{
          restaurant_name: restaurant.name,
          restaurant_address: restaurant.address,
          category_name: category.name
        }
      }

      this.selectMenu = { label: category.name, value: row.category_id }
      this.tableData.splice(row.index, 1, { ...this.selectTable })
      this.$nextTick(() => {
        this.expendRow.push(row.index)
      })
      if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
        this.getMenu()
      }
    },
    handleSelect(index) {
      this.selectIndex = index
      this.selectMenu = this.menuOptions[index]
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteFood(row.item_id)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '删除食品成功'
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
        console.log('删除食品失败')
      }
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
    async updateFood() {
      this.dialogFormVisible = false
      try {
        const subData = {
          new_category_id: this.selectMenu.value,
          specs: this.specs
        }
        const postData = { ...this.selectTable, ...subData }
        const res = await updateFood(postData)
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '更新食品信息成功'
          })
          this.getFoods()
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
