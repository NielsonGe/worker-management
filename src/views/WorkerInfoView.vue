<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('views.worker-info.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="photo-panel">
        <div class="photo-box">
          <img v-if="photoData != ''" :src="photoData" />
          <ion-icon class="photo-icon" v-if="photoData == ''" color="dark" :icon="person" />
        </div>
      </div>

      <div class="field-col">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="11">
              {{ $t('views.worker-info.upload-id-card') }}
            </ion-col>
            <ion-col size="1">
              <ion-icon class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.id-card') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              {{ idNumber }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.name') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              {{ name }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.gender') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              {{ getGenderName(gender) }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.birthday') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              {{ birthday }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical" size="2">
              {{ $t('views.worker-info.address') }}
            </ion-col>
            <ion-col class="right-align" size="10">
              {{ address }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item section-margin">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.photo') }}
            </ion-col>
            <ion-col class="right-align blue-text" size="8">
              <ion-icon class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item section-margin">
        <ion-grid>
          <ion-row @click="onCompanyCellClicked">
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.company') }}
            </ion-col>
            <ion-col class="right-align" size="7">
              {{ companyName }}
            </ion-col>
            <ion-col class="right-align" size="1">
              <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row @click="onCareerTypeCellClicked">
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.career') }}
            </ion-col>
            <ion-col class="right-align" size="7">
              {{ getCareerTypeName(careerType) }}
            </ion-col>
            <ion-col class="right-align" size="1">
              <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align" size="4">
              {{ $t('views.worker-info.telephone') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              <ion-input style="height:20px;" v-model="tel" :placeholder="$t('views.worker-info.telephone-placeholder')" clearInput></ion-input>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="section-margin" style="margin-bottom: 10px;">
        <ion-button expand="block" color="danger" @click="onLeaveClicked">{{ $t('views.worker-info.leave') }}</ion-button>
        <ion-button expand="block" color="success" @click="onModifyClicked">{{ $t('views.worker-info.submit') }}</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonHeader, IonButtons, IonIcon, IonRow, IonGrid, IonCol, pickerController } from '@ionic/vue';
import { arrowBackOutline, checkmarkCircleOutline, person, caretDownOutline } from 'ionicons/icons';
import WorkerInfo from '@/models/WorkerInfo';
import CompanyInfo from '@/models/CompanyInfo';
import { getWorkerInfo } from '@/data/WorkerFakeData';
import { getCompanyList, getCompanyInfo } from '@/data/CompanyFakeData';

export default defineComponent({
  name: 'WorkerInfo',
  components: {
    IonPage,
    IonToolbar, 
    IonTitle,
    IonContent, 
    IonInput,
    IonButton,
    IonHeader, 
    IonButtons, 
    IonIcon,
    IonRow, 
    IonGrid, 
    IonCol
  },
  data() {
    return {
      photoData: '',
      idNumber: '',
      name: '',
      gender: 0,
      birthday: '',
      address: '',
      tel: '',
      companyId: '',
      companyName: '',
      careerType: '0',
      companyList: new Array<CompanyInfo>(),
      workerInfo: new WorkerInfo('0', '', '0', 0, '', '', '', '', new Date(2000, 1, 1, 0, 0, 0), '', 0, '', '0')
    }
  },
  mounted() {
    const query = this.$route.query;
    const tmp = query.id as unknown;
    const id = tmp as string;

    const tmpInfo = getWorkerInfo(id);

    if (tmpInfo == undefined) {
      this.$router.replace('/main/home');
    }
    else {
      this.workerInfo = tmpInfo;

      this.photoData = this.workerInfo.getPhotoData();
      this.idNumber = this.workerInfo.getIdNumber();
      this.name = this.workerInfo.getName();
      this.gender = this.workerInfo.getGender();
      const birthdayVal = this.workerInfo.getBirthday()
      this.birthday = birthdayVal.getFullYear() + '-' + (birthdayVal.getMonth() + 1) + '-' + birthdayVal.getDate();
      this.address = this.workerInfo.getAddress();
      this.tel = this.workerInfo.getTel();
      this.careerType = this.workerInfo.getCareerType();

      this.companyList = getCompanyList();
      this.companyId = this.workerInfo.getCompanyId();
      this.setCompanyName(this.companyId);
    }
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
      checkmarkCircleOutline,
      person,
      caretDownOutline
    }
  },
  methods: {
    getCareerTypeName(type: string): string {
      switch(type) {
        case '0': return this.$t('global.career-type-0');
        case '1': return this.$t('global.career-type-1');
        case '2': return this.$t('global.career-type-2');
        case '3': return this.$t('global.career-type-3');
        default: return this.$t('global.career-type-unknown');
      }
    },
    getGenderName(gender: number) {
      switch(gender) {
        case 0: return this.$t('global.gender-type-0');
        case 1: return this.$t('global.gender-type-1');
        default: return this.$t('global.gender-type-unknown');
      }
    },
    onLeaveClicked(ev: Event) {
      const param = {
        id: this.workerInfo.getId(), 
        name: this.workerInfo.getName(), 
        photoData: this.workerInfo.getPhotoData()
      };

      this.$router.push({path: '/worker-leave', query: param})
    },
    onModifyClicked(ev: Event) {
      return;
    },
    onBackClicked(ev: Event) {
      this.$router.replace('/main/home');
    },
    setCompanyName(id: string) {
      const companyInfo = getCompanyInfo(id);
      if (companyInfo != null || companyInfo != undefined) {
        this.companyName = companyInfo.getName();
      }
      else {
        this.companyName = this.$t('global.unknown');
      }
    },
    async onCareerTypeCellClicked(ev: Event) {
      const options = [
        {
          text: this.$t('global.career-type-0'),
          value: 0
        },
        {
          text: this.$t('global.career-type-1'),
          value: 1
        },
        {
          text: this.$t('global.career-type-2'),
          value: 2
        },
        {
          text: this.$t('global.career-type-3'),
          value: 3
        }
      ];

      const columns = [{
        name: 'career',
        options: options
      }];

      const picker = await pickerController
        .create({
          columns: columns,
          buttons: [
            {
              text: this.$t('global.cancel'),
              role: 'cancel'
            },
            {
              text: this.$t('global.confirm'),
              handler: (value) => {
                this.careerType = value.career.value;
              }
            }
          ]
        })

      picker.present();
    },
    async onCompanyCellClicked(ev: Event) {
      const options = [];

      for(const item of this.companyList) {
        options.push({
          text: item.getName(),
          value: item.getId()
        })
      }

      const columns = [{
        name: 'company',
        options: options
      }];

      const picker = await pickerController
        .create({
          columns: columns,
          buttons: [
            {
              text: this.$t('global.cancel'),
              role: 'cancel'
            },
            {
              text: this.$t('global.confirm'),
              handler: (value) => {
                this.companyId = value.company.value;
                this.setCompanyName(this.companyId);
              }
            }
          ]
        })

      picker.present();
    }
  }
});
</script>

<style scoped>
ion-content {
  --background: #f3f4f6;
}

.photo-panel {
  margin-top: 10px;
  height: 140px;
  background-color: #ffa71d;
  padding-top: 20px;
}

.photo-box {
	width: 100px;
	height: 100px;
	border-radius: 100px;
	margin: 0 auto;
	background: #fff;
	overflow: hidden;
}

.field-col {
  height: 50px;
  border-bottom: 1px solid #f3f4f6;
  background-color: #ffffff;
  padding-top: 5px;
}

.field-col-item {
  min-height: 50px;
  border-bottom: 1px solid #f3f4f6;
  background-color: #ffffff;
}

.section-margin {
  margin-top: 10px;
}

.left-item {
  height: 28px;
  line-height: 28px;
  margin-left: 15px;
}

.left-align {
  text-align: left;
}

.right-align {
  text-align: right;
}

.text-input {
  margin-left: 10px;
  text-align: right;
}

.photo-icon {
  font-size: 96px;
}

.cell-icon {
  font-size: 20px;
}

.center-vertical {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.blue-text {
  color: blue;
}
</style>