<template>
    <div class="login">
        <input v-model="email" placeholder="email" type="email">
        <input v-model="password" placeholder="password" type="password">
        <button v-on:click="loginBtnClick">login</button>
        <span class="error">{{error}}</span>
        <button v-on:click="goToRegister">S'inscrire</button>
    </div>
</template>
<script>
import {ServiceUtilisateur} from "../service/ServiceUtilisateur";
export default {
    name: 'LoginComponent',
    data: () => ({
        email: "",
        password: "",
        error: ""
        }),
    methods: {
        async goToRegister() {
            this.$emit("changePage", "register");
        },

        async loginBtnClick(){
            if(this.email.trim() !== "" && this.password.trim() !== "") {
            ServiceUtilisateur.login(this.email, this.password)
            .then(async (response) => {
                const result = await response.json();
                if(response.status === 200) {
                localStorage.setItem("token", result.token)
                this.$emit("setIsConnected", true);
                this.$emit("changePage", "listes");
                } else {
                this.error = result.message;
                }
            });
            }
        }
    }
}
</script>
<style>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login input {
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
}

.login button {
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    background-color: blue;
    color: white;
}

.login .error {
    color: red;
}
</style>


