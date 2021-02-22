<template>
  <div class="banjiList">
    <div class="banjiListItem" v-for="(item,index) in banjilist">
      <div><span class="title">姓名：</span><span class="">{{item.mName}}</span></div>
      <div><span class="title">手机号：</span><span class="">{{item.mPhone}}</span></div>
      <div><span class="title">商品名称：</span><span class="">{{item.goodsName}}</span></div>
      <div><span class="title">购买时间：</span><span class="">{{item.BuyTime}}</span></div>
      <div><span class="title">购买数量：</span><span class="">{{item.number}}</span></div>
      <div><span class="title">购买金额：</span><span class="">{{item.BuyPrice}}</span></div>
      <!--      <div class="buttonBox">-->
      <!--        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>-->
      <!--        <span class="themeColor" v-else >未点名</span>-->
      <!--      </div>-->
    </div>

  </div>
</template>

<script>
  import { getlsumGoodsSellInfo } from "@/api/getData";

  export default {
    components: {},
    data() {
      return {
        banjilist:[],
      }
    },

    created() {
      this.getlsumGoodsSellInfo();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {

      async getlsumGoodsSellInfo(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getlsumGoodsSellInfo({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:this.$route.query.TeacherID,
          goodsID:this.$route.query.goodsID,
          Stime:this.$route.query.Stime,
          Etime:this.$route.query.Etime,
        })
        if(crs.orsuccess=='1'){
          this.banjilist = crs.data;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },
    }
  }

</script>

<style lang="less" scoped>
  .themeColor{
    color: #4aa1ec;
  }
  .green{
    color: green;
  }
  .van-tabs__content{
    background: #f4f5f6;
    .van-tab__pane{
      background: #f4f5f6;
    }
  }
  .banjiList{
    background: #f4f5f6;
    .banjiListItem{
      margin: 10px;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 5px;
      .title{
        width: 120px;
        display: inline-block;
      }
      .buttonBox{
        margin-top: 10px;
        .line{
          color: #DCDCDC;
        }
        span{
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
  }
</style>
