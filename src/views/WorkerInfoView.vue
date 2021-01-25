<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="onBackClicked">
                        <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{ $t("views.worker-info.title") }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <right-menu />
        <ion-content :fullscreen="true">
            <div class="photo-panel">
                <div class="photo-box">
                    <img v-if="headerUrl" :src="headerUrl" />
                    <ion-icon class="photo-icon" v-if="!headerUrl" color="dark" :icon="person" />
                </div>
            </div>

            <div class="field-col">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="11">
                            {{ $t("views.worker-info.upload-id-card") }}
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
                            {{ $t("views.worker-info.id-card") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ worker.idNumber }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.worker-info.name") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ worker.workerName }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.worker-info.gender") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ getNameByCode(worker.gender, genderList) }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.worker-info.birthday") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ worker.birthday }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="2">
                            {{ $t("views.worker-info.address") }}
                        </ion-col>
                        <ion-col class="right-align" size="10">
                            {{ worker.address }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.worker-info.photo") }}
                        </ion-col>
                        <ion-col class="right-align blue-text" size="8">
                            <ion-icon class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row @click="onCompanyParentCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.company") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.corpId, companyParent, { code: "id", name: "name" }) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <!-- <div class="field-col-item" v-if="companyList && companyList.length > 0">
                <ion-grid>
                    <ion-row @click="onCompanyCellClicked">
                        <ion-col class="left-align" size="4"> </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.projectCorpId, companyList, { code: "id", name: "corpName" }) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div> -->

            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onTeamIdCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.teamId") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.teamId, teamList, { code: "id", name: "name" }) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onIsTeamLeaderCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.isTeamLeader") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-radio-group v-model="worker.isTeamLeader">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div
                                        style="display: flex;justify-content: flex-start;align-items: center;margin-right:15px;margin-bottom:5px;"
                                        v-for="(entry, key) in isLeader"
                                        :key="key"
                                    >
                                        <ion-radio slot="start" mode="md" :value="entry.code" style="margin-right:5px;"></ion-radio>
                                        <ion-label>{{ entry.name }}</ion-label>
                                    </div>
                                </div>
                            </ion-radio-group>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.area") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <div style="display: flex;flex-wrap: wrap;">
                                <div
                                    style="display: flex;justify-content: flex-start;align-items: center;margin-right:5px;margin-bottom:5px;"
                                    v-for="(entry, key) in areaList"
                                    :key="key"
                                >
                                    <ion-checkbox
                                        style="margin-right:5px;"
                                        slot="end"
                                        @update:modelValue="entry.isChecked = $event"
                                        :checked="entry.isChecked"
                                    ></ion-checkbox
                                    ><ion-label>{{ entry.name }}</ion-label>
                                </div>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row @click="onRoleCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.role") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.role, roleList) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item" v-if="worker.role == 2">
                <ion-grid>
                    <ion-row @click="onJobTypeCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.job") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.jobTypeCode, jobTypeList) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item" v-if="worker.role == 1">
                <ion-grid>
                    <ion-row @click="onWorkTypeCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.career") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.workTypeCode, workTypeList) }}
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
                            {{ $t("views.register.telephone") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-input class="input-cell" v-model="worker.phone" :placeholder="$t('views.register.input-placeholder')" clearInput></ion-input>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.worker-leave.enter-time") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ worker.entryDate == "0001-01-01" ? " - " : worker.entryDate }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

             <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.worker-leave.leave-time") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ worker.exitDate == "0001-01-01" ? " - " : worker.exitDate }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item section-margin extra">
                <ion-grid>
                    <ion-row class="openExtra" @click="openExtra">
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.extra-info") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                           <i class="icon ion-chevron-down"></i>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                
                <ion-grid class="extraBlk">
                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.passport-issue") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm" max="2050-01-01" :value="worker.extraInfo.passportIssue" @ionChange="changPassportIssue($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.passportIssue = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.passport-entry-expiry") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.passportEntryExpiry" @ionChange="changPassportEntryExpiry($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.passportEntryExpiry = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.visa-period-from") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.visaPeriodFrom" @ionChange="changVisaPeriodFrom($event)"  display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.visaPeriodFrom = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.visa-period-to") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.visaPeriodTo" @ionChange="changVisaPeriodTo($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.visaPeriodTo = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.work-permit-period-from") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.workpermitPeriodFrom" @ionChange="changWorkpermitPeriodFrom($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.workpermitPeriodFrom = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.work-permit-period-to") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.workpermitPeriodTo" @ionChange="changWorkpermitPeriodTo($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.workpermitPeriodTo = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.fly-date-outward") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.flyDateOutward" @ionChange="changFlyDateOutward($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.flyDateOutward = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.fly-date-return") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.flyDateReturn" @ionChange="changFlyDateReturn($event)" display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.flyDateReturn = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.passport-expiry") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :cancel-text= "datePickerCancel" :done-text= "datePickerConfirm"  max="2050-01-01" :value="worker.extraInfo.passportExpiry" @ionChange="changPassportExpiry($event)"  display-format="YYYY-MM-DD" :placeholder="datePlaceholder"  @click="worker.extraInfo.passportExpiry = ''"></ion-datetime>
                        </ion-col>
                    </ion-row>
                </ion-grid>

            </div>


            <div class="section-margin" style="margin-bottom: 10px;">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="6">
                            <ion-button v-if="worker.status == 1" expand="block" color="danger" @click="onLeaveClicked">{{ $t("views.worker-info.leave") }}</ion-button>
                            <ion-button v-if="worker.status == 0" expand="block" color="primary" @click="onLeaveClicked">{{ $t("views.worker-info.enter") }}</ion-button>
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-button expand="block" color="success" @click="onModifyClicked">{{ $t("views.worker-info.submit") }}</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                               
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
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
    IonCol,
    IonCheckbox,
    IonRadioGroup,
    IonRadio,
    pickerController,
} from "@ionic/vue";
import { arrowBackOutline, checkmarkCircleOutline, person, caretDownOutline } from "ionicons/icons";
import WorkerInfo from "@/models/WorkerInfo";
import CompanyInfo from "@/models/CompanyInfo";
import { getWorkerInfo } from "@/data/WorkerFakeData";
import { getCompanyList, getCompanyInfo } from "@/data/CompanyFakeData";
import { ScgApi } from "@/api/ScgApi";
import { useStore } from "vuex";
import { ToastUtils } from "@/utils/ToastUtils";
import RightMenu from '@/components/RightMenu.vue';

export default defineComponent({
    name: "WorkerInfo",
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
        IonCol,
        IonCheckbox,
        IonRadioGroup,
        IonRadio,
        RightMenu
    },
    data() {
        return {
            photoData: "",
            corpParentId: "",
            headerUrl:"",
            companyParent: [],
            teamList: [],
            workTypeList: [],
            areaList: [],
            jobTypeList: [],
            genderList: [
                {
                    name: this.$t("global.gender-type-1"),
                    code: 1,
                },
                {
                    name: this.$t("global.gender-type-2"),
                    code: 2,
                },
            ],
            isLeader: [
                {
                    name: this.$t("global.no"),
                    code: 0,
                },
                {
                    name: this.$t("global.yes"),
                    code: 1,
                },
            ],
            roleList: [
                {
                    name: this.$t("global.role-type-0"),
                    code: 0,
                },
                {
                    name: this.$t("global.role-type-1"),
                    code: 1,
                },
                {
                    name: this.$t("global.role-type-2"),
                    code: 2,
                },
                {
                    name: this.$t("global.role-type-3"),
                    code: 3,
                },
            ],
            worker: {
                id: "",
                projectId: "",
                corpId: "",
                teamId: "",
                isTeamLeader: "",
                workerName: "",
                phone: "",
                workTypeCode: "",
                workTypeName: "",
                recentPhotoFileId: "",
                gender: 1,
                idType: "",
                idNumber: "",
                birthday: "",
                address: "",
                grantOrg: "",
                startDate: "",
                endDate: "",
                nationCode: "H",
                nationName: "汉",
                role: "",
                jobTypeCode: "",
                jobTypeName: "",
                areaCodes: "",
                status: 0,
                entryDate: "",
                exitDate: "",
                extraInfo:{
                    passportIssue: "",
                    passportEntryExpiry: "",
                    visaPeriodFrom: "",
                    visaPeriodTo: "",
                    workpermitPeriodFrom: "",
                    workpermitPeriodTo: "",
                    flyDateOutward: "",
                    flyDateReturn: "",
                    passportExpiry: ""
                }
            },
            // extraInfo:{
            //         passportIssue: "",
            //         passportEntryExpiry: "",
            //         visaPeriodFrom: "",
            //         visaPeriodTo: "",
            //         workpermitPeriodFrom: "",
            //         workpermitPeriodTo: "",
            //         flyDateOutward: "",
            //         flyDateReturn: "",
            //         passportExpiry: ""
            //     },
            workerData: {},
            datePickerCancel: this.$t("global.cancel"),
            datePickerConfirm: this.$t("global.confirm"),
            datePlaceholder: this.$t("views.register.date-placeholder"),
            
            store: useStore()
        };
    },
    ionViewWillEnter() {
        const query = this.$route.query;
        this.worker.projectId = this.store.getters.getProjectId;
        ScgApi()
            .queryDictionaryTrees({ dictCode: "job_type" })
            .then((res) => {
                this.jobTypeList = res.data;
            }).catch((err) => {
      this.$router.replace('/login');

      ScgApi()
            .queryDictionaryTrees({ dictCode: "worker_role" })
            .then((res) => {
                this.roleList = res.data;
            });
    });
        ScgApi()
            .queryDictionaryTrees({ dictCode: "work_type" })
            .then((res) => {
                this.workTypeList = res.data;
            });
        
            Promise.all([ScgApi().getProjectWorker({ id: query.id }),ScgApi().queryProjectCorpSelect({ projectId: this.store.getters.getProjectId })]).then((res: any)=>{
                
                console.log("workerinfo====>",res[0].data);
                const res0 = res[0];
                this.companyParent = res[1].data;
                this.workerData = { ...res0.data };
                this.worker.id = res0.data.id;
                this.worker.teamId = res0.data.teamId;
                this.worker.isTeamLeader = res0.data.isTeamLeader;
                this.worker.workerName = res0.data.workerName;
                this.worker.phone = res0.data.phone;
                this.worker.workTypeCode = res0.data.workTypeCode;
                this.worker.workTypeName = res0.data.workTypeName;
                this.worker.recentPhotoFileId = res0.data.recentPhotoFileId;
                this.worker.gender = res0.data.gender;
                this.worker.idType = res0.data.idType;
                this.worker.idNumber = res0.data.idNumber;
                this.worker.birthday = res0.data.birthday;
                this.worker.address = res0.data.address;
                this.worker.grantOrg = res0.data.grantOrg;
                this.worker.startDate = res0.data.startDate;
                this.worker.endDate = res0.data.endDate;
                this.worker.role = res0.data.role;
                this.worker.jobTypeCode = res0.data.jobTypeCode;
                this.worker.jobTypeName = res0.data.jobTypeName;
                this.worker.areaCodes = res0.data.areaCodes;
                this.worker.corpId = res0.data.corpId;
                this.worker.entryDate = res0.data.entryDate;
                this.worker.exitDate = res0.data.exitDate;
                this.worker.status = res0.data.status;
                if(res0.data.extraInfo){
                    this.worker.extraInfo = res0.data.extraInfo
                }
                
                ScgApi().queryFile({relationId:res0.data.workerId,type:"worker_recent_photo"}).then((res: any)=>{
                    this.worker.recentPhotoFileId = res.data[0].fileId;
                    this.headerUrl = res.data[0].fileUrl;
                });
                ScgApi()
                .queryArea({ projectId: this.store.getters.getProjectId })
                .then((res) => {
                    res.data.forEach((e: any)=>{
                        if(this.worker.areaCodes.split(',').indexOf(e.code) !== -1){
                            e.isChecked = true;
                        }else{
                            e.isChecked = false;
                        }
                    })
                    this.areaList = res.data;
                    console.log("areaList",this.areaList);
                });
                // ScgApi()
                // .queryProjectCorpSelect({ projectId: this.worker.projectId, corpId: corpData.corpId })
                // .then((res) => {
                //     this.companyList = res.data;
                //     const tempId = res0.data.secondProjectCorpId ? this.companyList.filter((e: any) => e.id === res0.data.secondProjectCorpId)[0]['corpId'] : corpData.corpId;
                //     ScgApi()
                //     .queryProjectCorpTeamSelect({ projectId: this.worker.projectId, corpId: tempId })
                //     .then((res) => {
                //         this.teamList = res.data;
                //     });
                // });
                ScgApi()
                .queryProjectCorpTeamSelect({ projectId: this.worker.projectId, corpId: this.worker.corpId })
                .then((res) => {
                    this.teamList = res.data;
                });
            });
    },
    setup() {
        const route = useRoute();

        const query = route.query;

        if (query.id == null || query.id == undefined) {
            const router = useRouter();
            router.replace("/main/home");
            return;
        }
        return {
            arrowBackOutline,
            checkmarkCircleOutline,
            person,
            caretDownOutline,
        };
    },
    methods: {
        getNameByCode(value: any, list: Array<any>, config?: { code: string; name: string }) {
            const c = config || { code: "code", name: "name" };
            const obj: any = {};
            list.forEach((e: any) => {
                obj[e[c.code]] = e[c.name];
            });
            return obj[value] || null;
        },
        onLeaveClicked(ev: Event) {
            const query = this.$route.query;
            this.$router.replace({ path: "/worker-leave", query: { id: query.id } });
        },
        onModifyClicked(ev: Event) {
            this.worker.areaCodes = this.areaList
                .filter((e: any) => e.isChecked)
                .map((e: any) => e.code)
                .join(",");
            console.log("check",this.areaList);
            // this.worker.extraInfo = this.extraInfo;
            // console.log("extraInfo====>",this.extraInfo);
             console.log("work====>",JSON.stringify(this.worker));
            const data: any = { ...this.worker };
            // if (data.role == 1) {
            //     delete data.jobTypeCode;
            //     delete data.jobTypeName;
            // } else if (data.role == 2) {
            //     delete data.workTypeCode;
            //     delete data.workTypeName;
            // }
            ScgApi()
                .saveWorkerAndProjectWorker(data)
                .then((res: any) => {
                    if (res.code == "00000") {
                        ToastUtils().showSuccess(this.$t("global.success"));
                        this.$router.replace("/worker-list");
                    }
                });
        },
        onBackClicked(ev: Event) {
            this.$router.replace({path: "/worker-list", query: { id: this.worker.projectId}})
        },
        async onWorkTypeCellClicked(ev: Event) {
            const options = this.workTypeList.map((e: any) => {
                return { text: e.name, value: e.code };
            });
            console.log("workTypeList",options);
            const columns = [
                {
                    name: "workType",
                    options: options,
                },
            ];
            const picker = await pickerController.create({
                columns: columns,
                buttons: [
                    {
                        text: this.$t("global.cancel"),
                        role: "cancel",
                    },
                    {
                        text: this.$t("global.confirm"),
                        handler: (value) => {
                            this.worker.workTypeCode = value.workType.value;
                            this.worker.workTypeName = this.getNameByCode(value.workType.value, this.workTypeList);
                        },
                    },
                ],
            });
            picker.present();
        },
        // async onCompanyCellClicked(ev: Event) {
        //     const options = this.companyList.map((e: any) => {
        //         return { text: e.corpName, value: e.id };
        //     });

        //     const columns = [
        //         {
        //             name: "corp",
        //             options: options,
        //         },
        //     ];

        //     const picker = await pickerController.create({
        //         columns: columns,
        //         buttons: [
        //             {
        //                 text: this.$t("global.cancel"),
        //                 role: "cancel",
        //             },
        //             {
        //                 text: this.$t("global.confirm"),
        //                 handler: (value) => {
        //                     this.worker.projectCorpId = value.corp.value;
        //                     const data: any = this.companyList.filter((e: any) => e.id === this.worker.projectCorpId)[0];
        //                     ScgApi()
        //                         .queryProjectCorpTeamSelect({ projectId: this.worker.projectId, corpId: data.corpId })
        //                         .then((res) => {
        //                             this.teamList = res.data;
        //                         });
        //                 },
        //             },
        //         ],
        //     });

        //     picker.present();
        // },
        async onTeamIdCellClicked(ev: Event) {
            const options = this.teamList.map((e: any) => {
                return { text: e.name, value: e.id };
            });
            const columns = [
                {
                    name: "team",
                    options: options,
                },
            ];
            const picker = await pickerController.create({
                columns: columns,
                buttons: [
                    {
                        text: this.$t("global.cancel"),
                        role: "cancel",
                    },
                    {
                        text: this.$t("global.confirm"),
                        handler: (value) => {
                            this.worker.teamId = value.team.value;
                        },
                    },
                ],
            });
            picker.present();
        },
        async onCompanyParentCellClicked(ev: Event) {
            const options = this.companyParent.map((e: any) => {
                return { text: e.name, value: e.id };
            });
            const columns = [
                {
                    name: "corpParent",
                    options: options,
                },
            ];

            const picker = await pickerController.create({
                columns: columns,
                buttons: [
                    {
                        text: this.$t("global.cancel"),
                        role: "cancel",
                    },
                    {
                        text: this.$t("global.confirm"),
                        handler: (value) => {
                            this.worker.corpId = value.corpParent.value;
                            ScgApi()
                                .queryProjectCorpTeamSelect({ projectId: this.worker.projectId, corpId:  this.worker.corpId })
                                .then((res) => {
                                    this.teamList = res.data;
                                });
                        },
                    },
                ],
            });

            picker.present();
        },
        // corpParentChange(value: any) {
        //     if (value) {
        //         const data: any = this.companyParent.filter((e: any) => e.id === value)[0];
        //         ScgApi()
        //             .queryProjectCorpSelect({ projectId: this.worker.projectId, corpId:  data.corpId })
        //             .then((res) => {
        //                 if (res.data && res.data.length > 0) {
        //                     this.worker.projectCorpId = "";
        //                     this.companyList = res.data;
        //                 } else {
        //                     this.worker.projectCorpId = value;
        //                     this.companyList = [];
        //                     ScgApi()
        //                         .queryProjectCorpTeamSelect({ projectId: this.worker.projectId, corpId:  data.corpId })
        //                         .then((res) => {
        //                             this.teamList = res.data;
        //                         });
        //                 }
        //             });
        //     }
        //     this.worker.projectCorpId = "";
        // },
        async onRoleCellClicked(ev: Event) {
            const options = this.roleList.map((e: any) => {
                return { text: e.name, value: e.code };
            });
            const columns = [
                {
                    name: "role",
                    options: options,
                },
            ];
            const picker = await pickerController.create({
                columns: columns,
                buttons: [
                    {
                        text: this.$t("global.cancel"),
                        role: "cancel",
                    },
                    {
                        text: this.$t("global.confirm"),
                        handler: (value) => {
                            this.worker.role = value.role.value;
                            this.worker.workTypeCode = "";
                            this.worker.workTypeName = "";
                            this.worker.jobTypeCode = "";
                            this.worker.jobTypeName = "";
                        },
                    },
                ],
            });
            picker.present();
        },
        async onJobTypeCellClicked(ev: Event) {
            const options = this.jobTypeList.map((e: any) => {
                return { text: e.name, value: e.code };
            });
            const columns = [
                {
                    name: "jobType",
                    options: options,
                },
            ];
            const picker = await pickerController.create({
                columns: columns,
                buttons: [
                    {
                        text: this.$t("global.cancel"),
                        role: "cancel",
                    },
                    {
                        text: this.$t("global.confirm"),
                        handler: (value) => {
                            this.worker.jobTypeCode = value.jobType.value;
                            this.worker.jobTypeName = this.getNameByCode(value.jobType.value, this.jobTypeList);
                        },
                    },
                ],
            });
            picker.present();
        },

        openExtra(){
            document.querySelector(".extraBlk")?.classList.toggle("show");
        },

        changPassportIssue(e: any){
            this.worker.extraInfo.passportIssue= e.detail.value
        },

        changPassportEntryExpiry(e: any){
            this.worker.extraInfo.passportEntryExpiry= e.detail.value
        },

        changVisaPeriodFrom(e: any){
            this.worker.extraInfo.visaPeriodFrom= e.detail.value
        },

        changVisaPeriodTo(e: any){
            this.worker.extraInfo.visaPeriodTo= e.detail.value
        },

        changWorkpermitPeriodFrom(e: any){
            this.worker.extraInfo.workpermitPeriodFrom= e.detail.value
        },

        changWorkpermitPeriodTo(e: any){
            this.worker.extraInfo.workpermitPeriodTo= e.detail.value
        },

        changFlyDateOutward(e: any){
            this.worker.extraInfo.flyDateOutward= e.detail.value
        },

        changFlyDateReturn(e: any){
            this.worker.extraInfo.flyDateReturn= e.detail.value
        },

        changPassportExpiry(e: any){
            this.worker.extraInfo.passportExpiry= e.detail.value
        },
    
    },
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


.openExtra{
  font-size:18px;
  font-weight: 500;
}

.extraBlk{
    display: none;
}

.extraBlk.show{
  display: block;
}


.extraBlk .left-align{
    line-height: 40px;
}
</style>
