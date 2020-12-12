import ProjectBriefInfo from "@/models/ProjectBriefInfo";
import ProjectAnnouncement from "@/models/ProjectAnnouncement";
import ProjectBanner from "@/models/ProjectBanner";
import ProjectStatistic from "@/models/ProjectStatistic";
import ProjectInfo from "@/models/ProjectInfo";

interface ProjectDetails {
    id: string;
    iconData: string;
    name: string;
    type: number;
    managerName: string;
    totalWorkerCount: number;
    attendanceWorkerCount: number;
    onSiteWorkerCount: number;
    banners: ProjectBanner[];
    announcements: ProjectAnnouncement[];
}

const projectList: ProjectDetails[] = [
    {
        id: "cf6c45c1-2365-11eb-be30-0242ac110003",
        name: "项目1",
        iconData: "assets/c-img.jpg",
        type: 0,
        managerName: "张一",
        totalWorkerCount: 1001,
        attendanceWorkerCount: 101,
        onSiteWorkerCount: 11,
        banners: [new ProjectBanner("1", "assets/c-img.jpg"), new ProjectBanner("2", "assets/c-img2.jpg")],
        announcements: [
            new ProjectAnnouncement("1", "assets/ch1.jpg", "通知1标题", "通知1子标题"),
            new ProjectAnnouncement("2", "assets/ch1.jpg", "通知2标题", "通知2子标题"),
            new ProjectAnnouncement("3", "assets/ch1.jpg", "通知3标题", "通知3子标题"),
            new ProjectAnnouncement("4", "assets/ch1.jpg", "通知4标题", "通知4子标题"),
            new ProjectAnnouncement("5", "assets/ch1.jpg", "通知5标题", "通知5子标题"),
        ],
    },
    {
        id: "2",
        name: "项目2",
        iconData: "assets/c-img.jpg",
        type: 1,
        managerName: "张二",
        totalWorkerCount: 2001,
        attendanceWorkerCount: 201,
        onSiteWorkerCount: 21,
        banners: [new ProjectBanner("1", "assets/c-img.jpg"), new ProjectBanner("2", "assets/c-img2.jpg")],
        announcements: [
            new ProjectAnnouncement("1", "assets/ch1.jpg", "通知1标题", "通知1子标题"),
            new ProjectAnnouncement("2", "assets/ch1.jpg", "通知2标题", "通知2子标题"),
            new ProjectAnnouncement("3", "assets/ch1.jpg", "通知3标题", "通知3子标题"),
            new ProjectAnnouncement("4", "assets/ch1.jpg", "通知4标题", "通知4子标题"),
            new ProjectAnnouncement("5", "assets/ch1.jpg", "通知5标题", "通知5子标题"),
        ],
    },
    {
        id: "3",
        name: "项目3",
        iconData: "assets/c-img.jpg",
        type: 2,
        managerName: "张三",
        totalWorkerCount: 3001,
        attendanceWorkerCount: 301,
        onSiteWorkerCount: 31,
        banners: [new ProjectBanner("1", "assets/c-img.jpg"), new ProjectBanner("2", "assets/c-img2.jpg")],
        announcements: [
            new ProjectAnnouncement("1", "assets/ch1.jpg", "通知1标题", "通知1子标题"),
            new ProjectAnnouncement("2", "assets/ch1.jpg", "通知2标题", "通知2子标题"),
            new ProjectAnnouncement("3", "assets/ch1.jpg", "通知3标题", "通知3子标题"),
            new ProjectAnnouncement("4", "assets/ch1.jpg", "通知4标题", "通知4子标题"),
            new ProjectAnnouncement("5", "assets/ch1.jpg", "通知5标题", "通知5子标题"),
        ],
    },
    {
        id: "4",
        name: "项目4",
        iconData: "assets/c-img.jpg",
        type: 3,
        managerName: "张四",
        totalWorkerCount: 4001,
        attendanceWorkerCount: 401,
        onSiteWorkerCount: 41,
        banners: [new ProjectBanner("1", "assets/c-img.jpg"), new ProjectBanner("2", "assets/c-img2.jpg")],
        announcements: [
            new ProjectAnnouncement("1", "assets/ch1.jpg", "通知1标题", "通知1子标题"),
            new ProjectAnnouncement("2", "assets/ch1.jpg", "通知2标题", "通知2子标题"),
            new ProjectAnnouncement("3", "assets/ch1.jpg", "通知3标题", "通知3子标题"),
            new ProjectAnnouncement("4", "assets/ch1.jpg", "通知4标题", "通知4子标题"),
            new ProjectAnnouncement("5", "assets/ch1.jpg", "通知5标题", "通知5子标题"),
        ],
    },
    {
        id: "5",
        name: "项目5",
        iconData: "assets/c-img.jpg",
        type: 4,
        managerName: "张五",
        totalWorkerCount: 5001,
        attendanceWorkerCount: 501,
        onSiteWorkerCount: 51,
        banners: [new ProjectBanner("1", "assets/c-img.jpg"), new ProjectBanner("2", "assets/c-img2.jpg")],
        announcements: [
            new ProjectAnnouncement("1", "assets/ch1.jpg", "通知1标题", "通知1子标题"),
            new ProjectAnnouncement("2", "assets/ch1.jpg", "通知2标题", "通知2子标题"),
            new ProjectAnnouncement("3", "assets/ch1.jpg", "通知3标题", "通知3子标题"),
            new ProjectAnnouncement("4", "assets/ch1.jpg", "通知4标题", "通知4子标题"),
            new ProjectAnnouncement("5", "assets/ch1.jpg", "通知5标题", "通知5子标题"),
        ],
    },
];

const getProjectBriefList = (id: number): ProjectBriefInfo[] => {
    const ret: ProjectBriefInfo[] = [];

    for (const item of projectList) {
        ret.push(new ProjectBriefInfo(item.id, item.iconData, item.name, item.onSiteWorkerCount, item.managerName, item.type));
    }

    return ret;
};
const getProjectList = (list: Array<any>): ProjectBriefInfo[] => {
    const res: ProjectBriefInfo[] = [];
    for (const item of list) {
        res.push(new ProjectBriefInfo(item.id, item.iconData, item.name, item.onSiteWorkerCount, item.managerName, item.type));
    }
    return res;
};

const getProjectStatistic = (id: string): ProjectStatistic => {
    const projectDetails = projectList.find((x) => x.id == id);
    const totalWorkerCount = projectDetails == null ? 0 : projectDetails.totalWorkerCount;
    const attendanceWorkerCount = projectDetails == null ? 0 : projectDetails.attendanceWorkerCount;
    const onSiteWorkerCount = projectDetails == null ? 0 : projectDetails.onSiteWorkerCount;
    const ret = new ProjectStatistic(id, totalWorkerCount, attendanceWorkerCount, onSiteWorkerCount);
    return ret;
};

const getProjectBannerList = (id: string): ProjectBanner[] => {
    const projectDetails = projectList.find((x) => x.id == id);
    const ret: ProjectBanner[] = new Array<ProjectBanner>();

    if (projectDetails == null) {
        return ret;
    }

    for (const item of projectDetails.banners) {
        ret.push(new ProjectBanner(id, item.getImageData()));
    }

    return ret;
};

const getProjectAnnouncementList = (id: string): ProjectAnnouncement[] => {
    const projectDetails = projectList.find((x) => x.id == id);
    const ret: ProjectAnnouncement[] = new Array<ProjectAnnouncement>();

    if (projectDetails == null) {
        return ret;
    }

    for (const item of projectDetails.announcements) {
        ret.push(new ProjectAnnouncement(id, item.getIconData(), item.getTitle(), item.getSubTitle()));
    }

    return ret;
};

const getProjectInfo = (id: string): ProjectInfo => {
    const projectDetails = projectList.find((x) => x.id == id);
    let ret: ProjectInfo;

    if (projectDetails == null) {
        ret = new ProjectInfo(id, "");
    } else {
        ret = new ProjectInfo(id, projectDetails.name);
    }

    return ret;
};

export { ProjectDetails, getProjectBriefList, getProjectStatistic, getProjectAnnouncementList, getProjectBannerList, getProjectInfo };
