<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-header>
        <ion-label>{{ t('global.career-type-name') }}</ion-label>
      </ion-header>
      <ion-item lines="full" @click="onCareerTypeClicked(0)">
        <ion-label slot="start">
          {{ t('global.career-type-0') }}
        </ion-label>
        <ion-icon v-if="localCareerType == 0" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onCareerTypeClicked(1)">
        <ion-label slot="start">
          {{ $t('global.career-type-1') }}
        </ion-label>
        <ion-icon v-if="localCareerType == 1" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onCareerTypeClicked(2)">
        <ion-label slot="start">
          {{ $t('global.career-type-2') }}
        </ion-label>
        <ion-icon v-if="localCareerType == 2" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onCareerTypeClicked(3)">
        <ion-label slot="start">
          {{ $t('global.career-type-3') }}
        </ion-label>
        <ion-icon v-if="localCareerType == 3" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
    </ion-list>

    <ion-list style="margin-top: 25px;">
      <ion-header>
        <ion-label>{{ t('global.gender-type-name') }}</ion-label>
      </ion-header>
      <ion-item lines="full" @click="onGenderTypeClicked(0)">
        <ion-label slot="start">
          {{ t('global.gender-type-0') }}
        </ion-label>
        <ion-icon v-if="localGenderType == 0" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
      <ion-item lines="full" @click="onGenderTypeClicked(1)">
        <ion-label slot="start">
          {{ $t('global.gender-type-1') }}
        </ion-label>
        <ion-icon v-if="localGenderType == 1" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { checkmarkOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'CareerTypeAndGenderFilterPopover',
  components: { 
    IonContent,
    IonHeader,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  },
  props: {
    careerTypeValue: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    setCareerTypeValue: {
      type: Function
    },
    genderTypeValue: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    setGenderTypeValue: {
      type: Function
    }
  },
  data() {
    return {
      localCareerType: 0,
      localGenderType: 0
    }
  },
  mounted() {
    this.localCareerType = this.careerTypeValue;
    this.localGenderType = this.genderTypeValue;
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
    onCareerTypeClicked(type) {
      if (type == this.localCareerType) {
        return;
      }

      this.localCareerType = type;
      this.setCareerTypeValue(type)
    },
    onGenderTypeClicked(type) {
      if (type == this.localGenderType) {
        return;
      }

      this.localGenderType = type;
      this.setGenderTypeValue(type)
    }
  }
});
</script>