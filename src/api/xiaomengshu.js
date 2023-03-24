import xiaoms from "@/util/http";

import local from "@/util/local";
export const getList = async (pet_type) => {
  return local.get(`/toDayKnowLedge?pet_type=${pet_type}`);
};
export const getRecommendList = (params) => {
  return xiaoms.get(
    `/v3/content/opgc/IndexV3.html?do=GetListNew&pet_type=${params.pet_type}&param=${params.param}&page=${params.page}`
  );
};

export const getEatList = (params) => {
  return xiaoms.post("/v3/content/Tools/Eat.html", params);
};
export const getAbleList = (params) => {
  return xiaoms.get("/v3/content/Tools/Do.html", {
    params,
  });
};
export const getIlnessList = (params) => {
  return xiaoms.get("/v3/content/Tools/Disease/main.html", {
    params,
  });
};
export const getUserPet = (params) => {
  return xiaoms.post("/v3/user/pet/Main.html", params);
};
