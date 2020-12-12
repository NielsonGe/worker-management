import request from "@/utils/HttpUtils";
import HttpService from "@/api/httpService";

const httpService = new HttpService();
function ScgApi() {
    const getVerifyCode = async () => {
        return request({
            url: "/api/v1.0/account/getVerifyCode?t=54985569",
            method: "get",
        });
    };

    const getRsaPublicKey = async () => {
        return request({
            url: "/api/v1.0/account/getRSAPublicKey",
            method: "get",
        });
    };

    const loginSystem = async (data: any) => {
        return request({
            url: "/api/v1.0/account/login",
            method: "post",
            data: data,
        });
    };

    const queryFile = async (data: any) => {
        return httpService.get(httpService.api.queryFile,data);
    };

    const getCurrentUserInfo = () => {
        return httpService.get(httpService.api.getCurrentUserInfo);
    };

    const getProjectWorker = (data: any) => {
        return httpService.get(httpService.api.getProjectWorker, data);
    };

    const queryProjectWorkerPaging = (data: any) => {
      return httpService.get(httpService.api.queryProjectWorkerPaging, data);
    };

    const queryCurrentUserProjectPaging =(data: any) => {
      return httpService.get(httpService.api.queryCurrentUserProjectPaging,data);
    };

    const getBasicStatistics = (data: any) => {
      return httpService.get(httpService.api.getBasicStatistics,data);
    };

    const queryDictionaryTrees = (data: any) => {
      return httpService.get(httpService.api.queryDictionaryTrees,data);
    };

    const queryProjectCorpSelect = (data: any) => {
      return httpService.get(httpService.api.queryProjectCorpSelect,data);
    };

    const queryProjectCorpTeamSelect = (data: any) => {
      return httpService.get(httpService.api.queryProjectCorpTeamSelect,data);
    };

    const postFileBase64String = (data: any) => {
      return httpService.uploadFileByBase64(data);
    };

    const saveWorker = (data: any) => {
        return httpService.post(httpService.api.saveWorker,data);
    };

    const saveProjectWorkerEntryExit = (data: any) => {
        return httpService.post(httpService.api.saveProjectWorkerEntryExit,data);
    };

    return {
        getVerifyCode,
        getRsaPublicKey,
        loginSystem,
        queryFile,
        getCurrentUserInfo,
        getProjectWorker,
        queryProjectWorkerPaging,
        queryCurrentUserProjectPaging,
        getBasicStatistics,
        queryDictionaryTrees,
        queryProjectCorpSelect,
        queryProjectCorpTeamSelect,
        postFileBase64String,
        saveWorker,
        saveProjectWorkerEntryExit
    };
}

export { ScgApi };
