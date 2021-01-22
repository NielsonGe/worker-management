<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-header>
        <ion-label>{{ t('global.team-name-belong') }}</ion-label>
      </ion-header>
       <ion-item class="cell" lines="full" v-for="item in teamList" :key="item.id" @click="onTeamCellClicked(item.id)">
       <div class="teamfilter" slot="start">
           {{ item.name }}<br/>{{ item.corpName }}
        </div>
        <ion-icon class="selicon" v-if="localCareerType == item.id" slot="end"  @click="alamit" color="success" :icon="checkmarkOutline"></ion-icon>

       </ion-item>
      <!-- <ion-item lines="full" @click="onCareerTypeClicked(0)">
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
      </ion-item> -->
    </ion-list>

    <ion-list style="margin-top: 25px;">
      <ion-header>
        <ion-label>{{ t('global.company-name-belong') }}</ion-label>
      </ion-header>

      <ion-item class="cell" lines="full" v-for="item in companyList" :key="item.id" @click="onCompanyCellClicked(item.id)">
       <ion-label slot="start">
           {{ item.name }}
        </ion-label>
        <ion-icon v-if="localGenderType == item.id" slot="end" color="success" :icon="checkmarkOutline"></ion-icon>

       </ion-item>
      <!-- <ion-item lines="full" @click="onGenderTypeClicked(0)">
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
      </ion-item> -->
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { checkmarkOutline } from 'ionicons/icons';
import { ScgApi } from '@/api/ScgApi';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TeamAndCompanyFilterPopoverView',
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
      localGenderType: 0,
      teamList: [],
      companyList: [],
      store:useStore(),

    }
  },
  mounted() {

    this.localCareerType = this.careerTypeValue;
    this.localGenderType = this.genderTypeValue;

      ScgApi().queryTeamList({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:100}).then(res=>{
      this.teamList = res.data.rows;
    }).catch((err) => {
      // this.$router.replace('/login');
    });
    // console.log(this.teamList);
     ScgApi()
            .queryProjectCorpSelect({ projectId: this.store.getters.getProjectId })
            .then((res) => {
                this.companyList = res.data;
            })
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
    onTeamCellClicked(type) {
      if (type == this.localCareerType) {
        return;
      }

      this.localCareerType = type;
      this.setCareerTypeValue(type)
    },

    onCompanyCellClicked(type) {
     
      if (type == this.localGenderType) {
        return;
      }

      this.localGenderType = type;
      this.setGenderTypeValue(type)
    },

    alamit(){
        alert("dianji");
    }
  }
});
</script>

<style scoped>

.item .teamfilter{
    width:250px;
    font-size:12px;
    float:left;
}

.selicon{
    z-index: 100;
    width: 24px;
}

</style>