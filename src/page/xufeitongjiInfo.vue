<template>
  <div class="banjiList">
    <div class="banjiListItem" v-for="(item,index) in banjilist">
      <div><span class="title">学员名称：</span><span class="">{{item.Name}}</span></div>
      <div><span class="title">学员手机：</span><span class="">{{item.Phone}}</span></div>
      <div><span class="title">会员名称：</span><span class="">{{item.CardName}}</span></div>
      <div><span class="title">续费金额：</span><span class="">{{item.PurchaseAmount}}</span></div>
      <div><span class="title">续费时间：</span><span class="">{{item.addTime}}</span></div>
      <!--      <div class="buttonBox">-->
      <!--        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>-->
      <!--        <span class="themeColor" v-else >未点名</span>-->
      <!--      </div>-->
    </div>

  </div>
</template>

<script>
  import { getTerXFTJinfo } from "@/api/getData";

  export default {
    components: {},
    data() {
      return {
        banjilist:[],
      }
    },

    created() {
      this.getTerXFTJinfo();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {

      async getTerXFTJinfo(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTerXFTJinfo({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:this.$route.query.LoginID,
          CardID:this.$route.query.CardID,
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
