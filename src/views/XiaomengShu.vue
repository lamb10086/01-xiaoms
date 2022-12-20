<template>
  <div>
    <!-- <div class="top-nav"> -->
    <!-- 头部导航栏 -->
    <nav class="top-nav">
      <div class="choice-animal" @click="show = true">
        <img :src="choiceAnimal.url" alt="" />
        <span>{{ choiceAnimal.name }}站</span>
      </div>
      <van-search v-model="searchValue" placeholder="枫趣" shape="round" left-icon="" right-icon="search"
        class="top-search">
      </van-search>
      <span><van-icon name="chat-o" size="6vw" /></span>
    </nav>
    <!-- 头像显示 -->
    <div class="loginbac">
      <div class="login">
        <van-image round width="5rem" height="5rem" :src="user.headUrl" />
        <p>我们想要更懂你</p>
        <van-button type="warning" :round="true">立即登录</van-button>
      </div>
    </div>
  </div>
  <!-- 中间小组件 -->
  <div class="middle-nav">
    <today-knowledge></today-knowledge>
    <little-tool></little-tool>
    <memo-com></memo-com>
    <question-com></question-com>
  </div>

  <!-- 广告推荐  瀑布流 -->
  <bottom-column></bottom-column>

  <!-- 初始不显示的页面 -->
  <van-popup v-model:show="show" position="top" round>
    <van-list class="changeainmal">
      <van-cell v-for="item in 2" :key="item" :border="false" @click="changed(item)">
        <img :src="$store.state.animalUrl[item - 1]" alt="" :class="
          $store.state.animalUrl[item - 1] == choiceAnimal.url
            ? 'pitchOn-animal'
            : ''
        " />
        <span>{{ $store.state.animalName[item - 1] }}站</span>
      </van-cell>
    </van-list>
    <van-row>
      <van-col span="12" class="btn1">默认按钮</van-col>
      <van-col span="12" class="btn1">默认按钮</van-col>
    </van-row>
  </van-popup>
</template>

<script>
import TodayKnowledge from "@/views/xiaomengshu/TodayKnowledge.vue";
import LittleTool from "@/views/xiaomengshu/LittleTool.vue";
import MemoCom from "@/views/xiaomengshu/MemoCom.vue";
import QuestionCom from "@/views/xiaomengshu/QuestionCom.vue";
import BottomColumn from "@/views/xiaomengshu/BottomColumn.vue";
export default {
  data() {
    return {
      searchValue: "",
      show: false,
      column: [],
    };
  },
  computed: {
    pet_type() {
      return this.$store.getters.pet_type;
    },
    choiceAnimal() {
      return this.$store.getters.choiceAnimal;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    changed(item) {
      this.show = false;
      // close();
      this.$store.state.pet_typeid = item - 1;
    },
  },
  components: {
    TodayKnowledge,
    LittleTool,
    MemoCom,
    QuestionCom,
    BottomColumn,
  },
};
</script>

<style lang="less" scoped>
.top-nav {
  display: flex;
  height: 13vw;
  line-height: 13vw;
  text-align: center;
  justify-content: space-around;
  background-color: white;
  padding: 0 3vw;

  .top-search {
    flex-grow: 1;
  }

  .choice-animal {
    // flex-grow: 1;
    height: 13vw;
    line-height: 13vw;
    text-align: center;

    img {
      border-radius: 50%;
      vertical-align: middle; //解决图片和文字同行居中
      width: 8vw;
      height: 8vw;
      margin: 0 1vw;
    }
  }
}

.changeainmal {
  text-align: center;

  ::v-deep .van-cell__value {
    text-align: left !important;

    img {
      border-radius: 50%;
      vertical-align: top; //解决图片和文字同行居中
      width: 10vw;
      height: 10vw;
      margin: 0 1vw;
    }
  }
}

.btn1 {
  width: 100%;
  border: 1px solid #e7e7e7;
  height: 13vw;
  line-height: 13vw;
  text-align: center;
  vertical-align: auto;
}

.loginbac {
  width: 100vw;
  height: 70vw;
  background-image: url("https://static.epetbar.com/epet_wap_img/opgc/version_v2/default_bg.png");
  text-align: center;
  vertical-align: middle;
  display: table-cell;
}

.middle-nav {
  margin-top: -10vw;

  div {
    background-color: white;
    border-radius: 20px;
    margin: 3vw auto;
    width: 95vw;
  }
}

.pitchOn-animal {
  border: 3px solid #74be5f;
}
</style>
