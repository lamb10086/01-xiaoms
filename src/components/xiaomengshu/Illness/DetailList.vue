<template>
    <div class="detail-bar">
        <h3>请选择症状</h3>
        <template v-for="(item, index) in detailList" :key="item.title">
            <div class="detail-btn">
                <p>{{ item.title }}:</p>
                <div v-if="item.is_img === 0">
                    <template v-if="item.checkbox === 0">
                        <van-button size="small"
                            :class="{ choicebtn: this.allids[index] && (this.allids[index].indexOf(btn.cid) != -1 || this.ids.indexOf(btn.cid) != -1) }"
                            v-for="btn in item.list" :key="btn.cid" round type="default"
                            @click.prevent="changeCid(btn.cid, index, 0)">{{ btn.title
}}</van-button>
                    </template>
                    <template v-if="item.checkbox === 1">
                        <van-button size="small"
                            :class="{ choicebtn: this.allids[index] && (this.allids[index].indexOf(btn.cid) != -1 || this.ids.indexOf(btn.cid) != -1) }"
                            v-for="btn in item.list" :key="btn.cid" round type="default"
                            @click.prevent="changeCid(btn.cid, index, 1)">{{ btn.title
}}</van-button>
                    </template>
                </div>
                <div v-else class="img-bar">
                    <template v-if="item.checkbox === 0">
                        <div class="img-btn" v-for="btn in item.list" :key="btn.cid" :style="{
    backgroundImage: `url(${btn.img})`
}" @click="changeImgCid(btn, index, 2)">
                            <div v-if="imgClass(btn.cid, index)" class="img-btn-shade">
                                <van-icon name="checked" size="2rem" color="#30abb3" />
                            </div>
                        </div>
                    </template>
                    <template v-if="item.checkbox === 1">
                        <div class="img-btn" v-for="btn in item.list" :key="btn.cid" :style="{
    backgroundImage: `url(${btn.img})`
}" @click="changeImgCid(btn, index, 3)">
                            <div v-if="imgClass(btn.cid, index)" class="img-btn-shade">
                                <van-icon name="checked" size="2rem" color="#30abb3" />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>

        <van-popup teleport="body" class="illness-img-dialog" v-model:show="showDialog">
            <img :src="showImg.img" />
            <p>{{ showImg.remark }}</p>
            <div>
                <button class="cancelbtn" @click="showDialog = false">不对，再看看其他的</button>
                <button class="choicebtn" @click="changeCid(showImg.cid, showImg.index, showImg.type)">对，就是这个症状</button>
            </div>
        </van-popup>

    </div>

</template>

<script>
export default {
    props: {
        cid: {
            type: Number,
            default: 0,
        },
        detailList: {
            type: Array,
            default: () => [],
        },
        getAll: {
            type: Number,
            default: 0,
        }
    },
    inject: ['ids', 'no_ids'],
    data() {
        return {
            allids: [],
            showDialog: false,
            showImg: {
            }
        };
    },
    methods: {
        changeCid(cid, index, type) {
            // console.log("type:", type)
            if (type === 0) this.allids[index][0] = cid;
            else if (type === 1) {
                let ls = this.allids[index].indexOf(cid);
                if (ls == -1) this.allids[index].push(cid);
                else {
                    this.allids[index].splice(ls, 1);
                }
            }

            else if (type === 2) {
                this.allids[index][0] = cid;
                this.showDialog = false
            }
            else {
                let ls = this.allids[index].indexOf(cid);
                // console.log("ls:", ls)
                if (ls == -1) this.allids[index].push(cid);
                else {
                    this.allids[index].splice(ls, 1);
                }
                this.showDialog = false
            }
        },
        imgClass(cid, index) {

            if ((this.allids[index].indexOf(cid) != -1 || this.ids.indexOf(cid) != -1))
                return true
            else
                return false

        },
        changeImgCid(btn, index, type) {
            if (this.imgClass(btn.cid, index)) {
                this.changeCid(btn.cid, index, btn.type);
                return;
            }
            this.showDialog = true;
            this.showImg = { ...btn, index, type }
        }
    },
    watch: {
        getAll() {
            // console.log(this.detailList)
            // console.log("watch")
            if (!this.detailList)
                return
            for (let i = 0; i < this.allids.length; i++) {
                this.ids.push(...this.allids[i]);
            }

            for (let i = 0; i < this.detailList.length; i++) {
                this.allids.push([]);
                if (!this.detailList[i].list)
                    continue
                let { list } = this.detailList[i]
                for (let j = 0; j < list.length; j++) {
                    if (this.ids.indexOf(list[j].cid) == -1) {
                        this.no_ids.push(list[j].cid)
                    }
                }

            }

        },
        detailList() {
            this.allids = [];
            for (let i = 0; i < this.detailList.length; i++) {
                this.allids.push([]);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.detail-bar {
    font-size: 1.2rem;
    padding: 0 16px;

    .detail-btn {
        button {
            margin: 3px 5px;
        }

        .img-bar {
            display: flex;
            flex-wrap: wrap;

            .img-btn {
                margin: 5px;
                width: 6rem;
                height: 6rem;
                background-size: cover;
                border-radius: 10px;
            }

            .img-btn-shade {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                border-radius: 10px;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
    }
}

.choicebtn {
    color: #30abb3;
    border-color: #30abb3;
}
</style>
<style  lang="less">
.illness-img-dialog {
    padding: 20px !important;
    width: 80%;
    border-radius: 20px;
    text-align: center;

    img {
        width: 100%;
    }


    button {
        background-color: white;
        border: 1px solid black;
        border-radius: 20px;
        padding: 1rem 5px;
        font-size: 1rem;

    }

    .choicebtn {
        color: #30abb3;
        border-color: #30abb3;
        margin-left: 1.6rem;
    }

    .cancelbtn {
        color: #9999b3;
        border-color: #9999b3;
    }
}
</style>