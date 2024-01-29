<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%" class="bg">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%"
          theme="dark"
          router
        >
          <el-menu-item
            v-for="item in list"
            :index="item.index"
            v-show="!item.children"
            :key="item.title"
            ><i :class="item.pic"></i>{{ item.title }}</el-menu-item
          >
          <el-submenu
            v-for="item in list"
            :index="item.index"
            v-show="item.children"
            :key="item.index"
          >
            <template slot="title"
              ><i :class="item.pic"></i>{{ item.title }}</template
            >
            <el-menu-item
              v-for="itx in item.children"
              :index="itx.index"
              :key="itx.index"
              >{{ itx.title }}</el-menu-item
            >
          </el-submenu>
          <!-- <el-menu-item index="manage"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-document"></i>数据管理</template
            >
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-plus"></i>添加数据</template
            >
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-star-on"></i>图表</template
            >
            <el-menu-item index="visitor">用户分布</el-menu-item>
            <el-menu-item index="newMember">用户数据</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
            <el-menu-item index="uploadImg">上传图片</el-menu-item>
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-setting"></i>设置</template
            >
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
             <el-menu-item index="sendMessage">发送通知</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"
              ><i class="el-icon-warning"></i>说明</template
            >
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.bg {
  background-color: @bgc;
}
</style>
