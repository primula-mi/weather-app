<template>
    <div class="flex flex-col flex-1 items-center">
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>
                You are currently previewing this city, click the "+" icon to start tracking this city.
            </p>
        </div>
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
            <p class="text-sm mb-12">
                {{ 
                    // new Date(weatherData.currentTime).toLocaleDateString(
                    new Date(weatherData.current.time).toLocaleDateString(
                        "en-us",
                        {
                            weekday: "short",
                            day: "2-digit",
                            month: "long"
                        }
                    )
                }}
                {{ 
                    new Date(weatherData.current.time).toLocaleTimeString(
                        "en-us",
                        {
                            timeStyle: "short",
                        }
                    )
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherData.current.temperature_2m) }}&deg;
            </p>
            <p>
                Feels like
                {{ Math.round(weatherData.current.apparent_temperature) }}&deg;
            </p>
            <p class="capitalize">
                {{ weaterCodes[weatherData.current.weather_code]["description"] }}
            </p>
            <img 
            class="w-[100px] h-auto" 
            :src="`https://openweathermap.org/img/wn/${weaterCodes[weatherData.current.weather_code]['openWeatherIconCode']}@2x.png`" 
            >
        </div>

        <hr class="border-white border-opacity-10 border w-full">

        <div class="max-w-screen-md w-full py-12">
            <div class="max-8 text-white">
                <h2 class="mb-4">Hourly Weather</h2>
                <ul class="flex gap-10 pb-4 overflow-x-scroll list-none scrollbar-thin">
                    <li 
                    v-for="(dateTime, idx) in weatherData.hourly.time" 
                    :key="idx"
                    class="flex flex-col gap-4 items-center"
                    if="idx < 25"
                    >
                        <p class="whitespace-nowrap text-md">
                            {{ 
                             new Date(dateTime).toLocaleTimeString(
                                "en-us",
                                {
                                    timeStyle: "short",
                                }
                            )
                            }}
                        </p>
                        <img 
                        class="w-auto h-[50px] object-cover" 
                        :src="`https://openweathermap.org/img/wn/${weaterCodes[weatherData.current.weather_code]['openWeatherIconCode']}@2x.png`" 
                        >
                        <p class="text-xl">
                            {{ Math.round(weatherData.hourly.temperature_2m[idx]) }}&deg;
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full">

        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <ul class="list-none">
                    <li
                    v-for="(dateTime, idx) in weatherData.daily.time"
                    :key="dateTime"
                    class="flex items-center"
                    >
                    <p class="flex-1">
                        {{ dateTime }}
                        <!-- {{ 
                            new Date(dateTime).toLocaleTimeString(
                                "en-us",
                                {
                                    
                                }
                            )
                        }} -->
                    </p>
                    <img 
                    class="w-[50px]] h-[50px] object-cover" 
                    :src="`https://openweathermap.org/img/wn/${weaterCodes[weatherData.current.weather_code]['openWeatherIconCode']}@2x.png`" 
                    >
                    <div class="flex gap-2 flex-1 justify-end">
                        <p>{{ Math.round(weatherData.daily.temperature_2m_min[idx]) }}&deg; / {{ Math.round(weatherData.daily.temperature_2m_max[idx]) }}&deg;</p>
                    </div>
                    </li>
                </ul>
            </div>
        </div>

        <div 
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
        @click="removeCity()">
            <i class="fa-solid fa-trash"></i>
            <p>Remove</p>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const weaterCodes = {
    0: {
        "description": "clear sky",
        "icon": "clear_sky",
        "openWeatherIconCode": "01d"
    },
    1: {
        "description": "mainly clear",
        "icon": "mainly_clear",
        "openWeatherIconCode": "02d"
    },
    2: {
        "description": "partly cloudy",
        "icon": "partly_cloudy",
        "openWeatherIconCode": "03d"
    },
    3: {
        "description": "overcast",
        "icon": "overcast",
        "openWeatherIconCode": "04d"
    },
    45: {
        "description": "fog",
        "icon": "fog",
        "openWeatherIconCode": "50d"
    },
    48: {
        "description": "depositing rime fog",
        "icon": "fog",
        "openWeatherIconCode": "50d"
    },
    51: {
        "description": "light drizzle",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    53: {
        "description": "moderate drizzle",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    55: {
        "description": "dense intensity drizzle",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    56: {
        "description": "freezing: drizzle light",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    57: {
        "description": "freezing: dense intensity",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    61: {
        "description": "light rain",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    63: {
        "description": "moderate rain",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    65: {
        "description": "heavy intensity rain",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    66: {
        "description": "light freezing rain",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    67: {
        "description": "heavy intensity freezing rain",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    71: {
        "description": "light snow fall",
        "icon": "snow",
        "openWeatherIconCode": "13d"
    },
    73: {
        "description": "moderate snow fall",
        "icon": "snow",
        "openWeatherIconCode": "13d"
    },
    75: {
        "description": "heavy intensity snow fall",
        "icon": "snow",
        "openWeatherIconCode": "13d"
    },
    77: {
        "description": "snow grains",
        "icon": "snow",
        "openWeatherIconCode": "13d"
    },
    80: {
        "description": "light rain showers",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    81: {
        "description": "moderate rain showers",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    82: {
        "description": "violent rain showers",
        "icon": "drizzle",
        "openWeatherIconCode": "09d"
    },
    85: {
        "description": "light snow showers",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    86: {
        "description": "heavy snow showers",
        "icon": "rain",
        "openWeatherIconCode": "10d"
    },
    95: {
        "description": "thunderstorm",
        "icon": "thunderstorm",
        "openWeatherIconCode": "11d"
    },
    96: {
        "description": "thunderstorm with light hail",
        "icon": "thunderstorm",
        "openWeatherIconCode": "11d"
    },
    99: {
        "description": "thunderstorm heavy hail",
        "icon": "thunderstorm",
        "openWeatherIconCode": "11d"
    },

};
// const openWeatherKey = "bb876717b439e249107f1730171bebcb";
const getWeatherData = async () => {
    try {
        
        // const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openWeatherKey}&units=imperial`);
        const weatherData = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lng}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min`);
        // console.log(await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openWeatherKey}&units=imperial`));

        const unixCurrentDate = new Date(weatherData.data.current.time).getTime();
        const locallOffset = new Date().getTimezoneOffset() * 60000;
        weatherData.data.current.time = new Date(unixCurrentDate-locallOffset);
        const nextDayData = {};
        let i = 0;
        for (const key in weatherData.data.hourly.time) {
            if (Object.hasOwnProperty.call(weatherData.data.hourly.time, key)) {
                const dateTime = weatherData.data.hourly.time[key];
                const unixDate = new Date(dateTime).getTime();
                if (unixDate > unixCurrentDate) {
                    nextDayData[i] = new Date(unixDate-locallOffset);;
                    i += 1;
                    
                    if (i > 23) {
                        break;
                    }
                }
            }
        }
        weatherData.data.hourly.time = nextDayData;
        
        await new Promise((res) => setTimeout(res, 1000));

        return weatherData.data;
    } catch (error) {
        console.log(error); 
    }
};

const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const updatedCities = cities.filter(
        (city) => city.id !== router.query.id
    )
    localStorage.setItem("savedCities", JSON.stringify(updatedCities));
    router.push({name: "home"});
};
</script>