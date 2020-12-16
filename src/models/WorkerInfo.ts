export default class WorkerInfo {
  private id: string;
  private idNumber: string;
  private careerType: string;
  private status: number;
  private name: string;
  private photoData: string;
  private idCardData1: string;
  private idCardData2: string;
  private birthday: Date;
  private address: string;
  private gender: number;
  private tel: string;
  private companyId: string;

  constructor(id: string, idNumber: string, careerType: string, status: number, name: string, photoData: string, idCardData1: string, idCardData2: string, birthday: Date, address: string, gender: number, tel: string, companyId: string) {
    this.id = id;
    this.idNumber = idNumber;
    this.careerType = careerType;
    this.status = status;
    this.name = name;
    this.photoData = photoData;
    this.idCardData1 = idCardData1;
    this.idCardData2 = idCardData2;
    this.birthday = birthday;
    this.address = address;
    this.gender = gender;
    this.tel = tel;
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

  getCareerType(): string {
    return this.careerType;
  }

  setCareerType(careerType: string): void {
    this.careerType = careerType;
  }

  getStatus(): number {
    return this.status;
  }

  setStatus(status: number): void {
    this.status = status;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPhotoData(): string {
    return this.photoData;
  }

  setPhotoData(photoData: string): void {
    this.photoData = photoData;
  }

  getIdCardData1(): string {
    return this.idCardData1;
  }

  setIdCardData1(idCardData1: string): void {
    this.idCardData1 = idCardData1;
  }

  getIdCardData2(): string {
    return this.idCardData2;
  }

  setIdCardData2(idCardData2: string): void {
    this.idCardData2 = idCardData2;
  }

  getBirthday(): Date {
    return this.birthday;
  }

  setBirthday(birthday: Date): void {
    this.birthday = birthday;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getGender(): number {
    return this.gender;
  }

  setGender(gender: number): void {
    this.gender = gender;
  }

  getTel(): string {
    return this.tel;
  }

  setTel(tel: string): void {
    this.tel = tel;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  setCompanyId(companyId: string): void {
    this.companyId = companyId;
  }
}