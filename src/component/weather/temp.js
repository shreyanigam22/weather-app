import React, { useState ,useEffect } from 'react';
import Weathercard from './weathercard';
import "./style.css";

const Temp = () => {
    const[searchValue,setSearchValue]=useState("pune");
    const[tempInfo,setTempInfo]=useState({});

    const getWeatherInfo=async ()=>{
        try{
            let url=
            `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8792685d3ddf3ea0ba29ee537f235927`; 

  let res =await fetch(url);
  let data=await res.json();

  const {temp,humidity,pressure}=data.main;
  //console.log(temp);
  //console.log(humidity);
  //console.log(pressure);
   const{main:weathermood}=data.weather[0];
   const{name}=data;
   const{speed}=data.wind;
   const{country,sunset}=data.sys;

  const myNewWeatherInfo={
       temp,
       humidity,
       pressure,
       weathermood,
       name,
       speed,
       country,
       sunset
   };

   setTempInfo(myNewWeatherInfo);
  


  //console.log(data);


        }catch(error){
            console.log(error);
        }
    };



    useEffect(() => {
        getWeatherInfo();
    }, []);


    return (
        <>
            <div className="wrap">
                <div className="search">

                    <input type="search"
                        placeholder="search.."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                         />

                    <button className="searchButton"
                     type="button"
                      onClick={getWeatherInfo}>search</button>

                </div>
            </div>
            
            <Weathercard {...tempInfo}/>
          
        </>
    )
}

export default Temp;
