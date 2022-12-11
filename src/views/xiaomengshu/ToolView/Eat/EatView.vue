<template>
  <div>
    <top-nav :Toptitle="choiceAnimal.name + '能不能吃'"></top-nav>
    <router-view v-slot="{ Component }">
      <keep-alive include="MainCom">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import TopNav from "@/components/xiaomengshu/AllCom/TopNav.vue";
export default {
  components: { TopNav },
  computed: {
    choiceAnimal() {
      return this.$store.getters.choiceAnimal;
    },
  },
};
</script>

<style lang="less" scoped></style>
