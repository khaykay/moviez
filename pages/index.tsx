import Head from 'next/head'
import { useState, useEffect } from 'react'




interface APIobject {
Poster: string;
Title: string;
Type: string;
Year: string;
imdbID: string;
}
const index:React.FC = () => {
  const[searchInput , setSearchInput] = useState<string>("")
  const[APIdata , setAPIdata] = useState<APIobject[]>([])
  const[Loading, setLoading] =useState<boolean>(false)
 useEffect(() => {
  if(searchInput!==""){
   const apiCall = setTimeout(()=>{
    const axios = require("axios");

    const options = {
      method: 'GET',
      url: `http://www.omdbapi.com/?i=tt3896198&apikey=1670135&s=${searchInput}`,
      
    };
    
    axios.request(options).then(function (response:any) {
      let API =response.data.Search
      setAPIdata(API);
      console.log(API);
    }).catch(function (error:any) {
      console.error(error);
    });
   }, 1000)
  
   return () => clearTimeout(apiCall)
  }
  setLoading(true)
 }, [searchInput])

 
  return (<>
  <Head>
    <title>moviez</title>
  </Head>
  <div className= " flex flex-col items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
  <input type="text" placeholder='search' className="w-3/4 h-10 rounded-xl sm:w-1/3" onChange={(e)=>setSearchInput(e.target.value)} />

    <>{
       APIdata?.map((data:any)=>{
   return <div>
          {data?.Title}
          {data?.Year}</div>
      })
      }
    </>
  </div>
  </>
   
  )
}

export default index
