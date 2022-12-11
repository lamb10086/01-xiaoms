<template>
  <div
    class="top-var-img"
    :style="{ backgroundImage: `url(${columnImagessrc})` }"
  >
    <div class="top-var">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
      <span class="iconfont information">&#xe6b4; </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columnImagessrc: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  created() {},
};
</script>

<style lang="less" scoped>
.top-var-img {
  height: 25vw;
  background-size: cover;
}
.top-var {
  height: 13vw;
  display: flex;
  justify-content: space-around;
  .information {
    padding: 0 2vw;
    height: 13vw;
    line-height: 13vw;
    color: white;
    font-size: 6vw;
  }
  & > .van-search {
    opacity: 0.7;
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
