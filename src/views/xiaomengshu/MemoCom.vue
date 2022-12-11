<template>
  <div class="memo-bar">
    <van-nav-bar>
      <template #left>
        <van-icon
          name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/tit_ico3.png"
          size="18"
        />&nbsp;
        <span><b>时刻备忘录</b> </span>
      </template>
      <template #right>
        <van-icon
          name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/update.png"
          size="18"
        />
      </template>
    </van-nav-bar>
    <van-cell-group :inset="true">
      <van-cell label="您还未设置提醒" center>
        <template #title>
          <van-icon name="bell" color="#8da3fd" size="7vw" /><b> 宠物提醒</b>
        </template>
        <template #value>
          <van-button
            color="#74be5f"
            round
            type="success"
            :style="{ height: '8vw' }"
            >点击设置</van-button
          >
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.memo-bar {
  background-color: white;
  overflow: hidden;
  padding-bottom: 5vw;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
.van-cell-group {
  background-color: #f1f8ef;
  .van-cell {
    background-color: #f1f8ef;
  }
}
</style>
