import { login } from '@/api/getData'
import { mapActions, mapState } from 'vuex'
import { setStore } from '@/config/mUtils.js'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      showLogin: false
    }
  },
  mounted() {
    this.showLogin = true
    if (this.adminInfo.username) {
      this.$router.push('manage')
      return
    }
    if (!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['getAdminData']),
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(this.loginForm.username)
        if (valid) {
          const res = await login({
            user_name: this.loginForm.username,
            password: this.loginForm.password
          })
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push('manage')
            setStore('user', {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          })
          return false
        }
      })
    }
  },
  watch: {
    adminInfo: function (newValue) {
      if (newValue.id) {
        this.$message({
          type: 'success',
          message: '检测到您之前登录过，将自动登录'
        })
        this.$router.push('manage')
      }
    }
  }
}
