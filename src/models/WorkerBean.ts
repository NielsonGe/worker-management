export default class WorkerBean {
    private projectWorkerId: string;
    private projectId: string;
    private projectCorpId: string;
    private corpId: string;
    private corpName: string;
    private teamId: string;
    private teamName: string;
    private workerId: string;
    private workerName: string;
    private phone: string;
    private cardNumber: string;
    private isTeamLeader: number;
    private status: number;
    private role: number;
    private workTypeCode: string;
    private workTypeName: string;
    private jobTypeCode: string;
    private jobTypeName: string;
  
      constructor($projectWorkerId:string,$projectId: string, $projectCorpId: string, $corpId: string, $corpName: string, $teamId: string, $teamName: string, $workerId: string, $workerName: string, $phone: string, $cardNumber: string, $isTeamLeader: number, $status: number, $role: number, $workTypeCode: string, $workTypeName: string, $jobTypeCode: string, $jobTypeName: string) {
          this.projectWorkerId = $projectWorkerId;
          this.projectId = $projectId;
          this.projectCorpId = $projectCorpId;
          this.corpId = $corpId;
          this.corpName = $corpName;
          this.teamId = $teamId;
          this.teamName = $teamName;
          this.workerId = $workerId;
          this.workerName = $workerName;
          this.phone = $phone;
          this.cardNumber = $cardNumber;
          this.isTeamLeader = $isTeamLeader;
          this.status = $status;
          this.role = $role;
          this.workTypeCode = $workTypeCode;
          this.workTypeName = $workTypeName;
          this.jobTypeCode = $jobTypeCode;
          this.jobTypeName = $jobTypeName;
      }
  
      /**
       * Getter $projectWorkerId
       * @return {string}
       */
      public get $projectWorkerId(): string {
          return this.projectWorkerId;
      }
  
      /**
       * Setter $projectWorkerId
       * @param {string} value
       */
      public set $projectWorkerId(value: string) {
          this.projectWorkerId = value;
      }
  
      /**
       * Getter $projectId
       * @return {string}
       */
      public get $projectId(): string {
          return this.projectId;
      }
  
      /**
       * Setter $projectId
       * @param {string} value
       */
      public set $projectId(value: string) {
          this.projectId = value;
      }
  
      /**
       * Getter $projectCorpId
       * @return {string}
       */
      public get $projectCorpId(): string {
          return this.projectCorpId;
      }
  
      /**
       * Setter $projectCorpId
       * @param {string} value
       */
      public set $projectCorpId(value: string) {
          this.projectCorpId = value;
      }
  
      /**
       * Getter $corpId
       * @return {string}
       */
      public get $corpId(): string {
          return this.corpId;
      }
  
      /**
       * Setter $corpId
       * @param {string} value
       */
      public set $corpId(value: string) {
          this.corpId = value;
      }
  
      /**
       * Getter $corpName
       * @return {string}
       */
      public get $corpName(): string {
          return this.corpName;
      }
  
      /**
       * Setter $corpName
       * @param {string} value
       */
      public set $corpName(value: string) {
          this.corpName = value;
      }
  
      /**
       * Getter $teamId
       * @return {string}
       */
      public get $teamId(): string {
          return this.teamId;
      }
  
      /**
       * Setter $teamId
       * @param {string} value
       */
      public set $teamId(value: string) {
          this.teamId = value;
      }
  
      /**
       * Getter $teamName
       * @return {string}
       */
      public get $teamName(): string {
          return this.teamName;
      }
  
      /**
       * Setter $teamName
       * @param {string} value
       */
      public set $teamName(value: string) {
          this.teamName = value;
      }
  
      /**
       * Getter $workerId
       * @return {string}
       */
      public get $workerId(): string {
          return this.workerId;
      }
  
      /**
       * Setter $workerId
       * @param {string} value
       */
      public set $workerId(value: string) {
          this.workerId = value;
      }
  
      /**
       * Getter $workerName
       * @return {string}
       */
      public get $workerName(): string {
          return this.workerName;
      }
  
      /**
       * Setter $workerName
       * @param {string} value
       */
      public set $workerName(value: string) {
          this.workerName = value;
      }
  
      /**
       * Getter $phone
       * @return {string}
       */
      public get $phone(): string {
          return this.phone;
      }
  
      /**
       * Setter $phone
       * @param {string} value
       */
      public set $phone(value: string) {
          this.phone = value;
      }
  
      /**
       * Getter $cardNumber
       * @return {string}
       */
      public get $cardNumber(): string {
          return this.cardNumber;
      }
  
      /**
       * Setter $cardNumber
       * @param {string} value
       */
      public set $cardNumber(value: string) {
          this.cardNumber = value;
      }
  
      /**
       * Getter $isTeamLeader
       * @return {number}
       */
      public get $isTeamLeader(): number {
          return this.isTeamLeader;
      }
  
      /**
       * Setter $isTeamLeader
       * @param {number} value
       */
      public set $isTeamLeader(value: number) {
          this.isTeamLeader = value;
      }
  
      /**
       * Getter $status
       * @return {number}
       */
      public get $status(): number {
          return this.status;
      }
  
      /**
       * Setter $status
       * @param {number} value
       */
      public set $status(value: number) {
          this.status = value;
      }
  
      /**
       * Getter $role
       * @return {number}
       */
      public get $role(): number {
          return this.role;
      }
  
      /**
       * Setter $role
       * @param {number} value
       */
      public set $role(value: number) {
          this.role = value;
      }
  
      /**
       * Getter $workTypeCode
       * @return {string}
       */
      public get $workTypeCode(): string {
          return this.workTypeCode;
      }
  
      /**
       * Setter $workTypeCode
       * @param {string} value
       */
      public set $workTypeCode(value: string) {
          this.workTypeCode = value;
      }
  
      /**
       * Getter $workTypeName
       * @return {string}
       */
      public get $workTypeName(): string {
          return this.workTypeName;
      }
  
      /**
       * Setter $workTypeName
       * @param {string} value
       */
      public set $workTypeName(value: string) {
          this.workTypeName = value;
      }
  
      /**
       * Getter $jobTypeCode
       * @return {string}
       */
      public get $jobTypeCode(): string {
          return this.jobTypeCode;
      }
  
      /**
       * Setter $jobTypeCode
       * @param {string} value
       */
      public set $jobTypeCode(value: string) {
          this.jobTypeCode = value;
      }
  
      /**
       * Getter $jobTypeName
       * @return {string}
       */
      public get $jobTypeName(): string {
          return this.jobTypeName;
      }
  
      /**
       * Setter $jobTypeName
       * @param {string} value
       */
      public set $jobTypeName(value: string) {
          this.jobTypeName = value;
      }
    
  }