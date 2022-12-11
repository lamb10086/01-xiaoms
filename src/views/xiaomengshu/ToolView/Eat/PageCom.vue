<template>
  <div class="pageAll">
    <div class="describe-bar">
      <img :src="'https:' + info.pic" alt="" width="" />
      <p>
        <span>{{ info.title }}</span
        ><van-icon
          :name="iconName[info.conclusion_id - 1]"
          :color="iconColor[info.conclusion_id - 1]"
          size="1.5rem"
        />
        {{ info.conclusion }}
      </p>
      <p>{{ info.desc }}</p>
      <van-button
        plain
        color="#ff5757"
        size="small"
        :round="true"
        @click="this.$router.back()"
        >查看其它食物</van-button
      >
    </div>
  </div>
</template>

<script>
import { getEatList } from "@/api/xiaomengshu";
export default {
  data() {
    return {
      info: {},
    };
  },
  async created() {
    let res = await getEatList({
      do: "Detail",
      cid: this.$route.query.cid,
    });
    this.info = res.data.info;
    console.log("11111", this.info);
  },
  computed: {
    iconName() {
      return this.$store.state.eaticonName;
    },
    iconColor() {
      return this.$store.state.eaticonColor;
    },
  },
};
</script>

<style lang="less" scoped>
.pageAll {
  background-color: white;
  min-height: 94vh;
  height: 100%;
  .describe-bar {
    margin: 0 auto;
    width: 80vw;
    text-align: center;
    img {
      width: 50vw;
      height: 50vw;
    }
    & > p {
      font-size: 1rem;
      margin: 5vw 0;
      color: #666666;
      span {
        font-size: 1.5rem;
        color: black;
      }
    }
  }
}
</style>
