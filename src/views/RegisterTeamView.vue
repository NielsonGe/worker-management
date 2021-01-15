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
        <div class="companylistblk">
            <company-list @sentcompany="getCompany" />
        </div>
        <div class="parentcompanylistblk">
            <company-list @sentcompany="getParentCompany" />
        </div>
        <ion-content :fullscreen="true" class="mainblk">
            <div class="teamrigister step1">
            <div class="field-col-item">
                <ion-grid>
                    <ion-row  @click="onCompanyCellClicked">
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register-team.company") }}
                        </ion-col>
                        <ion-col class="right-align corpname" size="8">
                            {{ formData.companyName }}
                        </ion-col>
                    </ion-row>

                    <ion-row @click="onCompanyTypeCellClicked">
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register-team.company-type") }}
                        </ion-col>
                        <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.companyTypeId, companyTypelist, { code: "id", name: "companyType" }) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col>
                    </ion-row>

                    <ion-row @click="onParentIdCellClicked2">
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register-team.parent-company") }}
                        </ion-col>
                        <!-- <ion-col class="right-align" size="7">
                            {{ getNameByCode(formData.parentCompanyId, parentCompanylist, { code: "id", name: "companyName" }) }}
                        </ion-col>
                        <ion-col class="right-align" size="1">
                            <ion-icon class="cell-icon" :icon="caretDownOutline"></ion-icon>
                        </ion-col> -->
                         <ion-col class="right-align corpname" size="8">
                            {{ formData.parentCompanyName }}
                        </ion-col>
                    </ion-row>

                     <!-- <ion-row @click="onSelectTeamCellClicked"> -->
                     <ion-row style="border:none">
                        <ion-col class="left-align center-vertical" size="4">
                            {{ $t("views.register-team.team-name2") }}
                        </ion-col>
                        <ion-col class="right-align" size="8">
                           <!-- <i class="icon ion-ios-arrow-forward"></i> -->
                        </ion-col>
                     </ion-row>
                    <div class="teamlistblk">
                    <div  v-for="(entry, key) in teamListDic" :key="key">
                    <ion-row class="teamitem">
                    <ion-col class="right-align center-vertical" size="1">   
                   
                     </ion-col>
                     <ion-col class="right-align" size="11">
                    <ion-label>{{ entry.name }}</ion-label>
                     </ion-col>
                     </ion-row>
                    </div>
                     <div class="createnewitembtn step1">
                        <!-- <ion-button expand="block" class="halfbtn white" @click="createnewteam">{{ $t("views.register-team.create-new-team") }}</ion-button> -->
                        <a  expand="block"  class="halfbtn" @click="createnewteam">{{ $t("views.register-team.create-new-team") }}</a>
   
                        <!-- <ion-button expand="block" color="success" class="halfbtn suc" @click="teamselected">{{ $t("global.confirm") }}</ion-button> -->
                    </div>
                    <div class="createnewitembtn step2 hide">
                        <input class="newteamtext" type="text" v-model="formData.newteam" />
                        <ion-button expand="block" color="success" class="short suc" @click="newteamadded">{{ $t("views.register-team.add-over") }}</ion-button>
                        <ion-button expand="block" class="short white" @click="docreateteam">{{ $t("views.register-team.create") }}</ion-button>                  
                    </div>


                     </div>


                </ion-grid>
                <!-- <ion-grid class="selectedteams" >
                    <div v-for="(entry, key) in formData.teamList.split(',')" :key="key">
                     <ion-row>
                        <ion-col class="right-align center-vertical" size="1">   

                        </ion-col>
                        <ion-col class="right-align center-vertical" size="11">   
                          <ion-label>{{ entry}}</ion-label>
                        </ion-col>
                     
                     </ion-row>
                    </div>

                </ion-grid> -->
            </div>
            <div class="section-margin" style="margin-bottom: 20px;">
                <ion-button expand="block" color="success" @click="onSubmitClicked">{{ $t("global.submit") }}</ion-button>
            </div>
            </div>
            <!-- <div class="teamrigister step2 hide">
                <div v-for="(entry, key) in teamListDic" :key="key">
                     <ion-row @click="onSelectTeamCellClicked">
                         <ion-col class="right-align center-vertical" size="1">   </ion-col>
                     <ion-col class="right-align center-vertical" size="1">   
                    <input type="checkbox" class="teamitem" v-model="entry.isChecked"  />
                     </ion-col>
                     <ion-col class="right-align" size="10">
                    <ion-label>{{ entry.name }}</ion-label>
                     </ion-col>
                     </ion-row>
                </div>
                <div class="createnewitembtn step1">
                    <ion-button expand="block" class="halfbtn white" @click="createnewteam">{{ $t("views.register-team.create-new-team") }}</ion-button>
                    <ion-button expand="block" color="success" class="halfbtn suc" @click="teamselected">{{ $t("global.confirm") }}</ion-button>
                </div>
                <div class="createnewitembtn step2 hide">
                    <input class="newteamtext" type="text" v-model="formData.newteam" />
                    <ion-button expand="block" color="success" class="short suc" @click="newteamadded">{{ $t("global.cancel") }}</ion-button>
                    <ion-button expand="block" class="short white" @click="docreateteam">{{ $t("views.register-team.create") }}</ion-button>                  
                </div>

            </div> -->


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
import CompanyList from "@/components/CompanyList.vue";
import Cropper from "cropperjs";
import RightMenu from "@/components/RightMenu.vue";
const photoval: any = "";

export default defineComponent({
    name: "RegisterTeam",
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
        CompanyList
    },
    data() {
        return {

            formData: {
                projectId: "",
                parentCompanyId: "",
                parentCompanyName: ">",
                companyTypeId: "",
                corpId: "",
                teamId: "",
                companyName: ">",
                teamList: "",
                newteam: ""
            } as any,
            // parentCompanylist: [
            //     {id:"1",companyName:"大顺建筑设备有限公司"},
            //     {id:"2",companyName:"航大建筑设备有限公司"},
            //     {id:"3",companyName:"泰达建筑设备有限公司"}
            // ],
            
            companyTypelist: [
                {id:"1",companyType:"劳务外包"},
                {id:"2",companyType:"专业外包"},
                {id:"3",companyType:"设备外包"}
            ],
            teamListDic: [
     
            ] as any
        };
    },

    // ionViewWillEnter() {
      
   
        
        
    // },

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
        //   async onParentIdCellClicked(ev: Event) {
        //     const options = this.parentCompanylist.map((e: any) => {
        //         return { text: e.companyName, value: e.id };
        //     });
        //     const columns = [
        //         {
        //             name: "parentCompany",
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
        //                     this.formData.parentCompanyId = value.parentCompany.value;
        //                 },
        //             },
        //         ],
        //     });
        //     picker.present();
        // },

        async onParentIdCellClicked2() {
            document.querySelector(".parentcompanylistblk")?.classList.add("show");
            document.querySelector(".mainblk")?.classList.add("hide");
        },
         

        async onCompanyCellClicked() {
            document.querySelector(".companylistblk")?.classList.add("show");
            document.querySelector(".mainblk")?.classList.add("hide");
            
        },


        async getCompany(item: any) {
// console.log("getCompany====>",item)
// alert(item.companyName)
            this.formData.companyName = item.companyName;
            this.formData.corpId = item.id;
            document.querySelector(".companylistblk")?.classList.remove("show");
            document.querySelector(".mainblk")?.classList.remove("hide")

        },

        async getParentCompany(item: any) {
// console.log("getCompany====>",item)
// alert(item.companyName)
            this.formData.parentCompanyName = item.companyName;
            this.formData.parentCompanyId = item.id;
            document.querySelector(".parentcompanylistblk")?.classList.remove("show");
            document.querySelector(".mainblk")?.classList.remove("hide")

        },

          async onCompanyTypeCellClicked(ev: Event) {
            const options = this.companyTypelist.map((e: any) => {
                return { text: e.companyType, value: e.id };
            });
            const columns = [
                {
                    name: "companyTypes",
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
                            this.formData.companyTypeId = value.companyTypes.value;
                        },
                    },
                ],
            });
            picker.present();
        },

        async onSelectTeamCellClicked(){
            document.querySelector(".teamrigister")?.classList.add("hide");
            document.querySelector(".teamrigister.step2")?.classList.remove("hide");
        },
        async createnewteam(){
            document.querySelector(".createnewitembtn")?.classList.add("hide");
            document.querySelector(".createnewitembtn.step2")?.classList.remove("hide");
        },
        async docreateteam(){
            // alert(this.formData.newteam);
            const ind = String(this.teamListDic.length + 1) ;
            const teamListDicItem = {
                id: ind,
                name: this.formData.newteam,
                isChecked: false
            };
            this.teamListDic.push(teamListDicItem);
            this.formData.newteam = "";

        },
        async newteamadded(){
            if(this.formData.newteam !== ""){
            const ind = String(this.teamListDic.length + 1) ;
            const teamListDicItem = {
                id: ind,
                name: this.formData.newteam,
                isChecked: false
            };
            this.teamListDic.push(teamListDicItem);
            this.formData.newteam = "";}
            document.querySelector(".createnewitembtn.step2")?.classList.add("hide");
            document.querySelector(".createnewitembtn.step1")?.classList.add("hide");
        },
        async teamselected(){
            // this.formData.teamList = this.teamListDic
            //     .filter((e: any) => e.isChecked)
            //     .map((e: any) => e.name)
            //     .join(",");
            //     //  console.log("check",this.teamListDic);
            // // alert(this.formData.teamList );
            // document.querySelector(".teamrigister.step2")?.classList.add("hide");
            document.querySelector(".createnewitembtn.step1")?.classList.add("hide");
             document.querySelector(".createnewitembtn.step2")?.classList.add("hide");
           
        },
        async onSubmitClicked(){
            this.formData.teamList = this.teamListDic.map((e: any) => e.name).join(",");
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

.mainblk.hide{
   display: none;
}

.companylistblk{
    display: none;
    z-index:10;
    position: absolute;
    top:40px;
    width: 100%;
}

.companylistblk.show{
    display: block;
}

.parentcompanylistblk{
    display: none;
    z-index:10;
    position: absolute;
    top:40px;
    width: 100%;
}

.parentcompanylistblk.show{
    display: block;
}


.icon.ion-ios-arrow-forward {
    font-size: 18px;
    float: right;
    margin-right: 8px;
}

.step1 ion-row{
    border-bottom: 1Px solid #EFEFEF;
    min-height: 50px;
    line-height: 50px;
}

.step2 ion-row{
    border-bottom: 1Px solid #EFEFEF;
    min-height: 30px;
    line-height: 30px;
}

.step1  ion-row.teamitem{
     border-bottom: none;
    min-height: 30px;
    line-height: 30px;
}

.step1  .selectedteams ion-row{
    border-bottom: none;
    min-height: 40px;
    line-height: 40px;
}

.teamrigister.hide{
    display:none;
}

.halfbtn.white{
   width: 40%;
   float: left;
   margin-left: 20px;
    color: #FFF;
    background-color: #FFF;

}

.halfbtn.suc{
    width: 40%;
    float: right;
    margin-right: 20px;
}

.newteamtext{
    width: 40%;
    height: 30px;
    float: left;
    margin-left:20px;
}

.createnewitembtn .short{
    width: 60px;
    height: 26px;
    float: right;
    margin-right:20px ;
    border-radius: 2px;
}

.createnewitembtn.hide{
    display:none;
}

.teamlistblk{
   
   min-height:230px;
}

.section-margin{
   float:left;
    width: 90%;
    margin-left:5%;
    margin-top: 20px;
}

.right-align.corpname{
    text-align: right;
}
</style>
