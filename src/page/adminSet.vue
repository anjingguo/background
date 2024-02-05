<template>
  <div class="fillcontain">
    <header class="admin_title">管理员信息</header>
    <div class="admin_set">
      <ul>
        <li>
          <span>姓名：</span><span>{{ adminInfo.user_name }}</span>
        </li>
        <li>
          <span>注册时间：</span><span>{{ adminInfo.create_time }}</span>
        </li>
        <li>
          <span>管理员权限：</span><span>{{ adminInfo.admin }}</span>
        </li>
        <li>
          <span>管理员 ID：</span><span>{{ adminInfo.id }}</span>
        </li>
        <li>
          <span>更换头像：</span>
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="beforeImgUpload"
          >
            <img
              v-if="adminInfo.avatar"
              :src="baseImgPath + adminInfo.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="../controller/adminSet"></script>

<style lang="less">
@import '../style/adminSet';
</style>
