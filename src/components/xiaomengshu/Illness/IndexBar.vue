<template>
    <div class="out-bar">
        <div class="left">
            <div :ref="item.key" v-for="item in choicelist" :key="item.key">
                <div>{{ item.key }}</div>
                <p v-for="ls in item.list" :key="ls.value">{{ ls.label }}</p>
            </div>
        </div>
        <div class="right">
            <div @click="toIndex(item.key)" :key="item.key" v-for="item in choicelist">{{ item.key }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        choicelist: {
            type: Array,
        },
        titlelist: {
            type: Array,
        },
        id: {
            type: Number,
        }
    },
    methods: {
        toIndex(title) {
            console.log(this.$refs, title);
        }
    },
}
</script>

<style lang="less" scoped>
.out-bar {
    // position: absolute;
    display: flex;


    .left {
        flex-grow: 1;
        // height: 100%;
        overflow: auto;
    }

    .right {
        width: 5%;
    }
}
</style>