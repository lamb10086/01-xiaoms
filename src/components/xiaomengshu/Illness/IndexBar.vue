<template>
    <div class="out-bar">
        <slot name="left">
            <div class="left">
                <div :ref="String(item.key)" name="A" v-for="item in choicelist" :key="item.key">
                    <div style="font-size:1.3rem;"><b>{{ item.key }}</b></div>
                    <p @click="backId(ls)" v-for="ls in item.list" :key="ls.value">{{ ls.label }}</p>
                </div>
            </div>
        </slot>

        <div class="right">
            <div class="no_scroll">
                <div @click="toIndex(item.key)" :key="item.key" v-for="item in choicelist">{{ item.key }}</div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        choicelist: {
            type: Array,
        },
        bacObj: {
            type: Object,
        },
        isShow: {
            type: Boolean,
        }
    },
    methods: {
        toIndex(title) {
            let out = document.getElementsByClassName("left")[0]
            out.scrollTop = this.$refs[title][0].offsetTop;

        },
        backId(Obj) {
            console.log(this.isShow)
            this.$emit('update:bacObj', { name: Obj.label, id: Obj.value });
            this.$emit('update:isShow', false);
            console.log(this.isShow)
        }
    },
}
</script>

<style lang="less" scoped>
.out-bar {
    position: relative;
    display: flex;
    overflow: auto;
    height: 100%;

    .left {
        text-align: left;
        flex-grow: 1;
        height: 100%;
        overflow: auto;

    }

    .right {
        width: 5%;
        height: 100%;
        overflow: hidden;

        .no_scroll {
            width: 100%+40px;
            overflow: auto;
            height: 100%;

            div {
                margin: 10px 0;
            }
        }
    }
}
</style>