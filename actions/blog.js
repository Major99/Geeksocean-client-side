import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';
import axios from 'axios'


//CREATE BLOG
export const createBlog = (blog, token) => {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createBlogEndpoint = `${API}/blog`;
    } else if (isAuth() && isAuth().role === 0) {
        createBlogEndpoint = `${API}/user/blog`;
    }

    return fetch(`${createBlogEndpoint}`, {
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


//LIST BLOGS WITH CATEGORY AND TAGS
export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//SINGLE BLOG
export const singleBlog = (slug = undefined) => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// LIST OF RELATED BLOGS
export const listRelated = blog => {
    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// LIST OF ALL BLOGS OF USERNAME
export const list = username => {
    let listBlogsEndpoint;

    listBlogsEndpoint = `${API}/${username}/blogs`;

    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//LIST OF ALL BLOGS
export const listOfAllBlogs = () => {
    let listBlogsEndpoint;
        listBlogsEndpoint = `${API}/blogs`;
    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//REMOVE BLOG
export const removeBlog = (slug, token) => {
    let deleteBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/blog/${slug}`;
    }

    return fetch(`${deleteBlogEndpoint}`, {
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


//UPDATE BLOG
export const updateBlog = (blog, token, slug) => {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${slug}`;
    }

    return fetch(`${updateBlogEndpoint}`, {
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


//SEARCH BLOG
export const listSearch = params => {
    // console.log('search params', params);
    let query = queryString.stringify(params);
    // console.log('query params', query);
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//COMMENT BLOG
export const commentBlog = (id, comments) => {
  // console.log(id)
  // console.log(comments)
    let  commentBlogEndpoint;
    commentBlogEndpoint = `${API}/blog/blog-comment/${id}`

   axios({
     method: 'PATCH',
     url: commentBlogEndpoint,
     data: comments
   }).then(response => {
         // console.log(response)
           return response.json();
       })
       .catch(err => console.log(err));
    // return fetch(`${commentBlogEndpoint}`, {
    //     method: 'PATCH',
    //     body: comments
    // }).then(response => {
    //       console.log(response)
    //         return response.json();
    //     })
    //     .catch(err => console.log(err));
}


//LIST OF ALL BLOGS
export const allcommentBlog = (id) => {
return  fetch(`${API}/blog/all-blog-comment/${id}`, {
  method: 'GET'
})
  .then(response => {
        handleResponse(response);
      return response.json();
  })
  .catch(err => console.log(err));
};


//LIST OF RANDOM BLOGS
export const randomBlog = () => {
return  fetch(`${API}/blogs/randomBlog`, {
  method: 'GET'
})
  .then(response => {
        handleResponse(response);
      return response.json();
  })
  .catch(err => console.log(err));
};


export const singleRandomBlog = () => {
return  fetch(`${API}/blogs/singleRandomBlogs`, {
  method: 'GET'
})
  .then(response => {
        handleResponse(response);
      return response.json();
  })
  .catch(err => console.log(err));
};


export const topLatestBlogs = (category) => {

return  fetch(`${API}/blogs/latest-Blogs/${category}`, {
  method: 'GET'
})
  .then(response => {
        handleResponse(response);
      return response.json();
  })
  .catch(err => console.log(err));
};
