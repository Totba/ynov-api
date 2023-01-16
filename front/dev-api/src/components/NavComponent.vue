<template>
<div class="navContainer">
    <button v-on:click="goToLogin" v-if="!isConnected">login</button>
    <button v-on:click="goToRegister" v-if="!isConnected">register</button>
    <button v-on:click="goToAccueil" v-if="isConnected">Accueil</button>
    <button v-on:click="goToProfile" v-if="isConnected">mon profile</button>
    <button v-on:click="logout" v-if="isConnected">logout</button>
</div>
</template>

<script>
export default {
name: "NavComponent",
props: ["isConnected"],

methods: {
    async goToAccueil() {
    this.$emit("changePage", "listes");
    },

    async goToProfile() {
    this.$emit("changePage", "profile");
    },

    async logout() {
    localStorage.removeItem("token");
    this.$emit("setIsConnected", false);
    this.$emit("changePage", "login");
    },

    async goToLogin() {
    this.$emit("changePage", "login");
    },

    async goToRegister() {
    this.$emit("changePage", "register");
    }
}
}
</script>
<style>
.navContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f1f1f1;
    padding: 10px;
    width: 100%;
}

button {
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
}
</style>



