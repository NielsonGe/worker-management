<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <div v-if="projectenv == 'production'" class="title prod">{{ $t('views.login.title') }}</div>
      <div v-else class="title">{{ $t('views.login.title') }}</div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical left-padding" size="3">
              {{ $t('views.login.username') }}
            </ion-col>
            <ion-col class="left-align right-padding" size="9">
              <input class="input-cell name" :placeholder="$t('views.login.username-placeholder')" v-model="username"  />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical left-padding" size="3">
              {{ $t('views.login.password') }}
            </ion-col>
            <ion-col class="left-align right-padding" size="9">
              <input class="input-cell pwd" :type="showpwd" :placeholder="$t('views.login.password-placeholder')" v-model="password"  />
            <i class="icon ion-eye-disabled show" @click="showpwdmd('text')"></i>
            <i class="icon ion-eye"  @click="showpwdmd('password')"></i>
            </ion-col>          
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical left-padding yzmlabel" size="3">
              {{ $t('views.login.verify-code') }}
            </ion-col>
            <ion-col class="left-align" size="9">
              <input class="input-cell yzm" :placeholder="$t('views.login.verify-code-placeholder')" v-model="verifyCode" />
              <img class="verifycodediv" style="width:100%, height:100%" :src="verifyCodeData" @click="refreshVerifyCode" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <ion-button expand="block" @click="login()">{{ $t('views.login.login') }}</ion-button>

      <ion-backdrop v-if="backdropCount > 0" visible="false"></ion-backdrop>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonContent, IonInput, IonButton, IonBackdrop, IonGrid, IonRow, IonCol } from '@ionic/vue';
import Account from '@/models/Account';
import { LoginAccount, findAccount } from '@/data/AccountFakeData';
import { ToastUtils } from '@/utils/ToastUtils';
import { ScgApi } from '@/api/ScgApi';
import config from '@/config/config';
import JSEncrypt from 'jsencrypt';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import { base64 } from 'js-md5';
import { Base64 }  from 'js-base64';

//import PhotoFakeData from '@/data/PhotoFakeData';
//import { XFUtils } from '@/utils/XFUtils';

export default defineComponent({
  name: 'LoginView',
  components: {
    IonPage,
    IonContent,
    // IonInput,
    IonButton,
    IonBackdrop,
    IonGrid, 
    IonRow, 
    IonCol
  },
  data() {
    return {
      rsaPublicKey: '',
      username: '',
      password: '',
      verifyCodeKey: '',
      verifyCode: '',
      verifyCodeData: '',
      store: useStore(),
      backdropCount: 0,
      showpwd: 'password',
      projectenv: process.env.NODE_ENV  
    }
  },
  ionViewWillEnter() {
   console.log("lanuague===>",this.$i18n.locale);

   
 
    
    this.store.dispatch('setToken', null);
    this.store.dispatch('setAccount', null);

    this.getRsaPublickKey();
    this.loadVerifyCode();
    const query = this.$route.query;
    // console.log(query);
    if(query.from=="logout"){
      this.username="";
      this.password="";
      this.verifyCode="";
    }


  },
  methods: {
    getRsaPublickKey(): void {
      ScgApi().getRsaPublicKey().then(response => {
        this.rsaPublicKey = '-----BEGIN PUBLIC KEY-----' + response.data.rsaPublicKey + '-----END PUBLIC KEY-----';
      }).catch(error => {
        console.log(error);
      });
      this.username="";
      this.password="";
    },
    refreshVerifyCode(ev: Event) {
      this.loadVerifyCode();
    },
    loadVerifyCode() {
      ScgApi().getVerifyCode().then(response => {
        this.verifyCodeKey = response.data.codeKey;
        this.verifyCodeData = 'data:image/jpeg;base64,' + response.data.codeBase64String;
      }).catch(error => {
        console.log(error);
      })
    },
    login() {
      // FOR DEBUG
      // console.log("Username: " + this.username);
      // console.log("Password: " + this.password);

      // console.log("start identify card");
      // XFUtils().identifyIdCard(PhotoFakeData).then(response => {
      //   console.log(JSON.stringify(response.data));
      // }).catch(error => {
      //   console.log(error);
      // })

      if (this.username == '' || this.password == '' || this.verifyCode == '') {
        const errorMsg = this.$t('views.login.error1');
        ToastUtils().showError('danger', 2000, errorMsg);
        return;
      }

      const key = CryptoJS.enc.Utf8.parse(config.secretkey);
       const src = CryptoJS.enc.Utf8.parse(this.username);
       const iv = CryptoJS.enc.Utf8.parse(config.secretkey.substr(0,16));
      const uname = config.useaes ? AES.encrypt(src, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv }).toString() : this.username;
      // alert(AES.decrypt(uname,config.secretkey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8));
      // uname = config.useaes ?  Base64.encode(uname) : uname;
      // alert(uname)
      const jsEncrypt = new JSEncrypt({});
      jsEncrypt.setPublicKey(this.rsaPublicKey);
      const encryptPassword = jsEncrypt.encrypt(this.password);



      const param = {
        'userName': uname,
        // 'userName': AES.decrypt(uname,config.secretkey).toString() ,
        'password': encryptPassword,
        'codeKey': this.verifyCodeKey,
        'code': this.verifyCode
      }

      ScgApi().loginSystem(param).then(response => {
        this.store.dispatch('setToken', response.data.access_token);
        localStorage.setItem('token',response.data.access_token);
        ScgApi().getCurrentUserInfo().then(response => {
          console.log("currentuserinfo====>",response);

          const account = response.data;
          
          if(config.useaes) {
            account.userName = AES.decrypt(account.userName,key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv }).toString(CryptoJS.enc.Utf8);
            account.mobile = account.mobile ? AES.decrypt(account.mobile,key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv }).toString(CryptoJS.enc.Utf8) : "";
            account.email = account.email ? AES.decrypt(account.email,key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv }).toString(CryptoJS.enc.Utf8) :  "";           
          }
          // console.log("account====>",account);
          this.store.dispatch('setAccount', account);
alert("登录成功！")
          this.$router.replace("/project-list");
        }).catch(error => {
          console.log(error);
          const obj: any = document.querySelector(".verifycodediv");
          obj.click();
        })
      }).catch(error => {
        console.log(error);
        const obj: any = document.querySelector(".verifycodediv");
        obj.click();
      })



      // -- FOR DEBUG ONLY --
      // const loginAccount = findAccount(this.username, this.password);

      // if (loginAccount == null || loginAccount == undefined) {
      //   const errorMsg = this.$t('views.login.error2');
      //   ToastUtils().showError('danger', 2000, errorMsg);
      //   return;
      // }

      // this.store.dispatch('setAccount', loginAccount.account);
      // this.store.dispatch('setToken', loginAccount.token);
      
      // this.$router.replace("/project-list");
    },
 showpwdmd(v: string){
      this.showpwd = v;
     
      document.querySelector(".icon.show")?.classList.remove("show");
      if(v=="text"){
        document.querySelector(".icon.ion-eye")?.classList.add("show");
      }else{
        document.querySelector(".icon.ion-eye-disabled")?.classList.add("show");
      }
      
 }

  }


});
</script>

<style scoped>
ion-content {
  --background: #f3f4f6;
}

ion-item {
  --background: #ffffff;
  --border-color: #e6ecf0
}

ion-label {
  --color: #000000 !important;
}

ion-input {
  --color: #000000 !important;
}

.input-cell {
  text-align: right;
}

.title {
	padding: 140px 0 20px;
	margin-top: 50px;
	text-align: center;
	font-size: 2em;
	color: #1da1f2;
	background: url("/assets/logoicon.png") no-repeat center top;
}

.title.prod {
	padding: 140px 0 20px;
	margin-top: 50px;
	text-align: center;
	font-size: 2em;
	color: #1da1f2;
	background: url("/realnameh5/assets/logoicon.png") no-repeat center top;
}

.item {
  min-height: 28px;
}

.left-align {
  text-align: left;
}

.right-align {
  text-align: right;
}

.center-align {
  text-align: center;
}

.center-vertical {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.field-col {
  height: 50px;
  border-bottom: 1px solid #f3f4f6;
  background-color: #ffffff;
  padding-top: 5px;
}

.field-col-item {
  min-height: 50px;
  border-bottom: 1px solid #f3f4f6;
  background-color: #ffffff;
}

.left-padding {
  padding-left: 15px;
}

.right-padding {
  padding-right: 15px;
}

.icon {
  display: none;
  position: absolute;
   font-size: 26px;
   top:10px;
   right: 20px;
   color: #666;
   z-index: 99;
}

.icon.show{
  display: block;
}

.verifycodediv{
  position: absolute;
  top:15px;
  min-height: 50px;
  width: 100px;
  right:20px;
  z-index: 99;
}

.field-col-item .input-cell:focus,.field-col-item .input-cell:active,.field-col-item .input-cell{
border: none !important;
outline:none;
width: 100%;
text-align: left;
height: 40px;
}
.field-col-item .input-cell.pwd{
  border: none !important;
  width: 100%;
  padding-right:40px !important;
}

.field-col-item .input-cell.yzm{
  float:right;
  right:0px;
  line-height: 50px;
  border: none !important;
  height: 70px !important;
  padding-right:130px !important;
}

.left-align.yzm{
  max-width: 120px !important;
  margin: 0 !important;
  border: none !important;
}

.field-col-item .input-cell.name{
  padding-right: 5px !important;
  border: none !important;
}


.yzmlabel{
  margin-left: 0 !important;
  margin-right: 0 !important;
}

</style>