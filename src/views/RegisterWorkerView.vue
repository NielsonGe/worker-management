<template>
    <ion-page>
        <div class="fixed-loading" v-show="showLoading">
            <ion-icon class="icon-loading" v-show="showLoading" :icon="syncOutline"></ion-icon>
        </div>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="onBackClicked">
                        <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{ $t("views.register.title") }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <right-menu />
        <ion-content :fullscreen="true">
            <div class="photo-panel">
                <div class="photo-box">
                    <img v-if="photoData" :src="photoData" />
                    <ion-icon class="photo-icon" v-if="!photoData" color="dark" :icon="person" />
                </div>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onIdTypeCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.idType") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.idType, idTypeList) ? getNameByCode(formData.idType, idTypeList) : "身份证" }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col">
                <ion-grid>
                    <ion-row @click="onTakeIdCardPhotoFontClicked2()">
                        <ion-col class="left-align" size="11">
                            {{ $t("views.register.upload-id-card-font") }}
                        </ion-col>
                        <ion-col size="1">
                            <ion-icon v-if="idCardData1" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            <ion-icon v-if="!idCardData1" class="cell-icon" color="dark" :icon="camera" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onTakeIdCardPhotoBackClicked2()">
                        <ion-col class="left-align" size="11">
                            {{ $t("views.register.upload-id-card-back") }}
                        </ion-col>
                        <ion-col size="1">
                            <ion-icon v-if="idCardData2" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            <ion-icon v-if="!idCardData2" class="cell-icon" color="dark" :icon="camera" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <input type="file" id="takeidphoto1" accept="image/*" capture="environment" @change="testphoto($event)" />
            <input type="file" id="takeidphoto2" accept="image/*" capture="environment" @change="testphotofan($event)" />

            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register.id-card") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-input class="input-cell" v-model="formData.idNumber" :placeholder="$t('views.register.input-placeholder')" clearInput />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register.name") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-input class="input-cell" v-model="formData.workerName" :placeholder="$t('views.register.input-placeholder')" clearInput />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onGenderCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.gender") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.gender, genderList) }}
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
                            {{ $t("views.register.birthday") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-datetime :value="formData.birthday" display-format="YYYY-MM-DD"></ion-datetime>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="2">
                            {{ $t("views.register.address") }}
                        </ion-col>
                        <ion-col class="right-align" size="10">
                            <ion-input class="input-cell" v-model="formData.address" :placeholder="$t('views.register.input-placeholder')" clearInput />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register.grantOrg") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-input class="input-cell" v-model="formData.grantOrg" :placeholder="$t('views.register.input-placeholder')" clearInput />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.startDate") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :value="formData.startDate" display-format="YYYY-MM-DD"></ion-datetime>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="6">
                            {{ $t("views.register.endDate") }}
                        </ion-col>
                        <ion-col class="right-align" size="6">
                            <ion-datetime :value="formData.endDate" display-format="YYYY-MM-DD"></ion-datetime>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row @click="onTakePhotoClicked2">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.photo") }}
                        </ion-col>
                        <ion-col class="right-align blue-text" size="8">
                            <ion-icon v-if="photoData" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            <ion-icon v-if="!photoData" class="cell-icon" color="dark" :icon="camera" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="cropper-box" v-show="openCropper">
                <img id="avatar" />
                <ion-icon class="cropper-cancel" :icon="closeSharp" @click="cancelCrop()"></ion-icon>
                <ion-icon class="cropper-crop" :icon="checkmarkSharp" @click="crop()"></ion-icon>
            </div>
            <input type="file" id="takeidphoto3" accept="image/*" capture="environment" @change="testphotoface($event)" />
            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row @click="onCompanyParentCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.company") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.corpId, companyParent, { code: "id", name: "name" }) }}
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
                            {{ getNameByCode(formData.projectCorpId, companyList, { code: "id", name: "corpName" }) }}
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
                            {{ getNameByCode(formData.teamId, teamList, { code: "id", name: "name" }) }}
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
                            {{ $t("views.register.isTeamLeader") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-radio-group :value="formData.isTeamLeader">
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
                            {{ getNameByCode(formData.role, roleList) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item" v-if="formData.role == 2">
                <ion-grid>
                    <ion-row @click="onJobTypeCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.job") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.jobTypeCode, jobTypeList) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item" v-if="formData.role == 1">
                <ion-grid>
                    <ion-row @click="onWorkTypeCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.career") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.workTypeCode, workTypeList) }}
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
                            <ion-input class="input-cell" v-model="formData.phone" :placeholder="$t('views.register.input-placeholder')" clearInput></ion-input>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="section-margin" style="margin-bottom: 10px;">
                <ion-button expand="block" color="success" @click="onSubmitClicked">{{ $t("global.submit") }}</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import 'cropperjs/dist/cropper.css';
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
    IonLabel,
    pickerController,
} from "@ionic/vue";
import { arrowBackOutline, checkmarkCircleOutline,checkmarkSharp,closeSharp, person, caretDownOutline, camera, syncOutline } from "ionicons/icons";
import { PhotoPlugin, PhotoPluginFace } from "@/composables/UsePhotoPlugin";
import { ToastUtils } from "@/utils/ToastUtils";
import { ScgApi } from "@/api/ScgApi";
import Cropper from 'cropperjs';
import RightMenu from "@/components/RightMenu.vue";
const photoval: any = "";

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
        IonLabel,
        RightMenu,
    },
    data() {
        return {
            photoData: photoval,
            idCardData1: "",
            idCardData2: "",
            corpParentId: "",
            showLoading: false,
            openCropper: false,
            formData: {
                projectId: "",
                corpId: "",
                teamId: "",
                isTeamLeader: 0,
                workerName: "",
                phone: "",
                workTypeCode: "",
                workTypeName: "",
                recentPhotoFileId: "",
                gender: 1,
                idType: "1",
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
            } as any,
            companyParent: [],
            companyList: [],
            teamList: [],
            workTypeList: [],
            idTypeList: [],
            areaList: [],
            jobTypeList: [],
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
            store: useStore(),
            option: {
                aspectRatio:1/1,
                viewMode:1,
                movable:false,
                rotatable:false,
                scalable:false,
                zoomable:false,
                background:false,
            } as Cropper.Options,
            cropper:null as Cropper | null
        };
    },

    ionViewWillEnter() {
        this.formData.projectId = this.store.getters.getProjectId;
        ScgApi()
            .queryDictionaryTrees({ dictCode: "work_type" })
            .then((res) => {
                this.workTypeList = res.data;
            });
        ScgApi()
            .queryDictionaryTrees({ dictCode: "id_type" })
            .then((res) => {
                this.idTypeList = res.data;
            });
        ScgApi()
            .queryDictionaryTrees({ dictCode: "job_type" })
            .then((res) => {
                this.jobTypeList = res.data;
            });
        ScgApi()
            .queryProjectCorpSelect({ projectId: this.store.getters.getProjectId })
            .then((res) => {
                this.companyParent = res.data;
            })
            .catch((err) => {
                this.$router.replace("/login");
            });
        ScgApi()
            .queryArea({ projectId: this.store.getters.getProjectId })
            .then((res) => {
                this.areaList = res.data;
            });
    },

    setup() {
        return {
            arrowBackOutline,
            checkmarkCircleOutline,
            checkmarkSharp,
            closeSharp,
            person,
            caretDownOutline,
            camera,
            syncOutline,
        };
    },
    methods: {
        convertFileToBase64(file: File){
            return new Promise((resolve, reject) => {
            const reader = new FileReader;
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        })},
        getNameByCode(value: any, list: Array<any>, config?: { code: string; name: string }) {
            const c = config || { code: "code", name: "name" };
            const obj: any = {};
            list.forEach((e: any) => {
                obj[e[c.code]] = e[c.name];
            });
            return obj[value] || null;
        },
        onSubmitClicked(ev: Event) {
            this.formData.areaCodes = this.areaList
                .filter((e: any) => e.isChecked)
                .map((e: any) => e.code)
                .join(",");
            const data: any = { ...this.formData };
            ScgApi()
                .saveWorkerAndProjectWorker(data)
                .then((res: any) => {
                    if (res.code == "00000") {
                        ToastUtils().showSuccess(this.$t("global.success"));
                        this.$router.replace("/main/home");
                    }
                });
        },
        onBackClicked(ev: Event) {
            this.$router.replace("/main/home");
        },

        async onTakeIdCardPhotoFontClicked2(ev: any) {
            const pt1: any = document.getElementById("takeidphoto1");
            pt1.click();
        },

        async onTakeIdCardPhotoBackClicked2(ev: Event) {
            const pt2: any = document.getElementById("takeidphoto2");
            pt2.click();
        },

        async onTakeIdCardPhotoFontClicked(ev: Event) {
            const errorMsg = this.$t("global.take-photo-error");

            const { takePhoto } = PhotoPlugin();
            const photoData = takePhoto();

            photoData.then(
                (value) => {
                    this.showLoading = true;
                    ScgApi()
                        .ocrIdCard({ contentBase64String: value.split("base64,")[1] })
                        .then((res: any) => {
                            if (res.code == "00000") {
                                const cardData = res.data;
                                this.formData.idNumber = cardData.idNumber;
                                this.formData.workerName = cardData.name;
                                this.formData.address = cardData.address;
                                this.formData.birthday = cardData.birthday;
                                this.formData.gender = cardData.gender;
                                this.idCardData1 = "1";
                            }
                        })
                        .finally(() => {
                            this.showLoading = false;
                        });
                },
                (error) => {
                    console.log(error);
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            );
        },
        async testphoto(ev: any) {
            const errorMsg = this.$t("global.take-photo-error");
            const _self = this;

            const files = ev.target.files;
            if (files && files.length > 0) {
                try {
                    const file = files[0];
                    const fileReader = new FileReader();
                    fileReader.onload = function() {
                        let basew64str: any = this.result;
                        basew64str = basew64str.split("base64,")[1];
                        //    console.log("base64===>",basew64str);
                        _self.showLoading = true;
                        ScgApi()
                            .ocrIdCard({ contentBase64String: basew64str })
                            .then((res: any) => {
                                if (res.code == "00000") {
                                    const cardData = res.data;

                                    _self.formData.idNumber = cardData.idNumber;
                                    _self.formData.workerName = cardData.name;
                                    _self.formData.address = cardData.address;
                                    _self.formData.birthday = cardData.birthday;
                                    _self.formData.gender = cardData.gender;
                                    _self.idCardData1 = "1";
                                }
                            })
                            .finally(() => {
                                console.log("takephotodone");
                                _self.showLoading = false;
                            });
                    };
                    fileReader.readAsDataURL(file);
                } catch (e) {
                    console.log("图片转Base64出错" + e.toString());
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            }
        },

        async testphotofan(ev: any) {
            const errorMsg = this.$t("global.take-photo-error");
            const _self = this;
            //  console.log(_self.$options.methods);
            //  console.log(_self.formData);
            //  alert("eeee");
            // const picsfz1 = document.getElementById("takeidphoto1");
            // tslint:disable-next-line
            // console.log("取得input框====>",ev.target);
            // console.log(ev.target.files);
            const files = ev.target.files;
            if (files && files.length > 0) {
                try {
                    const file = files[0];
                    const fileReader = new FileReader();
                    fileReader.onload = function() {
                        let basew64str: any = this.result;
                        basew64str = basew64str.split("base64,")[1];
                        console.log("base64===>", basew64str);
                        _self.showLoading = true;
                        ScgApi()
                            .ocrIdCard({ contentBase64String: basew64str })
                            .then((res: any) => {
                                if (res.code == "00000") {
                                    const cardData = res.data;

                                    _self.formData.startDate = cardData.startDate;
                                    _self.formData.endDate = cardData.endDate;
                                    _self.formData.grantOrg = cardData.grantOrg;
                                    _self.idCardData2 = "1";
                                }
                            })
                            .finally(() => {
                                console.log("takephotodone");
                                _self.showLoading = false;
                            });
                    };
                    fileReader.readAsDataURL(file);
                } catch (e) {
                    console.log("图片转Base64出错" + e.toString());
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            }
        },

        async onTakeIdCardPhotoBackClicked(ev: Event) {
            const errorMsg = this.$t("global.take-photo-error");

            const { takePhoto } = PhotoPlugin();
            const photoData = takePhoto();

            photoData.then(
                (value) => {
                    this.showLoading = true;
                    ScgApi()
                        .ocrIdCard({ contentBase64String: value.split("base64,")[1] })
                        .then((res: any) => {
                            if (res.code == "00000") {
                                const cardData = res.data;
                                this.formData.startDate = cardData.startDate;
                                this.formData.endDate = cardData.endDate;
                                this.formData.grantOrg = cardData.grantOrg;
                                this.idCardData2 = "1";
                            }
                        })
                        .finally(() => {
                            this.showLoading = false;
                        });
                },
                (error) => {
                    console.log(error);
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            );
        },
        async onTakePhotoClicked(ev: Event) {
            const errorMsg = this.$t("global.take-photo-error");

            const { takePhoto } = PhotoPluginFace();
            const photoData = takePhoto();

            photoData.then(
                (value) => {
                    console.log(value);
                    const fileType = value.split(";base64")[0].split(":image/")[1];
                    let type;
                    switch (fileType) {
                        case "jpeg":
                        case "pjpeg":
                            type = "jpg";
                            break;
                        case "png":
                        case "x-png":
                            type = "png";
                            break;
                        case "gif":
                            type = "gif";
                            break;
                    }
                    ScgApi()
                        .postFileBase64String({
                            type: "worker_recent_photo",
                            fileName: new Date().getTime() + "A" + Math.ceil(Math.random() * 10000) + "." + type,
                            contentBase64String: value.split(";base64,")[1],
                        })
                        .then((res) => {
                            this.formData.recentPhotoFileId = res.data.id;
                            this.photoData = value;
                        });
                },
                (error) => {
                    console.log(error);
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            );
        },
        async onTakePhotoClicked2(ev: Event) {
            const pt3: any =document.getElementById("takeidphoto3");
            pt3.click();
        },

        async testphotoface(ev: any) {
            const errorMsg = this.$t("global.take-photo-error");

            const files = ev.target.files;
            if (files && files.length > 0) {
                try {
                    const file = files[0];
                    const basew64str: any = await this.convertFileToBase64(file);
                    this.openCropper = true;
                    const avatar: HTMLImageElement = document.getElementById("avatar") as HTMLImageElement;
                    avatar.src = basew64str;
                    this.cropper = new Cropper(avatar,this.option);
                    
                } catch (e) {
                    console.log("图片转Base64出错" + e.toString());
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            }
        },
        async crop(){
            this.cropper?.crop();
            const base64str: string | undefined = await this.cropper?.getCroppedCanvas().toDataURL();
            const fileType = base64str?.split(";base64")[0].split(":image/")[1];
            //    alert(fileType);
            const contentBase64String = base64str?.split(";base64,")[1];
            let type;
            switch (fileType) {
                case "jpeg":
                case "pjpeg":
                    type = "jpg";
                    break;
                case "png":
                case "x-png":
                    type = "png";
                    break;
                case "gif":
                    type = "gif";
                    break;
            }
            this.showLoading = true;
            ScgApi()
                .postFileBase64String({
                    type: "worker_recent_photo",
                    fileName: new Date().getTime() + "A" + Math.ceil(Math.random() * 10000) + "." + type,
                    contentBase64String,
                })
                .then((res) => {
                    this.formData.recentPhotoFileId = res.data.id;
                    this.photoData = base64str;
                    const inputFile: any = document.getElementById('takeidphoto3');
                    inputFile.value = '';
                    this.openCropper = false;
                    this.cropper?.destroy();
                })
                .finally(() => {
                    this.showLoading = false;
                });



            
        },
        async cancelCrop(){
            const inputFile: any = document.getElementById('takeidphoto3');
            inputFile.value = '';
            this.openCropper = false;
            this.cropper?.destroy();
        },
        async onIdTypeCellClicked(ev: Event) {
            const options = this.idTypeList.map((e: any) => {
                return { text: e.name, value: e.code };
            });
            const columns = [
                {
                    name: "idType",
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
                            this.formData.idType = value.idType.value;
                        },
                    },
                ],
            });
            picker.present();
        },

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
                            this.formData.role = value.role.value;
                            this.formData.workTypeCode = "";
                            this.formData.workTypeName = "";
                            this.formData.jobTypeCode = "";
                            this.formData.jobTypeName = "";
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
                            this.formData.jobTypeCode = value.jobType.value;
                            this.formData.jobTypeName = this.getNameByCode(value.jobType.value, this.jobTypeList);
                        },
                    },
                ],
            });
            picker.present();
        },
        async onWorkTypeCellClicked(ev: Event) {
            const options = this.workTypeList.map((e: any) => {
                return { text: e.name, value: e.code };
            });
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
                            this.formData.workTypeCode = value.workType.value;
                            this.formData.workTypeName = this.getNameByCode(value.workType.value, this.workTypeList);
                        },
                    },
                ],
            });
            picker.present();
        },
        async onGenderCellClicked(ev: Event) {
            const options = this.genderList.map((e: any) => {
                return { text: e.name, value: e.code };
            });
            const columns = [
                {
                    name: "gender",
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
                            this.formData.gender = value.gender.value;
                        },
                    },
                ],
            });

            picker.present();
        },
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
                            this.formData.teamId = value.team.value;
                        },
                    },
                ],
            });
            picker.present();
        },
        async onIsTeamLeaderCellClicked(ev: Event) {
            const options = this.isLeader.map((e: any) => {
                return { text: e.name, value: e.code };
            });

            const columns = [
                {
                    name: "teamLeader",
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
                            this.formData.isTeamLeader = value.teamLeader.value;
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
        //                     this.formData.projectCorpId = value.corp.value;
        //                     const data: any = this.companyList.filter((e: any) => e.id === this.formData.projectCorpId)[0];
        //                     ScgApi()
        //                         .queryProjectCorpTeamSelect({ projectId: this.formData.projectId, corpId: data.corpId })
        //                         .then((res) => {
        //                             this.teamList = res.data;
        //                         });
        //                 },
        //             },
        //         ],
        //     });

        //     picker.present();
        // },
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
                            this.formData.corpId = value.corpParent.value;
                            ScgApi()
                                .queryProjectCorpTeamSelect({ projectId: this.formData.projectId, corpId: this.formData.corpId })
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
        //             .queryProjectCorpSelect({ projectId: this.formData.projectId, corpId: data.corpId })
        //             .then((res) => {
        //                 if (res.data && res.data.length > 0) {
        //                     this.formData.projectCorpId = "";
        //                     this.companyList = res.data;
        //                 } else {
        //                     this.formData.projectCorpId = value;
        //                     this.companyList = [];
        //                     ScgApi()
        //                         .queryProjectCorpTeamSelect({ projectId: this.formData.projectId, corpId: data.corpId })
        //                         .then((res) => {
        //                             this.teamList = res.data;
        //                         });
        //                 }
        //             });
        //     }
        //     this.formData.projectCorpId = "";
        // },
    },
});
</script>

<style scoped>
.fixed-loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    transition: all 1s;
}

.fixed-loading .icon-loading {
    font-size: 80px;
    color: #00aaff;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 3px;
    animation: turn 4s linear infinite;
    transition: all 1s;
}
@keyframes turn {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
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

#takeidphoto1,
#takeidphoto2,
#takeidphoto3 {
    display: none;
}
.cropper-box {
    width: 100%;
    height: 100%;
    background: #000;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
}
.cropper-cancel{
    position: absolute;
    bottom: 20px;
    left: 20%;
    color: #fff;
    font-size: 30px;
}
.cropper-crop{
    position: absolute;
    bottom: 20px;
    right: 20%;
    color: #fff;
    font-size: 30px;
}
</style>
