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

                <van-form label-width="6rem" input-align="right">
                    <van-cell-group inset>
                        <h3>请填写基本信息</h3>
                        <van-field v-if="this.$route.query.pet_typeid == 0" @click="choicePet_type" readonly
                            v-model="pet_type.name" label="宠物品种" placeholder="请选择宠物品种" />
                        <template v-for="(item, index) in formList" :key="item.title">
                            <van-field v-if="item.type === 1 && item.list.length != 0" :label="item.title">
                                <template #input>
                                    <div>
                                        <van-radio-group v-model="formIds[index]" direction="horizontal"
                                            icon-size="1.5rem">
                                            <van-radio :name="item.list[0].cid"
                                                @click="chageRadio(index, 0, item.list)">{{ item.list[0].title
}}</van-radio>
                                            <van-radio :name="item.list[1].cid"
                                                @click="chageRadio(index, 1, item.list)">{{ item.list[1].title
}}</van-radio>
                                        </van-radio-group>
                                    </div>
                                </template>
                            </van-field>
                            <van-field @click="choicePet_age" v-if="item.type === 2" readonly v-model="ageString"
                                :label="item.title" placeholder="请选择宠物年龄" />

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
            <detail-list :cid="choiceCid" :detailList="detailList" :getAll="getAll"></detail-list>

        </div>
        <div class="botton-btn">
            <van-button round type="default" @click="Preview()" class="detailbutton">预览病症</van-button>
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
                    <index-bar v-model:isShow="showChoicepet_type" v-model:bacObj="pet_type"
                        :choicelist="pet_typeList"></index-bar>
                </div>
            </van-popup>
            <van-popup class="ageClass" v-model:show="showChoicepet_age" position="bottom" round
                :style="{ height: '60%' }">
                <van-date-picker @cancel="this.showChoicepet_age = false" @confirm="changeAge" v-model="ageTime"
                    title="选择日期" :max-date="new Date()" />
            </van-popup>
            <!-- 显示预览 -->
            <van-popup class="pet_typeClass" v-model:show="showPreview" position="bottom" round
                :style="{ height: '50%' }">
                <div class="top">
                    <h2>当前已选症状</h2>
                    <hr>
                </div>
                <div>
                    <div v-for="item in previewList" :key="item.title" class="preview-nav">
                        <b>{{ item.title }}:</b>
                        <template v-if="item.is_img">
                            <img v-for="item2 in item.list" :key="item2.cid" :src="item2.img" alt="."
                                class="preview-img" />
                        </template>
                        <template v-else>
                            <van-button size="small" v-for="btn in item.list" plain :key="btn.cid" round
                                style="margin:5px" color="#30abb3">{{
        btn.title
}}</van-button>
                        </template>
                    </div>
                </div>
                <van-button round type="default" @click="showPreview = false" class="cencelpreview"
                    color="#30abb3">取消预览病症</van-button>
            </van-popup>
        </div>
    </van-config-provider>

</template>

<script>
import { getIlnessList, getUserPet, getpreviewList } from "@/api/xiaomengshu"
import DetailList from '../../../../components/xiaomengshu/Illness/DetailList.vue';
import IndexBar from "../../../../components/xiaomengshu/Illness/IndexBar.vue"
import { showFailToast } from 'vant'
export default {
    components: { DetailList, IndexBar },
    data() {
        return {
            formIds: [],
            formNo_ids: [],
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
            showChoicepet_age: false,
            ageTime: new Array,
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
            againDetailNum: -2,
            showPreview: false,
            previewList: [],
            getAll: 0,
            cidList: []
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
        if (typeof cidArray == "string")
            this.cidArray = cidArray.split(",");
        await this.getFormList();
        await this.getSySmptomList();
        this.ageTime = [];

    },
    computed: {
        ageString() {
            return String(this.ageTime).replaceAll(',', '-');
        }
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
            // console.log(this.formList)
        },
        outpet_type() {
            // console.log(this.pet_type)
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
                cid: this.choiceCid,
            });
            this.detailList = res.data;
            this.getAll += 1;

        },
        changeCid(cid) {
            this.choiceCid = cid;
            if (this.cidList.indexOf(cid) == -1)
                this.cidList.push(cid);
            this.getDetailList();
        },
        //点击下一步
        async nextResult() {
            this.getAll += 1;
            this.$nextTick(async () => {
                // console.log(111)
                if (this.isFirst || this.againDetailNum == -1) {
                    let res = await getIlnessList({
                        do: "result",
                        ids: String([...this.formIds, ...this.ids]),
                        no_ids: String([...this.formNo_ids, ...this.no_ids]),
                        cid: String(this.cidList),
                        age: this.ageString,
                        pt_type: this.pet_type.id,
                    });
                    if (res.data.is_result <= 1) {
                        this.$store.state.illnessresultList = res.data.result_list;
                        this.$router.push({
                            name: 'illnesspage',
                            query: {
                                type: res.data.is_result,
                            }
                        })
                    }
                    else if (this.isFirst) {
                        this.againDetail = res.data.symptom_list
                        this.againDetailNum = res.data.symptom_list.length - 1;
                        this.isFirst = false;
                        this.detailList = this.againDetail[this.againDetailNum].combination;
                        this.againDetailNum--;
                    }
                }
                else {
                    this.detailList = this.againDetail[this.againDetailNum].combination;
                    this.againDetailNum--;
                }
            })


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
        chageRadio(index, type, list) {
            this.formIds[index] = list[type].cid;
            this.formNo_ids[index] = list[type ^ 1].cid;
        },
        Preview() {
            if (this.cidList.length == 0) {
                showFailToast('请选择症状');
                return;
            }
            this.getAll += 1;
            this.$nextTick(async () => {
                let res = await getpreviewList({
                    do: "CheckList",
                    ids: String(this.ids)
                });
                this.previewList = res.data;
                this.showPreview = true;
            })
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

.preview-nav {
    text-align: left;
    margin: 10px 0;
}

.preview-img {
    vertical-align: top;
    margin: 5px;
    width: 6rem;
    height: 6rem;
    background-size: cover;
    border-radius: 10px;
}

.cencelpreview {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
