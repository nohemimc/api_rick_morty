<template>
    <div class="container">
        <div class="event-card">
            <h4>{{ event ? event.name : "" }}</h4>
            <div class="status">
                <span
                    :class="
                        statusColor == 'Unknow' 
                            ? '' 
                            : statusColor == 'Alive' 
                            ? 'statusGreen' 
                            : 'statusRed'
                    "
                ></span>
                <span>Status: {{ event ? event.status : "" }}</span>
            </div>
            <img :src=" event ? event.image : '' " alt="event.name">
            <nav class="nav-details">
                <router-link :to="{ name: 'EventDetails'}" >Details</router-link>
                    |
                <router-link :to="{ name: 'EventLocation'}" >Location</router-link>
            </nav>
            <router-view :event="event"/>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import EventService from "@/services/EventService";
import router from "@/router";
export default {
    props: ["id"],
    setup(props) {
        const event = ref(null);
        const statusColor = ref(null);
        
        //created
        EventService.getEvent(props.id)
            .then((response) => {
                event.value = response.data;
                statusColor.value = event.value.status;
                console.log(event.value.status);
            })
            .catch((error) => {
                console.log("Error", error);

                /*
                 Método router.push: "this.$router.push".
                 Permite navegar a otra URL diferente.
                */
                router.push({
                    name: "404Resource",
                    params: { resource: "event"}
                });
            });
        return {
            event,
            statusColor

        }
    }
}
</script>

<style>
    .event-card {
}
.statusGreen,
.statusRed {
	margin: auto 0;
	height: 0.5rem;
	width: 0.5rem;
	margin-right: 0.375rem;
	background: rgb(214, 61, 46);
	border-radius: 50%;
}
.statusGreen {
	background: rgb(92 199 12);
}
</style>