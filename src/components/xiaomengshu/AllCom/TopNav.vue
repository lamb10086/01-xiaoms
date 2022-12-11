<template>
  <div>
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        @click-right="showgrid = !showgrid"
      >
        <template #title>
          <div class="top-nav-title">{{ Toptitle }}</div>
        </template>
        <template #right>
          <van-icon name="wap-nav" size="5vw" />
        </template>
      </van-nav-bar>
      <van-grid v-if="showgrid" :border="false" icon-size="2.2rem">
        <van-grid-item
          :icon="gridImg[0]"
          text="首页"
          :to="{ name: 'choiceness' }"
        />
        <van-grid-item
          :icon="gridImg[1]"
          text="商品分类"
          :to="{ name: 'classify' }"
        />
        <van-grid-item
          :icon="gridImg[2]"
          text="购物车"
          :to="{ name: 'cart' }"
        />
        <van-grid-item
          :icon="gridImg[3]"
          text="我的E宠"
          :to="{ name: 'myselfe' }"
        />
      </van-grid>
    </van-config-provider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showgrid: false,
      gridImg: [
        require("@/assets/xiaomengshu/1.png"),
        require("@/assets/xiaomengshu/2.png"),
        require("@/assets/xiaomengshu/3.png"),
        require("@/assets/xiaomengshu/4.png"),
      ],
    };
  },
  props: {
    Toptitle: {
      type: String,
      default: "123",
      require: true,
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
  setup() {
    const themeVars = {
      navBarHeight: "4rem",
      gridItemContentPadding: "3vw 3vw 1vw 3vw",
      paddingXs: 0,
    };
    return {
      themeVars,
    };
  },
};
</script>

<style lang="less" scoped>
.top-nav-title {
  font-size: 1.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
}
.van-nav-bar {
  height: 4rem;
  line-height: 4rem;
  .van-nav-bar__content {
    height: 4rem !important;
    line-height: 4rem;
    text-align: center;
  }
}
</style>
