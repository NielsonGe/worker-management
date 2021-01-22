<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="onBackClicked()">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('views.worker-list.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- <right-menu /> -->
    <div class="addworker" @click="addWorker">+</div>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="11">
            <ion-input class="input-cell search-bar" @ionChange="changeValue($event)" v-model="searchText.workerName" :placeholder="$t('views.worker-list.search-placeholder')" clearInput />
          </ion-col>
          <!-- <ion-col style="text-align:center;" size="2">
            <div class="sort-text" @click="onSortClicked">{{ $t('views.worker-list.sort') }}<span><ion-icon class="sort-icon" :icon="codeOutline"></ion-icon></span></div>
          </ion-col> -->
          <ion-col size="1">
            <div class="sort-career-icon" @click="onFilterClicked2"><ion-icon :icon="funnel"></ion-icon></div>
           </ion-col>
           <!-- <ion-col size="1">
            <div class="sort-career-icon" @click="onSearchChanged()"><ion-icon  :icon="search"></ion-icon></div>
          </ion-col> -->
        </ion-row>
      </ion-grid>
      <div class="filterblk">
        <div class="filteritem" @click="onStatusCellClicked">
          <div class="filtertitle">{{ $t("views.worker-list.status") }}</div>
          <div class="content"> {{ getNameByCode(searchText.entryStatus, statusList, { code: "id", name: "name" }) }}
                <i class="icon ion-arrow-down-b show"></i>
             </div>
          
        </div>
        <div class="filteritem" @click="onCompanyCellClicked">
            <div class="filtertitle">{{ $t("views.worker-list.company") }}</div>
             <div class="content"> {{ getNameByCode(searchText.corpId, companyList, { code: "id", name: "name" }) }}

                <i class="icon ion-arrow-down-b show"></i>
             </div>
                                 
        </div>
        <div class="filteritem" @click="onTeamIdCellClicked">
  
          <div class="filtertitle">{{ $t("views.worker-list.team") }}</div>
           <div class="content"> {{ getNameByCode(searchText.teamName, teamList, { code: "id", name: "name" }) }}

                <i class="icon ion-arrow-down-b show"></i>
           </div>

        </div>
        <div class="section-margin" style="margin-bottom: 10px;">
                <ion-button expand="block" class="halfbtn cancel" @click="cancelFilter">{{ $t("global.cancel") }}</ion-button>
                <ion-button expand="block" color="success" class="halfbtn confirm" @click="confirmFilter">{{ $t("global.confirm") }}</ion-button>
        </div>
      </div>
      <ion-list>
        <ion-item class="cell" lines="full" v-for="item in workerList" :key="item.id" @click="onWokerCellClicked(item.id)">
          <ion-grid>
            <ion-row>
              <ion-col size="3">
                {{ item.workerName }}
              </ion-col>
              <ion-col size="9" class="right">
                {{ item.teamName }}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="8">
                <span :style="{'color': (item.entryDate == item.exitDate && item.entryDate == '0001-01-01 00:00:00') ? '' : getStatusColor(item.status)  }">{{ ((item.entryDate == item.exitDate) && (item.entryDate == "0001-01-01 00:00:00")) ? $t('views.worker-list.register-only') : getWorkerStatusName(item.status) }}</span>
              </ion-col>
              <ion-col size="4" class="right">
                {{ item.workTypeName }}
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonItem, IonSearchbar, IonIcon, popoverController, pickerController } from '@ionic/vue';
import WorkerInfo from '@/models/WorkerInfo';
import { arrowBackOutline, codeOutline, funnel, search, caretDownOutline } from 'ionicons/icons';
import { getWorkerList } from '@/data/WorkerFakeData';
import { useRoute, useRouter } from 'vue-router';
import LeaveFilterPopoverView from '@/views/LeaveFilterPopoverView.vue'
import TeamAndCompanyFilterPopoverView from '@/views/TeamAndCompanyFilterPopoverView.vue'
import { ScgApi } from '@/api/ScgApi';
import { useStore } from 'vuex';
// import RightMenu from '@/components/RightMenu.vue';

export default defineComponent({
  name: 'WorkerListView',
  components: {
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    // RightMenu
  },
  data() {
    return {
      searchText: {
        workerName:"",
        entryStatus:"",
        corpId:"",
        // teamId:"",
        teamName:""
        
      },
      workerList: [],
      companyList: [] as any,
      statusList: [
        {id: "", name:"全部"},
        {id: "0", name:"离场"},
        {id: "1", name:"在场"}
      ],
      teamList: [] as any,
      teamListAll: [],
      sort: 0,
      career: 0,
      gender: 0,
      store:useStore(),
      
    }
  },
  ionViewWillEnter() {
    ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50,...this.searchText}).then(res=>{
      this.workerList = res.data.rows;
    }).catch((err) => {
      // this.$router.replace('/login');
    }),

     ScgApi()
            .queryProjectCorpSelect({ projectId: this.store.getters.getProjectId })
            .then((res) => {
                this.companyList = res.data;
                
                this.companyList.unshift({id: "", name: "全部"});
            })

     ScgApi().queryTeamList({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:100}).then(res=>{
      this.teamListAll = res.data.rows;


      // console.log("name====>",name);
      this.teamList = this.teamListAll.map((item: any, index) => {
          // return Object.assign({},{name:item.name})
          return item.name
      })
      this.teamList = Array.from(new Set(this.teamList));

      this.teamList = this.teamList.map((item: any) => {
          return Object.assign({},{id:item, name:item})
          
      })
      this.teamList.unshift({id: "", name: "全部"});
      console.log("teamlist===>",this.teamList);
       
    })


  },
  setup() {
    const route = useRoute();

    const query = route.query;

    return {
      arrowBackOutline,
      codeOutline,
      funnel,
      search
    }
  },
  methods: {
    changeValue(event: any){
      this.searchText.workerName = event.detail.value;
      this.onSearchChanged();
    },
    onSearchChanged() {
      // ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50,workerName:this.searchText.workerName}).then(res=>{
      //   this.workerList = res.data.rows;
      // })

      ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50,...this.searchText}).then(res=>{
        this.workerList = res.data.rows;
      })
    },

    confirmFilter() {
      ScgApi().queryProjectWorkerPaging({projectId:this.store.getters.getProjectId,pageIndex:1,pageSize:50,...this.searchText}).then(res=>{
        this.workerList = res.data.rows;
        document.querySelector(".filterblk.show")?.classList.remove("show");
      })
    },
    cancelFilter() {
      this.searchText.corpId = "";
      // this.searchText.teamId = "";
      this.searchText.teamName = "";
      this.searchText.entryStatus = "0";
      document.querySelector(".filterblk.show")?.classList.remove("show");
    },


    getStatusColor(status: number) {
      switch(status) {
        case 0: return 'red';
        case 1: return 'black';
        default: return 'black';
      }
    },
    getCareerTypeName(type: string): string {
      switch(type) {
        case '0': return this.$t('global.career-type-0');
        case '1': return this.$t('global.career-type-1');
        case '2': return this.$t('global.career-type-2');
        case '3': return this.$t('global.career-type-3');
        default: return this.$t('global.career-type-unknown');
      }
    },
    getWorkerStatusName(status: number): string {
      switch(status) {
        case 0: return this.$t('global.worker-status-0');
        case 1: return this.$t('global.worker-status-1');
        default: return this.$t('global.worker-status-unknown');
      }
    },

    getNameByCode(value: any, list: Array<any>, config?: { code: string; name: string }) {
            const c = config || { code: "code", name: "name" };
            const obj: any = {};
            list.forEach((e: any) => {
                obj[e[c.code]] = e[c.name];
            });
            return obj[value] || null;
        },

    onBackClicked() {
      this.$router.replace('/main/home');
    },

    addWorker(){
      this.$router.replace('/main/register');
    },
    onWokerCellClicked(id: string) {
      this.$router.push({path: '/worker-info', query: {id: id}});
    },
    async onSortClicked(ev: Event) {
      const popover = await popoverController
        .create({
          component: LeaveFilterPopoverView,
          cssClass: 'pop-over-style',
          componentProps: {
            sortValue: this.sort,
            setSortValue: (event: Event) => {
              const tmp = event  as unknown;
              this.sort = tmp as number;
              console.log(this.sort);
            }
          },
          event: ev,
          translucent: true
        })
      popover.present();
    },
    async onFilterClicked(ev: Event) {
      const popover = await popoverController
        .create({
          component: TeamAndCompanyFilterPopoverView,
          cssClass: 'pop-over-style',
          componentProps: {
            careerTypeValue: this.career,
            setCareerTypeValue: (event: Event) => {
              const tmp = event  as unknown;
              this.career = tmp as number;
              console.log(this.career);
            },
            genderTypeValue: this.gender,
            setGenderTypeValue: (event: Event) => {
              const tmp = event  as unknown;
              this.gender = tmp as number;
              console.log(this.gender);
            }
          },
          event: ev,
          translucent: true
        })
      popover.present();
    },

    async onFilterClicked2(){
     document.querySelector(".filterblk")?.classList.add("show");
    },

     async onCompanyCellClicked(ev: Event) {
            const options = this.companyList.map((e: any) => {
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
                            this.searchText.corpId = value.corpParent.value;
                            // ScgApi()
                            //     .queryProjectCorpTeamSelect({ projectId: this.store.getters.getProjectId, corpId: this.searchText.corpId })
                            //     .then((res) => {
                            //         this.teamList = res.data;
                            //     });
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
                            this.searchText.teamName = value.team.value;
                        },
                    },
                ],
            });
            picker.present();
        },

     async onStatusCellClicked(ev: Event) {
            const options = this.statusList.map((e: any) => {
                return { text: e.name, value: e.id };
            });
            const columns = [
                {
                    name: "status",
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
                            this.searchText.entryStatus = value.status.value;
                        },
                    },
                ],
            });
            picker.present();
        },

    
  }
});
</script>

<style scoped>
ion-content {
  --background: #f3f4f6;
}

ion-item {
  --min-height: 70px;
  --background: #ffffff;
  --border-color: #f3f4f6;
}

.worker-name {
  color: #000000;
}

.worker-status {
  font-size: 16px;
}

.cell-right {
  text-align: right;
}

.top {
  margin-bottom: 10px;
  font-size: 16px;
}

.search-bar {
  background-color: rgba(0,0,0,0.07);
  border-radius: 5px;
  padding-left: 10px !important;
  height: 30px !important; 
}

.cell {
  size: 15px;
}

.right {
  text-align: right;
}


.sort-icon {
  transform:rotate(90deg);
  margin-top: 2px !important;
}

.sort-text {
  padding-top: 2px;
}

.sort-career-icon {
  padding-top: 5px;
  font-size: 20px;
}

.list-md-lines-full .item.cell, .list-md .cell.item-lines-full.md{
  --border-width: 0 0 3px 0 !important;
}

.noshow{
  display: none;
}

.addworker{
  position: fixed;
  width:36px;
  height:50px;
  top:0;
  right:0;
  z-index:100;
  font-size:30px;
  line-height: 50px;
}

.filterblk {
  display: none;
  position: fixed;
  width: 96%;
  height: 150px;
  left:2%;
  background-color: #FFF;
  border-radius: 8px;
  border: 1Px solid #CCC;
z-index: 200;
}

.filterblk.show{
  display: block;
}


.filteritem{
  width: 100%;
  float:left;
  height:30px

}

.statuszoom{
  float: right;
  margin-right: 50px;
  margin-top: 5px;
}

.icon{
  float: right;
  margin-left: 10px;
  display: none;
  clear: both;
}

.icon.show{
   float: right;
  display: block;
  height: 30px;
}

.content {
  float:right;
  margin-right: 20px;
  margin-top: 4px;
  text-align: right;
  font-size:14px;
}

.filtertitle{
  float:left;
text-indent: 10px;
  line-height: 30px;
}

.cell-icon{
  z-index: 200;;
}

.ion-arrow-down-b.show{
  font-size: 20px;
}

.halfbtn.confirm{

    width: 40%;
    float: left;
    margin-left: 20px;

}

.halfbtn.cancel{

    width: 40%;
    float: right;
    margin-right: 20px;

}
</style>