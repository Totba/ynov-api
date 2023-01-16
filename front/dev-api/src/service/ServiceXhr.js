export const ServiceXhr = {
    callWithAuth: async (url, data, methode) => {
        return await fetch(url, {
            method: methode.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: data,
        });
    },
    callWithAuthNoBody: async (url, methode) => {
        return await fetch(url, {
            method: methode.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        });
    },
    callWithoutAuth: async (url, data, methode) => {
        return await fetch(url, {
            method: methode.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        })
    }
}