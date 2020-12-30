<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked()">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('views.worker-list.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <right-menu />
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="11">
            <ion-input class="input-cell search-bar" @ionChange="changeValue($event)" v-model="searchText.workerName" :placeholder="$t('views.worker-list.search-placeholder')" clearInput />
          </ion-col>
          <!-- <ion-col style="text-align:center;" size="3">
            <div class="sort-text" @click="onSortClicked">{{ $t('views.worker-list.sort') }}<span><ion-icon class="sort-icon" :icon="codeOutline"></ion-icon></span></div>
          </ion-col> -->
          <ion-col size="1">
            <div class="sort-career-icon" @click="onSearchChanged()"><ion-icon class="noshow" :icon="search"></ion-icon></div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list>
        <ion-item class="cell" lines="full" v-for="item in workerList" :key="item.id" @click="onWokerCellClicked(item.id)">
          <ion-grid>
            <ion-row>
              <ion-col size="3">
                {{ item.workerName }}
              </ion-col>
              <ion-col size="9" class="right">
                {{ item.teamName }}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="8">
                <span :style="{'color': (item.entryDate == item.exitDate && item.entryDate == '0001-01-01 00:00:00') ? '' : getStatusColor(item.status)  }">{{ ((item.entryDate == item.exitDate) && (item.entryDate == "0001-01-01 00:00:00")) ? $t('views.worker-list.register-only') : getWorkerStatusName(item.status) }}</span>
              </ion-col>
              <ion-col size="4" class="right">
                {{ item.workTypeName }}
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
import WorkerInfo from '@/models/WorkerInfo';
import { arrowBackOutline, codeOutline, funnel, search } from 'ionicons/icons';
import { getWorkerList } from '@/data/WorkerFakeData';
import { useRoute, useRouter } from 'vue-router';
import NameFilterPopoverView from '@/views/NameFilterPopoverView.vue'
import CareerTypeAndGenderFilterPopoverView from '@/views/CareerTypeAndGenderFilterPopoverView.vue'
import { ScgApi } from '@/api/ScgApi';
import { useStore } from 'vuex';
import RightMenu from '@/components/RightMenu.vue';

export default defineComponent({
  name: 'WorkerListView',
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
      searchText: {
        workerName:""
      },
      workerList: [],
      sort: 0,
      career: 0,
      gender: 0,
      store:useStore(),
      
    }
  },
  ionViewWillEnter() {
    ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50}).then(res=>{
      this.workerList = res.data.rows;
    }).catch((err) => {
      this.$router.replace('/login');
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
    changeValue(event: any){
      this.searchText.workerName = event.detail.value;
      this.onSearchChanged();
    },
    onSearchChanged() {
      ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50,workerName:this.searchText.workerName}).then(res=>{
        this.workerList = res.data.rows;
      })
    },
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
    onWokerCellClicked(id: string) {
      this.$router.push({path: '/worker-info', query: {id: id}});
    },
    async onSortClicked(ev: Event) {
      const popover = await popoverController
        .create({
          component: NameFilterPopoverView,
          cssClass: 'pop-over-style',
          componentProps: {
            sortValue: this.sort,
            setSortValue: (event: Event) => {
              const tmp = event  as unknown;
              this.sort = tmp as number;
              console.log(this.sort);
            }
          },
          event: ev,
          translucent: true
        })
      popover.present();
    },
    async onFilterClicked(ev: Event) {
      const popover = await popoverController
        .create({
          component: CareerTypeAndGenderFilterPopoverView,
          cssClass: 'pop-over-style',
          componentProps: {
            careerTypeValue: this.career,
            setCareerTypeValue: (event: Event) => {
              const tmp = event  as unknown;
              this.career = tmp as number;
              console.log(this.sort);
            },
            genderTypeValue: this.gender,
            setGenderTypeValue: (event: Event) => {
              const tmp = event  as unknown;
              this.gender = tmp as number;
              console.log(this.sort);
            }
          },
          event: ev,
          translucent: true
        })
      popover.present();
    }
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

.worker-name {
  color: #000000;
}

.worker-status {
  font-size: 16px;
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
}

.right {
  text-align: right;
}


.sort-icon {
  transform:rotate(90deg);
  margin-top: 2px !important;
}

.sort-text {
  padding-top: 2px;
}

.sort-career-icon {
  padding-top: 5px;
  font-size: 20px;
}

.list-md-lines-full .item.cell, .list-md .cell.item-lines-full.md{
  --border-width: 0 0 3px 0 !important;
}

.noshow{
  display: none;
}
</style>