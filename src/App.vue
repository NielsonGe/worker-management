<template>
  <ion-app>
    <ion-router-outlet :animated="false" @animation="()=>{console.log(1234);return false;}" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>


</style>

