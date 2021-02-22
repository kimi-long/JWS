<template>
    <div id="root">
        <div>
            <div class="ThemedWrapper-jd76ve-0 hnMLRX slide pop-enter-done">
                <div class="SignIn__SignInWrapper-u1qscc-0 jclfjH">
                    <div class="CustomSignIn__SignInWrapper-pwygxr-1 dyqwgx orange index">
                        <div class="logoWrapper">账号登录</div>
                        <div class="CustomSignIn__InputWrapper-pwygxr-2 jfCxwd  orange index">
                            <div class="am-list-item am-input-item am-list-item-middle">
                                <div class="am-list-line">
                                    <div class="am-input-control"><input placeholder="请输入账号" maxlength="11" type="text"
                                                                         v-model="Phone"></div>
                                </div>
                            </div>
                        </div>
                        <div class="CustomSignIn__InputWrapper-pwygxr-2 jfCxwd smsCode orange index">
                            <div class="am-list-item am-input-item am-list-item-middle am-input-focus am-input-android">
                                <div class="am-list-line">
                                    <div class="am-input-control"><input placeholder="请输入密码" maxlength="6" type="text"
                                                                         v-model="code"></div>
<!--                                    <div class="am-input-extra"><span-->
<!--                                        class="CustomSignIn__Span-pwygxr-0 fkReTG orange index"><input type="button"-->
<!--                                                                                                       id="btn"-->
<!--                                                                                                       value="发送验证码"-->
<!--                                                                                                       @click="clickCode($event)"/></span>-->
<!--                                    </div>-->
                                </div>
                            </div>
                        </div>
                        <button role="button" @click="clickdenglu"
                                class="am-button btn1 CustomButton__InnerButton-sc-1u03hwt-1 kmYrUL orange index radius am-button-small">
                            <span class="inner"><span class="myicon"></span>登录</span></button>
                    </div>
                </div>
            </div>
        </div>
      <message ref="messageChild"></message>
    </div>
</template>

<script>
  import { teacherbinding,teacherLogin,StudentLoginNew } from "@/api/getData";
  import message from "@/components/message";
    import { getLocal,getStore,setStore } from '@/config/mUtils';
    // import {send_verify,Stubinding} from  '../api/getData'
    export default {
        components: {message},
        data() {
            return {
                Phone:'',
                code:'',
                countdown2:2,
                countdown:60,
            }
        },

        created() {
        },

        destroyed() {

        },

        mounted() {

        },
        computed: {},
        methods: {
            async send_verify() {
                // debugger;
                //this.loading = true;
                var  re = /^1\d{10}$/;
                if (re.test(this.Phone)) {
                    const crs = await send_verify({
                        code:2,
                        Phone:this.Phone,
                        StoresID:getStore('storesid'),
                    })
                    if(crs.orsuccess == "1"){
                        this.$message({
                            message: '发送成功',
                            type: 'success',
                            duration: 2000
                        });
                    }else {
                        this.$message({
                            message: crs.Msg,
                            type: 'error',
                            duration: 2000
                        });
                    }
                }else {
                    this.$message({
                        message: '请输入正确手机号码',
                        type: 'error',
                        duration: 2000
                    });
                }



            },
            async teacherbinding() {
              this.$store.commit('fullLoadingFun',true);


              const crs = await teacherbinding({
                openid:localStorage.getItem('Openid'),
                wx_name:localStorage.getItem('wx_name'),
                wx_topimg:localStorage.getItem('wx_topimg'),
                Phone:this.Phone,
                Code:'',
                password:this.code,
                isCode:'1',
                StoresID:localStorage.getItem("storesid"),
                isLogin:'1'
              })
              // debugger
              if(crs.orsuccess=='1'){
                // debugger

                  //this.teacherLogins()
                  setStore("token", crs.token);
                  localStorage.setItem("teacherID", crs.teacherID);
                  this.$router.push('/teaOrder')

                this.$store.commit('fullLoadingFun',false);
              }else{
                this.$refs.messageChild.toast(crs.Msg)
                this.$store.commit('fullLoadingFun',false);
              }
            },

            clickCode(obj){
                this.send_verify();
                this.settime(obj);
            },
            clickdenglu(){

              if(this.Phone==''){
                this.$refs.messageChild.toast('请输入手机号');
                return;
              }else if(this.code==''){
                this.$refs.messageChild.toast('请输入密码');
                return;
              }else {
                this.teacherbinding();
              }


            },
            settime2(obj) {
                if (this.countdown2 == 0) {
                    obj.target.removeAttribute("disabled");
                    obj.target.setAttribute("class", 'am-button  btn1 CustomButton__InnerButton-sc-1u03hwt-1 kmYrUL orange index radius am-button-small');
                    this.countdown2 = 5;
                    return;
                } else {
                    obj.target.setAttribute("disabled", true);
                    obj.target.setAttribute("class", 'am-button am-button-disabled btn1 CustomButton__InnerButton-sc-1u03hwt-1 kmYrUL orange index radius am-button-small');
                    obj.value = "登录中";
                    this.countdown2--;
                }
                this.trunsettime2(obj);

            },
            trunsettime2(obj){
                let _this = this;
                setTimeout(function () {
                        _this.settime2(obj)
                    }
                    , 1000)
            },
            settime(obj) {
                    if (this.countdown == 0) {
                        obj.target.removeAttribute("disabled");
                        obj.target.value = "发送验证码";
                        this.countdown = 60;
                        return;
                    } else {
                        obj.target.setAttribute("disabled", true);
                        obj.target.value = "重新发送(" + this.countdown + ")";
                        this.countdown--;
                    }
                this.trunsettime(obj);
            },
            trunsettime(obj){
                let _this = this;
                setTimeout(function () {
                        _this.settime(obj)
                    }
                    , 1000)
            },
        }
    }

</script>

<style lang="less" scoped>
#root{
margin-top: -50px;
}
</style>
