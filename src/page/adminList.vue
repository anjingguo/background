<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="user_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="注册日期" width="220">
        </el-table-column>
        <el-table-column prop="city" label="地址" width="180">
        </el-table-column>
        <el-table-column prop="admin" label="权限"> </el-table-column>
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

<script src="../controller/adminList"></script>

<style lang="less">
@import '../style/adminList';
</style>
