import { adminList, adminCount } from '@/api/getData'
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const countData = await adminCount()
        if (countData.status == 1) {
          this.count = countData.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getAdmin()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getAdmin()
    },
    async getAdmin() {
      try {
        const res = await adminList({ offset: this.offset, limit: this.limit })
        if (res.status == 1) {
          this.tableData = []
          res.data.forEach((item) => {
            const tableItem = {
              create_time: item.create_time,
              user_name: item.user_name,
              admin: item.admin,
              city: item.city
            }
            this.tableData.push(tableItem)
          })
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        console.log('获取数据失败', err)
      }
    }
  }
}
