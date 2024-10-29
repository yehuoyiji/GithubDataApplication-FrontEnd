import request from "@/utils/request";

export const getGitHubMsgByName = (userName: any) => {
    return request.get(`/search/getPersonalInformation/${userName}`)
}