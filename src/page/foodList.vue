<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="(row) => row.index"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ props.row.restaurant_address }}</span>
              </el-form-item>
              <el-form-item label="食品评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ props.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name"> </el-table-column>
        <el-table-column label="食品ID" prop="item_id"> </el-table-column>
        <el-table-column label="月销量" prop="month_sales"> </el-table-column>
        <el-table-column label="食品介绍" prop="description"> </el-table-column>
        <el-table-column label="评分" prop="rating"> </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
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
      <el-dialog title="修改食品信息" v-model="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="食品名称" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="100px">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" label-width="100px">
            <el-select
              v-model="selectIndex"
              :placeholder="selectMenu.label"
              @change="handleSelect"
            >
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/food'"
              :show-file-list="false"
              :on-success="handleServiceAvatarScucess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="selectTable.image_path"
                :src="baseImgPath + selectTable.image_path"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-row style="overflow: auto; text-align: center">
          <el-table
            :data="specs"
            style="margin-bottom: 20px"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="specs" label="规格"> </el-table-column>
            <el-table-column prop="packing_fee" label="包装费">
            </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteSpecs(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="specsFormVisible = true"
            style="margin-bottom: 10px"
            >添加规格</el-button
          >
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateFood">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加规格" v-model="specsFormVisible">
        <el-form :rules="specsFormrules" :model="specsForm">
          <el-form-item label="规格" label-width="100px" prop="specs">
            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="包装费" label-width="100px">
            <el-input-number
              v-model="specsForm.packing_fee"
              :min="0"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="价格" label-width="100px">
            <el-input-number
              v-model="specsForm.price"
              :min="0"
              :max="10000"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specsFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addspecs">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script src="../controller/foodList"></script>

<style lang="less">
@import '../style/foodList';
</style>
