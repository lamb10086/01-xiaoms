<template>
  <div>
    <top-search :columnImagessrc="columnImagessrc"></top-search>
    <swipe-com :swipedata="swipedata"></swipe-com>
    <img class="middle-image" :src="middleimageUrl" alt="" />
    <div class="tool-button">
      <a
        v-for="item in toolbuttonSrc.menus"
        :href="item.target.param"
        :key="item.name"
        ><img :src="item.img_url"
      /></a>
    </div>
    <a v-if="advertising" :href="advertising.target.param"
      ><img class="advertising-img" :src="advertising.img_url"
    /></a>
  </div>
</template>

<script>
import SwipeCom from "../components/Choiceness/SwipeCom.vue";
import TopSearch from "../components/Choiceness/TopSearch.vue";
import { alldata } from "../api/choicenessapi";
export default {
  data() {
    return {
      pet_type: "dog", //宠物种类
      columnImagessrc: "", //顶部背景
      swipedata: "", //轮播图数据
      middleimageUrl: "",
      toolbuttonSrc: {},
      advertising: "",
    };
  },
  async created() {
    let res = await alldata(this.pet_type);
    console.log("1-1-1-1-1-1-1-1");
    this.changeall(res);
    console.log(res.datas.list[3].data);
  },
  methods: {
    changeall(res) {
      this.columnImagessrc = res.datas.list[0].data.column_images[0][0].img_url;
      this.swipedata = res.datas.list[1].data;
      this.middleimageUrl = res.datas.list[2].data.column_images[0][0].img_url;
      this.toolbuttonSrc = res.datas.list[3].data;
      this.advertising = res.datas.list[4].data.column_images[0][0];

      // console.log(res.datas.list[3].data);
    },
  },
  components: { TopSearch, SwipeCom },
};
</script>

<style lang="less" scoped>
.middle-image {
  width: 100vw;
}
.tool-button {
  display: flex;
  a img {
    width: 20vw;
    margin: -1vw 0;
  }
}
.advertising-img {
  width: 100vw;
}
</style>
