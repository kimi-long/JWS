<template>
  <div class="banjiList">
    <div class="banjiListItem" v-for="(item,index) in banjilist">
      <div><span class="title">课程名称：</span><span class="">{{item.CourseName}}</span></div>
      <div><span class="title">上课老师：</span><span class="">{{item.Name}}</span></div>
      <div><span class="title">上课时间：</span><span class="">{{item.SKtime}} {{item.startTime}}</span></div>
      <div class="buttonBox">
        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>
        <span class="themeColor" v-else @click="toTeaOrderDetails(item)">未点名</span>
      </div>
    </div>

  </div>
</template>

<script>
  import { getTerListClassRowClass } from "@/api/getData";

  export default {
    components: {},
    data() {
      return {
        active:0,
        banjilist:[],
      }
    },

    created() {
      this.getTerListClassRowClass();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {
      toTeaOrderDetails(items){
        localStorage.setItem("teaOrderId", items.ID);
        this.$router.push('/teaOrderDetails')
      },
      async getTerListClassRowClass(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTerListClassRowClass({
          StoresID:localStorage.getItem("storesid"),
          ClassID:this.$route.query.id,
          pages:1,
          psize:999,
        })
        if(crs.orsuccess=='1'){
          this.banjilist = crs.data
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
