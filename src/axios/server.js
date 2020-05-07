import axios from "axios";
export default class Axios{
    static ajax(options){
        return new Promise((resolve,reject)=>{
            axios({
                method:options.method,
                url:options.url,
                headers:{
                    ContentType: 'application/json;charset=UTF-8',
                },
                params:options.data,
                data:options.data
            }).then((response=>{
                if(response && response.status === 200){
                    const res = response.data;
                    resolve(res)
                }else{
                    reject(response.msg);
                }
            }))
        })
    }
}
