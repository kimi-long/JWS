 
<template>
  <div  style="padding:24px;" >
   <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="right">
                    <el-form-item label="门店：" prop="StoresID">
                        <el-radio-group v-model="ruleForm.StoresID">
                            <el-radio v-for="item in storeList" :label="item.ID" :key="item.index">
                                {{item.StoresName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="会员卡名称：" prop="CardName">
                        <el-input v-model="ruleForm.CardName" placeholder="请输入会员卡名称" style="width:200px;"></el-input>
                    </el-form-item>
                     <el-form-item label="售卖价格：" prop="SellingPrice" >
                        <el-input v-model="ruleForm.SellingPrice" placeholder="售卖价格" style="width:100px;"></el-input> 元
                    </el-form-item>
                    <el-form-item label="备注信息：" prop="Note">
                       <el-input type="textarea" style="width:200px;" v-model="ruleForm.Note"></el-input>
                    </el-form-item>
                    <el-form-item label="会员卡类型：" prop="CardType" >
                 
                         <el-select   v-model="ruleForm.CardType"   @change="changeOptions" >
                            <el-option v-for="item in CardTypeList" :value="item.ID" :label="item.TypeName" :key="item.index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可用次数："  v-if="showKynumber" prop="Kynumber" >
                        <el-input v-model="ruleForm.Kynumber" placeholder="可用次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="有效天数："  v-if="showyxdays"  prop="yxdays" >
                        <el-input v-model="ruleForm.yxdays" placeholder="有效天数" style="width:100px;"></el-input> 天
                    </el-form-item>
                    <el-form-item label="充值金额："  v-if="showAmount" prop="Amount" >
                        <el-input v-model="ruleForm.Amount" placeholder="充值金额" style="width:100px;"></el-input> 元
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
  import { stuGetListStoresName,editwxMemberCard,getwxMemberCard } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        isEdit:true,
        showKynumber:true,
        showyxdays:true,
        showAmount:false,
        storeList:[],
        CardTypeList:[],
                CardTypeList:[
                    {
                        ID:"1",
                        TypeName:"次卡（有期限）"
                    },
                    {
                        ID:"2",
                        TypeName:"次卡（无限期）"
                    },
                    {
                        ID:"3",
                        TypeName:"期限卡（不限次数）"
                    },
                    {
                        ID:"4",
                        TypeName:"储蓄卡（无限期）"
                    },
                ],
        ruleForm:{
                    MemberCardID: "",
                    StoresID: "",
                    CardName: "",
                    SellingPrice: "0",
                    Note: "",
                    CardType: "1",
                    Kynumber: "0",
                    yxdays: "0",
                    Amount: "0"
                },
                rules:{
                    CardName: [{required: true, message:'请输入会员卡名称', trigger: 'blur' }],


                },
                CardID:localStorage.getItem("CardID")
 
      };
    },
    inject:['reload'],
    created() {
        this.stuGetListStoresNames();
     },
    computed: {
    },
    components:{
        message
     },
    mounted() {
      
    },
    methods: {
        async stuGetListStoresNames(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await stuGetListStoresName({
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
          this.storeList = crs.data;
          this.getwxMemberCard();

          }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },async getwxMemberCard(){
          const crs = await getwxMemberCard({
                    MemberCardID:this.CardID
                })
            
                if(crs.orsuccess == '1'){
                if(crs.data.CardType  =='1'){
                this.showKynumber= true;
                this.showyxdays=true;
                this.showAmount=false;

                }else if(crs.data.CardType  =='2'){
                this.showKynumber= true;
                this.showyxdays=false;
                this.showAmount= false;

                }else if(crs.data.CardType  =='3'){
                this.showKynumber= false;
                this.showyxdays= true;
                this.showAmount=false;

                }else if(crs.data.CardType  =='4'){

                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount= true;
                }
                
                this.ruleForm = crs.data;
                          this.$store.commit('fullLoadingFun',false);

                }else{
                    this.$message({ type: "error", message: crs.Msg });
                              this.$store.commit('fullLoadingFun',false);

                }

      },changeOptions(val){
                console.log(val)
                if(val ==1){
                this.showKynumber= true;
                this.showyxdays=true;
                this.showAmount=false;

                }else if(val ==2){
                this.showKynumber= true;
                this.showyxdays=false;
                this.showAmount= false;

                }else if(val ==3){
                this.showKynumber= false;
                this.showyxdays= true;
                this.showAmount=false;

                }else if(val ==4){

                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount= true;
                }

            },
       submitForm(){

            this.editwxMemberCard();
       },async editwxMemberCard(){
                this.ruleForm.MemberCardID = this.CardID;

                if(this.ruleForm.CardType  =='1'){
    
                this.ruleForm.Amount='0';

                }else if(this.ruleForm.CardType  =='2'){
                this.ruleForm.yxdays='0';
                this.ruleForm.Amount='0';

                }else if(this.ruleForm.CardType  =='3'){
                this.ruleForm.Kynumber='0';
                this.ruleForm.Amount='0';

                }else if(this.ruleForm.CardType  =='4'){

                this.ruleForm.Kynumber='0';
                this.ruleForm.yxdays='0';
                }
                const crs = await editwxMemberCard(this.ruleForm)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            }
       
    }
  };
</script>
