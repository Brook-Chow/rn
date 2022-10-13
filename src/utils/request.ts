import { getItem } from "./storage"


type FetchMothod = 'post'|'get'|'put'|'delete'

const baseUrl = 'http://abchina.baolusoft.cn/gateway'
const uploadUrl = 'http://demo.baolusoft.cn/d27test/dev-api/file/upload'

//鉴权白名单
const whiteList = ['/auth/mobile/login']


export default async function request(url:string,data:object={},method:FetchMothod='post'){
   let token = '',reqUrl=baseUrl + url

   //非白名单token配置
   if(!whiteList.includes(url)){
      let userinfo = await getItem('userInfo')
      token = !userinfo? exchangeToken():userinfo.accessToken
   }

   //get方法url拼接
   if(method === 'get' && JSON.stringify(data) !== '{}'){
      reqUrl = baseUrl + url + '?' + objToUrl(data)
   }
   
   return  fetch(reqUrl,{
      method:method,
      body:method === 'get'?'':objToUrl(data),
      headers:{
         'Content-Type':'application/x-www-form-urlencoded',
         'Authorization':token
      }
   }).then(res=>res.json())
}

request.prototype.upload = async (data:FormData)=>{
   let userinfo = await getItem('userIdfo')
   let token = !userinfo? exchangeToken():userinfo.accessToken

   return  fetch(uploadUrl,{
      method:'post',
      body:data,
      headers:{
         'Content-Type':'application/x-www-form-urlencoded',
         'Authorization':token
      }
   }).then(res=>res.json())
}


function exchangeToken(){
   //todo
   return ''
}

function objToUrl(obj:object){
   let str=''
   for(let key in obj){
      str += `&${key}=${(<any>obj)[key]}`
   }

   return str.slice(0)
}
