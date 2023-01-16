import {ServiceXhr} from "./ServiceXhr";

export const ServiceTask = {
    getAll: async () => {
        return ServiceXhr.callWithAuthNoBody('http://localhost:5003/api/v1/task', "GET");
    },
    create: async (title, description, listeId) => {
        const data = JSON.stringify({title: title, description: description, done: false, list: listeId});
        return ServiceXhr.callWithAuth("http://localhost:5003/api/v1/task", data, "POST");
    },
    modify: async (id, title, description, isDone, listeId) => {
        const data = JSON.stringify({title: title, description: description, done: isDone, list: listeId});
        const url = "http://localhost:5003/api/v1/task/" + id;
        return ServiceXhr.callWithAuth(url, data, "PUT");
    },
    delete: async (id) => {
        const url = "http://localhost:5003/api/v1/task/" + id;
        return ServiceXhr.callWithAuthNoBody(url, "DELETE");
    }
}