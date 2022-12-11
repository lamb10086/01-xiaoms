<script>
import { Dialog } from "vant";
export default {
  created() {
    Dialog.alert({
      message: "功能开发中敬请期待",
    }).then(() => {
      this.$router.back();
    });
  },
};
</script>

<style lang="less" scoped></style>
