export default class ProjectInfo {
  private id: string;
  private totalWorkerCount: number;
  private attendanceWorkerCount: number;
  private onSiteWorkerCount: number;

  constructor(id: string, totalWorkerCount: number, attendanceWorkerCount: number, onSiteWorkerCount: number) {
    this.id = id;
    this.totalWorkerCount = totalWorkerCount;
    this.attendanceWorkerCount = attendanceWorkerCount;
    this.onSiteWorkerCount = onSiteWorkerCount;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getTotalWorkerCount(): number {
    return this.totalWorkerCount;
  }

  setTotalWorkerCount(totalWorkerCount: number): void {
    this.totalWorkerCount = totalWorkerCount;
  }

  getAttendanceWorkerCount(): number {
    return this.attendanceWorkerCount;
  }

  setAttendanceWorkerCount(attendanceWorkerCount: number): void {
    this.attendanceWorkerCount = attendanceWorkerCount;
  }

  getOnSiteWorkerCount(): number {
    return this.onSiteWorkerCount;
  }

  setOnSiteWorkerCount(onSiteWorkerCount: number): void {
    this.onSiteWorkerCount = onSiteWorkerCount;
  }
}