<template>
  <div class="navbarWrapper">
    <div class="topStore">
      <div class="topImg" :style="{backgroundImage: 'url(' + topInfo.HeadUrl + ')'}" v-if="topInfo.HeadUrl">
      </div>
      <div class="topImg" style="background-image: url('../../static/gztmoren.png')" v-else>
      </div>
      <div class="topInfo">
        <div class="name">{{topInfo.StoresName}}</div>
        <div class="other">有效期至：{{topInfo.DueToTime}}</div>
        <div class="other">{{topInfo.Address}}</div>
      </div>
    </div>
    <div class="numberBox" v-if="isgzt == 1">
      <div class="numList">
        <div class="numItem">
          <div class="numNumber">{{numOb.num}}</div>
          <div class="numTitle">今日新增会员</div>
        </div>
        <div class="numItem">
          <div class="numNumber">{{numOb.num2}}</div>
          <div class="numTitle">今日需上课人数</div>
        </div>
        <div class="numItem">
          <div class="numNumber">{{numOb.num3}}</div>
          <div class="numTitle">待续期人数</div>
        </div>


      </div>
    </div>
    <div class="gongBox">
      <div class="gongtitle">教务中心</div>
      <van-grid :column-num="3">
        <van-grid-item @click="toteaOrder" v-if="kebiao == 1">
          <div class="gongItem">
            <div>
              <i class="orange iconfont icon-kebiao"></i>
            </div>
            <div>课表</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="tobanji" v-if="banji == 1">
          <div class="gongItem">
            <div>
              <i class="green iconfont icon-banji"></i>
            </div>
            <div>班级管理</div>
          </div>
        </van-grid-item>
        <van-grid-item v-if="xueyuan == 1" @click="toxueshengguanli">
          <div class="gongItem">
            <div>
              <i class="pink iconfont icon-xuesheng"></i>
            </div>
            <div>学生管理</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="totongzhi">
          <div class="gongItem">
            <div>
              <i class="blue iconfont icon-tongzhi"></i>
            </div>
            <div>通知</div>
          </div>
        </van-grid-item>
        <van-grid-item v-if="xiaoketj == 1" @click="toxiaoke">
          <div class="gongItem">
            <div>
              <i class="green iconfont icon-kechengtongji"></i>
            </div>
            <div>消课统计</div>
          </div>
        </van-grid-item>
        <van-grid-item v-if="xufeitj == 1" @click="toxufeitongji">
          <div class="gongItem">
            <div>
              <i class="orange iconfont icon-xufei"></i>
            </div>
            <div>续费统计</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toshangpingxiaoshou">
          <div class="gongItem" v-if="shangpintj == 1">
            <div>
              <i class="blue iconfont icon-shangpingtongji"></i>
            </div>
            <div>商品销售统计</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="togongzimingxi">
          <div class="gongItem">
            <div>
              <i class="red iconfont icon-gongzi"></i>
            </div>
            <div>工资明细</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
<!--    <div class="gongBox">-->
<!--      <div class="gongtitle">财务统计</div>-->
<!--      <van-grid :column-num="3">-->
<!--        <van-grid-item v-if="xiaoketj == 1" @click="toxiaoke">-->
<!--          <div class="gongItem">-->
<!--            <div>-->
<!--              <i class="green iconfont icon-kechengtongji"></i>-->
<!--            </div>-->
<!--            <div>消课统计</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item v-if="xufeitj == 1" @click="toxufeitongji">-->
<!--          <div class="gongItem">-->
<!--            <div>-->
<!--              <i class="orange iconfont icon-xufei"></i>-->
<!--            </div>-->
<!--            <div>续费统计</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item @click="toshangpingxiaoshou">-->
<!--          <div class="gongItem" v-if="shangpintj == 1">-->
<!--            <div>-->
<!--              <i class="blue iconfont icon-shangpingtongji"></i>-->
<!--            </div>-->
<!--            <div>商品销售统计</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item @click="togongzimingxi">-->
<!--          <div class="gongItem">-->
<!--            <div>-->
<!--              <i class="red iconfont icon-gongzi"></i>-->
<!--            </div>-->
<!--            <div>工资明细</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->

<!--      </van-grid>-->
<!--    </div>-->
    <div style="height: 70px;"></div>
    <teacher-bottom></teacher-bottom>
  </div>
</template>

<script>
  import teacherBottom from "@/components/teacherBottom";
  import { getTerHomeInfo } from "@/api/getData";

  export default {
    components: {teacherBottom},
    data() {
      return {

        indexNum: 1,
        topInfo: {
          StoresName:'',
          DueToTime:'',
          Address:'',
          HeadUrl:'',
        },
        kebiao:0,
        xueyuan:0,
        banji:0,
        xiaoketj:0,
        xufeitj:0,
        shangpintj:0,
        isadmin:0,
        isTeacher:0,

        isgzt:false,
        numOb:{
          num:99,
          num2:6,
          num3:233,
        }
      }
    },

    created() {
      this.getTerHomeInfo();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {
      async getTerHomeInfo(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTerHomeInfo({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.topInfo ={
            StoresName:crs.StoresName,
            DueToTime:crs.DueToTime,
            Address:crs.Address,
            HeadUrl:crs.HeadUrl,
          };
          this.isgzt = crs.isgzt;
          this.kebiao = crs.kebiao;
          this.xueyuan = crs.xueyuan;
          this.banji = crs.banji;
          this.xiaoketj = crs.xiaoketj;
          this.xufeitj = crs.xufeitj;
          this.xufeitj = crs.xufeitj;
          this.shangpintj = crs.shangpintj;
          this.isadmin = crs.isadmin;
          this.isTeacher = crs.isTeacher;
          localStorage.setItem("isadmin",crs.isadmin);
          localStorage.setItem("isTeacher",crs.isTeacher);
          this.numOb = {
            num:crs.jiricount,
            num2:crs.yuyuecount,
            num3:crs.yuyuecount,
          };
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },
      toTeacher(){
        this.$router.push({path: '/teacher'})
      },
      toteaOrder(){
        this.$router.push({path: '/teaOrder2'})
      },
      tobanji(){
        this.$router.push({path: '/banjiList'})
      },
      toxueshengguanli(){
        this.$router.push({path: '/xueshengguanli'})
      },
      totongzhi(){
        this.$router.push({path: '/teaMsg'})
      },
      toxiaoke(){
        this.$router.push({path: '/xiaoketongji'})
      },
      toshangpingxiaoshou(){
        this.$router.push({path: '/shangpingxiaoshou'})
      },
      togongzimingxi(){
        this.$router.push({path: '/gongzimingxi'})
      },
      toxufeitongji(){
        this.$router.push({path: '/xufeitongji'})
      }
    }
  }

</script>

<style lang="less" scoped>
  .navbarWrapper {
    overflow-x: hidden;
    background: #f4f5f6;
    .topStore {
      height: 140px;
      padding: 20px;
      background-color: #fff;
      display: flex;

      .topImg {
        border-radius: 5px;
        background-position: 50%;
        background-size: cover;
        overflow: hidden;
        height: 100px;
        width: 100px;
      }

      .topInfo {
        padding: 5px 0;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 18px;
          font-weight: bold;
        }

        .other {
          font-size: 14px;
          color: rgb(120, 120, 120);
        }
      }
    }

    .gongBox {
      background-color: #fff;
      margin-top: 20px;

      .gongtitle {
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
      }

      .gongItem {
        padding: 5px 0;
        text-align: center;

        .iconfont {
          font-size: 32px;
        }

        .red {
          color: red;
        }

        .pink {
          color: rgb(237, 121, 121);
        }

        .blue {
          color: rgb(72, 175, 249);
        }

        .yellow {
          color: #f4ea2a;
        }

        .green {
          color: #0bb20c;
        }

        .orange {
          color: #FF8C00;
        }
      }
    }
    .numberBox{
      height: 80px;
      margin-top: 20px;
      background-color: #fff;
      .numList{

        width: auto;
        white-space:nowrap;
        .numItem{
          margin: 13px 0 15px;
          text-align: center;
          display: inline-block;
          width: 33.3VW;
          .numNumber{
            color: rgb(72, 175, 249);
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }


</style>
