<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('views.register.title') }}</ion-title>
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
          <ion-row @click="onTakeIdCardPhotoFontClicked()">
            <ion-col class="left-align" size="11">
              {{ $t('views.register.upload-id-card-font') }}
            </ion-col>
            <ion-col size="1">
              <ion-icon v-if="idCardData1 != ''" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
              <ion-icon v-if="idCardData1 == ''"  class="cell-icon" color="dark" :icon="camera" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item">
        <ion-grid>
          <ion-row @click="onTakeIdCardPhotoBackClicked()">
            <ion-col class="left-align" size="11">
              {{ $t('views.register.upload-id-card-back') }}
            </ion-col>
            <ion-col size="1">
              <ion-icon v-if="idCardData2 != ''" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
              <ion-icon v-if="idCardData2 == ''"  class="cell-icon" color="dark" :icon="camera" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>


      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical" size="4">
              {{ $t('views.register.id-card') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              <ion-input class="input-cell" v-model="idNumber" :placeholder="$t('views.register.input-placeholder')" clearInput />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical" size="4">
              {{ $t('views.register.name') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              <ion-input class="input-cell" v-model="name" :placeholder="$t('views.register.input-placeholder')" clearInput />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row @click="onGenderCellClicked">
            <ion-col class="left-align" size="4">
              {{ $t('views.register.gender') }}
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
              {{ $t('views.register.birthday') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              <ion-datetime v-model="birthday" display-format='YYYY-MM-DD'></ion-datetime>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div class="field-col-item">
        <ion-grid>
          <ion-row>
            <ion-col class="left-align center-vertical" size="2">
              {{ $t('views.register.address') }}
            </ion-col>
            <ion-col class="right-align" size="10">
              <ion-input class="input-cell" v-model="address" :placeholder="$t('views.register.input-placeholder')" clearInput />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item section-margin">
        <ion-grid>
          <ion-row @click="onTakePhotoClicked">
            <ion-col class="left-align" size="4">
              {{ $t('views.register.photo') }}
            </ion-col>
            <ion-col class="right-align blue-text" size="8">
              <ion-icon v-if="photoData != ''" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
              <ion-icon v-if="photoData == ''"  class="cell-icon" color="dark" :icon="camera" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="field-col-item section-margin">
        <ion-grid>
          <ion-row @click="onCompanyCellClicked">
            <ion-col class="left-align" size="4">
              {{ $t('views.register.company') }}
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
              {{ $t('views.register.career') }}
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
            <ion-col class="left-align center-vertical" size="4">
              {{ $t('views.register.telephone') }}
            </ion-col>
            <ion-col class="right-align" size="8">
              <ion-input class="input-cell" v-model="tel" :placeholder="$t('views.register.input-placeholder')" clearInput></ion-input>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div class="section-margin" style="margin-bottom: 10px;">
        <ion-button expand="block" color="success" @click="onSubmitClicked">{{ $t('global.submit') }}</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonHeader, IonButtons, IonIcon, IonRow, IonGrid, IonCol, pickerController } from '@ionic/vue';
import { arrowBackOutline, checkmarkCircleOutline, person, caretDownOutline, camera } from 'ionicons/icons';
import WorkerInfo from '@/models/WorkerInfo';
import CompanyInfo from '@/models/CompanyInfo';
import { getWorkerInfo } from '@/data/WorkerFakeData';
import { getCompanyList, getCompanyInfo } from '@/data/CompanyFakeData';
import { PhotoPlugin } from '@/composables/UsePhotoPlugin';
import { ToastUtils } from '@/utils/ToastUtils';

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
      projectId: 0,
      photoData: '',
      idNumber: '',
      idCardData1: '',
      idCardData2: '',
      name: '',
      gender: 0,
      birthday:  new Date().toISOString(),
      address: '',
      tel: '',
      companyId: '',
      companyName: '',
      careerType: '',
      companyList: new Array<CompanyInfo>()
    }
  },
  mounted() {
    const s = useStore();
    this.projectId = s.getters.getProjectId;

    this.photoData = '';
    this.idNumber = '';
    this.name = '';
    this.gender = 0;
    this.birthday =  new Date().toISOString(),
    this.address = '';
    this.tel = '';
    this.careerType = '';

    this.companyList = getCompanyList();
    this.companyId = '';
    this.companyName = '';
  },
  setup() {
    return {
      arrowBackOutline,
      checkmarkCircleOutline,
      person,
      caretDownOutline,
      camera
    }
  },
  methods: {
    getCareerTypeName(type: number): string {
      switch(type) {
        case 0: return this.$t('global.career-type-0');
        case 1: return this.$t('global.career-type-1');
        case 2: return this.$t('global.career-type-2');
        case 3: return this.$t('global.career-type-3');
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
    onSubmitClicked(ev: Event) {
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
    async onTakeIdCardPhotoFontClicked(ev: Event) {
      const errorMsg = this.$t('global.take-photo-error');

      const { takePhoto } = PhotoPlugin();
      const photoData = takePhoto();
      
      photoData.then(value => {
        console.log(value);
      },
      error => {
        console.log(error);
        ToastUtils().showError('danger', 2000, errorMsg);
      })
    },
    async onTakeIdCardPhotoBackClicked(ev: Event) {
      const errorMsg = this.$t('global.take-photo-error');

      const { takePhoto } = PhotoPlugin();
      const photoData = takePhoto();
      
      photoData.then(value => {
        console.log(value);
      },
      error => {
        console.log(error);
        ToastUtils().showError('danger', 2000, errorMsg);
      })
    },
    async onTakePhotoClicked(ev: Event) {
      const errorMsg = this.$t('global.take-photo-error');

      const { takePhoto } = PhotoPlugin();
      const photoData = takePhoto();
      
      photoData.then(value => {
        console.log(value);
      },
      error => {
        console.log(error);
        ToastUtils().showError('danger', 2000, errorMsg);
      })
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
    async onGenderCellClicked(ev: Event) {
      const options = [
        {
          text: this.$t('global.gender-type-0'),
          value: 0
        },
        {
          text: this.$t('global.gender-type-1'),
          value: 1
        }
      ];

      const columns = [{
        name: 'gender',
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
                this.gender = value.gender.value;
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

.input-cell {
  height: 20px;
}
</style>