<template>
<div class="profile">
    <span class="error">{{error}}</span>
    <div v-if="!isEditing">
    <span>votre email: {{this.profile.email}}</span><br/>
    <span>le comptes est: {{this.profile.settings.is_email_validated ? "validé" : "non validé"}}</span><br/>
    <span>crée le: {{this.profile.createdAt}}</span><br/>
    <button v-on:click="setEditing(true)">Modifier</button>
    </div>

    <div v-if="isEditing">
    <input v-model="this.edited.email" placeholder="nouveau email"><br/>
    <input v-model="this.edited.password" placeholder="nouveau password" type="password"><br/>
    <button v-on:click="editProfile">Confirmé</button>
    <button v-on:click="setEditing(false)">Annuler</button>
    </div>
</div>
</template>

<script>
import {ServiceUtilisateur} from "../service/ServiceUtilisateur";

export default {
name: "ProfileComponent",
data: () => ({
    profile: {settings: {is_email_validated: false}},
    error: "",
    isEditing: false,
    edited: {email: "", password: ""}
}),
methods: {
    setEditing(value) {
    this.isEditing = value;
    },
    setProfile() {
    ServiceUtilisateur.getInfo()
    .then(async (response) => {
        if(response.status === 200) {
        this.profile = await response.json();
        } else {
        this.error = response.body;
        }
    });
    },
    editProfile() {
    ServiceUtilisateur.updateInfo(this.edited.email, this.edited.password)
    .then(async (response) => {
        if(response.status === 200) {
        this.setProfile();
        this.setEditing(false);
        } else {
        this.error = await response.json();
        }
    });
    }
},
mounted() {
    this.setProfile();
}
}
</script>

<style>
.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error {
    color: red;
    margin-bottom: 10px;
}

.profile > div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile > div > span {
    margin-bottom: 10px;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input {
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>



