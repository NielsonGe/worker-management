export default class ProjectBanner {
  private id: string;
  private imageData: string

  constructor(id: string, imageData: string) {
    this.id = id;
    this.imageData = imageData;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getImageData(): string {
    return this.imageData;
  }

  setImageData(imageData: string): void {
    this.imageData = imageData;
  }
}