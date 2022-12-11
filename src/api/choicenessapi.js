import xiaoms from "@/util/http";
export const alldata = (pet_type) => {
  return xiaoms.get(`/v3/index/home.html?pet_type=${pet_type}&version=596`);
};
