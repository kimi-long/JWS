<template>
  <div class="banjiList">
    <div class="banjiListItem" v-for="(item,index) in banjilist">
      <div><span class="title">姓名：</span><span class="">{{item.Name}}</span></div>
      <div><span class="title">手机号：</span><span class="">{{item.Phone}}</span></div>
      <div><span class="title">班级：</span><span class="">{{item.ClassName}}</span></div>
      <div><span class="title">课程：</span><span class="">{{item.CourseName}}</span></div>
      <div><span class="title">类型：</span><span class="" v-if="item.RowClassType == 0">一对多</span><span class="" v-if="item.RowClassType == 1">一对一</span></div>
      <!--      <div class="buttonBox">-->
      <!--        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>-->
      <!--        <span class="themeColor" v-else >未点名</span>-->
      <!--      </div>-->
    </div>

  </div>
</template>

<script>
  import { getListTerClassMembers } from "@/api/getData";

  export default {
    components: {},
    data() {
      return {
        active:0,
        banjilist:[],
      }
    },

    created() {
      this.getListTerClassMembers();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {

      async getListTerClassMembers(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListTerClassMembers({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID"),
          pages:1,
          psize:999,
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
