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
                            {{ worker.name }}
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
                            {{ getNameByCode(corpParentId, companyParent, { code: "corpId", name: "corpName" }) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col-item" v-if="companyList && companyList.length > 0">
                <ion-grid>
                    <ion-row @click="onCompanyCellClicked">
                        <ion-col class="left-align" size="4"> </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(worker.projectCorpId, companyList, { code: "corpId", name: "corpName" }) }}
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
                            {{ getNameByCode(worker.teamId, teamList,{code:"id",name:"name"}) }}
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
                            {{ getNameByCode(worker.isTeamLeader, isLeader) }}
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

            <div class="section-margin" style="margin-bottom: 10px;">
                <ion-button v-if="worker.status == 1" expand="block" color="danger" @click="onLeaveClicked">{{ $t("views.worker-info.leave") }}</ion-button>
                <ion-button v-if="worker.status == 0" expand="block" color="primary" @click="onLeaveClicked">{{ $t("views.worker-info.enter") }}</ion-button>
                <ion-button expand="block" color="success" @click="onModifyClicked">{{ $t("views.worker-info.submit") }}</ion-button>
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
    pickerController,
} from "@ionic/vue";
import { arrowBackOutline, checkmarkCircleOutline, person, caretDownOutline } from "ionicons/icons";
import WorkerInfo from "@/models/WorkerInfo";
import CompanyInfo from "@/models/CompanyInfo";
import { getWorkerInfo } from "@/data/WorkerFakeData";
import { getCompanyList, getCompanyInfo } from "@/data/CompanyFakeData";
import { ScgApi } from "@/api/ScgApi";
import { useStore } from "vuex";

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
            corpParentId: "",
            companyParent: [],
            companyList: [],
            teamList: [],
            workTypeList: [],
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
            worker: {
                id: "",
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
                nationCode: "H",
                nationName: "汉",
                status:0
            },
            workerData: {},
        };
    },
    mounted() {
        const query = this.$route.query;
        ScgApi()
            .getProjectWorker({id:query.id})
            .then((res: any) => {
                this.workerData = res.data;
                const {
                    id,
                    projectCorpId: corpId,
                    teamId,
                    isTeamLeader,
                    workerName:name,
                    phone,
                    workTypeCode,
                    workTypeName,
                    recentPhotoFileId,
                    gender,
                    idType,
                    idNumber,
                    birthday,
                    address,
                    grantOrg,
                    startDate,
                    endDate,
                    nationCode,
                    nationName,
                    status
                } = res.data;
                this.worker = {
                    id,
                    corpId,
                    teamId,
                    isTeamLeader,
                    name,
                    phone,
                    workTypeCode,
                    workTypeName,
                    recentPhotoFileId,
                    gender,
                    idType,
                    idNumber,
                    birthday,
                    address,
                    grantOrg,
                    startDate,
                    endDate,
                    nationCode,
                    nationName,
                    status
                };
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
            this.$router.push({ path: "/worker-leave", query: {id:query.id} });
        },
        onModifyClicked(ev: Event) {
            return;
        },
        onBackClicked(ev: Event) {
            this.$router.replace("/main/home");
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
                            this.worker.workTypeCode = value.workType.value;
                            this.worker.workTypeName = this.getNameByCode(value.workType.value, this.workTypeList);
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
                            this.worker.corpId = value.corp.value;
                            ScgApi()
                                .queryProjectCorpTeamSelect({ projectId: "fc674d8e-2365-11eb-be30-0242ac110000", corpId: this.worker.corpId })
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
            console.log("corpParent", options);
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
                        if (res.data && res.data.length > 0) {
                            this.worker.corpId = "";
                            this.companyList = res.data;
                        } else {
                            this.worker.corpId = this.corpParentId;
                            ScgApi()
                                .queryProjectCorpTeamSelect({ projectId: "fc674d8e-2365-11eb-be30-0242ac110000", corpId: this.worker.corpId })
                                .then((res) => {
                                    this.teamList = res.data;
                                });
                        }
                    });
            }
            this.worker.corpId = "";
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
</style>
