import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';
import axios from 'axios'

//CREATE DRAFT
export const createDraft = (blog, token) => {
    let draftBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        draftBlogEndpoint = `${API}/blogs/createDraft`;
    } else if (isAuth() && isAuth().role === 0) {
        draftBlogEndpoint = `${API}/blogs/createDraft`;
    }

    return fetch(`${draftBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


//LIST OF DRAFT BY USER
export const listOfDraftByUser = (username) => {
    let listDraftEndpoint;
    listDraftEndpoint = `${API}/${username}/draft`;

    return fetch(`${listDraftEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
          console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

//REMOVE DRAFT
export const removeDraft = (slug, token) => {
    let deleteDraftEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteDraftEndpoint = `${API}/blog/removeDraft/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteDraftEndpoint = `${API}/blog/removeDraft/${slug}`;
    }

    return fetch(`${deleteDraftEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

//SINGLE DRAFT
export const singleDraft = (slug = undefined) => {
    return fetch(`${API}/blog/readDraft/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//UPDATE DRAFT
export const updateDraft = (blog, token, slug) => {
    let updateDraftEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateDraftEndpoint = `${API}/blog/updateDraft/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateDraftEndpoint = `${API}/blog/updateDraft/${slug}`;
    }

    return fetch(`${updateDraftEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};
