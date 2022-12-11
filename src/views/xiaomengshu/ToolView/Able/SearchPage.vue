<template>
  <div>
    <div class="search-nav">
      <van-icon name="arrow-left" size="2rem" @click="onClickLeft()" />
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @update:model-value="onSearch()"
        @cancel="onClickLeft()"
        shape="round"
      />
    </div>
    <div v-show="!searchFocus">
      <van-cell-group>
        <van-cell
          v-for="item in searchList"
          :title="item.title"
          :key="item.cid"
          @click="toPage1()"
        />
      </van-cell-group>
    </div>
    <div v-show="searchFocus">
      <div class="record">
        <div class="record-left">
          <van-icon name="clock-o" size="1.5rem" />
          <span><b>最近搜索</b> </span>
        </div>
        <div class="record-right" @click="deleteList()">
          <van-icon name="delete-o" size="2rem" />
        </div>
      </div>
      <div class="record-list">
        <div v-for="item in recordList" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAbleList } from "@/api/xiaomengshu";
export default {
  data() {
    return {
      searchValue: "",
      searchList: [],
    };
  },
  inject: ["able"],
  created() {
    this.able.showTop = this.able.showSearch = false;
  },
  unmounted() {
    this.able.showTop = this.able.showSearch = true;
  },
  computed: {
    searchFocus() {
      return this.searchValue == "";
    },
    recordList() {
      return this.$store.state.ableRecordList;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    deleteList() {
      this.$store.state.ableRecordList = [];
    },
    async onSearch() {
      let res = await getAbleList({
        ...this.$route.query,
        word: this.searchValue,
      });
      this.searchList = res.data.list;
    },
    toPage1() {
      if (this.recordList.indexOf(this.searchValue) == -1)
        this.recordList.push(this.searchValue);
      if (this.recordList.length > 30) {
        this.recordList.shift();
      }
      this.$router.push({
        name: "listPage1",
        query: {
          pettype: this.$store.getters.pet_type,
          word: this.searchValue,
        },
      });
      console.log("1-1-1-1-1-");
    },
  },
};
</script>

<style lang="less" scoped>
.search-nav {
  align-items: center;
  display: flex;
  justify-content: space-around;
  .van-search {
    flex: 1;
  }
  border-bottom: 1px solid #eeeeee;
}
.record {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 3vw 3vw;
  height: 8vw;
  span {
    font-size: 1.3rem;
  }
}
.record-list {
  display: flex;
  div {
    margin: 2vw 1vw;
    padding: 1vw 5vw;
    border: 1px solid #eeeeee;
    border-radius: 20px;
  }
}
</style>
