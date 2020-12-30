<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <div class="title">{{ $t('views.login.title') }}</div>

      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical left-padding" size="3">
              {{ $t('views.login.username') }}
            </ion-col>
            <ion-col class="right-align right-padding" size="9">
              <ion-input class="input-cell name" :placeholder="$t('views.login.username-placeholder')" v-model="username" defaultValue="username"></ion-input>
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
            <ion-col class="right-align right-padding" size="9">
              <ion-input class="input-cell pwd" :type="showpwd" :placeholder="$t('views.login.password-placeholder')" v-model="password" defaultValue="password" ></ion-input>
            <i class="icon ion-eye-disabled show" @click="showpwdmd('text')"></i>
            <i class="icon ion-eye"  @click="showpwdmd('password')"></i>
            </ion-col>          
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical left-padding" size="3">
              {{ $t('views.login.verify-code') }}
            </ion-col>
            <ion-col class="right-align" size="5">
              <ion-input class="input-cell" :placeholder="$t('views.login.verify-code-placeholder')" v-model="verifyCode"></ion-input>
            </ion-col>
            <ion-col class="left-align center-vertical right-padding" size="4" @click="refreshVerifyCode">
              <img class="verifycodediv" style="width:100%, height:100%" :src="verifyCodeData" />
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
import JSEncrypt from 'jsencrypt';

//import PhotoFakeData from '@/data/PhotoFakeData';
//import { XFUtils } from '@/utils/XFUtils';

export default defineComponent({
  name: 'LoginView',
  components: {
    IonPage,
    IonContent,
    IonInput,
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
      showpwd: 'password'
    }
  },
  mounted() {
    this.store.dispatch('setToken', null);
    this.store.dispatch('setAccount', null);

    this.getRsaPublickKey();
    this.loadVerifyCode();
  },
  methods: {
    getRsaPublickKey(): void {
      ScgApi().getRsaPublicKey().then(response => {
        this.rsaPublicKey = '-----BEGIN PUBLIC KEY-----' + response.data.rsaPublicKey + '-----END PUBLIC KEY-----';
      }).catch(error => {
        console.log(error);
      })
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

      const jsEncrypt = new JSEncrypt({});
      jsEncrypt.setPublicKey(this.rsaPublicKey);
      const encryptPassword = jsEncrypt.encrypt(this.password);

      const param = {
        'userName': this.username,
        'password': encryptPassword,
        'codeKey': this.verifyCodeKey,
        'code': this.verifyCode
      }

      ScgApi().loginSystem(param).then(response => {
        this.store.dispatch('setToken', response.data.access_token);
        localStorage.setItem('token',response.data.access_token);
        ScgApi().getCurrentUserInfo().then(response => {
          console.log(response);

          const account = response.data;
          this.store.dispatch('setAccount', account);

          this.$router.replace("/project-list");
        }).catch(error => {
          console.log(error);
        })
      }).catch(error => {
        console.log(error);
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
   top:8px;
   right: 10px;
   color: #666;
}

.icon.show{
  display: block;
}

.verifycodediv{
  height: 6.5vh;
}

.field-col-item .input-cell.pwd{
  width:86%;
}
</style>