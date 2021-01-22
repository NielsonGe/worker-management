export default class TeamInfo {
    private id: string;
    private idNumber: string;
    private name: string;
    private type: string;
    private companyName: string;
    private companyId: string;
  
    constructor(id: string, idNumber: string, type: string, name: string, companyName: string, companyId: string) {
      this.id = id;
      this.idNumber = idNumber;
      this.type = type;
      this.name = name;
      this.companyName = companyName;
      this.companyId = companyId;
    }
  
    getId(): string {
      return this.id;
    }
  
    setId(id: string) {
      this.id = id;
    }
  
    getIdNumber(): string {
      return this.idNumber;
    }
  
    setIdNumber(idNumber: string): void {
      this.idNumber = idNumber;
    }
  
    getType(): string {
      return this.type;
    }
  
    setType(type: string): void {
      this.type = type;
    }
  
    getName(): string {
      return this.name;
    }
  
    setName(name: string): void {
      this.name = name;
    }
   
    getCompanyName(): string {
       return this.companyName;
    }
    
    setCompanyName(companyName: string): void {
       this.companyName = companyName;
    } 
  
    getCompanyId(): string {
      return this.companyId;
    }
  
    setCompanyId(companyId: string): void {
      this.companyId = companyId;
    }
  }