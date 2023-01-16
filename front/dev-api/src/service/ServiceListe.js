import {ServiceXhr} from "./ServiceXhr";

export const ServiceListe = {
    getAll: () => {
        return ServiceXhr.callWithAuthNoBody("http://localhost:5003/api/v1/list", "GET");
    },
    create: (title) => {
        const data = JSON.stringify({title: title});
        return ServiceXhr.callWithAuth("http://localhost:5003/api/v1/list   ", data, "POST");
    },
    modify: (title, id) => {
        const url = "http://localhost:5003/api/v1/list/" + id;
        const data = JSON.stringify({title: title});
        return ServiceXhr.callWithAuth(url, data, "PUT")
    },
    delete: (id) => {
        const url = "http://localhost:5003/api/v1/list/" + id;
        return ServiceXhr.callWithAuthNoBody(url, "DELETE");
    }
}