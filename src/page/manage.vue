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
            class="bg"
            v-for="item in list"
            :index="item.index"
            v-show="!item.children"
            :key="item.title"
            ><i :class="item.pic"></i>{{ item.title }}</el-menu-item
          >
          <el-submenu
            class="bg"
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
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <headTop></headTop>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script src="../controller/manage"></script>

<style lang="less" scoped>
@import '../style/manage';
</style>
