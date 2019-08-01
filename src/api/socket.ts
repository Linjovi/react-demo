import request from "@/utils/request"
const Socket = {
  socket(){
    const url = "socket"
    return request({
      url,
      method:"get"
    })
  }
}
export default Socket