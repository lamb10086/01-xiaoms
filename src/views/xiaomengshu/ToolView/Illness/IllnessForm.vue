<template>
    <van-config-provider :theme-vars="themeVars">
        <div style="padding-bottom:60px;">
            <div class="top-img">
                <img :src="topUrl" alt="" />
                <div class="top-reminder">
                    请选择{{ String(cidArray.map((item) => { return dateMap.get(item * 1) })) }}症状类型
                </div>
            </div>

            <div class="main-form" v-show="isFirst">

                <van-form @submit="onSubmit" label-width="6rem" input-align="right">
                    <van-cell-group inset>
                        <h3>请填写基本信息</h3>
                        <van-field @click="choicePet_type" readonly v-model="pet_type.name" label="宠物品种"
                            placeholder="请选择宠物品种" />
                        <template v-for="(item) in formList" :key="item.title">
                            <van-field v-if="item.type === 1 && item.list.length != 0" :label="item.title">
                                <template #input>
                                    <div>
                                        <van-radio-group v-model="checked" direction="horizontal" icon-size="1.5rem">
                                            <van-radio name="1">{{ item.list[0].title }}</van-radio>
                                            <van-radio name="2">{{ item.list[1].title }}</van-radio>
                                        </van-radio-group>
                                    </div>
                                </template>
                            </van-field>
                            <van-field v-if="item.type === 2" readonly v-model="age" :label="item.title"
                                placeholder="请选择宠物年龄" />

                        </template>


                    </van-cell-group>
                </van-form>
                <div class="symptom-btn">
                    <van-button :class="{ choicebtn: item.cid === choiceCid }" v-for="item in symptom" :key="item.cid"
                        round type="default" @click.prevent="changeCid(item.cid)">{{
                                item.title
                        }}</van-button>
                </div>
            </div>
            <detail-list :cid="choiceCid" :detailList="detailList"></detail-list>

        </div>
        <div class="botton-btn">
            <van-button round type="default" class="detailbutton">预览病症</van-button>
            <van-button round type="default" @click="nextResult()" class="nextbutton">下一步</van-button>
        </div>
        <!-- 写dialog的div -->
        <div>
            <van-popup class="pet_typeClass" v-model:show="showChoicepet_type" position="bottom" round
                :style="{ height: '60%' }">
                <div class="top">
                    <h2>选择宠物品种</h2>
                    <hr>
                </div>

                <div class="choice">
                    <index-bar v-model:id="pet_type" :choicelist="pet_typeList"></index-bar>
                </div>
            </van-popup>
        </div>
    </van-config-provider>
</template>

<script>
import { getIlnessList, getUserPet } from "@/api/xiaomengshu"
import DetailList from '../../../../components/xiaomengshu/Illness/DetailList.vue';
import IndexBar from "../../../../components/xiaomengshu/Illness/IndexBar.vue"
export default {
    components: { DetailList, IndexBar },
    data() {
        return {
            date: [],
            dateMap: new Map,
            pet_typeid: 0,
            cidArray: [],
            topUrl: "https://static.epetbar.com/epet_wap_img/tools/h_infohead.png",
            formList: [],
            symptom: [],
            pet_type: {},
            pet_typeList: [],
            showChoicepet_type: false,
            age: '',
            choiceCid: 0,
            detailList: [],
            ids: [],
            no_ids: [],
            themeVars: {
                radioLabelColor: '#c8c9cc',
                buttonNormalFontSize: '1.2rem'
            },
            isFirst: true,
            againDetail: [],
            againDetailNum: 10,

        }
    },
    provide() {
        return {
            ids: this.ids,
            no_ids: this.no_ids
        }

    },
    async created() {
        this.pet_typeid = this.$store.state.pet_typeid;
        await this.getList(0);
        this.date.forEach((item) => {
            this.dateMap.set(item.cid, item.title);
        })
        const { cids: cidArray } = this.$route.query;

        this.cidArray = cidArray.split(",");
        console.log(cidArray)
        await this.getFormList();
        await this.getSySmptomList()
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
        //获取form表单
        async getFormList() {
            let res = await getIlnessList({
                do: "BasicSituateList",
                cids: String(this.cidArray),
            });
            this.formList = res.data;
            console.log(this.formList)
        },

        //获取症状列表
        async getSySmptomList() {
            let res = await getIlnessList({
                do: "DepartmentSonList",
                cids: String(this.cidArray),
            });
            this.symptom = res.data;
        },
        //获取详情列表
        async getDetailList() {
            let res = await getIlnessList({
                do: "SymptomList",
                cid: this.cid,
            });
            this.detailList = res.data;
            this.allids.length = 0;
            this.detailList.forEach(() => {
                this.allids.push([]);
            });
            console.log(this.detailList);
        },
        changeCid(cid) {
            this.choiceCid = cid;
            this.getDetailList();
        },
        async nextResult() {
            if (this.isFirst || this.againDetailNum == -1) {
                let res = await getIlnessList({
                    do: "result",
                    ids: String(this.ids),
                    no_ids: String(this.no_ids),
                });
                if (this.isFirst) {
                    this.againDetail = res.data.symptom_list
                    this.againDetailNum = res.data.is_result;
                    this.isFirst = false;
                }
            }
            else {
                this.DetailList = this.againDetail[this.againDetailNum].combination;
            }

        },
        async choicePet_type() {
            this.showChoicepet_type = true;
            let res = await getUserPet({ do: 'GetPettype' });
            this.pet_typeList = res.list;
        }

    }

}
</script>

<style lang="less" scoped>
.top-img {
    width: 100%;
    position: relative;

    &>img {
        width: 100%;
    }

    .top-reminder {

        font-size: 1.3rem;
        font-weight: 600;
        position: absolute;
        top: 20%;
        left: 25%;
        padding: 2rem;
        background-size: 100% 100%;
        background-image: url(@/assets/xiaomengshu/illnessreminder.png);
    }
}

.main-form {
    font-size: 1.2rem;

    .van-cell {
        font-size: 1rem;

    }
}

.symptom-btn {
    margin: 16px;

    button {
        margin-left: 1rem;
        margin-bottom: 1rem;
    }

    .choicebtn {
        color: #30abb3;
        border-color: #30abb3;
    }
}

.botton-btn {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    background-color: white;
    padding: 10px 16px;
    justify-content: space-between;
    box-sizing: border-box;


    .nextbutton {
        color: white;
        background-color: #30abb3;
        margin-left: 1rem;
        font-size: 1.5rem;
    }

    .detailbutton {
        color: #30abb3;
        border-color: #30abb3;
        font-size: 1.5rem;
    }

    button {
        flex: auto
    }
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
</style>