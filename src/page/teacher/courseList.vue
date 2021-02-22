<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-12 18:40:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    
    <div style="margin-bottom:10px;margin-top:10px;;margin-left:10px;">
     <el-button  size="medium" type="primary" v-if="canAdd" @click="addMemberCradClick">添加课程</el-button>
 
    </div>
    <div class="stu-order-list stu-order-list2" v-for="items in CourseList" >
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">
          <div class="stu-order-list-right-img" v-if="items.HeadUrl != '' && items.HeadUrl!=undefined">
            <img :src="items.HeadUrl"  />
          </div>
          <div class="stu-order-list-right-img"  v-if="items.HeadUrl == '' || items.HeadUrl==undefined">

            <img src="../../assets/img/userAvatar.png">

          </div>


          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.CourseName}}</span>
            </p>
            <p>{{items.CourseIntroduction}}</p>
          </div>

          <div class="stu-order-list-right-btn isActive" v-if="canEdit" @click="toStuTeacherDetails(items)">
            <span>编辑</span>
          </div>
           <div class="stu-order-list-right-btn isActive" v-if="canDelete" @click="todel(items)">
            <span>删除</span>
          </div>
 
         </div>
      </div>
    </div>
     <el-dialog
      title="提示"
      :visible.sync="dialogdelVisible"
      width="80%"
      center
      >
       <span slot="title">
        <p>
          删除提醒
        </p>
      </span>
      <div>
            是否确定将课程删除？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogdelVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="dodel">确 认</el-button>
      </span>
    </el-dialog>
                <message ref="messageChild"></message>

   </div>
</template>
<style scoped>
.el-button--medium {
    padding: 5px 20px;
    font-size: 12px;
    border-radius: 4px;
}
.el-button--primary {
    color: #FFF;
    background-color: #1aac1b;
    border-color: #1aac1b;
}

</style>
<script>

  import { getwxlistCourse, delwxCourse } from "@/api/getData";
  import message from "@/components/message";
   export default {
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    data() {
      return {
        CourseID:"",
        CourseList:[],
        canAdd: false,
                canEdit: false,
                canDelete: false,
        dialogdelVisible:false,
        selectedStore:localStorage.getItem("storesid")

      }
    },
    components:{
       message
    },
    created() {
      this.stuGetListTeachers()
      this.getButtonPermissions();
    },
    methods: {
      
      async stuGetListTeachers(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getwxlistCourse({
          StoresID:this.selectedStore 
        })
        if(crs.orsuccess=='1'){
          this.CourseList = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      }, getButtonPermissions(){
                let PagePermission = [];
                let allPermission = localStorage.getItem('Limits').split(',');
                allPermission.forEach(element =>{
                     switch(element){
                        case '51':
                        this.canAdd = true;
                        break;
                        case '52':
                        this.canEdit = true;
                        break;
                        case '53':
                        this.canDelete = true;
                        break;
                    }
                })
            },
      toStuTeacherDetails(items){
        localStorage.setItem("courseID",items.ID)
        this.$router.push('/editcourse')
      },addMemberCradClick(){
           this.$router.push('/addcourse')
      },todel(items){
        this.CourseID= items.ID;
        this.dialogdelVisible = true;

      },dodel(){
         this.delwxCourse();
      },async delwxCourse(){
             const crs = await delwxCourse({
                     CourseID:this.CourseID
                })
                // console.log(crs)
                if(crs.orsuccess == '1'){
                    this.dialogdelVisible = false;
                     this.stuGetListTeachers();
                }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
      }
    },
  }
</script>
