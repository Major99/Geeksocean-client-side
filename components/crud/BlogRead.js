import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import { getProfile } from '../../actions/user';
import moment from 'moment';
import { Button } from 'antd';


const BlogRead = () => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
          const token = getCookie('token');
            getUsername(token)

    }, []);


    const getUsername = (token) => {
        return  getProfile(token).then(data => {
          loadBlogs(data.username);
         }).catch(err => console.log(err))
    }

    const loadBlogs = (username) => {
      if(username){
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
      }

    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (

                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-2" ><Button className='update-btn'>Update</Button>
                    <style global jsx>{`
                     .update-btn{
                       color:white!important;
                       background-color:#5cdbd3!important;
                     }
                      `}</style>
                    </a>
                </Link>


            );
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="shadow article-container">
                    <h4  className='text-center'>  {blog.title}  </h4>
                    <p className='manage-by'>
                    <b>{blog.postedBy.name}</b> | Updated on {moment(blog.updatedAt).fromNow()}
                    </p>
                    <Button className="ml-2" onClick={() => deleteConfirm(blog.slug)} type="primary" danger>
                        Delete
                    </Button>
                    {showUpdateButton(blog)}
                    <style jsx>{`
                      .manage-by{

                        padding-left:4px;
                      }
                     .article-container{
                       margin-bottom:30px;
                       padding: 10px;

                     }
                      `}</style>
                </div>
            );
        });
    };

    return (
        <>

            <div className="row blog-read-container">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllBlogs()}
                </div>
            </div>
            <style jsx>{`
               .blog-read-container{
                 padding: 10px;

               }
               @media(max-width: 767px){
                 .blog-read-container{
                   padding: 10px;
                   text-align:center!important;

                 }
               }
              `}</style>

        </>
    );
};

export default BlogRead;
