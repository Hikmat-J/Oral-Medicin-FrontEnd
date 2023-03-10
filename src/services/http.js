import axios from 'axios'

const BaseUrl = 'http://localhost:8080/api'

export async function Get(url, Params) {

    return axios.get(url, {
        params: Params,
        withCredentials: false,
        headers: { "Content-Type": "application/json" }
    })
        .then(response => HandleResponse(response, 'Get'))
        .catch(error => {
            return HandleError(error).then(() => {
                return;
            }
            );
        });
}

export async function Post(url, Body, isFormData = false, Params) {

    let headers = {}
    if (isFormData) headers = { "content-type": "multipart/form-data" }
    else headers = { "Content-Type": "application/json" }
    return axios.post(url, Body, { params: Params, headers })
        .then(response => HandleResponse(response, url.includes("GetToken") ? 'token' : 'Post'))
        .catch(error => {
            alert(error)
            return HandleError(error).then((err) => {
                return err;
            }
            );
        });
}

async function HandleError(error) {
    if (error.response.status === 401) {
        return '401'
    }
    return Promise.reject(error.message ? error.message : null);
}

function HandleResponse(response, methodType) {
    let data = {};
    data = response.data;
    if (response.status === 200 || response.status === 304) {
        return { data: response.data };
    }
    throw new Error(response.statusText);
}
