import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface APIobject {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
const index: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [APIdata, setAPIdata] = useState<APIobject[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (searchInput !== "") {
      const apiCall = setTimeout(() => {
        const axios = require("axios");

        const options = {
          method: "GET",
          url: `http://www.omdbapi.com/?i=tt3896198&apikey=1670135&s=${searchInput}`,
        };

        axios
          .request(options)
          .then(function (response: any) {
            let API = response.data.Search;
            setAPIdata(API);
            console.log(API);
          })
          .catch(function (error: any) {
            console.error(error);
          });
      }, 1000);

      return () => clearTimeout(apiCall);
    }
    setLoading(true);
  }, [searchInput]);

  return (
    <>
      {/* one more time */}
      <Head>
        <title>moviez</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rowdies:wght@700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="  flex items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500 relative ">
        <div className=" flex items-center justify-center w-[90vw] h-[80vh] relative">
          <div className="absolute h-full w-full ">
            <Image
              src="/movie.jpeg"
              alt="movie symbol"
              width="500"
              height="500"
              className="w-full h-full "
            />
          </div>

          <div className=" relative bg-primary/80 w-full h-full border-solid border-2 border-secondary/95 backdrop-invert">
            <div className="mt-[80px] flex items-end">
              <span className="font-['Rowdies'] font-bold text-6xl text-white px-4 inline-flex flex-col gap-2">
                <span className=""> Find your</span>
                <span className="">Favorite movie</span>
              </span>
              <input
                type="search"
                placeholder="search"
                className="w-3/4 h-10 rounded-xl md:w-1/3"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className="">
              {APIdata?.map((data: any) => {
                return (
                  <Link href="/about" className=" w-3/4 md:w-1/3 h-10 mb-1 ">
                    <div className="flex  items-center justify-start w-full  bg-slate-500 h-full gap-2 backdrop-blur-3xl">
                      {" "}
                      <span>
                        <img
                          src={data?.Poster}
                          className=" h-7 w-7 rounded-full"
                        />
                      </span>
                      <span>{data?.Title} </span>
                      <span>{data?.Year}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
