<template>
  <div class="banjiList">
    <div class="banjiListItem" v-for="(item,index) in banjilist">
      <div><span class="title">姓名：</span><span class="">{{item.Name}}</span></div>
      <div><span class="title">手机号：</span><span class="">{{item.Phone}}</span></div>
<!--      <div class="buttonBox">-->
<!--        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>-->
<!--        <span class="themeColor" v-else >未点名</span>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
  import { getTerClassInfo } from "@/api/getData";
  export default {
    components: {},
    data() {
      return {
        active:0,
        banjilist:[],
      }
    },

    created() {
      this.getTerClassInfo();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {

      async getTerClassInfo(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTerClassInfo({
          StoresID:localStorage.getItem("storesid"),
          ClassID:this.$route.query.id,
          pages:1,
          psize:999,
        })
        if(crs.orsuccess=='1'){
          this.banjilist = crs.listClassMembers;
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
