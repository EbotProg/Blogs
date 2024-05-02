import { useEffect, useState } from "react";
import axios from "./AxiosInstance";

const useAxios = (url, accessToken) => {

    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let [status, setStatus] = useState(null);


 useEffect(()=>{
  const abortCont = new AbortController();
console.log('access token',accessToken)
//  setTimeout(()=>{

axios.get(url, {signal: abortCont.signal,
                 headers:{
                    "Authorization": `Bearer ${accessToken}`
                 }})
    .then((res)=>{
        console.log('res: ',res);
        setData(res.data);
        setLoading(false);
        setError(null);
        setStatus(200);
    })
    
    .catch(err=>{
        if(err.name === 'AbortError'){
          
            console.log('fetch aborted')
        }else{
            let status = err.response.status && err.response.status;
            // console.log(status);
            setLoading(false);
            setError(err.message)
            setStatus(status);
        }

    })
//  }, 1)
    

    
    return ()=> abortCont.abort();
 }, [accessToken, url])
  console.log(data, loading, error, status)
 return { data, loading, error, status }
}
 
export default useAxios;