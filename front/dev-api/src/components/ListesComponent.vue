<template>
<div>
    <span>{{error}}</span>
    <div v-for="liste in listes" :key="liste._id" class="list-child">
    <liste-component :liste="liste" :tasks="tasks" :listes="listes" @setTasks="setTasks" @setTasksWithApi="setTasksWithApi" @setListes="setListes"></liste-component>
    </div>

    <div class="list-child">
    <input placeholder="Titre de la liste" v-model="title"/>
    <button v-on:click="this.createList()">Crée liste</button>
    </div>
</div>
</template>

<script>

import ListeComponent from '../components/ListeComponent.vue'
import {ServiceTask} from "../service/ServiceTask";
import {ServiceListe} from "../service/ServiceListe";

export default {
name: "ListesComponent",
components: {ListeComponent},
data: () => ({
    listes: [],
    tasks: [],
    error: "",
    title: ""
}),
methods: {
    setTasks(tasks) {
    this.tasks = tasks;
    },
    setListes(listes) {
    this.listes = listes;
    },
    setListWithApi() {
    ServiceListe.getAll()
    .then(async (response) => {
        const result = await response.json();
        if(response.status === 200) {
        this.listes = result;
        } else {
        this.error = result.message;
        }
    });
    },
    setTasksWithApi() {
    ServiceTask.getAll()
        .then(async (response) => {
            const result = await response.json();
            if(response.status === 200) {
                this.tasks = result;
            } else {
                this.error = result.message;
            }
    });
    },
    createList() {
    ServiceListe.create(this.title)
    .then(async (response) => {
        if(response.status === 201) {
        this.setListWithApi();
        this.title = "";
        } else {
        const result = await response.json();
        this.error = result.message;
        }
    });
    },
},
mounted() {
    this.setListWithApi();
    this.setTasksWithApi();
}
}
</script>

<style>
.list-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.list-child input {
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
}

.list-child button {
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: blue;
    color: white;
}

.list-child span {
    color: red;
}
</style>


