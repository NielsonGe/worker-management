<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked()">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ info.getName() }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-slides pager="true" :options="sliderOptions">
        <ion-slide v-for="item in bannerList" :key="item.getId()">
          <img :src="item.getImageData()" width="100%" />
        </ion-slide>
      </ion-slides>

      <ion-grid class="white-background">
        <ion-row>
          <ion-col class="ion-text-center" size="3" @click="onManageWorkerClicked(info.getId())">
            <div>
              <center>
                <ion-img class="section-icon" src="/assets/icon_nav_sz.png" />
              </center>
            </div>
            <div>
              <div class="section-name">{{ $t('views.home.manage-worker') }}</div>
            </div>
          </ion-col>
          <ion-col class="ion-text-center" size="3">
            <div>
              <center>
                <ion-img class="section-icon" src="/assets/icon_nav_kc.png" />
              </center>
            </div>
            <div>
              <div class="section-name">{{ $t('views.home.manage-attendance') }}</div>
            </div>
          </ion-col>
          <ion-col class="ion-text-center" size="3">
            <div>
              <center>
                <ion-img class="section-icon" src="/assets/icon_nav_sp.png" />
              </center>
            </div>
            <div>
              <div class="section-name">{{ $t('views.home.manage-team') }}</div>
            </div>
          </ion-col>
          <ion-col class="ion-text-center" size="3">
            <div>
              <center>
                <ion-img class="section-icon" src="/assets/icon_nav_hd.png" />
              </center>
            </div>
            <div>
              <div class="section-name">{{ $t('views.home.crop-member') }}</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="white-background section-container">
        <ion-row style="height: 42px;">
          <ion-col>
            <div class="worker-count">
              {{ $t('views.home.worker-count') }}
            </div>
          </ion-col>
        </ion-row>
        <ion-row style="height: 83px;">
          <ion-col class="ion-text-center count-cell" size="4">
            <div class="count-title">
              {{ $t('views.home.total-worker-count') }}
            </div>
            <div class="count-number count-color1">
              {{ statistic.getTotalWorkerCount() }}
            </div>
          </ion-col>
          <ion-col class="ion-text-center count-cell" size="4">
            <div class="count-title">
              {{ $t('views.home.attendance-worker-count') }}
            </div>
            <div class="count-number count-color2">
              {{ statistic.getAttendanceWorkerCount() }}
            </div>
          </ion-col>
          <ion-col class="ion-text-center count-cell" size="4">
            <div class="count-title">
              {{ $t('views.home.on-site-worker-count') }}
            </div>
            <div class="count-number count-color3">
              {{ statistic.getOnSiteWorkerCount() }}
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="news-title">
        <ion-grid>
          <ion-row>
            <ion-col size="10">
              {{ $t('views.home.latest-news') }}
            </ion-col>
            <ion-col size="1">
            </ion-col>
            <ion-col size="1">
              <ion-icon :icon="chevronForwardOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <ion-list>
        <ion-item class="announcement-cell" lines="full" v-for="item in announcementList" :key="item.id">
          <ion-thumbnail class="thumbnail" slot="start">
            <ion-img :src="item.getIconData()"></ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2><b>{{item.getTitle()}}</b></h2>
            <p class="sub-title">{{ item.getSubTitle() }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonToolbar, IonHeader, IonTitle, IonSlides, IonSlide, IonGrid, IonRow, IonCol, IonImg, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonButton, IonButtons } from '@ionic/vue';
import ProjectBanner from '@/models/ProjectBanner';
import ProjectAnnouncement from '@/models/ProjectAnnouncement';
import ProjectStatistic from '@/models/ProjectStatistic';
import ProjectInfo from '@/models/ProjectInfo';
import { getProjectStatistic, getProjectBannerList, getProjectAnnouncementList, getProjectInfo } from '@/data/ProjectFakeData';
import { useRoute, useRouter } from 'vue-router';
import { chevronForwardOutline, arrowBackOutline } from 'ionicons/icons';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    IonPage,
    IonContent,
    IonToolbar, 
    IonHeader, 
    IonTitle,
    IonSlides,
    IonSlide,
    IonGrid, 
    IonRow, 
    IonCol,
    IonImg,
    IonList,
    IonItem,
    IonThumbnail, 
    IonLabel,
    IonIcon,
    IonButton,
    IonButtons
  },
  data() {
    return {
      info: new ProjectInfo('', ''),
      bannerList: new Array<ProjectBanner>(),
      statistic: new ProjectStatistic('', 0, 0, 0),
      announcementList: new Array<ProjectAnnouncement>()
    }
  },
  mounted() {
    const s = useStore();
    const id = s.getters.getProjectId;

    console.log('Project Id: ' + id);

    this.info = getProjectInfo(id);
    this.bannerList = getProjectBannerList(id);
    this.statistic = getProjectStatistic(id);
    this.announcementList = getProjectAnnouncementList(id);
  },
  setup() {
    const sliderOptions = {
      autoplay: {
        delay: 2500
      },
      loop: true
    }

    return {
      sliderOptions,
      chevronForwardOutline,
      arrowBackOutline
    }
  },
  methods: {
    onBackClicked() {
      this.$router.replace("/project-list");
    },
    onManageWorkerClicked(id: number) {
      this.$router.replace({path: "/worker-list", query: { id: id}})
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

.white-background {
  background-color: #ffffff;
}

.section-icon {
  width: 42px;
  height: 42px;
}

.section-name {
  font-size: 14px;
  margin-top: 10px;
}

.worker-count {
  font-size: 14px;
  color: #999999;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f3f4f6;
}

.count-cell {
  padding: 15px;
}

.count-title {
  font-size: 0.8em;
  color: #666666;
}

.count-number {
  margin-top: 5px;
  font-size: 1.3em;
}

.count-color1 {
  color: #e9bd5e;
}

.count-color2 {
  color: #ae55bc;
}

.count-color3 {
  color: #9386d0;
}

.section-container {
  border-top: 1px solid #f3f4f6;
  margin-top:10px;
}

.news-title {
  color: #999999;
  font-size: 14px;
  margin-top: 10px;
  height: 42px;
  background-color: #ffffff;
  border-bottom: 1px solid #f3f4f6;
}

.thumbnail {
  height: 80px;
  width: 80px;
  padding: 10px;
}

.sub-title {
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
}

.announcement-cell {
  min-height: 90px;
}
</style>