<template>
        <div class="navbarWrapper">
          <div class="am-tab-bar">
            <div class="am-tabs am-tabs-horizontal am-tabs-bottom">
              <div class="am-tabs-content-wrap" style="position: relative;">
                <div class="am-tabs-pane-wrap am-tabs-pane-wrap-active" role="tabpanel"
                     aria-hidden="false" aria-labelledby="m-tabs-0-4">
                  <div class="am-tab-bar-item">
                    <div class="MeShow__CustomUserCard-sc-12oovfw-0 lkKGrF">
                      <section class="user" >
                        <!--                                                <img v-if="numberInfo.HeadUrl !=''"-->
                        <!--                                                     :src="numberInfo.HeadUrl"-->
                        <!--                                                     style="visibility: visible;">-->
                        <img src="../../static/moren.png" v-if="ruleFrom.HeadUrl == ''">
                        <img :src="ruleFrom.HeadUrl" v-else>
                        <div class="text" style="justify-content: center !important;">
                          <div class="name-wrapper">
                            <span class="oneLine name fontBold">{{ruleFrom.Name}}</span>
                          </div>

                        </div>
                      </section>

                    </div>
                    <div class="MeShow__RowWrapper-sc-12oovfw-1 bhafBR first"
                         @click="showchangP">
                      <div><i class="iconfont icon-mima"></i><span
                        class="content">修改密码</span></div>
                      <div><i class="icon am-icon arrow am-icon-arrow-right"></i></div>
                    </div>
                    <div class="MeShow__RowWrapper-sc-12oovfw-1 bhafBR" @click="tofeedback">
                      <div><i class="iconfont icon-xinxi"></i><span
                        class="content">消息</span></div>
                      <div><i class="icon am-icon arrow am-icon-arrow-right"></i></div>
                    </div>

                    <div class="tuichuClass" @click="tuichu">退出登录</div>
<!--                    <div class="MeShow__RowWrapper-sc-12oovfw-1 bhafBR" @click="toQA">-->
<!--                      <div><i class="iconfont icon-star"></i><span class="content">评价</span>-->
<!--                      </div>-->
<!--                      <div><i class="icon am-icon arrow am-icon-arrow-right"></i></div>-->
<!--                    </div>-->
                    <!--                                        <div class="MeShow__RowWrapper-sc-12oovfw-1 bhafBR first" @click="tosetting">-->
                    <!--                                            <div><i class="icon am-icon icon am-icon-new-setting"></i><span-->
                    <!--                                                class="content">设置</span></div>-->
                    <!--                                            <div><i class="icon am-icon arrow am-icon-arrow-right"></i></div>-->
                    <!--                                        </div>-->
                    <div class="MeShow__Tip-sc-12oovfw-2 cUhhBH">
                      <div class="EmptyHolder__BottomLineWrapper-k5v4ua-2 bnWMth"><span><span
                        class="bingcao-text"><span class="color-font">锡宝助教</span>
                                                        提供技术支持</span></span></div>
                    </div>
                  </div>
                </div>
              </div>
              <teacher-bottom></teacher-bottom>
              <!--                            <div class="am-tabs-tab-bar-wrap">-->
              <!--                                <div class="am-tab-bar-bar bottom" >-->
              <!--                                    <div class="am-tab-bar-tab" onclick="javascript:window.location.href='index.html'">-->
              <!--                                        <div class="am-tab-bar-tab-icon" >-->
              <!--                                            <div class="IndexNavBar__BadgeWrapper-zp8p8u-1 fXTpFr"><i-->
              <!--                                                class="icon am-icon am-icon-homepage am-icon-s"></i></div>-->
              <!--                                        </div>-->
              <!--                                        <p class="am-tab-bar-tab-title" >首页</p>-->
              <!--                                    </div>-->
              <!--                                    <div class="am-tab-bar-tab" onclick="javascript:window.location.href='calendar.html'">-->
              <!--                                        <div class="am-tab-bar-tab-icon" >-->
              <!--                                            <div class="IndexNavBar__BadgeWrapper-zp8p8u-1 fXTpFr"><i-->
              <!--                                                class="icon am-icon am-icon-timetable am-icon-s"></i></div>-->
              <!--                                        </div>-->
              <!--                                        <p class="am-tab-bar-tab-title" >课表</p>-->
              <!--                                    </div>-->
              <!--                                    <div class="am-tab-bar-tab" onclick="javascript:window.location.href='yuyue.html'">-->
              <!--                                        <div class="am-tab-bar-tab-icon">-->
              <!--                                            <div class="IndexNavBar__BadgeWrapper-zp8p8u-1 fXTpFr"><i-->
              <!--                                                class="icon am-icon am-icon-appointment am-icon-s"></i></div>-->
              <!--                                        </div>-->
              <!--                                        <p class="am-tab-bar-tab-title">预约</p>-->
              <!--                                    </div>-->
              <!--                                    <div class="am-tab-bar-tab current" onclick="javascript:window.location.href='my.html'">-->
              <!--                                        <div class="am-tab-bar-tab-icon">-->
              <!--                                            <div class="IndexNavBar__BadgeWrapper-zp8p8u-1 fXTpFr"><i-->
              <!--                                                class="icon am-icon am-icon-me am-icon-s"></i></div>-->
              <!--                                        </div>-->
              <!--                                        <p class="am-tab-bar-tab-title">我的</p>-->
              <!--                                    </div>-->
              <!--                                </div>-->
              <!--                            </div>-->
            </div>
          </div>
          <div class="am-modal-mask" v-if="dialogVisible" id="modnicbox">
            <div class="am-modal-wrap " role="dialog" aria-labelledby="姓名">
              <div role="document" class="am-modal am-modal-transparent">
                <div class="am-modal-content">
                  <div class="am-modal-header">
                    <div class="am-modal-title">修改密码</div>
                  </div>
                  <div class="am-modal-body">
                    <div class="am-modal-propmt-content">
                      <div>
                        <div class="am-modal-input-container">
                          <div class="am-modal-input">
                            <label>
                              <input type="text" placeholder="原密码" v-model="ruleForm.Pwd">
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="am-modal-input-container">
                          <div class="am-modal-input">
                            <label>
                              <input type="text" placeholder="新密码" v-model="ruleForm.newPwd">
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="am-modal-footer">
                    <div class="am-modal-button-group-h am-modal-button-group-normal" role="group"><a
                      class="am-modal-button" role="button" @click="dialogVisible = false">取消</a><a class="am-modal-button"
                                                                                               role="button" @click="modifyPwd">确定</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
<!--          <el-dialog class="changePW"-->
<!--                     title="修改密码"-->
<!--                     :visible.sync="dialogVisible"-->
<!--                     width="80%">-->
<!--            <el-form label-width="100px"  :model="ruleForm" ref="ruleForm" :rules="rules">-->
<!--              <el-form-item label="旧密码" prop="Pwd">-->
<!--                <el-input clearable type="password" v-model="ruleForm.Pwd"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="新密码" prop="newPwd" style="margin-top:25px;">-->
<!--                <el-input clearable type="password" v-model="ruleForm.newPwd"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--         <el-button size="medium" type="primary" @click="modifyPwd">修 改</el-button>-->
<!--      </span>-->
<!--          </el-dialog>-->
          <message ref="messageChild"></message>
        </div>
</template>

<script>
  import { Dialog } from 'vant';
  import message from "@/components/message";
  import teacherBottom from "@/components/teacherBottom";
  import {getStore,setStore} from '@/config/mUtils';
  import { getMyinfo,TerChangePassword } from "@/api/getData";
  export default {
    components: {teacherBottom,message},
    data() {
      return {
        indexNum: 2,
        loading:false,
        dialogVisible:false,
        numberInfo:{},
        ruleFrom:{},
        ruleForm:{
          Pwd:"",
          newPwd:""
        },
        rules:{
          Pwd:[{required: true, message:"请输入旧密码", trigger: "blur"}],
          newPwd:[{required: true, message:"请输入新密码", trigger: "blur"}]
        }
      }
    },

    created() {
      this.getMyinfos();
      // if(getStore('StudentID') == '0'){
      //     this.$router.push({path: '/login'})
      // }else {
      //     this.getStudentInfo();
      // }

    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {
      tuichu(){
        Dialog.confirm({
          title: '警告',
          message: '是否确认退出？',
        })
          .then(() => {
            this.$router.push('/login')
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      },
      showchangP(){
        this.ruleForm = {
          Pwd:"",
            newPwd:""
        };
        this.dialogVisible = true;
      },
      async getMyinfos(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getMyinfo({
          TeacherID:localStorage.getItem("teacherID"),
        })
        //  debugger
        if(crs.orsuccess==1){
          this.ruleFrom = crs.data;
          this.isRowClass = crs.data.isRowClass;
          this.isCourse = crs.data.isCourse;
          this.isTeacher = crs.data.isTeacher;
          this.isMembers = crs.data.isMembers;
          this.isMemberCard = crs.data.isMemberCard;
          this.isMemberYJ= crs.data.isMemberYJ;
          localStorage.setItem("teacherName", crs.data.Name);
          localStorage.setItem("Limits", crs.data.Limits);
          localStorage.setItem("khIson", crs.data.khIson);

          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      modifyPwd(){
        if(this.ruleForm.Pwd == '' || this.ruleForm.newPwd == ''){
          this.$refs.messageChild.toast('请输入密码')
        }else {
          this.changePassword();
        }

      },
      async changePassword(){
        const res = await TerChangePassword({
          TeacherID:localStorage.getItem("teacherID"),
          Pwd:this.ruleForm.Pwd,
          newPwd:this.ruleForm.newPwd
        })
        if(res.orsuccess == "1"){
          this.dialogVisible=false;
          this.ruleForm.Pwd="";
          this.ruleForm.newPwd="";
          this.$refs.messageChild.toast(res.Msg)
        }else{
          this.$refs.messageChild.toast(res.Msg)

        }

      },
      async getToken() {
        // debugger;
        setStore('storesid',this.$route.query.storesid);
        this.loading = true;
        const crs = await getToken({
          StoresID:this.$route.query.storesid,
          openid:this.$route.query.openid,
        })
        if(crs.orsuccess == "1"){
          setStore('token',crs.token);
          setStore('StudentID',crs.StudentID);
          setStore('openid',crs.data.openid);
          setStore('wx_name',crs.data.wx_name);
          setStore('wx_topimg',crs.data.wx_topimg);
          if(getStore('StudentID') == '0'){
            this.$router.push({path: '/login'})
          }else {
            this.getStudentInfo();
          }
        }else {
          this.$message({
            message: crs.Msg,
            type: 'error',
            duration: 2000
          });
          this.$router.push({path: '/login'})
        }
      },
      async getStudentInfo() {
        // debugger;
        this.loading = true;
        const crs = await getStudentInfo({
          StudentID:getStore('StudentID'),
        })
        if(crs.orsuccess == "1"){
          this.loading = false;
          this.numberInfo = crs.data;
        }else if(crs.orsuccess =='-98'){
          this.getToken();
        }else {
          this.loading = false;
          this.$message({
            message: crs.Msg,
            type: 'error',
            duration: 2000
          });
        }

      },
      tocomment() {
        // this.$router.push({path: '/comment'})
      },
      tocard() {
        //this.$router.push({path: '/card'})
      },
      toorder() {
        // this.$router.push({path: '/order'})
      },
      toyuyue() {
        //this.$router.push({path: '/yuyue'})
      },
      toannouncements() {
        //this.$router.push({path: '/notice'})
      },
      tofeedback() {
        this.$router.push({path: '/teaMsg'})
      },

      toQA() {
        //this.$router.push({path: '/QA'})
      },
      tosetting() {
        // this.$router.push({path: '/setting'})
      },
    }
  }

</script>

<style lang="less" scoped>
.tuichuClass{
  width: 100%;
  background-color: #fff;
  text-align: center;
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: #4aa1ec;
}
</style>
