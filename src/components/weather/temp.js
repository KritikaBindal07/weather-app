import React, {useEffect, useState}from 'react'
import "./style.css"
import Weathercard from './weathercard'

const Temp = () => {
    const[searchValue, setSearchValue]= useState("Pune")
    const[tempInfo, setTempInfo] = useState({})

    const getWeatherInfo= async ()=>{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=93e4d5dd9f0c6346d3014962f4b61652`;

            const res=await fetch(url)
            const data=await res.json()
            console.log(data)

            const {temp, humidity,pressure} = data.main;
            const {main:weathermood}= data.weather[0]
            const{name} = data
            const{speed} = data.wind

            const{country,sunset} = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,

            }

            setTempInfo(myNewWeatherInfo)
            console.log(temp)

            console.log(data);
            
        } catch (error) {
            console.log(error)
            
        }
       
    }
    useEffect(()=>{
        getWeatherInfo()

    },[])


  return (
    <>
    <div className='wrap'>
        <div className="search">
            <input type='search' placeholder='search..' autoFocus id="search" className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}></input>

            <button className='searchButton' type='button' onClick={getWeatherInfo}>
                Search
            </button>
        </div>
    </div>

    {/* our temp card */}
    <Weathercard tempInfo={tempInfo}> </Weathercard>

    
    </>
  )
}

export default Temp