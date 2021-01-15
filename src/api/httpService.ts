import request from "@/utils/HttpUtils";
import { useStore } from "vuex";
export default class HttpService {
    public get(url: string, params?: any) {
        const token = localStorage.getItem('token') || null;
        const header = token
            ? {
                  Authorization: "Bearer " + token,
              }
            : null;
        return request({
            url,
            method: "get",
            headers: header,
            params,
        });
    }

    public post(url: string, data?: any) {
        const token = localStorage.getItem('token') || null;
        const header = token
            ? {
                  Authorization: "Bearer " + token,
              }
            : null;
        return request({
            url,
            method: "post",
            headers: header,
            data,
        });
    }

    public uploadFileByBase64( data?: any) {
        const token = localStorage.getItem('token') || null;
        const header = token
            ? {
                  Authorization: "Bearer " + token,
              }
            : null;
        return request({
            url:this.api.postFileBase64String,
            method: "post",
            headers: header,
            data,
        });
    }
    public api = {
        queryCurrentUserProjectPaging: "/api/v1.0/project/queryCurrentUserProjectPaging",

        getCurrentUserInfo: "/api/v1.0/account/getCurrentUserInfo",

        getProjectWorker: "/api/v1.0/project/getProjectWorker",
        queryProjectWorkerPaging: "/api/v1.0/project/queryProjectWorkerPaging",
        getBasicStatistics: "/api/v1.0/worker/getBasicStatistics",
        queryProjectCorpSelect: "/api/v1.0/project/queryProjectCorpSelect",
        queryProjectCorpTeamSelect: "/api/v1.0/project/queryProjectCorpTeamSelect",
        saveWorker: "/api/v1.0/worker/save",
        saveWorkerAndProjectWorker: "/api/v1.0/project/saveWorkerAndProjectWorker",
        saveProjectWorkerEntryExit: "/api/v1.0/project/saveProjectWorkerEntryExit",

        queryFile: "/api/v1.0/file/queryFile",
        queryDictionaryTrees: "/api/v1.0/dictionary/queryDictionaryTree",
        postFileBase64String: "/api/v1.0/file/postFileBase64String",
        queryArea: "/api/v1.0/area/queryArea",
        ocrIdCard: "/api/v1.0/file/ocrIdCard",
        queryCompanyListPaging: "/api/v1.0/project/getCompanyListPaging",
        queryTeamList: "/api/v1.0/project/queryTeamList",
        queryParentCompanyList: "/api/v1.0/project/queryParentCompanyList",
        saveProjectTeam:  "/api/v1.0/project/saveProjectTeam"
    };
}
