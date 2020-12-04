<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('views.project-list.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item lines="full" v-for="item in projectBriefList" :key="item.getId()" @click="onProjectCellClicked(item.getId())">
          <ion-thumbnail class="thumbnail" slot="start">
            <ion-img :src="item.getIconData()"></ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2><b>{{ item.getName() }}</b></h2>
            <p class="sub-project-info">{{ $t('views.project-list.on-site-worker-count-title') }}{{ item.getOnSiteWorkerCount() }}</p>
            <p class="sub-project-info">{{ $t('views.project-list.manager-name-title') }}{{ item.getManagerName() }}</p>
            <p class="sub-project-info">{{ $t('views.project-list.project-type-title') }}{{ getProjectTypeName(item.getType()) }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/vue';
import ProjectBriefInfo from '@/models/ProjectBriefInfo';
import { getProjectBriefList } from '@/data/ProjectFakeData';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProjectListView',
  components: {
    IonPage,
    IonContent, 
    IonHeader, 
    IonToolbar,
    IonTitle,
    IonList, 
    IonItem, 
    IonThumbnail, 
    IonImg,
    IonLabel
  },
  data() {
    return {
      store: useStore(),
      projectBriefList: new Array<ProjectBriefInfo>()
    }
  },
  mounted() {
    const account = this.store.getters.getAccount;
    
    this.projectBriefList = getProjectBriefList(account.getId());
  },
  methods: {
    getProjectTypeName(type: number): string {
      switch(type) {
        case 0: return this.$t('global.project-type-0');
        case 1: return this.$t('global.project-type-1');
        case 2: return this.$t('global.project-type-2');
        case 3: return this.$t('global.project-type-3');
        case 4: return this.$t('global.project-type-4');
        default: return this.$t('global.project-type-unknown');
      }
    },
    onProjectCellClicked(id: number) {
      this.store.dispatch('setProjectId', id);
      this.$router.replace('/main/home');
    }
  }
});
</script>

<style scoped>
ion-content {
  --background: #f3f4f6;
}

ion-item {
  --border-color: #f3f4f6
}

.item-info {
  padding-top: 0px;
}

.thumbnail {
  height: 125px;
  width: 125px;
  padding: 5px;
}

.sub-project-info {
  font-size: 0.8em;
  margin-top: 5px;
  color: #666666;
}
</style>