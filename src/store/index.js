import { createStore } from "vuex";
export default createStore({
  state: {
    pet_typeid: 0,
    pet_typeList: ["dog", "cat"],
    animalName: ["狗狗", "猫猫"],
    animalUrl: [
      "https://img2.epetbar.com/2020-08/17/15/a45824c64cd1b34f2fe65a81f23e9011.png",
      "https://img2.epetbar.com/2020-08/17/15/b0fda150a9dcee0339e1e9c36220febc.png",
    ],
    user: {
      headUrl:
        "https://static.epetbar.com/epet_wap_img/opgc/zms_avatar_cat.png",
    },
    eaticonName: ["clear", "warning", "checked"],
    eaticonColor: ["#ff3a3f", "#fda300", "#73c800"],
    ableListBack: [
      "https://static.epetbar.com/epet_wap_img/opgc/o_blue.png",
      "https://static.epetbar.com/epet_wap_img/opgc/o_yellow.png",
      "https://static.epetbar.com/epet_wap_img/opgc/o_green.png",
      "https://static.epetbar.com/epet_wap_img/opgc/o_pink.png",
    ],
    ableStateImg: [
      "https://static.epetbar.com/epet_wap_img/opgc/o_watch.png",
      "https://static.epetbar.com/epet_wap_img/opgc/o_false.png",
      "https://static.epetbar.com/epet_wap_img/opgc/o_right.png",
    ],
    ableRecordList: [],
  },

  getters: {
    pet_type(state) {
      return state.pet_typeList[state.pet_typeid];
    },
    choiceAnimal(state) {
      let ls = {
        url: state.animalUrl[state.pet_typeid],
        name: state.animalName[state.pet_typeid],
      };
      return ls;
    },
  },
  mutations: {},
});
