import headTop from '../components/headTop.vue'
export default {
  data() {
    return {
      list: [
        { title: '首页', pic: 'el-icon-menu', index: 'manage' },
        {
          title: '数据管理',
          index: '2',
          pic: 'el-icon-document',
          children: [
            { index: 'userList', title: '用户列表' },
            { index: 'shopList', title: '商家列表' },
            { index: 'foodList', title: '食品列表' },
            { index: 'orderList', title: '订单列表' },
            { index: 'adminList', title: '管理员列表' }
          ]
        },
        {
          title: '添加数据',
          index: '3',
          pic: 'el-icon-plus',
          children: [
            { index: 'addShop', title: '添加商铺' },
            { index: 'addGoods', title: '添加商品' }
          ]
        },
        {
          title: '图表',
          index: '4',
          pic: 'el-icon-star-on',
          children: [{ index: 'visitor', title: '用户分布' }]
        },
        {
          title: '编辑',
          index: '5',
          pic: 'el-icon-edit',
          children: [{ index: 'vueEdit', title: '文本编辑' }]
        },
        {
          title: '设置',
          index: '6',
          pic: 'el-icon-setting',
          children: [{ index: 'adminSet', title: '管理员设置' }]
        },
        {
          title: '说明',
          index: '7',
          pic: 'el-icon-warning',
          children: [{ index: 'explain', title: '说明' }]
        }
      ]
    }
  },
  components: {
    headTop
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  }
}
