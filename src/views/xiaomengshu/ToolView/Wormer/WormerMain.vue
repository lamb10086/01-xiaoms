<template>
    <div class="wormer">
        <top-nav :Toptitle="'驱虫选药'"></top-nav>
        <img class="top-img"
            src="https://img0.baidu.com/it/u=2254229948,758131803&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=350" alt=".">
        <nav class="middle-nav">
            <van-form label-width="6rem" input-align="left">
                <van-cell-group inset>
                    <h3>请输入宠物信息</h3>
                    <van-field name="宠物类型：" label="宠物类型：" label-width="70px">
                        <template #input>
                            <div>
                                <van-radio-group v-model="pid" direction="horizontal" icon-size="1.3rem"
                                    checked-color="#41c856">
                                    <van-radio name="1">
                                        狗狗
                                    </van-radio>
                                    <van-radio name="2">
                                        猫猫
                                    </van-radio>
                                </van-radio-group>
                            </div>
                        </template>
                    </van-field>
                    <van-field v-if="pid == 1" @click="choicePet_type" readonly v-model="pet_type.name" label="宠物品种"
                        placeholder="请选择宠物品种" />
                    <van-field @click="choicePet_age" readonly v-model="ageString" label="出生日期" placeholder="请选择宠物年龄" />
                    <van-field label="是否怀孕：" label-width="70px">
                        <template #input>
                            <div>
                                <van-radio-group v-model="withChild" direction="horizontal" icon-size="1.3rem"
                                    checked-color="#41c856">
                                    <van-radio :name="true">
                                        是
                                    </van-radio>
                                    <van-radio :name="false">
                                        否
                                    </van-radio>
                                </van-radio-group>
                            </div>
                        </template>
                    </van-field>

                </van-cell-group>
            </van-form>

            <van-button class="confirmBtn" round type="primary" color="#41c856" @click="confirm">确定</van-button>
            <i>推荐的药品仅供参考，如有需要咨询兽医</i>
        </nav>
        <!-- 写dialog的div -->
        <div>
            <van-popup class="pet_typeClass" v-model:show="showChoicepet_type" position="bottom" round
                :style="{ height: '60%' }">
                <div class="top">
                    <h2>选择宠物品种</h2>
                    <hr>
                </div>

                <div class="choice">
                    <index-bar v-model:isShow="showChoicepet_type" v-model:bacObj="pet_type"
                        :choicelist="pet_typeList"></index-bar>
                </div>
            </van-popup>
            <van-popup class="ageClass" v-model:show="showChoicepet_age" position="bottom" round
                :style="{ height: '60%' }">
                <van-date-picker @cancel="this.showChoicepet_age = false" @confirm="changeAge" v-model="ageTime"
                    title="选择日期" :max-date="new Date()" />
            </van-popup>
        </div>
    </div>
</template>

<script>
import TopNav from "@/components/xiaomengshu/AllCom/TopNav.vue";
import { getUserPet } from "@/api/xiaomengshu"
import IndexBar from "@/components/xiaomengshu/Illness/IndexBar.vue"
import { showToast } from 'vant';
export default {
    data() {
        return {
            pid: 0,
            withChild: 0,
            pet_type: {},
            ageTime: new Array,
            pet_typeList: [],
            showChoicepet_type: false,
            showChoicepet_age: false,
        }
    },
    computed: {
        ageString() {
            return String(this.ageTime).replaceAll(',', '-');
        }
    },
    methods: {
        changescreen() {
            let middleNav = document.querySelector(".middle-nav");
            console.log("middleNav.offsetTop", middleNav.offsetTop);
            let ls = document.documentElement.clientHeight;
            middleNav.style.minHeight = ls - middleNav.offsetTop + "px";
        },
        async choicePet_type() {
            this.showChoicepet_type = true;
            let res = await getUserPet({ do: 'GetPettype' });
            this.pet_typeList = res.list;
        },
        choicePet_age() {
            this.showChoicepet_age = true;
        },
        changeAge({ selectedValues }) {
            this.ageTime = selectedValues
            this.showChoicepet_age = false
        },
        confirm() {
            let flag = 1;
            let message = '小主，请选择宠物类型~'
            if (this.pid === 0) {
                flag = 0;
            }

            else if (this.pid == 1 && Object.keys(this.pet_type).length == 0) {
                flag = 0;
                message = '小主，请选择宠物品种~'
            }
            else if (this.ageString === "") {
                flag = 0;
                message = '小主，请选择宠物出生日期~'
            }
            else if (this.withChild === 0) {
                flag = 0;
                message = '小主，请选择宠物是否孕期'
            }
            if (flag == 0) {
                showToast({
                    message,
                    position: 'bottom',
                });
            }
            console.log(Number(new Date(this.ageString)) / 1000)
        }
    },
    mounted() {

        this.changescreen();

    },
    components: {
        TopNav, IndexBar
    }
}
</script>

<style lang="less" scoped>
.wormer {

    .top-img {
        width: 100%;
        vertical-align: middle;
    }

    .middle-nav {
        box-sizing: border-box;
        padding: 3% 5%;
        background-color: white;

        &>p {
            margin-top: 0;
            font-size: 1.5rem;

        }
    }

    .confirmBtn {
        width: 60%;
        display: block;
        margin: 10px auto;

    }

    ::v-deep .pet_typeClass {
        text-align: center;
        padding: 0 16px;
        box-sizing: border-box;
        display: flex;
        flex-flow: column;

        .top {
            h2 {
                text-align: center;
            }
        }

        .choice {
            flex-grow: 1;
            height: 0;
        }

    }

    i {
        text-align: center;
        display: block;
        margin: auto;
    }
}
</style>