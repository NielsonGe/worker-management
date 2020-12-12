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

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="8">
            <ion-searchbar class="searchbar" :placeholder="$t('views.worker-list.search-placeholder')" v-model="searchText" @ionChange="onSearchChanged()"></ion-searchbar>
          </ion-col>
          <ion-col style="text-align:center;" size="3">
            <div class="sort-text" @click="onSortClicked">{{ $t('views.worker-list.sort') }}<span><ion-icon class="sort-icon" :icon="codeOutline"></ion-icon></span></div>
          </ion-col>
          <ion-col size="1">
            <div class="sort-career-icon" @click="onFilterClicked"><ion-icon :icon="funnel"></ion-icon></div>
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
                <span :style="{'color': getStatusColor(item.status)}">{{ getWorkerStatusName(item.status) }}</span>
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
import { arrowBackOutline, codeOutline, funnel } from 'ionicons/icons';
import { getWorkerList } from '@/data/WorkerFakeData';
import { useRoute, useRouter } from 'vue-router';
import NameFilterPopoverView from '@/views/NameFilterPopoverView.vue'
import CareerTypeAndGenderFilterPopoverView from '@/views/CareerTypeAndGenderFilterPopoverView.vue'
import { ScgApi } from '@/api/ScgApi';

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
    IonSearchbar,
    IonIcon
  },
  data() {
    return {
      searchText: null,
      workerList: [],
      sort: 0,
      career: 0,
      gender: 0
    }
  },
  mounted() {
    const query = this.$route.query;
    const tmp = query.id as unknown;
    const id = tmp as string;
    ScgApi().queryProjectWorkerPaging({projectWorkerId:query.id,pageIndex:1,pageSize:500}).then(res=>{
      this.workerList = res.data.rows;
    })
    
  },
  setup() {
    const route = useRoute();

    const query = route.query;

    if (query.id == null || query.id == undefined) {
      const router = useRouter();
      router.replace('/main/home');
      return;
    }

    return {
      arrowBackOutline,
      codeOutline,
      funnel
    }
  },
  methods: {
    onSearchChanged() {
      console.log(this.searchText);
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
  border-bottom: 1px solid #f3f4f6;
  background-color: #f3f4f6;
}

.cell {
  size: 15px;
}

.right {
  text-align: right;
}

.searchbar {
  height: 30px !important; 
  padding-top: 0px !important; 
  padding-bottom: 0px !important;
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
}
</style>