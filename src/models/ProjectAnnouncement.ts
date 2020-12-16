export default class ProjectAnnouncement {
  private id: string;
  private iconData: string;
  private title: string;
  private subTitle: string;

  constructor(id: string, iconData: string, title: string, subTitle: string) {
    this.id = id;
    this.iconData = iconData;
    this.title = title;
    this.subTitle = subTitle;
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

  setIconData(iconData: string): void {
    this.iconData = iconData;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getSubTitle(): string {
    return this.subTitle;
  }

  setSubTitle(subTitle: string): void {
    this.subTitle = subTitle;
  }
}