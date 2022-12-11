<template>
  <div>
    <top-nav
      :Toptitle="choiceAnimal.name + '能不能做'"
      v-if="showTop"
    ></top-nav>
    <van-search
      v-model="searchvalue"
      shape="round"
      placeholder="输入关键词,查能不能做"
      v-if="showSearch"
      @click-input="toSearch()"
      :readonly="true"
    />
    <div class="main-bar">
      <!-- 宫格 -->
      <router-view></router-view>
      <!-- 搜索面 -->
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/xiaomengshu/AllCom/TopNav.vue";
import { ref } from "vue";
export default {
  data() {
    return {
      historySearch: [],
      searchvalue: "",
      CommponentName: "able-home",
      showSearch: ref(true),
      showTop: true,
    };
  },
  provide() {
    return {
      able: this,
    };
  },
  components: { TopNav },
  computed: {
    choiceAnimal() {
      return this.$store.getters.choiceAnimal;
    },
    pettype() {
      return this.$store.getters.pet_type;
    },
  },
  mounted() {
    this.changescreen();
  },
  watch: {
    showSearch() {
      this.changescreen();
    },
  },
  methods: {
    changescreen() {
      let middleNav = document.querySelector(".main-bar");
      // console.log("middleNav.offsetTop", middleNav.offsetTop);
      let ac = document.querySelector(".ac");
      let ls = document.documentElement.clientHeight;
      middleNav.style.minHeight = ls - middleNav.offsetTop + "px";
      if (ac) ac.style.minHeight = ls - middleNav.offsetTop + "px";
    },
    toSearch() {
      this.$router.push({
        name: "ablesearch",
        query: {
          pettype: this.pettype,
          do: "list",
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.van-search {
  padding: 1vw 5vw;
  position: sticky;
  top: 0;
  z-index: 199;
  padding-top: 2vw;
}
.main-bar {
  background-color: white;
  padding: 0 2vw;
  height: 100%;
}
</style>
