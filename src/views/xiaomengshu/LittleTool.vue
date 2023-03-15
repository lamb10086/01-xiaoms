<template>
  <div class="littletool-bar">
    <van-nav-bar>
      <template #left>
        <van-icon name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/tit_ico2.png" size="18" />&nbsp;
        <span><b>养宠小工具</b> </span>
      </template>
    </van-nav-bar>
    <van-grid :column-num="4" :border="false" icon-size="14vw" :clickable="true">
      <van-grid-item :icon="pictureUrl + '9.png'" :to="{ name: 'eat' }" />
      <van-grid-item :icon="pictureUrl + '8.png'" :to="{ name: 'able' }" />
      <van-grid-item :icon="pictureUrl + '7.png'" :to="{ name: 'illness' }" />
      <van-grid-item :icon="pictureUrl + '6.png'" :to="{ name: 'wormermain' }" />
      <van-grid-item :icon="pictureUrl + '5.png'" :to="{ name: 'eat' }" />
      <van-grid-item :icon="pictureUrl + '4.png'" :to="{ name: 'eat' }" />
      <van-grid-item :icon="pictureUrl + '3.png'" :to="{ name: 'eat' }" />
      <van-grid-item :icon="pictureUrl + '11.png'" :to="{ name: 'eat' }" />
    </van-grid>

    <a href=""><img
        src="https://img2.epetbar.com/2020-06/17/10/57a5d9f6c9f7504b6bf81cccd4a5b773.jpg?x-oss-process=style/water"
        alt="广告" /></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pictureUrl: "https://static.epetbar.com/epet_wap_img/opgc/xms_",
    };
  },
};
</script>
<style lang="less" scoped>
.littletool-bar {
  background-color: white;
  font-size: 2.5vw;
  overflow: hidden;
  text-align: center;
  padding-bottom: 5vw;

  a {
    text-align: center;

    img {
      width: 78vw;
      border-radius: 10px;
    }
  }
}

.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
</style>
