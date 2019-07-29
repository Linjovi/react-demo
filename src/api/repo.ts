import request from "@/utils/request";
import qs from "qs";
const Repo = {
  getRepos(path: string) {
    let url = "repos?" + qs.stringify({path});
    return request({
      url,
      method: "get"
    });
  },
  getGitInfo() {
    let url = "repos/git";
    return request({
      url,
      method: "get"
    });
  },
  getPath() {
    let url = "repos/path";
    return request({
      url,
      method: "get"
    });
  },
  setPath(data: string) {
    let url = "repos/path";
    return request({
      url,
      method: "post",
      data: { newPath: data }
    });
  },
  run(data:string[],opera:string){
    let url = "repos/run"
    return request({
      url,
      method:"post",
      data:{repos:data,operate:opera}
    })
  }
};
export default Repo;
