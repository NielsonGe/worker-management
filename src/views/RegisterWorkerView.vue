<template>
    <ion-page>
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

        <ion-content :fullscreen="true">
            <div class="photo-panel">
                <div class="photo-box">
                    <img v-if="photoData != ''" :src="photoData" />
                    <ion-icon class="photo-icon" v-if="photoData == ''" color="dark" :icon="person" />
                </div>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onIdTypeCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.idType") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.idType, idTypeList) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col">
                <ion-grid>
                    <ion-row @click="onTakeIdCardPhotoFontClicked()">
                        <ion-col class="left-align" size="11">
                            {{ $t("views.register.upload-id-card-font") }}
                        </ion-col>
                        <ion-col size="1">
                            <ion-icon v-if="idCardData1 != ''" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            <ion-icon v-if="idCardData1 == ''" class="cell-icon" color="dark" :icon="camera" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item">
                <ion-grid>
                    <ion-row @click="onTakeIdCardPhotoBackClicked()">
                        <ion-col class="left-align" size="11">
                            {{ $t("views.register.upload-id-card-back") }}
                        </ion-col>
                        <ion-col size="1">
                            <ion-icon v-if="idCardData2 != ''" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            <ion-icon v-if="idCardData2 == ''" class="cell-icon" color="dark" :icon="camera" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

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
                            <ion-input class="input-cell" v-model="formData.name" :placeholder="$t('views.register.input-placeholder')" clearInput />
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
                        <ion-col class="right-align" size="8">
                            {{ getNameByCode(formData.gender, genderList) }}
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
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.startDate") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-datetime :value="formData.startDate" display-format="YYYY-MM-DD"></ion-datetime>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.endDate") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <ion-datetime :value="formData.endDate" display-format="YYYY-MM-DD"></ion-datetime>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row @click="onTakePhotoClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.photo") }}
                        </ion-col>
                        <ion-col class="right-align blue-text" size="8">
                            <ion-icon v-if="photoData != ''" class="cell-icon" color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            <ion-icon v-if="photoData == ''" class="cell-icon" color="dark" :icon="camera" />
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
                            {{ getNameByCode(corpParentId, companyParent,{code:"corpId",name:"corpName"}) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item" v-if="companyList && companyList.length>0">
                <ion-grid>
                    <ion-row @click="onCompanyCellClicked">
                        <ion-col class="left-align" size="4">
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.corpId, companyList,{code:"corpId",name:"corpName"}) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item section-margin">
                <ion-grid>
                    <ion-row @click="onTeamIdCellClicked">
                        <ion-col class="left-align" size="4">
                            {{ $t("views.register.teamId") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.teamId, teamList,{code:"id",name:"name"}) }}
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
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.isTeamLeader, isLeader) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item">
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
    pickerController,
} from "@ionic/vue";
import { arrowBackOutline, checkmarkCircleOutline, person, caretDownOutline, camera } from "ionicons/icons";
import { PhotoPlugin } from "@/composables/UsePhotoPlugin";
import { ToastUtils } from "@/utils/ToastUtils";
import { ScgApi } from "@/api/ScgApi";
import { XFUtils } from "@/utils/XFUtils";

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
    },
    data() {
        return {
            photoData: "",
            idCardData1: "",
            idCardData2: "",
            corpParentId: "",
            formData: {
                corpId: "",
                teamId: "",
                isTeamLeader: "",
                name: "",
                phone: "",
                workTypeCode: "",
                workTypeName: "",
                recentPhotoFileId: "",
                gender: 0,
                idType: "",
                idNumber: "",
                birthday: "",
                address: "",
                grantOrg: "",
                startDate: "",
                endDate: "",
                nationCode:"H",
                nationName:"汉",
            },
            companyParent: [],
            companyList: [],
            teamList: [],
            workTypeList: [],
            idTypeList: [],
            genderList: [
                {
                    name: this.$t("global.gender-type-0"),
                    code: 0,
                },
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
        };
    },
    mounted() {
        const s = useStore();
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
            .queryProjectCorpSelect({ projectId: "fc674d8e-2365-11eb-be30-0242ac110000" })
            .then((res) => {
                this.companyParent = res.data;
            });
    },
    setup() {
        return {
            arrowBackOutline,
            checkmarkCircleOutline,
            person,
            caretDownOutline,
            camera,
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
        onSubmitClicked(ev: Event) {
            console.log(this.formData);
            ScgApi().saveWorker(this.formData).then((res: any)=>{
              if(res.code == '00000'){
                ToastUtils().showSuccess(this.$t("global.success"));
                this.$router.replace("/main/home");
              }
            })
        },
        onBackClicked(ev: Event) {
            this.$router.replace("/main/home");
        },
        async onTakeIdCardPhotoFontClicked(ev: Event) {
            const errorMsg = this.$t("global.take-photo-error");

            const { takePhoto } = PhotoPlugin();
            const photoData = takePhoto();

            photoData.then(
                (value) => {
                    XFUtils()
                        .identifyIdCard(value)
                        .then((res: any) => {
                            if (res.status == 200 && res.data.code == 0) {
                                const cardData = res.data.data;
                                if (cardData.error_code == "0") {
                                    this.formData.idNumber = cardData.id_number;
                                    this.formData.name = cardData.name;
                                    this.formData.address = cardData.address;
                                    this.formData.birthday = cardData.birthday.replace(/[^\\u0000-\\u00FF]/g, "-").replace(/(-*$)/g, "");
                                    this.formData.gender = cardData.sex === "男" ? 1 : cardData.sex === "女" ? 2 : 0;
                                }
                            }
                        });
                },
                (error) => {
                    console.log(error);
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            );
        },
        async onTakeIdCardPhotoBackClicked(ev: Event) {
            const errorMsg = this.$t("global.take-photo-error");

            const { takePhoto } = PhotoPlugin();
            const photoData = takePhoto();

            photoData.then(
                (value) => {
                    XFUtils()
                        .identifyIdCard(value)
                        .then((res: any) => {
                            if (res.status == 200 && res.data.code == 0) {
                                const cardData = res.data.data;
                                if (cardData.error_code == "0") {
                                    this.formData.startDate = cardData.validity ? cardData.validity.split("-")[0].replace(/\./g, "-") : "";
                                    this.formData.endDate = cardData.validity ? cardData.validity.split("-")[1].replace(/\./g, "-") : "";
                                    this.formData.grantOrg = cardData.issue_authority;
                                }
                            }
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

            const { takePhoto } = PhotoPlugin();
            const photoData = takePhoto();

            photoData.then(
                (value) => {
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
                            bucketName: "RecentPhoto",
                            fileName: new Date().getTime() + "A" + Math.ceil(Math.random() * 10000) + "." + type,
                            contentBase64String: value.split('data:image/jpeg;base64,')[1],
                        })
                        .then((res) => {
                            this.formData.recentPhotoFileId = res.data.id;
                        });
                },
                (error) => {
                    console.log(error);
                    ToastUtils().showError("danger", 2000, errorMsg);
                }
            );
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
                            this.formData.workTypeName = this.getNameByCode(value.workType.value,this.workTypeList);
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
        async onCompanyCellClicked(ev: Event) {
            const options = this.companyList.map((e: any) => {
                return { text: e.corpName, value: e.corpId };
            });

            const columns = [
                {
                    name: "corp",
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
                            this.formData.corpId = value.corp.value;
                            ScgApi().queryProjectCorpTeamSelect({ projectId: "fc674d8e-2365-11eb-be30-0242ac110000",corpId: this.formData.corpId })
                            .then((res) => {
                                this.teamList = res.data;
                            });
                        },
                    },
                ],
            });

            picker.present();
        },
        async onCompanyParentCellClicked(ev: Event) {
            const options = this.companyParent.map((e: any) => {
                return { text: e.corpName, value: e.corpId };
            });
            console.log("corpParent",options);
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
                            this.corpParentId = value.corpParent.value;
                            this.corpParentChange(value.corpParent.value);
                        },
                    },
                ],
            });

            picker.present();
        },
        corpParentChange(value: any) {
            const s = useStore();
            if (value) {
                ScgApi()
                    .queryProjectCorpSelect({ projectId: "fc674d8e-2365-11eb-be30-0242ac110000", corpId: value })
                    .then((res) => {
                      if(res.data && res.data.length>0){
                        this.formData.corpId = '';
                        this.companyList = res.data;
                      }else{
                        this.formData.corpId = this.corpParentId;
                        ScgApi().queryProjectCorpTeamSelect({ projectId: "fc674d8e-2365-11eb-be30-0242ac110000",corpId: this.formData.corpId })
                        .then((res) => {
                            this.teamList = res.data;
                        });
                      }
                    });
            }
            this.formData.corpId = "";
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

.input-cell {
    height: 20px;
}
</style>
