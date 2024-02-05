<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100"> </el-table-column>
        <el-table-column property="registe_time" label="注册日期" width="220">
        </el-table-column>
        <el-table-column property="username" label="用户姓名" width="220">
        </el-table-column>
        <el-table-column property="city" label="注册地址"> </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script src="../controller/userList"></script>

<style lang="less">
@import '../style/userList';
</style>
