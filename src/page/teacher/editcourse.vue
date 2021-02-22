 
<template>
  <div  style="padding:24px;" >
   <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="right">
                     <!-- {{ruleForm}} -->

                        <el-form-item label="课程名称：" prop="CourseName">
                            <el-input v-model="ruleForm.CourseName" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item label="课程头像：" prop="HeadUrl">
                            <el-upload
                                ref="avatar"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="getFile"
                                :limit="1">
                                <img v-if="currentBaseImg" :src="currentBaseImg" class="avatar" width="50px">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <!-- <el-button size="small" icon="el-icon-upload2" type="primary" v-if="currentBaseImg != ruleForm.HeadUrl" @click="uploadImage">上传图片</el-button> -->
                        </el-form-item>
                        <!-- {{formData.img}} -->
                        <el-form-item label="轮播主图：" prop="lbimgs">
                            <!-- :before-upload="beforeUpload"  -->
                            <el-upload
                                ref="lbt"
                                class="avatar-uploader lbtAvatar"
                                action=""
                                list-type="picture-card"
                                :auto-upload="false"
                                :on-remove="handleRemove"
                                :on-change="getFileList"
                                :file-list="formData.img"
                                :limit="3">
                                <img v-if="currentBaseImg1" :src="currentBaseImg1" class="avatar" width="145" height="145">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                             </el-upload>
                             <div>最多可上传5张图片</div>
                        </el-form-item>
                        <el-form-item label="课程简介：" prop="CourseIntroduction">
                            <el-input type="textarea" v-model="ruleForm.CourseIntroduction"></el-input>
                        </el-form-item>
                        <el-form-item label="图文详情(可选)：" prop="GraphicDetails">
                        <el-input type="textarea" v-model="ruleForm.GraphicDetails"></el-input>
                         </el-form-item>
                        <el-form-item label="训练效果(可选)：" prop="TrainingEffect">
                            <el-input type="textarea" v-model="ruleForm.TrainingEffect"></el-input>
                        </el-form-item>
                        <el-form-item label="适合人群(可选)：" prop="SuitsTheCrowd">
                            <el-input type="textarea" v-model="ruleForm.SuitsTheCrowd"></el-input>
                        </el-form-item>
                        <el-form-item label="注意事项(可选)：" prop="MattersNeedingAttention">
                            <el-input type="textarea" v-model="ruleForm.MattersNeedingAttention"></el-input>
                        </el-form-item>
                    

                        <el-form-item label="难度/级别：">
                            <el-select filter v-model="ruleForm.LevelID"    >
                            <el-option v-for="item in Level" :value="item.ID" :label="item.LevelName" :key="item.index">
                            </el-option>
                        </el-select>
                        </el-form-item>

                      

                </el-form>

                 <div class="login-content">
                  <span class="login-btn" @click="submitForm">确认提交</span>
                 </div>
                     <message ref="messageChild"></message>

                
  </div>
</template>
<style>
  .login-content{
    font-size: 16px;
    width: 70%;
    margin: 40px 15%;
    float: left;
  }
.login-btn{
    background-color: #1aac1b;
    color: #fff;
    text-align: center;
    float: left;
    padding: 10px 0;
    border-radius: 14px;
    margin: 20px 0;
    width: 100%
  }
 .drawerForm{
    width:100%;
    padding:24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
}
.drawerForm .el-form-item{
    margin:0 0 24px !important;
}
.el-button--primary {
    color: #FFF;
    height: 40px;
    background-color: #1aac1b;
    border-color: #1aac1b;
}
</style>
<script>
  import { editwxCourse,WXUploadimg,getwxCourseInfo } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {

      courseID:localStorage.getItem("courseID"),
       ruleForm:{
                    StoresID:localStorage.getItem("storesid"),
                    CourseName:"",
                    HeadUrl:"",
                    lbimgs:"",
                    CourseIntroduction:"",
                    GraphicDetails:"",
                    TrainingEffect:"",
                    SuitsTheCrowd:"",
                    MattersNeedingAttention:"",
                    // ListLevel:1,
                    LevelID:"",
                },
                rules:{
                    CourseName: [{required:true, message:'请输入课程名称', trigger:'blur'}],
                    HeadUrl:[{required:true}],
                    // CourseBanner:[{required:true}],
                    CourseIntroduction: [{required:true, message:'请输入课程简介', trigger:'blur'}]
                },
                currentBaseImg:"",
                currentBaseImg2:"",
                currentBaseImg1:"",
                lbtList:[],
                formData: {
                    img: []  // 这里的必须是一个数组，才能正确回显，并且对象中要有name，url，uid
                },
                levelMin:0,
                levelMax:0,
                levelMarks:{},
                Level:[],
                levelValue:0,
                LevelData:[],

 
      };
    },
    inject:['reload'],
    created() {
        this.getwxCourseInfo();
      },
    computed: {
    },
    components:{
        message
     },
    mounted() {
      
    },
    methods: {
        async getwxCourseInfo (){
                const crs = await getwxCourseInfo(
                    {
                        CourseID:this.courseID
                    }
                   
                )
             
                if(crs.orsuccess == '1'){
                     this.ruleForm = crs.data.CourseInfo;
                    this.currentBaseImg = crs.data.CourseInfo.HeadUrl;
                    this.lbtList = crs.data.listSlideshow;
                    for (let i = 0; i < this.lbtList.length; i++) {
                        const element = this.lbtList[i];
                        this.formData.img.push({url:element.ImgUrl,uid: element.ID,status:"success"})
                    }

                        this.Level = crs.data.listLevel;
                        this.getLevelRight();
 
                    if(crs.data.CourseInfo.LevelID != ""){
                        this.getSliderIndex(crs.data.CourseInfo.LevelID)
                        //debugger
                    }else{
                        this.levelValue = 0;
                        debugger
                    }
                 }else{
                     this.$message({ type: "error", message: crs.Msg });
                }
            },
            getSliderIndex(val){
                // console.log(val)
                this.Level.forEach((item,index) =>{
                    if(item.ID == val){
                        this.levelValue = index
                        return;
                    }
                })
              //  console.log(this.levelValue)
            },
            getLevelRight(){
               // console.log(this.Level)
                const that = this;
                this.levelMin = 0;
                this.levelMax = this.Level.length-1;
                this.Level.forEach((item,index) =>{
                    item.isEdit = false;
                    this.levelMarks[index] = item.LevelName
                })
               // console.log(this.levelMarks)

                if(this.Level && this.Level.len != 0){
                    this.LevelData = this.Level;
                    this.LevelData.forEach((item,index) =>{
                        item.isEdit = false;
                    })
                }
            },
       submitForm(){

            this.editwxCourse();
       },async editwxCourse(){
             let list =[]
                this.formData.img.forEach((item,index) =>{
                    list.push(item.url)
                })
                this.ruleForm.lbimgs= list.join()
                
  
                const crs = await editwxCourse(this.ruleForm)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            },getFile(file, fileList) {
                this.getBase64(file.raw).then(res => {
                    this.currentBaseImg = res;
                    this.uploadImage();
                });
            }, getBase64(file) {
                return new Promise(function(resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        imgResult = reader.result;
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                    reader.onloadend = function() {
                        resolve(imgResult);
                    };
                });
            },
            // 上传图片
            async uploadImage(){
                const crs = await WXUploadimg({
                     TeacherID:localStorage.getItem("teacherID"),
                     StudentID:localStorage.getItem("studentID"),
                     StoresID:localStorage.getItem("storesid"),
                    imgdate:this.currentBaseImg
                })
                // debugger
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.ruleForm.HeadUrl = crs.imgFile;
                    this.$refs.avatar.clearFiles();
                }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            },
            // 顺序上传单张图片
            async uploadImage2(){
                const crs = await WXUploadimg({
                     TeacherID:localStorage.getItem("teacherID"),
                     StudentID:localStorage.getItem("studentID"),
                     StoresID:localStorage.getItem("storesid"),
                    imgdate:this.currentBaseImg2
                })
                if(crs.orsuccess == '1'){
                    this.$message({ type: "success", message: crs.Msg });
                    this.formData.img.push({url:crs.imgFile})
                }else{
                    this.$message({ type: "error", message: crs.Msg });
                }
            },
            handleRemove(file, fileList) {
                this.formData.img = fileList;
                // console.log(file, fileList);
            },
            getFileList(file) {
                this.getBase64(file.raw).then(res => {
                    this.currentBaseImg2 = res;
                    this.uploadImage2();
                });
            },
            changeSlider(val){
                this.Level.forEach((item,index) =>{
                    if(index == val){
                        this.ruleForm.LevelID = item.ID
                        return;
                    }
                })
            }
       
    }
  };
</script>
