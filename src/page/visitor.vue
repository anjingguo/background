<template>
  <div v-loading="loading">
    <visitor-pie :pieData="pieData"></visitor-pie>
  </div>
</template>

<script src="../controller/visitor.js"></script>

<style lang="less">
@import '../style/visitor';
</style>
