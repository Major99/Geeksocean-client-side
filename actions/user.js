import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

//GET USER PUBLIC PROFILE
export const userPublicProfile = username => {
    return fetch(`${API}/user/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//GET PROFILE
export const getProfile = token => {
    return fetch(`${API}/user/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// UPDATE PROFILE
export const update = (token, user) => {
    return fetch(`${API}/user/update`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

//LIST OF ALL USERS
export const userslist = () => {
  console.log(API)
    let listUsersEndpoint;
        listUsersEndpoint = `${API}/users`;

    return fetch(`${listUsersEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
          console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

//USER BY ID
export const userById = (id) => {
    let userDataEndpoint;
        userDataEndpoint = `${API}/user/userdata/${id}`;

    return fetch(`${userDataEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
          // console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};
