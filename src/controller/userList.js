import { getUserList, getUserCount } from '@/api/getData'
export default {
  data() {
    return {
      tableData: [
        {
          registe_time: '2016-05-02',
          username: '王小虎',
          city: '上海市普陀区金沙江路 1518 弄'
        },
        {
          registe_time: '2016-05-04',
          username: '王小虎',
          city: '上海市普陀区金沙江路 1517 弄'
        },
        {
          registe_time: '2016-05-01',
          username: '王小虎',
          city: '上海市普陀区金沙江路 1519 弄'
        },
        {
          registe_time: '2016-05-03',
          username: '王小虎',
          city: '上海市普陀区金沙江路 1516 弄'
        }
      ],
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
        const countData = await getUserCount()
        if (countData.status == 1) {
          this.count = countData.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getUsers()
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
      this.getUsers()
    },
    async getUsers() {
      const Users = await getUserList({
        offset: this.offset,
        limit: this.limit
      })
      this.tableData = []
      Users.forEach((item) => {
        const tableData = {}
        tableData.username = item.username
        tableData.registe_time = item.registe_time
        tableData.city = item.city
        this.tableData.push(tableData)
      })
    }
  }
}
