<template>
  <div>
    <div class="Grid-bar">
      <br />
      <!-- ################ 分类查询 -->
      <h1>分类查询</h1>
      <van-grid :border="false" column-num="3">
        <van-grid-item
          v-for="(item, index) in gridList.cate"
          :key="item.cid"
          @click="toPage1(item, index)"
        >
          <template #default>
            <div class="gridDefault1">
              <img v-lazy="'https:' + item.image_url" alt="" />
              <span>{{ item.title }}</span>
            </div>
          </template>
        </van-grid-item>
      </van-grid>

      <!--################ 年龄查询  -->
      <h1>年龄查询</h1>
      <van-grid :border="false" column-num="4">
        <van-grid-item
          v-for="(item, index) in gridList.period"
          :key="item.cid"
          @click="toPage2(item, index)"
        >
          <template #default>
            <div class="gridDefault2">
              <img v-lazy="'https:' + item.image_url" alt="" />
              <span>{{ item.title }}</span>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAbleList } from "@/api/xiaomengshu";
export default {
  data() {
    return {
      gridList: [],
    };
  },
  computed: {
    pettype() {
      return this.$store.getters.pet_type;
    },
  },
  async created() {
    let res = await getAbleList({ pettype: this.pettype });
    this.gridList = res.data;
  },
  methods: {
    toPage1(item, index) {
      this.$router.push({
        name: "listPage1",
        query: {
          cid: item.cid,
          pettype: this.pettype,
          index,
        },
      });
    },
    toPage2(item, index) {
      this.$router.push({
        name: "listPage2",
        query: {
          pid: item.pid,
          pettype: this.pettype,
          index,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Grid-bar {
  color: #666666;
  h1 {
    color: black;
    margin: 0;
  }
  .gridDefault1 {
    text-align: center;
    img {
      padding: 3vw;
      border: 1px solid #dddddd;
      width: 14vw;
      border-radius: 50%;
      display: block;
      margin-bottom: 2vw;
    }
  }
  .gridDefault2 {
    text-align: center;
    img {
      width: 12vw;
      border-radius: 50%;
      display: block;
      margin-bottom: 2vw;
    }
  }
}
</style>
