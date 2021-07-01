import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { listOfDraftByUser,removeDraft } from '../../actions/draft';
import { getProfile } from '../../actions/user';
import moment from 'moment';
import { Button } from 'antd';


const DraftRead = () => {
    const [message, setMessage] = useState('');
    const [blogs, setBlogs] = useState([]);
    const token = getCookie('token');

    useEffect(() => {
          const token = getCookie('token');
            getUsername(token)

    }, []);


    const getUsername = (token) => {
        return  getProfile(token)
        .then(data => {
           loadDrafts(data.username)})
        .catch(err => console.log(err))
    }


    const loadDrafts = (username,token) => {
      if(username){
        listOfDraftByUser(username,token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              console.log(data)
                setBlogs(data);
            }
        });
      }
    };

    const deleteDraft = slug => {
        removeDraft(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your draft?');
        if (answer) {
            deleteDraft(slug);
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
                <Link href={`/admin/draft/${blog.slug}`}>
                    <a className="ml-2" ><Button className='update-btn'>Update</Button>
                    <style global jsx>{`
                     .update-btn{
                       color:white!important;
                       border: 0px solid white!important;
                       background-color:#00e5ff!important;
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
                        Delete Draft
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
        <div className='container'>
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
        </div>
    );
};

export default DraftRead;
