<template>
  <div class="banjiList">
    <div class="searchBox" v-if="isadmin == 1">
      <div class="info">
        <van-cell-group>
          <van-field v-model="SKtime1" label="开始时间" placeholder="" @focus="show = true" readonly/>
          <van-field v-model="SKtime2" label="结束时间" placeholder="" @focus="show2 = true" readonly/>
        </van-cell-group>
        <van-dropdown-menu active-color="#1989fa" v-if="isTeacher == 0">
          <van-dropdown-item v-model="TeacherID" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="sButton" @click="getListsumPayroll">
        搜索
      </div>

    </div>
    <div class="banjiListItem" v-for="(item,index) in banjilist" v-if="isadmin == 0">
      <div><span class="title">发薪日：</span><span class="">{{item.Payday}}</span></div>
      <div><span class="title">底薪：</span><span class="">{{item.BaseSalary}}</span></div>
      <div  v-if="Ison == 0"><span class="title">提成：</span><span class="">{{item.Commission}}</span></div>
      <div v-if="Ison == 1"><span class="title">课程提成：</span><span class="">{{item.kcCommission}}</span></div>
      <div v-if="Ison == 1"><span class="title">人数提成：</span><span class="">{{item.rsCommission}}</span></div>
      <div v-if="Ison == 1"><span class="title">续费提成：</span><span class="">{{item.xfCommission}}</span></div>
      <div v-if="Ison == 1"><span class="title">物品提成：</span><span class="">{{item.wpCommission}}</span></div>
      <div v-if="Ison == 1"><span class="title">其他提成：</span><span class="">{{item.qtCommission}}</span></div>
      <div><span class="title">奖金：</span><span class="">{{item.Bonus}}</span></div>
      <div><span class="title">扣款：</span><span class="">{{item.Deductions}}</span></div>
      <div><span class="title">合计：</span><span class="">{{item.totalAmount}}</span></div>
      <!--      <div class="buttonBox">-->
      <!--        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>-->
      <!--        <span class="themeColor" v-else >未点名</span>-->
      <!--      </div>-->
    </div>
    <div class="banjiListItem" v-for="(item,index) in banjilist" v-if="isadmin == 1">
      <div><span class="title">老师姓名：</span><span class="">{{item.Name}}</span></div>
      <div><span class="title">手机号：</span><span class="">{{item.Phone}}</span></div>
      <div><span class="title">底薪合计：</span><span class="">{{item.sumBaseSalary}}</span></div>
      <div v-if="Ison == 0"><span class="title" >提成合计：</span><span class="">{{item.sumCommission}}</span></div>
      <div  v-if="Ison == 1"><span class="title">课程提成合计：</span><span class="">{{item.sumkcCommission}}</span></div>
      <div  v-if="Ison == 1"><span class="title">人数提成合计：</span><span class="">{{item.sumrsCommission}}</span></div>
      <div  v-if="Ison == 1"><span class="title">续费提成合计：</span><span class="">{{item.sumxfCommission}}</span></div>
      <div  v-if="Ison == 1"><span class="title">物品提成合计：</span><span class="">{{item.sumwpCommission}}</span></div>
      <div v-if="Ison == 1"><span class="title" >其他提成合计：</span><span class="">{{item.sumqtCommission}}</span></div>
      <div><span class="title">奖金合计：</span><span class="">{{item.sumBonus}}</span></div>
      <div><span class="title">扣款合计：</span><span class="">{{item.sumDeductions}}</span></div>
      <div><span class="title">总合计：</span><span class="">{{item.sumtotalAmount}}</span></div>
      <!--      <div class="buttonBox">-->
      <!--        <span class="green" v-if="item.PreAboutCount == 0">已点名</span>-->
      <!--        <span class="themeColor" v-else >未点名</span>-->
      <!--      </div>-->
    </div>
    <van-action-sheet v-model="show" :close-on-click-overlay="false">
      <div class="content">
        <van-datetime-picker
          v-model="SKtime1text"
          type="date"
          title="选择开始日期"
          @confirm="changeSKtime1"
          @cancel="show = false"
        />
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="show2" :close-on-click-overlay="false">
      <div class="content">
        <van-datetime-picker
          v-model="SKtime2text"
          type="date"
          title="选择结束日期"
          @confirm="changeSKtime2"
          @cancel="show2 = false"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
  import { getListsumPayroll,getListTeacher,getwxlistCourse ,getTerlistPayroll} from "@/api/getData";

  export default {
    components: {},
    data() {
      return {
        isTeacher:localStorage.getItem('isTeacher'),
        isadmin:localStorage.getItem('isadmin'),
        active:0,
        banjilist:[],
        SKtime1:'',
        SKtime2:'',
        SKtime1text:'',
        SKtime2text:'',
        show:false,
        show2:false,
        TeacherID:0,
        CourseID:0,
        option1:[],
        option2:[],
        Ison:0,
      }
    },

    created() {
      var nowDate = new Date();
      var cloneNowDate = new Date();
      var fullYear = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
      var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
      function getFullDate(targetDate) {
        var D, y, m, d;
        if (targetDate) {
          D = new Date(targetDate);
          y = D.getFullYear();
          m = D.getMonth() + 1;
          d = D.getDate();
        } else {
          y = fullYear;
          m = month;
          d = date;
        }
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;
        return y + '-' + m + '-' + d;
      };
      this.SKtime2 = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
      this.SKtime1 = getFullDate(cloneNowDate.setDate(1));//当月第一天

      function getCurrentMonthFirst(){
        var date=new Date();
        date.setDate(1);
        return date;
      }
      // 获取当前月的最后一天
      function getCurrentMonthLast(){
        var date=new Date();
        var currentMonth=date.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
        var oneDay=1000*60*60*24;
        return new Date(nextMonthFirstDay-oneDay);
      }
      this.SKtime1text= getCurrentMonthFirst();
      this.SKtime2text=getCurrentMonthLast();
      if(this.isadmin == '1'){
        this.getListsumPayroll();
        this.getListTeacher();
        this.getwxlistCourse();
      }else {
       this.getTerlistPayroll();
      }
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {
      changeSKtime1(){
        let year = this.SKtime1text.getFullYear();
        let month = this.SKtime1text.getMonth()+1;
        if(month< 10){
          month = '0'+ month
        }
        let day = this.SKtime1text.getDate();
        if(day< 10){
          day = '0'+ day
        }
        this.SKtime1 = year+"-"+month+"-"+day;
        this.show = false;
      },
      changeSKtime2(){
        let year = this.SKtime2text.getFullYear();
        let month = this.SKtime2text.getMonth()+1;
        if(month< 10){
          month = '0'+ month
        }
        let day = this.SKtime2text.getDate();
        if(day< 10){
          day = '0'+ day
        }
        this.SKtime2 = year+"-"+month+"-"+day;

        this.show2 = false;
      },

      async getTerlistPayroll(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTerlistPayroll({
          StoresID:localStorage.getItem("storesid"),
          // TeacherID:localStorage.getItem("teacherID"),
          TeacherID:localStorage.getItem("teacherID"),
          pages:1,
          psize:999,
        })
        if(crs.orsuccess=='1'){
          this.banjilist = crs.data;
          this.Ison = crs.Ison;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      async getListsumPayroll(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListsumPayroll({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:this.TeacherID,
          sPayday:this.SKtime1,
          ePayday:this.SKtime2,
          pages:1,
          psize:999,
        })
        if(crs.orsuccess=='1'){
          this.banjilist = crs.data;
          this.Ison = crs.Ison;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },

      async getwxlistCourse(){
        const crs = await getwxlistCourse({
          StoresID:localStorage.getItem("storesid"),
        })
        if(crs.orsuccess=='1'){
          this.option2 = crs.data
          this.option2.forEach((item,index)=>{
            item.text = item.CourseName;
            item.value = item.ID;
          })
          let aaa = {
            text:"请选择课程",
            value: 0 ,
          }
          this.option2.unshift(aaa);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
        }

      },
      async getListTeacher(){
        const crs = await getListTeacher({
          StoresID:localStorage.getItem("storesid"),
        })
        if(crs.orsuccess=='1'){
          this.option1 = crs.data
          this.option1.forEach((item,index)=>{
            item.text = item.Name;
            item.value = item.ID;
          })
          let aaa = {
            text:"请选择老师",
            value: 0 ,
          }
          this.option1.unshift(aaa);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
        }

      },
      async getListTerCourseRowClass(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListTerCourseRowClass({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:this.TeacherID,
          CourseID:this.CourseID,
          SKtime1:this.SKtime1,
          SKtime2:this.SKtime2,
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
    .searchBox{
      .sButton{
        width: 70%;
        margin: 15px auto;
        border-radius: 20px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        text-align: center;
        vertical-align: center;
        background-color: #48aff9;
      }
    }
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
