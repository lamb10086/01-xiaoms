<template>
    <div>
        <div class="top-img">
            <img :src="topUrl" alt="" />
            <div class="top-left">
                <br />
                <van-icon name="add" color="#30abb3" size="2.8rem" />
                <p>添加宠物</p>
            </div>
            <img class="top-right" :src="topRightUrl[pet_typeid]" alt="" />
        </div>
        <div class="middle">
            <img class="back-img" :src="backUrl[pet_typeid]" alt="" />
            <div class="change-pet" @click="changePet()"></div>
            <!-- 狗狗 -->
            <div v-if="pet_typeid == 0">
                <van-checkbox-group v-model="checked">
                    <van-checkbox v-for="(item, index) in date" :key="item.cid" :name="item.cid" checked-color="#e17171"
                        :style="{
                            left: dogButton[index][0] + '%',
                            top: dogButton[index][1] + '%',
                        }">{{ item.title }}</van-checkbox>
                </van-checkbox-group>
            </div>
            <!-- 猫猫 -->
            <div v-else>
                <van-checkbox-group v-model="checked">
                    <van-checkbox v-for="(item, index) in date" :key="item.cid" :name="item.cid" checked-color="#e17171"
                        :style="{
                            left: catButton[index][0] + '%',
                            top: catButton[index][1] + '%',
                        }">{{ item.title }}</van-checkbox>
                </van-checkbox-group>
            </div>
        </div>
        <van-button round type="primary" class="next-step" color="#30abb3" @click="toNext()">下一步</van-button>
    </div>
</template>
<script>
import { getIlnessList } from "@/api/xiaomengshu";
export default {
    data() {
        return {
            backUrl: [
                "https://static.epetbar.com/epet_wap_img/tools/h_dogs.png",
                "https://static.epetbar.com/epet_wap_img/tools/h_cats.png",
            ],
            topUrl: "https://static.epetbar.com/epet_wap_img/tools/h_head.png",
            topRightUrl: [
                "https://static.epetbar.com/epet_wap_img/tools/h_dogicon.png",
                "https://static.epetbar.com/epet_wap_img/tools/h_caticon.png",
            ],
            pet_typeid: 0,
            dogButton: [
                [2, 21],
                [18, 9],
                [33, 23],
                [59, 26],
                [76, 40],
                [62, 92],
                [38, 88],
                [15, 91],
                [14, 65],
            ],
            catButton: [
                [15, 18],
                [38, 26],
                [63, 20],
                [65, 87],
                [40, 92],
                [17, 84],
                [5, 65],
            ],
            date: [],
            checked: [],
        };
    },
    setup() {
        const themeVars = {
            checkboxBorderColor: "white",
            checkboxLabelColor: "white",
            buttonDefaultHeight: "10vw",
        };
        return {
            themeVars,
        };
    },
    async created() {
        this.pet_typeid = this.$store.state.pet_typeid;
        await this.getList(0);
    },
    mounted() {
        this.changescreen();
    },
    methods: {
        async getList(site) {
            let res = await getIlnessList({
                do: "DepartmentList",
                site: site + 1,
            });
            //   console.log(res);
            this.date = [];
            res.data.forEach((element) => {
                if (element.relate_basic_cid.length) {
                    //   console.log(element.title);
                    this.date.push(element);
                }
            });
            this.pet_typeid = site;
            //   this.date.pop();
        },
        changePet() {
            this.checked = [];
            this.getList((this.pet_typeid + 1) % 2);
        },
        changescreen() {
            let middleNav = document.querySelector(".ac");
            // console.log("middleNav.offsetTop", middleNav.offsetTop);
            let ls = document.documentElement.clientHeight;
            middleNav.style.minHeight = ls - middleNav.offsetTop + "px";
        },
        toNext() {

            this.$router.push({
                name: 'illnessfrom',
                query: {
                    cids: String(this.checked)
                }
            })
        },
    }
};
</script>

<style lang="less" scoped>
.ac {
    background-color: white;
}

.top-img {
    width: 100%;
    position: relative;

    &>img {
        width: 100%;
    }

    .top-left {
        display: table-cell;
        position: absolute;
        width: 14%;
        height: 36%;
        line-height: 36%;
        left: 28%;
        top: 16%;
        text-align: center;
        // vertical-align: middle;
        color: #30abb3;

        p {
            font-size: 1rem;
            margin: 1vw 0;
        }
    }

    .top-right {
        position: absolute;
        width: 39%;
        left: 45%;
        top: 21%;
    }
}

.middle {
    position: relative;
    top: -3px;

    .back-img {
        width: 100%;
    }

    .change-pet {
        position: absolute;
        width: 20%;
        height: 16%;
        right: 0%;
        top: 0%;
    }
}

.next-step {
    padding: 0 20%;
    display: block;
    margin: 3vw auto;
}

.van-checkbox {
    padding: 2px 2vw;
    position: absolute;
    background-color: #30abb3;
    border-radius: 20px;
    font-weight: 900;
}
</style>
