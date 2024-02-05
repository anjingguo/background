import { mapState } from 'vuex'
import { baseUrl, baseImgPath } from '@/config/env'

export default {
  data() {
    return {
      baseUrl,
      baseImgPath
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    uploadImg(res, file) {
      if (res.status == 1) {
        this.adminInfo.avatar = res.image_path
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    beforeImgUpload(file) {
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
    }
  }
}
