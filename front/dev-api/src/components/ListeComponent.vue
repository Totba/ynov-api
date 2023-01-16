<template>
  <div class="liste-component">
    <div class="horizontale size80">
      <h2 v-if="!isEdit">{{liste.title}}</h2>
      <input v-if="isEdit" v-model="title" placeholder="Titre de la liste">
      <div class="horizontale">
        <button v-if="!isEdit" v-on:click="setEditing(true)">Modifier</button>
        <button v-if="!isEdit" v-on:click="deleteList(liste._id)">Supprimer</button>
        <button v-if="isEdit" v-on:click="updateList(liste._id)">Modifier</button>
        <button v-if="isEdit" v-on:click="setEditing(false)">Annuler</button>
      </div>
    </div>
    <p>Créée le: {{liste.createdAt}}</p>
    <p>Modifiée le: {{liste.updatedAt}}</p>
    <div class="tasks-container">
      <div v-for="task in tasks.filter(aTask => aTask.list === liste._id)" :key="task._id" class="task-child">
        <TaskComponent :task="task" :tasks="tasks" @setTasks="setTasks"></TaskComponent>
      </div>
      <div class="task-child create">
        <input placeholder="Titre" v-model="this.newTaskTitle" />
        <input placeholder="Description" v-model="this.newTaskDescription"/>
        <button v-on:click="createTask(liste._id)">Ajout</button>
      </div>
    </div>
  </div>
</template>

<script>

import TaskComponent from '../components/TaskComponent.vue'
import {ServiceTask} from "../service/ServiceTask";
import {ServiceListe} from "../service/ServiceListe";

export default {
  name: "ListeComponent",
  components: {TaskComponent},
  props: ["liste", "tasks", "listes"],
  emits: ["setTasks", "setTasksWithApi", "setListes"],
  data: () => ({
    isEdit: false,
    title: "",
    newTaskTitle: "",
    newTaskDescription: ""
  }),
  methods: {
    updateList(listeId) {
      ServiceListe.modify(this.title, listeId)
      .then(async (response) => {
        if(response.status === 200) {
          this.setEditing(false);
          for(let aList of this.listes) {
            if(aList._id === this.liste._id) {
              aList.title = this.title;
            }
          }

          this.$emit("setTasks", this.tasks);
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
    setEditing(value) {
      this.isEdit = value;
    },
    deleteList(listId) {
      ServiceListe.delete(listId)
      .then(async (response) => {
        if(response.status === 200) {
          this.$emit("setListes", this.listes.filter(aList => aList._id !== listId));
        } else {
          const result = await response.json();
          this.error = result.message;
        }
      });
    },
    setTasks(tasks) {
      this.$emit("setTasks", tasks);
    },
    createTask(listeId) {
      ServiceTask.create(this.newTaskTitle, this.newTaskDescription, listeId)
      .then(async (response) => {
          if(response.status === 201) {
            this.$emit("setTasksWithApi");
            this.newTaskTitle = "";
            this.newTaskDescription = "";
          } else {
            const result = await response.json();
            this.error = result.message;
          }
        });
    }
  },
  mounted() {
    this.title = this.liste.title;
  }
}
</script>
<style>
.liste-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.horizontale {
    display: flex;
    align-items: center;
    justify-content: center;
}

.size80 {
    width: 80%;
}

.liste-component h2 {
    margin: 10px 0;
}

.liste-component input {
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
}

.liste-component button {
    margin: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: blue;
    color: white;
}

.liste-component .tasks-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}

.liste-component .task-child {
    width: 30%;
    margin: 10px;
}

.liste-component .create {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.liste-component .create input {
    width: 48%;
    margin: 10px;
}
</style>