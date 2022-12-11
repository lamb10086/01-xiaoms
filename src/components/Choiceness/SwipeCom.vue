<template>
  <div>
    <van-swipe
      v-if="alldata.background_img"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :style="{ backgroundImage: `url(${alldata.background_img.img_url})` }"
    >
      <van-swipe-item v-for="item in alldata.images" :key="item.img_url">
        <a :href="item.target.param"><img :src="item.img_url" /></a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    swipedata: {
      type: Object,
      require: true,
      default() {},
    },
  },

  watch: {
    swipedata(newV) {
      this.alldata = newV;
      // console.log("2222", this.alldata.background_img.img_url);
    },
  },
  data() {
    return {
      alldata: {},
    };
  },
};
</script>

<style lang="less" scoped>
.my-swipe {
  background-size: contain;
  .van-swipe-item a {
    display: block;
    img {
      display: block;
      width: 100vw;
    }
  }
}
</style>
