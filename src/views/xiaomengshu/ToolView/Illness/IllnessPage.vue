<template>
    <div>
        <div class="top-nav">
            <img class="top-backgroundImg" :src="topUrl" alt=".">
            <img v-if="resultType == 1" class="talkImg" :src="topUrl2" alt=".">
            <p v-else class="talkImg" :src="topUrl2" alt=".">
                很抱歉！所选症状无法判断结果！</p>

        </div>
        <div class="no_result" v-if="resultType == 0">
            <p>
                ① 选择症状太少或不是典型症状图片无法给出参考结果，建议就医做详细检查哦。
                如仅有不吃、不喝、精神不好等单一情况则无法判断疾病。
            </p>
            <p>
                ② 所选症状不全面，建议尽可能选择各部位症状，不要忽略细节表现哦。
                如判断犬瘟热感染不仅有咳嗽、流鼻涕症状还可能有脚垫干裂症状。
            </p>
        </div>
        <div class="have_result" v-else>
            <div>
                <van-button v-for="(item, index) in resultList" :key="item.scene_id" color="#37aeb6" plain
                    class="top-btn" round @click="chnageId($event, index)">{{ item.name }}</van-button>
                <div class="point"></div>
                <hr>
            </div>

            <div class="introduce">

                <h2><img src="https://static.epetbar.com/epet_wap_img/tools/h_biaot.png" alt="">{{
        resultList[btnId].name
}}</h2>
                <p>
                    <b>疾病介绍：</b>{{ resultList[btnId].desc }}
                </p>
                <p>
                    <b>应对措施：</b><span v-html="resultList[btnId].solution"></span>
                </p>
            </div>

        </div>
        <van-button round type="primary" class="next-step" color="#30abb3" @click="toAgain()">再查一次</van-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            topUrl: "https://static.epetbar.com/epet_wap_img/tools/h_head.png",
            topUrl2: "https://static.epetbar.com/epet_wap_img/tools/h_result.png",
            btnId: 0,
            btnLeft: "40px",
        }
    },
    computed: {
        resultType() {
            // console.log(this.$route.query.type)
            return this.$route.query.type
        },
        resultList() {
            return this.$store.state.illnessresultList;
        }
    },
    methods: {
        toAgain() {
            this.$router.push({
                name: 'illness'
            })
        },
        chnageId(event, index) {
            this.btnId = index;
            this.btnLeft = event.target.offsetLeft + 20 + 'px'
        }
    }
}
</script>

<style lang="less" scoped>
.top-nav {
    position: relative;
    width: 100%;

    .top-backgroundImg {
        width: 100%;
    }

    .talkImg {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 900;
        width: 180px;
        position: absolute;
        padding: 10px 20px 25px 20px;
        left: 28%;
        top: 15%;
    }
}

.no_result {
    font-size: 1.2rem;
    padding: 15px;
    line-height: 160%;
}

.have_result {

    padding: 15px;

    .top-btn {
        margin: 0 5px;
    }

    .point {
        position: relative;
        top: 11px;
        left: v-bind(btnLeft);
        transform: rotateZ(45deg);
        width: 10px;
        height: 10px;
        border-top: 2px solid #37aeb6;
        border-left: 2px solid #37aeb6;
        background-color: white;
    }

    hr {
        border: 1px solid #37aeb6;
    }

    .introduce {


        h2 {
            img {
                height: 20px;
            }

            vertical-align: middle;
            line-height: 24px;
            height: 24px;
        }

        p {
            font-size: 1.2rem;
            line-height: 160%;
        }
    }
}

.next-step {
    padding: 0 20%;
    display: block;
    margin: 3vw auto;
}
</style>