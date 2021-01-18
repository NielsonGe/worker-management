<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked()">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('views.team-list.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <right-menu />
    <ion-content :fullscreen="true">

      <ion-list>
        <ion-item class="cell" lines="full" v-for="item in teamList" :key="item.id" @click="onTeamCellClicked(item.id)">
          <ion-grid>
            <ion-row>
              <ion-col size="10">
                {{ item.name }}
              </ion-col>
              <ion-col size="2">
                <i class="icon ion-compose"></i>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="9">
                {{ $t('views.team-list.belong')}}
                {{ item.companyName }}
              </ion-col>
              <ion-col size="3" class="right">
                {{ item.type }}
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
  name: 'TeamListView',
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
    RightMenu,

  },
  data() {
    return {
      teamList: [
        {id:"41a2b43f-4720-11eb-992c-0242ac110002",name:"设备班组",companyName:"大顺建筑设备有限公司",type:"设备分包",companyId:"1"},
        {id:"6865333a-4720-11eb-992c-0242ac110002",name:"设备班组",companyName:"大顺建筑设备有限公司",type:"设备分包",companyId:"1"},
        {id:"6fcd0fcd-4721-11eb-992c-0242ac110002",name:"设备班组",companyName:"大顺建筑设备有限公司",type:"设备分包",companyId:"1"}
      ] as any,
      store: useStore(),
      
    }
  },
  ionViewWillEnter() {
    ScgApi().queryTeamList({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:100}).then(res=>{
      this.teamList = res.data.rows;
    }).catch((err) => {
      // this.$router.replace('/login');
    })
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

    getStatusColor(status: number) {
      switch(status) {
        case 0: return 'red';
        case 1: return 'black';
        default: return 'black';
      }
    },
    getCareerTypeName(type: string): string {
      switch(type) {
        case '0': return this.$t('global.career-type-0');
        case '1': return this.$t('global.career-type-1');
        case '2': return this.$t('global.career-type-2');
        case '3': return this.$t('global.career-type-3');
        default: return this.$t('global.career-type-unknown');
      }
    },
    getWorkerStatusName(status: number): string {
      switch(status) {
        case 0: return this.$t('global.worker-status-0');
        case 1: return this.$t('global.worker-status-1');
        default: return this.$t('global.worker-status-unknown');
      }
    },
    onBackClicked() {
      this.$router.replace('/main/home');
    },
    onTeamCellClicked(id: string) {
      this.$router.push({path: '/team-info', query: {id: id}});
    },
    
  }
});
</script>

<style scoped>
ion-content {
  --background: #f3f4f6;
}

ion-item {
  --min-height: 70px;
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
</style>