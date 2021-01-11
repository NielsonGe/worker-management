<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked()">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('views.company-list.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <right-menu />
    <ion-content :fullscreen="true">
         <ion-grid>
        <ion-row>
          <ion-col size="11">
            <ion-input class="input-cell search-bar" @ionChange="changeValue($event)" v-model="companyName" :placeholder="$t('views.company-list.search-placeholder')" clearInput />
          </ion-col>
          <ion-col style="text-align:center;" size="3">
                 </ion-col>
        
        </ion-row>
         </ion-grid>
       
      
      <ion-list>

        <ion-item class="cell" lines="full" v-for="item in companyList" :key="item.id" @click="onCompanyCellClicked(item.id)">
          <ion-grid>
            <ion-row>
              <ion-col size="11">
                {{ item.companyName }}
              </ion-col>
              <ion-col class="leadto" size="1">
                >
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonItem, IonSearchbar, IonIcon, popoverController } from '@ionic/vue';
import { arrowBackOutline, codeOutline, funnel, search } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import NameFilterPopoverView from '@/views/NameFilterPopoverView.vue'
import CareerTypeAndGenderFilterPopoverView from '@/views/CareerTypeAndGenderFilterPopoverView.vue'
import { ScgApi } from '@/api/ScgApi';
import { useStore } from 'vuex';
import RightMenu from '@/components/RightMenu.vue';

export default defineComponent({
  name: 'CompanyListView',
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    RightMenu
  },
  data() {
    return {
      companyList: [
        {id:"1",companyName:"大顺建筑设备有限公司",type:"专业分包"},
        {id:"2",companyName:"大金劳务派遣有限公司",type:"劳务派遣"},
        {id:"3",companyName:"阿里建筑机械金融租赁有限公司",type:"设备分包"}
      ] as any,
        companyName: "",
        store:useStore(),
      
    }
  },
  ionViewWillEnter() {
    // ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50}).then(res=>{
    //   this.teamList = res.data.rows;
    // }).catch((err) => {
    //   this.$router.replace('/login');
    // })
  },
  setup() {
    const route = useRoute();

    const query = route.query;

    return {
      arrowBackOutline,
      codeOutline,
      funnel,
      search
    }
  },
  methods: {

    
    onBackClicked() {
      this.$router.replace('/main/home');
    },
    onCompanyCellClicked(id: string) {
      this.$router.push({path: '/register-team', query: {id: id}});
    },

      changeValue(event: any){
    //   this.companyName= event.detail.value;
    //        ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50,workerName:this.companyName}).then(res=>{
    //     this.companyList = res.data.rows;
    //   })
    console.log("changevalue",event)
    },
    
  },



});
</script>

<style scoped>
ion-content {
  --background: #f3f4f6;
}

ion-item {
  --min-height: 40px;
  --background: #ffffff;
  --border-color: #f3f4f6;
}

.team-name {
  color: #000000;
}


.cell-right {
  text-align: right;
}

.top {
  margin-bottom: 10px;
  font-size: 16px;
}

.search-bar {
  background-color: rgba(0,0,0,0.07);
  border-radius: 5px;
  padding-left: 10px !important;
  height: 30px !important; 
}

.cell {
  size: 15px;
  font-size:12px;
}

.right {
  text-align: right;
}

.icon.ion-compose{
  font-size:16px;
  float:right;
  color:#5AA;
}

.leadto{
    font-size: 14px;
    text-align: left;
    text-indent: 10px;
}
</style>