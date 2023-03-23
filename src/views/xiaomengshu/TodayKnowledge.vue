<template>
  <div>
    <van-nav-bar @click-right="getTodayKonwledge()">
      <template #right>
        <van-icon name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/refresh.png" size="12" />&nbsp;
        <span>换一条</span>
      </template>
      <template #left>
        <van-icon name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/tit_ico1.png" size="18" />
        &nbsp;
        <span><b>今日小贴士</b> </span>
      </template>
    </van-nav-bar>
    <p>{{ todayKonwledge }}</p>
  </div>
</template>

<script>
import { getList } from "@/api/xiaomengshu";
export default {
  data() {
    return {
      todayKonwledge: "",
    };
  },
  computed: {
    pet_type() {
      return this.$store.getters.pet_type;
    },
  },
  watch: {
    pet_type() {
      this.getTodayKonwledge();
    },
  },
  created() {
    this.getTodayKonwledge();
  },
  methods: {
    async getTodayKonwledge() {
      let res = await getList(this.pet_type);
      this.todayKonwledge = res.data.toDayKnowLedge;
    },
  },
};
</script>
<style lang="less" scoped>
div {
  border-radius: 20px;
  font-size: 1.2rem;

  p {
    padding: 0 5vw 3vw 5vw;
    margin: 0;
  }
}

.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
</style>
