<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="onBackClicked">
                        <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{ workerData.status == 1 ? $t("views.worker-leave.title") : $t("views.worker-leave.enter-title") }}</ion-title>
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

            <div class="field-col">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align" size="4">
                            {{ $t("views.worker-leave.name") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            {{ workerData.workerName }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <div class="field-col">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical" size="4">
                            {{  workerData.status == 1 ? $t("views.worker-leave.leave-time") : $t("views.worker-leave.enter-time")}}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            <ion-datetime class="wholeline" v-model="workerData.leaveTime" display-format="YYYY-MM-DD"></ion-datetime>
                        </ion-col>
                        <ion-col class="right-align center-vertical" size="1">
                            <ion-icon class="cell-icon" :icon="timeOutline"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="section-margin" style="margin-bottom: 10px;">
                <ion-button expand="block" @click="onLeaveClicked">{{ workerData.status == 1 ? $t("views.worker-leave.leave") : $t("views.worker-leave.enter") }}</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonGrid, IonRow, IonCol, IonDatetime, IonTitle } from "@ionic/vue";
import { arrowBackOutline, person, timeOutline } from "ionicons/icons";
import { ScgApi } from "@/api/ScgApi";
import { ToastUtils } from "@/utils/ToastUtils";
import RightMenu from '@/components/RightMenu.vue';

export default defineComponent({
    name: "WorkerLeave",
    components: {
        IonPage,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonContent,
        IonHeader,
        IonGrid,
        IonRow,
        IonCol,
        IonDatetime,
        IonTitle,
        RightMenu
    },
    data() {
        return {
            workerData: {
                id: "",
                workerName: "",
                projectId: "",
                workerId: "",
                status: null,
                leaveTime:"",
                recentPhotoFileId:""
            },
            photoData:""
        };
    },
    setup() {
        return {
            arrowBackOutline,
            person,
            timeOutline,
        };
    },
    ionViewWillEnter() {
        const query = this.$route.query;
        ScgApi()
            .getProjectWorker({ id: query.id })
            .then((res: any) => {
                this.workerData.id = res.data.id;
                this.workerData.workerName = res.data.workerName;
                this.workerData.projectId = res.data.projectId;
                this.workerData.workerId = res.data.workerId;
                this.workerData.status = res.data.status;
                ScgApi().queryFile({relationId:res.data.workerId,type:"worker_recent_photo"}).then((res: any)=>{
                    this.photoData = res.data[0].fileUrl;
                });
            });
    },
    methods: {
        onBackClicked(ev: Event) {
            this.$router.replace({path: '/worker-info', query: {id: this.$route.query.id}});
        },
        onLeaveClicked(ev: Event) {
            if(!this.workerData.leaveTime){
                ToastUtils().showError('warning',1500,this.workerData.status === 1 ? this.$t('view.worker-leave.leave-message'):this.$t('view.worker-leave.enter-message'))
            }
            ScgApi()
                .saveProjectWorkerEntryExit({
                    projectId: this.workerData.projectId,
                    workerId: this.workerData.workerId,
                    status: this.workerData.status === 1 ? 0 : 1,
                    date: this.workerData.leaveTime.split("T")[0],
                })
                .then((res: any) => {
                    if (res.code == "00000") {
                        ToastUtils().showSuccess(this.$t("global.success"));
                        this.$router.replace({ path: "/worker-list", query: { id: this.workerData.projectId } }) 
                    }
                });
            console.log(this.workerData.leaveTime);
            return;
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
    min-height: 50px;
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

.wholeline {
    width: 185%;
    left: -65%;
    text-align: left;
    text-indent: 68%;
}
</style>
