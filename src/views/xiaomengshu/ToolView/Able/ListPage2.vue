<template>
  <div class="ac">
    <van-tabs
      v-model:active="active"
      sticky
      swipe-threshold="3"
      offset-top="10vw"
    >
      <van-tab
        v-for="index in date.period"
        :title="index.title"
        :key="index.title"
      >
        <!-- 状态选择 -->
        <div class="Topbutton-nav">
          <button
            v-for="item in date.conclusion"
            :key="item.id"
            :class="buttonNum == item.id ? 'onchoice' : ''"
            @click="buttonNum = item.id"
          >
            {{ item.title }}
          </button>
        </div>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-show="item.conclusion == buttonNum || buttonNum == 0"
            class="list-introduce"
            v-for="(item, Itemindex) in date.list"
            :key="item.cid"
            :style="{
              backgroundImage: `url(${
                $store.state.ableListBack[Itemindex % 4]
              })`,
            }"
            @click="toPageIntroduce(item)"
          >
            <div class="left">
              <img v-lazy="item.image_url" alt="" />
            </div>

            <div class="right">
              <h3>
                {{ item.title }}
                <van-icon
                  :name="$store.state.ableStateImg[3 - item.conclusion]"
                  size="4vw"
                />
                <span>{{ index.title }}</span>
              </h3>
              <p>
                <span>{{ item.descri }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
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
      cidList: [],
      loading: false,
      finished: false,
      buttonNum: 0,
    };
  },
  created() {
    this.active = Number(this.$route.query.index);
    this.getInitList(1);
  },
  computed: {},
  methods: {
    async getInitList(n = 2) {
      this.date.list = [];
      //query 有cid和pattype
      let res = await getAbleList({
        ...this.$route.query,
        page: this.page,
        do: "list",
      });
      this.date = res.data;
      if (n == 1) this.cidList = res.data.cate;
      // console.log(res.data);
    },
    async onLoad() {
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
    },
    toPageIntroduce(item) {
      this.$router.push({
        name: "pageIntroduce",
        query: {
          cid: item.catid,
          do: "Detail",
          pettype: this.$route.query.pettype,
        },
      });
    },
  },
  watch: {
    active(newV) {
      this.$route.query.pid = newV + 1;
      this.page = 1;
      // console.log("1-1-1-1-1-", newV);
      this.getInitList();
    },
  },
  beforeUpdate() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      overlay: true,
    });
  },
  updated() {
    this.$toast.clear();
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
  .left > img {
    height: 100%;
    border-radius: 20px;
  }
  .right {
    margin-left: 3vw;
    width: 70%;
    h3 {
      margin: 3vw 0;
      font-size: 1.4rem;
    }
    p {
      margin: 0;
      // height: 10vw;
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
}
.Topbutton-nav {
  display: flex;
  justify-content: space-around;
  button {
    background-color: #f9f9f9;
    border: none;
    border-radius: 20px;
    padding: 1vw 5vw;
  }
  .onchoice {
    background-color: #ecf9ee;
    color: #41c856;
  }
  margin: 1vw 0 3vw 0;
}
:root {
  --van-padding-sm: 4vw;
  --van-tabs-bottom-bar-height: 2vw;
  --van-tabs-bottom-bar-color: #41c856;
  --van-tabs-bottom-bar-width: 4vw;
}
</style>
