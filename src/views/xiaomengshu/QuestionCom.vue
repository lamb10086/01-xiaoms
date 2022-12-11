<template>
  <div class="memo-bar">
    <van-nav-bar>
      <template #left>
        <van-icon
          name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/tit_ico4.png"
          size="18"
        />&nbsp;
        <span><b>大家都在问</b> </span>
      </template>
      <template #right>
        <van-icon
          name="https://static.epetbar.com/epet_wap_img/opgc/version_v2/more.png"
          size="18"
        />
      </template>
    </van-nav-bar>
    <van-cell-group :border="false">
      <div v-for="ques in ques_list" :key="ques.oiid">
        <van-cell class="van-cell-lable" :border="false">
          <template #title>
            <div class="van-cell-title">
              <b>{{ ques.petInfo.petname }}</b>
              <van-icon :name="sexUrl[ques.petInfo.sex - 1]"></van-icon>
              <span>{{ ques.petInfo.age }}</span>
              <span>{{ ques.petInfo.ptname }}</span>
              <span>{{ ques.petInfo.star }}</span>
            </div>
          </template>
          <template #label>
            <div>{{ ques.detail }}</div>
          </template>
        </van-cell>

        <div class="question-user-nav">
          <van-icon :name="ques.userPhoto" size="7vw" />
          <span
            ><b>{{ ques.username }}</b></span
          >
          <span class="doctor-job">{{ ques.doctor.job }}</span>
        </div>
        <van-divider />
      </div>
    </van-cell-group>
    <van-button
      color="#74be5f"
      type="success"
      round
      class="bottom-button"
      :style="{ height: '8vw' }"
      >我要提问</van-button
    >
  </div>
</template>

<script>
import { getList } from "@/api/xiaomengshu";
export default {
  computed: {
    pet_type() {
      return this.$store.getters.pet_type;
    },
  },
  data() {
    return {
      sexUrl: [
        "https://static.epetbar.com/static_www/my_dev/sex1.png",
        "https://static.epetbar.com/static_www/my_dev/sex2.png",
      ],
      ques_list: [],
    };
  },
  created() {
    this.getQues_list();
  },
  watch: {
    pet_type() {
      this.getQues_list();
    },
  },
  methods: {
    async getQues_list() {
      let res = await getList(this.pet_type);
      this.ques_list = res.data.ques_list;
    },
  },
};
</script>
<style lang="less" scoped>
.memo-bar {
  background-color: white;
  overflow: hidden;
  padding-bottom: 5vw;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
.van-cell-title {
  font-size: 1.2rem;
  i {
    margin: 0 1vw;
  }
  span {
    background-color: #f7f7f7;
    padding: 0 1.5vw;
    font-size: 1rem;
    border-radius: 5px;
  }
}
.van-cell-lable {
  --van-cell-label-color: black;
}
.question-user-nav {
  padding: 4vw;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  i {
    border-radius: 50%;
    overflow: hidden;
  }
  .doctor-job {
    // vertical-align: middle;
    font-size: 1rem;
    background-color: #ef8166;
    color: white;
    margin: 0 1vw;
    padding: 0 0.5vw;
  }
}
.bottom-button {
  display: block;
  margin: 0 auto;
}
</style>
