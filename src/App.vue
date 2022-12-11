<template>
  <router-view />
  <van-tabbar v-model="active" v-show="isActiveShow">
    <router-link :to="{ name: 'choiceness' }">
      <div class="main-bottom" v-show="choiceView != 'choiceness'"></div>
      <div
        class="main-bottom"
        v-show="choiceView == 'choiceness'"
        :style="choice"
      ></div>
    </router-link>

    <router-link :to="{ name: 'classify' }">
      <div class="main-bottom" v-show="choiceView != 'classify'"></div>
      <div
        class="main-bottom"
        v-show="choiceView == 'classify'"
        :style="choice"
      ></div>
    </router-link>

    <router-link :to="{ name: 'xiaoms' }">
      <div class="main-bottom" v-show="choiceView != 'xiaoms'"></div>
      <div
        class="main-bottom"
        v-show="choiceView == 'xiaoms'"
        :style="choice"
      ></div>
    </router-link>

    <router-link :to="{ name: 'cart' }">
      <div class="main-bottom" v-show="choiceView != 'cart'"></div>
      <div
        class="main-bottom"
        v-show="choiceView == 'cart'"
        :style="choice"
      ></div>
    </router-link>

    <router-link :to="{ name: 'myselfe' }">
      <div class="main-bottom" v-show="choiceView != 'myselfe'"></div>
      <div
        class="main-bottom"
        v-show="choiceView == 'myselfe'"
        :style="choice"
      ></div>
    </router-link>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: "",
      choiceView: "xiaoms",
      choice: {
        backgroundPositionY: "13vw",
      },
      isActiveShow: true,
      routeList: ["xiaoms", "choiceness", "classify", "cart", "myselfe"],
    };
  },
  watch: {
    $route(to) {
      this.choiceView = to.name;
      if (this.routeList.indexOf(to.name) != -1) {
        this.isActiveShow = true;
      } else {
        this.isActiveShow = false;
      }
    },
  },
};
</script>
<style lang="less">
.main-bottom {
  display: block;
  width: 10vw;
  height: 15vw;
  background-image: url(../public/pictrue/newnavIco.119b6e66.png);
  background-position: 2vw 0;
  background-size: 110vw 28vw;
  padding: 0 3vw;
  background-clip: content-box;
}
.van-tabbar {
  display: flex;
  justify-content: space-around;
  --van-tabbar-height: 13vw;
  :nth-child(2) > div {
    background-position: -13vw 0vw;
  }
  :nth-child(3) > div {
    background-position: -50vw 0;
  }
  :nth-child(4) > div {
    background-position: -30vw 0;
  }
  :nth-child(5) > div {
    background-position: -72vw 0;
  }
}
:root {
  --van-nav-bar-icon-color: black;
}
html {
  font-size: 10px;
}
@media screen and (min-width: 321px) and (max-width: 375px) {
  html {
    font-size: 11px;
  }
}
@media screen and (min-width: 376px) and (max-width: 414px) {
  html {
    font-size: 12px;
  }
}
@media screen and (min-width: 415px) and (max-width: 639px) {
  html {
    font-size: 15px;
  }
}
@media screen and (min-width: 640px) and (max-width: 719px) {
  html {
    font-size: 20px;
  }
}
@media screen and (min-width: 720px) and (max-width: 749px) {
  html {
    font-size: 22.5px;
  }
}
@media screen and (min-width: 750px) and (max-width: 799px) {
  html {
    font-size: 23.5px;
  }
}
@media screen and (min-width: 800px) {
  html {
    font-size: 25px;
  }
}
</style>
