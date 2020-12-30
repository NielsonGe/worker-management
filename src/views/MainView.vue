<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar class="bottombar" slot="bottom">
        <ion-tab-button tab="home" href="/main/home">
          <ion-label>{{ $t('views.main.home-tab') }}</ion-label>
          <ion-icon :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="register" href="/main/register">
          <ion-label>{{ $t('views.main.register-tab') }}</ion-label>
          <ion-icon :icon="createOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button tab="activity" href="/main/activity" :disabled="true">
          <ion-label>{{ $t('views.main.activity-tab') }}</ion-label>
          <ion-icon :icon="starOutline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { homeOutline, createOutline, starOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'MainView',
  components: {
    IonPage,
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonLabel, 
    IonIcon
  },
  data() {
    return {
      homeOutline,
      createOutline,
      starOutline
    }
  }
});
</script>

<style scoped>
.bottombar{
  z-index: -100;
}
.bottombar.hide{
  display: none;
}

</style>