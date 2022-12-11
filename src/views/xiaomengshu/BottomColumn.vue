<template>
  <div class="bottom-column-bar">
    <div class="bottom-column-top">
      <span
        v-for="item in column"
        :key="item.name"
        :class="item.name == column[columnName].name ? 'choiceSpanActive' : ''"
        @click="changeColumn(item)"
        >{{ item.name }}</span
      >
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-masonry
        item-selector=".item"
        transition-duration="0.3s"
        class="bottom-column-bottom"
        :fit-width="false"
        horizontal-order="flase"
        :resize="true"
        gutter="10"
      >
        <div
          v-for="item in list"
          :key="item.data.id"
          class="item"
          v-masonry-tile
        >
          <img :src="item.data.cover.img_url" alt="item.data.cover.img_size" />
          <span>{{ item.data.title }}</span>
          <div class="userIntroduce">
            <div>
              <van-icon :name="item.data.user.avatar.img_url" size="6vw" />
              <span :style="{ width: '10vw' }">{{
                item.data.user.username
              }}</span>
            </div>
            <div>
              <van-icon name="fire-o" size="4vw" color="#e3e3e3" />
              <span>{{ item.data.viewnums }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getRecommendList } from "@/api/xiaomengshu";
export default {
  computed: {
    pet_type() {
      return this.$store.getters.pet_type;
    },
  },
  data() {
    return {
      columnName: 0,
      column: [], //广告名字
      list: [], //推荐列表
      page: 0,
      param: 0,
      loading: false,
      finished: false,
      timer: "",
      timerwork: false,
    };
  },
  watch: {
    async pet_type() {
      let res = await this.getColumn();
      this.columnName = 0;
      this.column = res.data.column;
      this.list = res.data.list;
    },
  },
  async created() {
    let res = await this.getColumn();
    this.column = res.data.column;
    this.list = res.data.list;
  },
  methods: {
    async getColumn(
      params = { pet_type: this.pet_type, page: this.page, param: this.param }
    ) {
      let res = await getRecommendList(params);
      return res;
    },
    async changeColumn(item) {
      let res = await this.getColumn({ param: item.param });
      this.column = res.data.column;
      this.columnName = (this.columnName + 1) % 2;
      this.list = res.data.list;
    },
    async onLoad() {
      this.page += 2;
      if (this.page >= 100) this.finished = true;
      let res = await this.getColumn();
      this.list = [...this.list, ...res.data.list];
      if (!this.timerwork) {
        this.timer = setTimeout(() => {
          this.loading = false;
          this.timerwork = false;
          clearTimeout(this.timer);
        }, 6000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.bottom-column-bar {
  width: 95vw;
  margin: 0 auto;
  .bottom-column-top {
    display: flex;
    justify-content: space-around;
    font-size: 3vw;
    color: #666666;
  }
  .bottom-column-bottom {
    width: 95vw;
    height: 100%;
    & > div {
      background-color: white;
      margin: 1vw 0;
      border-radius: 10px;
      img {
        // margin: 1vw auto;
        display: block;
        border-radius: 10px;
        width: 45vw;
      }
      & > span {
        margin: 0 auto;
        font-size: 2.5vw;
        padding: 1vw 2vw 3vw 2vw;
        display: block;
        width: 41vw;
      }
    }
    .userIntroduce {
      display: flex;
      justify-content: space-between;
      padding-bottom: 3vw;
      & > div {
        padding: 0 3vw;
        display: flex;
        align-items: center;
        font-size: 1vw;
        i {
          overflow: hidden;
          border-radius: 50%;
        }
        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          overflow: hidden;
        }
      }
    }
  }
}

.choiceSpanActive {
  font-size: 4vw;
  color: black;
}
</style>
