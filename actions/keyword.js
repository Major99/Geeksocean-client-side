import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';


//CREATE TAG
export const createKeyword = (keyword, token) => {
    return fetch(`${API}/createKeyword`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(keyword)
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

//GET ALL KEYWORD
export const getKeywords = () => {
    return fetch(`${API}/keywords`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//SINGLE KEYWORD
export const singleKeyword = slug => {
    return fetch(`${API}/keyword/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//REMOVE KEYWORD
// export const removeKeyword = (slug, token) => {
//     return fetch(`${API}/keyword/${slug}`, {
//         method: 'DELETE',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             handleResponse(response);
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
