<template>
    <div class="search-container">
        <form >Search
            <input type="text" placeholder="Nombre del personaje" v-model="searchPersonaje">
        </form>
        <button @click="getPersonaje">Search</button>
        <!-- <EventLayout></EventLayout> -->
        <router-view :searchPersonaje="searchPersonaje"/>
    </div>
    
</template>

<script>
    import { ref } from "vue";
    import EventService  from "@/services/EventService";
    // import EventLayout from "./event/EventLayout.vue";
    import router from "@/router";
    export default {
    name: "SearchPersonaje",
    props: ["name"],
    setup(props) {
        const event = ref(null);
        let searchPersonaje = ref("");
        let searchValue = (searchPersonaje.value).toLowerCase();

        function getPersonaje() {
            EventService.getEventName(props.name)
                .then((response) => {
                    event.value = response.data;
                    searchValue = event.value.name;
                    console.log(searchValue);
                })
                .catch((error) => {
                    console.log("Error de solicitud", error);
                    router.push({
                        name: "404Resource",
                        params: { resource: "searchPersonaje" }
                    });
                });
            }
        return {
            searchPersonaje, getPersonaje
        };
    },
    // components: { EventLayout }
}
</script>

<style>
    @import "../assets/styles.scss";
    .search-container{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15px;
        flex-wrap: wrap;
    }

    .search-container form, input{
        font-size: 1.3rem;
        margin: 0.5rem 1rem 0.5rem 0;
        color: #2c3e50;
    }

    .search-container input {
        font-size: 0.8rem;
        font-style: italic;
        font-family: sans-serif;
        color: hsla(240, 54%, 3%, 0.893);
        padding: 10px;
        border-radius: 5px;
        width: 20rem;
    
    }

</style>