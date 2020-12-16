export default class ProjectBriefInfo {
  private id: string;
  private iconData: string;
  private name: string;
  private onSiteWorkerCount: number;
  private managerName: string;
  private type: number;

  constructor(id: string, iconData: string, name: string, onSiteWorkerCount: number, managerName: string, type: number) {
    this.id = id;
    this.iconData = iconData;
    this.name = name;
    this.onSiteWorkerCount = onSiteWorkerCount;
    this.managerName = managerName;
    this.type = type;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getIconData(): string {
    return this.iconData;
  }

  setIconData(iconData: string) {
    this.iconData = iconData;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getOnSiteWorkerCount(): number {
    return this.onSiteWorkerCount;
  }

  setOnSiteWorkerCount(onSiteWorkerCount: number): void {
    this.onSiteWorkerCount = onSiteWorkerCount;
  }

  getManagerName(): string {
    return this.managerName;
  }

  setManagerName(managerName: string): void {
    this.managerName = managerName;
  }

  getType(): number {
    return this.type;
  }

  setType(type: number): void {
    this.type = type;
  }
}