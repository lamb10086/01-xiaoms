<template>
  <div class="ac">
    <div class="top-img" v-lazy:background-image="'https:' + info.pic">
      <br />
      <p>
        <b>{{ info.title }}</b>
      </p>
    </div>
    <div class="main-nav">
      <van-cell-group>
        <van-cell v-for="(item, index) in info.conclusion" :key="index">
          <template #title>
            <div class="cell-title">
              <h3>
                {{ item.periodName }}
                <van-icon
                  :name="$store.state.ableStateImg[3 - item.conclusion]"
                  size="4vw"
                />
                <span>{{ item.conclusionName }}</span>
              </h3>
            </div>
          </template>
          <template #label>
            <div class="cell-label">
              <p>
                <span>{{ item.descri }}</span>
              </p>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <br />
  </div>
</template>

<script>
import { getAbleList } from "@/api/xiaomengshu";
export default {
  data() {
    return {
      info: {},
    };
  },
  created() {
    this.getList();
    this.able.showSearch = false;
  },
  inject: ["able"],
  methods: {
    async getList() {
      let res = await getAbleList(this.$route.query);
      this.info = res.data.info;
    },
  },
  unmounted() {
    this.able.showSearch = true;
  },
};
</script>

<style lang="less" scoped>
.top-img {
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  p {
    font-size: 3rem;
    color: white;
    display: block;
  }
}
.main-nav {
  position: relative;
  top: -10vw;
  width: 92vw;
  margin: 4vw auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgb(145, 143, 143);
}
.cell-title {
  h3 {
    margin: 1vw 0;
    font-size: 1.4rem;
  }
  p {
    margin: 0;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  span {
    color: #666666;
    font-size: 1rem;
  }
}
.cell-label {
  span {
    color: #666666;
    font-size: 1rem;
  }
}
</style>
