import { login } from '@/api/getData'
import { mapActions, mapState, mapMutations } from 'vuex'
import { setStore, getStore } from '@/config/mUtils.js'

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
    if (getStore('user')) {
      this.$router.push('manage')
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapMutations(['saveAdminInfo']),
    ...mapActions(['getAdminData']),
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
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
            setStore('user', {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            this.$router.push('manage')
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
