import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';
import axios from 'axios'


export const createFAQ = (faq,token) => {
    let faqBlogEndpoint;

    console.log(JSON.stringify(faq))

    if (isAuth() && isAuth().role === 1) {
        faqBlogEndpoint = `${API}/blog/createFAQ`;
    } else if (isAuth() && isAuth().role === 0) {
        faqBlogEndpoint = `${API}/blog/createFAQ`;
    }

    return fetch(`${faqBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(faq)
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


//LIST OF DRAFT BY USER
// export const listOfDraftByUser = (username) => {
//     let listDraftEndpoint;
//     listDraftEndpoint = `${API}/${username}/draft`;
//
//     return fetch(`${listDraftEndpoint}`, {
//         method: 'GET'
//     })
//         .then(response => {
//           console.log(response)
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
//
// //REMOVE DRAFT
// export const removeDraft = (slug, token) => {
//     let deleteDraftEndpoint;
//
//     if (isAuth() && isAuth().role === 1) {
//         deleteDraftEndpoint = `${API}/blog/removeDraft/${slug}`;
//     } else if (isAuth() && isAuth().role === 0) {
//         deleteDraftEndpoint = `${API}/blog/removeDraft/${slug}`;
//     }
//
//     return fetch(`${deleteDraftEndpoint}`, {
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
//

export const singleFAQ = (id) => {
    return fetch(`${API}/blog/singleFAQ/${id}`, {
        method: 'GET',
        headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json'
               }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateFAQ = (faq,id) => {
    let updateFAQEndpoint;
    if (isAuth() && isAuth().role === 1) {
        updateFAQEndpoint = `${API}/blog/updateFAQ/${id}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateFAQEndpoint = `${API}/blog/updateFAQ/${id}`;
    }

    return fetch(`${updateFAQEndpoint}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'


        },
        body: JSON.stringify(faq)
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};
