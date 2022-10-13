import request from "../../utils/request";


export function login(data:any){
   return request('/auth/mobile/login',data)
}


export function getList(param?:any){
   return request('/mall/app/mallMemberCoupon/list',param,'get')
}