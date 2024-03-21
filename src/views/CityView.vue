<template>
    <div>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <CityViewSceleton />
            </template>
        </Suspense>
    </div>
</template>

<script setup>
    import CityViewSceleton from "@/components/CityViewSceleton.vue";
    import AsyncCityView from "@/components/AsyncCityView.vue";
</script>
