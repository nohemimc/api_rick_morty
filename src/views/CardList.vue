<template>
    <div>
        <div class="container-search">
            <SearchPersonaje></SearchPersonaje>
        </div>
        <div class="btn-container">
            <button @click="prevPage">PREV</button>
            <button @click="nextPage">NEXT</button>
        </div>
        <div class="container">
            <EventCard v-for="event in events" :key="event.id" :event="event" />
        </div>
    </div>
</template>

<script>
// @ un alias para /src
import { ref } from "vue";
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js"
import SearchPersonaje from "@/views/SearchPersonaje.vue";
import router from "@/router";

export default {
    name: "CardList",
    setup() {
        const events = ref(null);
        const page = ref(1);
        //created
        EventService.getEvents()
            .then((response) => {
                // console.log("events:", response.data.results);
                events.value = response.data.results;
            })
            .catch();
        //methods
        function nextPage() {
            page.value++;
            getPage();
        }
        function prevPage() {
            page.value < 2 ? page.value : page.value--;
            getPage();
        }
        function getPage() {
            EventService.getEventsPage(page.value)
                .then((response) => {
                    events.value = response.data.results;
                    // console.log("events:", response.data.results);
                })
                .catch(() => {
                    if (page.value >= 43) {
                        console.log("There are no more pages to display");
                        router.push({
                            name: "404Resource",
                            params: { resource: "page" }
                        })
                    }
                });
        }
        return {
            events,
            page,
            prevPage,
            nextPage
        };
    },
    components: { EventCard, SearchPersonaje }
};
</script>

<style lang="scss">
@import "../assets/styles.scss";

 .container {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
 }

 .container-search {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
 }
</style>