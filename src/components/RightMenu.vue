<template>
  <div>
    <ion-icon class="rightmenu" name="menu-outline"  @click="openFirst"></ion-icon>
  </div>
  <div :class="showmask"  @click="closeFirst"></div>
  <div  :class="showmenu" >  
    <ion-content>
      <div class="closemenu" @click="closeFirst">X</div>
      <ion-list class="menutoppadding">
        <div class="menuitem">{{ $t('views.menu.changepwd') }}</div>
        <div class="menuitem" @click="logOut">{{ $t('views.menu.logout') }}</div>
      </ion-list>
    </ion-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonIcon, IonItem, IonList, IonContent } from '@ionic/vue';
import { useStore } from 'vuex';
// import { homeOutline, createOutline, starOutline } from 'ionicons/icons';

export default defineComponent ({
   name: 'RightMenu',
   components: {
     IonIcon,
    //  IonItem,
     IonList,
     IonContent
   },
   data() {
    return {
      showmenu : "rightmenubody",
      showmask : "masklayer",
      store: useStore(),
    }
  },

  
ionViewDidEnter(){
        this.showmenu = "rightmenubody";
        this.showmask = "masklayer";
  },

  methods: { 

     openFirst() {
        this.showmask = "masklayer show";
        this.showmenu = "rightmenubody show";

    },
    closeFirst() {
       
        this.showmenu = "rightmenubody";
        this.showmask = "masklayer";
    },

    logOut() {
      const param = {
        // 'userName': this.username,
        // 'password': encryptPassword,
        // 'codeKey': this.verifyCodeKey,
        // 'code': this.verifyCode
      }

      // ScgApi().logoutSystem(param).then(response => {
        this.store.dispatch('setToken', null);
        localStorage.setItem('token', "");
this.closeFirst();
        this.$router.replace("/login");
      // }).catch(error => {
      //   console.log(error);
      // })
    }
  }
});
</script>

<style scoped>
.menutoppadding {

  padding-top: 40px;

}

.menuitem{
  margin: 30px;
  width: 200px;
}

.rightmenu{
  position: absolute;
  right: 10px;
  top:14px;
  font-size: 30px;
  z-index: 99;
}


.rightmenubody{
  width: 0;
  position: fixed;
  z-index: 999;
  right: 0;
  /* width: 60%; */
  height: 100vh;
  background-color: #fff;
  transition: width 1s;
}

.rightmenubody.show{
  width: 80%;
  transition: width 1s;
}

.rightmenubody .list-md{
   height: auto;
}

.closemenu{
  font-size: 30px;
  width: 50px;
  height: 50px;
  margin-left:250px;
  margin-top:20px;
  color: #000;
  z-index: 101;
}

.masklayer{
  display:none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0,0 , 0.3);
  z-index: 90;
}

.masklayer.show{
  display: block;
}



</style>