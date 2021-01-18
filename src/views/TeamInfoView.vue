<template>
    <ion-page style="position:relative;height:100%;">
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
                <ion-title>{{ $t("views.register-team.title") }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <right-menu />
        <ion-content :fullscreen="true">
            <div class="field-col-item">
                <ion-grid>
                    <ion-row>
                        <ion-col class="left-align center-vertical displayonlylabel" size="4">
                            {{ $t("views.team-info.company") }}
                        </ion-col>
                        <ion-col class="right-align displayonly" size="8">
                            {{ formData.corpName }}
                        </ion-col>
                    </ion-row>

                    <ion-row @click="onCompanyTypeCellClicked">
                        <ion-col class="left-align center-vertical displayonlylabel" size="4">
                            {{ $t("views.team-info.company-type") }}
                        </ion-col>
                         <ion-col class="right-align displayonly" size="8">
                           {{ getNameByCode(formData.corpType, companyTypelist, { code: "code", name: "name" }) }}
                        </ion-col>
                    </ion-row>

                    <ion-row @click="onParentIdCellClicked">
                        <ion-col class="left-align center-vertical displayonlylabel" size="4">
                            {{ $t("views.team-info.parent-company") }}
                        </ion-col>
                         <ion-col class="right-align displayonly" size="8">
                            {{ formData.parentCorpName }}
                        </ion-col>
                        
                    </ion-row>

                     <ion-row @click="onSelectTeamCellClicked">
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.team-info.team-name") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                            <input class="input-cell teamname" v-model="formData.name"  />
                        </ion-col>
                     </ion-row>

                </ion-grid>
   
            </div>
            <div class="section-margin" style="margin-bottom: 10px;">
                <ion-button expand="block" class="halfbtn white" @click="createnewteam">{{ $t("views.team-info.delete") }}</ion-button>
                <ion-button expand="block" color="success" class="halfbtn suc" @click="teamselected">{{ $t("views.team-info.submit") }}</ion-button>
            </div>
            


        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
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
import { arrowBackOutline, checkmarkCircleOutline, checkmarkSharp, closeSharp, person, caretDownOutline, camera, syncOutline } from "ionicons/icons";
import { PhotoPlugin, PhotoPluginFace } from "@/composables/UsePhotoPlugin";
import { ToastUtils } from "@/utils/ToastUtils";
import { ScgApi } from "@/api/ScgApi";
import Cropper from "cropperjs";
import RightMenu from "@/components/RightMenu.vue";
const photoval: any = "";

export default defineComponent({
    name: "TeamInfo",
    components: {
        IonPage,
        IonToolbar,
        IonTitle,
        IonContent,
        // IonInput,
        IonButton,
        IonHeader,
        IonButtons,
        IonIcon,
        IonRow,
        IonGrid,
        IonCol,
        // IonCheckbox,
        // IonRadioGroup,
        // IonRadio,
        // IonLabel,
        RightMenu,
    },
    data() {
        return {

            formData: {
                id:"2b772bca-0b02-4b12-b39d-849422ac7e2f",
                projectId:"cf6c45c1-2365-11eb-be30-0242ac110000",
                projectCorpId:"c8bb0392-27fd-11eb-b39a-0242ac110001",
                corpId:"663448d9-c1aa-45a2-81b5-f945d951c740",
                corpName:"上海珊服劳务有限公司",
                corpType:"001",
                parentCorpId:"663448d9-c1aa-45a2-81b5-f945d951c740",
                parentCorpName:"上海珊服劳务有限公司",
                name:"木工班组"
            } as any,
            
            companyTypelist: [
                {code:"001",name:"劳务外包"},
                {code:"002",name:"专业外包"},
                {code:"003",name:"设备外包"}
            ],
          
        };
    },

    ionViewWillEnter() {
      const query = this.$route.query;

       ScgApi().getProjectCorpTeam({id: query.id}).then(res=>{
      this.formData = res.data;
    }).catch((err) => {
      // this.$router.replace('/login');
    }),
   
   ScgApi()
            .queryDictionaryTrees({ dictCode: "corp_type" })
            .then((res) => {
                this.companyTypelist = res.data;
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
         getNameByCode(value: any, list: Array<any>, config?: { code: string; name: string }) {
            const c = config || { code: "code", name: "name" };
            const obj: any = {};
            list.forEach((e: any) => {
                obj[e[c.code]] = e[c.name];
            });
            return obj[value] || null;
        },
       
        async onSubmitClicked(){
            console.log(this.formData);
        }
    }
       
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
    z-index:9999999;
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
    --background: #ffffff;
}

.icon.ion-ios-arrow-forward {
    font-size: 18px;
    float: right;
    margin-right: 8px;
}

ion-row{
    height: 50px;
    line-height: 50px;
}

.right-align{
    text-align: right;
}

.input-cell.teamname{
    height:30px;
    outline: none;
    border: none;
    text-align: right;
    width: 100%;
}

.displayonly{
    top:15px;
    height: 30px;
    background-color: #EEE;
    line-height: 20px;
}

.displayonlylabel{

    height: 30px;
}

.halfbtn.white{
   width: 40%;
   float: right;
   margin-right: 20px;
    color: #FFF;
    background-color: #FFF;

}

.halfbtn.suc{
    width: 40%;
    float: left;
    margin-left: 20px;
}




</style>
