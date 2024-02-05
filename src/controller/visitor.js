import visitorPie from '@/components/visitorPie'
import { getUserCity } from '@/api/getData'
export default {
  data() {
    return {
      loading: true,
      pieData: {}
    }
  },
  components: {
    visitorPie
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const res = await getUserCity()
        if (res.status == 1) {
          this.pieData = res.user_city
        } else {
          throw new Error(res)
        }
        this.loading = false
      } catch (err) {
        console.log('获取用户分布信息失败', err)
      }
    }
  }
}
