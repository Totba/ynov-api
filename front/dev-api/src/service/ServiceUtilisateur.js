import {ServiceXhr} from "./ServiceXhr";

export const ServiceUtilisateur = {
    login: async (email, password) => {
        const data = JSON.stringify({email: email, password: password});
        return ServiceXhr.callWithoutAuth("http://localhost:5003/api/v1/users/login", data, "POST");
    },

    register: async (email, password, termsAndConditions) => {
        const data = JSON.stringify({email: email, password: password, terms_and_conditions: termsAndConditions});
        return ServiceXhr.callWithoutAuth('http://localhost:5003/api/v1/users/register', data, "POST");
    },

    getInfo: async () => {
        return ServiceXhr.callWithAuthNoBody("http://localhost:5003/api/v1/users/me", "GET");
    },

    updateInfo: async (email, password) => {
        const data = JSON.stringify({email: email, password: password});
        return ServiceXhr.callWithAuth("http://localhost:5003/api/v1/users/update", data, "POST")
    }
}