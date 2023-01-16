import Head from 'next/head'
// import axios from "axios"
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
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
  <div className= " container b">
  <input type="text" placeholder='search' onChange={(e)=>setSearchInput(e.target.value)} />

    <>{
       APIdata?.map((data:any)=>{
   return <div>{data?.Title}</div>
      })
      }
    </>
 <div> hello</div>
  </div>
  </>
   
  )
}

export default index
