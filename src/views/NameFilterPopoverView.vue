<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item lines="full" @click="onSortTypeClicked(0)">
        <ion-label slot="start">
          {{ t('global.sort-name-0') }}
        </ion-label>
        <ion-icon v-if="localSort == 0" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onSortTypeClicked(1)">
        <ion-label slot="start">
          {{ $t('global.sort-name-1') }}
        </ion-label>
        <ion-icon v-if="localSort == 1" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onSortTypeClicked(2)">
        <ion-label slot="start">
          {{ $t('global.sort-name-2') }}
        </ion-label>
        <ion-icon v-if="localSort == 2" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onSortTypeClicked(3)">
        <ion-label slot="start">
          {{ $t('global.sort-name-3') }}
        </ion-label>
        <ion-icon v-if="localSort == 3" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { checkmarkOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'NameFilterPopover',
  components: { 
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  },
  props: {
    sortValue: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    setSortValue: {
      type: Function
    }
  },
  data() {
    return {
      localSort: 0
    }
  },
  mounted() {
    this.localSort = this.sortValue;
  },
  setup() {
    const { t, tm } = useI18n();

    return {
      t,
      tm,
      checkmarkOutline
    }
  },
  methods: {
    onSortTypeClicked(type) {
      if (type == this.localSort) {
        return;
      }

      this.localSort = type;
      this.setSortValue(type)
    }
  }
});
</script>