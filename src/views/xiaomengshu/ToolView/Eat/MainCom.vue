<template>
  <div>
    <van-search v-model="keyword" placeholder="请输入搜索关键词" shape="round" @focus="this.showAction = true"
      @cancel="this.showAction = false" :show-action="showAction" @update:model-value="searching()"></van-search>
    <div class="middle-nav">
      <div class="show-nav" v-show="showAction == false">
        <van-sidebar v-model="active" class="left-nav">
          <van-sidebar-item v-for="item in leftCate" :key="item.cid">
            <template #title>
              <span>
                <van-icon size="4vw" :name="iconName[item.cid - 1]" v-if="item.etype == 1" :color="
                  active == item.cid - 1 ? iconColor[item.cid - 1] : '#d3d3d3'
                " />
                {{ item.title }}
              </span>
            </template>
          </van-sidebar-item>
        </van-sidebar>

        <div class="right-nav">
          <van-cell-group v-for="item in rightCate" :key="item.title">
            <template #title>
              <van-icon :name="iconName[item.cid - 1]" v-if="item.etype == 1" size="4vw"
                :color="iconColor[item.cid - 1]" />
              {{ item.title }}
            </template>
            <van-cell>
              <van-grid :column-num="3" :border="false" icon-size="18vw">
                <van-grid-item v-for="food in item.child" :key="food.cid" :icon="food.pic" :text="food.title"
                  @click="toPage(food)" />
              </van-grid>
            </van-cell>
          </van-cell-group>
        </div>
      </div>

      <div class="search-nav" v-show="showAction == true">
        <van-cell-group>
          <van-cell v-for="item in searchList" :title="item.title" :key="item.cid" @click="toPage(item)" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { getEatList } from "@/api/xiaomengshu";
export default {
  name: "MainCom",
  data() {
    return {
      leftCate: [],
      rightCate: [],
      choiceKind: 0,
      active: 0,
      keyword: "",
      showAction: false,
      searchList: [],
    };
  },
  computed: {
    iconName() {
      return this.$store.state.eaticonName;
    },
    iconColor() {
      return this.$store.state.eaticonColor;
    },
    pet_type() {
      return this.$store.getters.pet_type;
    },
  },
  async created() {
    await this.getleftCate();
    this.getrightCate();
    console.log("1-1-1-1-1-1-11-");
  },
  watch: {
    pet_type() {
      this.getleftCate();
      this.getrightCate();
    },
    active() {
      this.choiceKind = this.leftCate[this.active];
      this.getrightCate();
      // console.log(this.choiceKind);
    },
    leftCate() {
      this.changescreen();
    },
  },
  methods: {
    //获取左边列表
    async getleftCate() {
      let res = await getEatList({ pet_type: this.pet_type });
      this.leftCate = res.data.leftCate;
      this.choiceKind = res.data.leftCate[0];
      // console.log(this.choiceKind);
    },
    //获取右边列表
    async getrightCate() {
      let res = await getEatList({
        data: {
          pet_type: this.pet_type,
          cid: this.choiceKind.cid,
          etype: this.choiceKind.etype,
        },
        leftCate: this.leftCate

      });
      this.rightCate = res.data.rightCate;
    },
    //调整高度
    changescreen() {
      let middleNav = document.querySelector(".middle-nav");
      let ls = document.documentElement.clientHeight;
      middleNav.style.height = ls - middleNav.offsetTop + "px";
    },
    //点击搜索框事件
    async searching() {
      let res = await getEatList({ do: "Suggest", keyword: this.keyword });
      console.log("res:", res);
      // console.log(this.keyword);
      this.searchList = res.data.list;
    },
    toPage(item) {
      this.$router.push({
        name: "page",
        query: {
          cid: item.cid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.van-search {
  height: 11vw;
}

.middle-nav {
  .show-nav {
    height: 100%;
    display: flex;

    .right-nav:extend(.left-nav) {
      height: 100%;
      flex: 1;
      overflow: scroll;
    }
  }

  .search-nav {
    height: 100%;
    background-color: white;
  }
}

.van-sidebar-item {
  color: #666666;
  text-align: center;
  font-size: 1.2rem;
  padding: 3.2vw 0;
}
</style>
