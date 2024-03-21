<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import CityCard from "@/components/CityCard.vue";


const savedCities = ref([]);
const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
        const requests = [];
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${city.coords.lat}&longitude=${city.coords.lng}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`
                )
            );
        });

        const weatherData = await Promise.all(requests);
        await new Promise((res) => setTimeout(res, 1000))
        
        weatherData.forEach((value, idx) => {
            savedCities.value[idx].weather = value.data;
        });
    };
}
await getCities();

const router = useRouter();
const goToCityView = (city) => {
    router.push({
        name: "cityView",
        params: {
            state: city.state,
            city: city.city
        },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lng: city.coords.lng,
        }
    })
}
</script>

<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard 
        :city="city"
        @click="goToCityView(city)"/>
    </div>

    <p v-if="savedCities.length === 0">
        No locatuins added. To start tracking a location, search in the field above.
    </p>
</template>