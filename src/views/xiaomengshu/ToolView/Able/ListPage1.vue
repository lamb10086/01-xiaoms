<template>
  <div class="ac">
    <van-tabs v-model:active="active" sticky swipe-threshold="3" offset-top="9vw" v-if="!this.$route.query.word">
      <van-tab v-for="index in date.cate" :title="index.title" :key="index.title">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list-introduce" v-for="(item, Itemindex) in date.list" :key="item.cid" :style="{
            backgroundImage: `url(${$store.state.ableListBack[Itemindex % 4]
              })`,
          }" @click="toPageIntroduce(item)">
            <div class="left">
              <img v-lazy="item.image_url" alt="" />
            </div>

            <div class="right">
              <h3>{{ item.title }}</h3>
              <p v-for="(ls, index) in item.conclusion" :key="index">
                <van-icon :name="$store.state.ableStateImg[index - 1]" />
                <span>{{ ls }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <template v-else>
      <div class="list-introduce" v-for="(item, Itemindex) in date.list" :key="item.cid" :style="{
        backgroundImage: `url(${$store.state.ableListBack[Itemindex % 4]})`,
      }" @click="toPageIntroduce(item)">
        <div class="left"><img v-lazy="item.image_url" alt="" /></div>

        <div class="right">
          <h3>{{ item.title }}</h3>
          <p v-for="(ls, index) in item.conclusion" :key="index">
            <van-icon :name="$store.state.ableStateImg[index - 1]" />
            <span>{{ ls }}</span>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getAbleList } from "@/api/xiaomengshu";
export default {
  data() {
    return {
      date: {},
      active: 0,
      page: 1,
      loading: false,
      finished: false,
    };
  },
  async created() {
    await this.getInitList();
    this.active = Number(this.$route.query.index);
  },
  computed: {},
  methods: {
    async getInitList() {
      this.date.list = [];
      //query 有cid和pattype
      let res = await getAbleList({
        ...this.$route.query,
        page: this.page,
        do: "list",
      });
      this.date = res.data;
      console.log(res.data);
    },
    async onLoad() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        overlay: true,
      });
      this.loading = true;
      this.page++;
      let res = await getAbleList({
        ...this.$route.query,
        page: this.page,
        do: "list",
      });
      if (res.data.list.length) {
        this.date.list.push(...res.data.list);
      } else {
        this.finished = true;
      }
      this.loading = false;
      this.$toast.clear();
    },
    toPageIntroduce(item) {
      this.$router.push({
        name: "pageIntroduce",
        query: {
          cid: item.cid,
          do: "Detail",
          pettype: this.$route.query.pettype,
        },
      });
    },
  },
  watch: {
    active(newV) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        overlay: true,
      });
      this.$route.query.cid = this.date.cate[newV].cid;
      this.page = 1;
      this.getInitList();
      this.$toast.clear();
    },
  },
};
</script>

<style lang="less">
.list-introduce {
  background-size: contain;
  padding: 2vw;
  display: flex;
  height: 23vw;
  margin-bottom: 3vw;
  border-radius: 20px;

  .left>img {
    height: 100%;
    border-radius: 20px;
  }

  .right {
    margin-left: 3vw;

    h3 {
      margin: 3vw 0;
    }

    p {
      margin: 0;
    }

    span {
      color: #666666;
      font-size: 2vw;
    }
  }
}

:root {
  --van-padding-sm: 4vw;
  --van-tabs-bottom-bar-height: 2vw;
  --van-tabs-bottom-bar-color: #41c856;
  --van-tabs-bottom-bar-width: 4vw;
}
</style>
