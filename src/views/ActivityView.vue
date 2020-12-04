<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('views.activity.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      Activity View
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'ActivityView',
  components: {
    IonPage,
    IonContent
  }
});
</script>

<style scoped>
ion-page {
  --background: #f3f4f6;
}
</style>