<template>
  <div class="banjiList">
    <van-tabs v-model="active" color="#48aff9" @change="getTerListClassJW">
      <van-tab title="班课" :name="0">
        <div class="banjiListItem" v-for="(item,index) in banjilist">
          <div><span class="title">班级名称：</span><span class="">{{item.ClassName}}</span></div>
          <div><span class="title">学员个数：</span><span class="">{{item.allcount}}</span></div>
          <div><span class="title">添加时间：</span><span class="">{{item.addTime}}</span></div>
          <div><span class="title">关联课程：</span><span class="">{{item.CourseName}}</span></div>
          <div><span class="title">上课老师：</span><span class="">{{item.TeacherName}}</span></div>
          <div class="buttonBox">
            <span class="themeColor" @click="tokebiao(item.ID)">课表</span>
            <span class="line">|</span>
            <span class="themeColor" @click="tobanjixueyuan(item.ID)">班级学员</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="一对一" :name="1">
        <div class="banjiListItem" v-for="(item,index) in banjilist">
          <div><span class="title">班级名称：</span><span class="">{{item.ClassName}}</span></div>
          <div><span class="title">学员个数：</span><span class="">{{item.allcount}}</span></div>
          <div><span class="title">添加时间：</span><span class="">{{item.addTime}}</span></div>
          <div><span class="title">关联课程：</span><span class="">{{item.CourseName}}</span></div>
          <div><span class="title">上课老师：</span><span class="">{{item.TeacherName}}</span></div>
          <div class="buttonBox">
            <span class="themeColor" @click="tokebiao(item.ID)">课表</span>
            <span class="line">|</span>
            <span class="themeColor" @click="tobanjixueyuan(item.ID)">班级学员</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import { getTerListClassJW } from "@/api/getData";

    export default {
        components: {},
        data() {
            return {
              active:0,
              banjilist:[],
            }
        },

        created() {
          this.getTerListClassJW();
        },

        destroyed() {

        },

        mounted() {

        },
        computed: {},
        methods: {
          async getTerListClassJW(){
            this.$store.commit('fullLoadingFun',true);
            const crs = await getTerListClassJW({
              StoresID:localStorage.getItem("storesid"),
              TeacherID:localStorage.getItem("teacherID"),
              RowClassType:this.active,
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
          tokebiao(id){
            this.$router.push({path: '/kebiao',query:{id:id}})
          },
          tobanjixueyuan(id){
            this.$router.push({path: '/banjixueyuan',query:{id:id}})
          }
        }
    }

</script>

<style lang="less" scoped>
.themeColor{
  color: #4aa1ec;
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
