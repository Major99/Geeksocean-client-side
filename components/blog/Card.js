import Link from 'next/link';
import { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { Button } from 'antd';
import { userById } from '../../actions/user'
import LazyLoad from 'react-lazy-load';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Card = ({ blog }) => {

  // const [pic, setPic] =useState('');
    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (

                <a key={i}  href={`/categories/${c.slug}`}><Button style={{ margin: "5px" }} type="link" info>{c.name}</Button></a>

        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (

                <a href={`/tags/${t.slug}`}  key={i}><Button style={{ margin: "5px" }} type="link" info>{t.name}</Button></a>

        ));

    // const init = (blog) => {
    //       userById(blog.postedBy._id)
    //       .then((res) => setPic(res.user.picture))
    //       .catch(err => console.log(err))
    // }
    //
    //  useEffect(() => {
    //
    //    init(blog);
    //  }, [])

   return (

        <div className="blog-container card shadow ">

            <header>
                <a href={`/blogs/${blog.slug}`}>

                    <h2 className="blog-title text-center">
                   {blog.title}
                    </h2>

                </a>
            </header>
{/*          <section>
                <p className="mark">
                <div className='row col'>
                   <div className='img-container'>
                   <img
                       className=""
                       height={50}
                       width={50}
                       style={{ borderRadius: "60px" }}
                       src={pic}

                   />
                   </div>
                   <div className='user-container'>
                     <div className=''>
                     <Link href={`/profile/${blog.postedBy.username}`}>
                         <a>{blog.postedBy.name}</a>
                     </Link>
                     </div>
                      <div className=''>
                        {moment(blog.createdAt).fromNow()}
                      </div>
                   </div>
                </div>
                </p>
            </section>*/}


            <div className="row ">
                <div className="col-md-3">
                    <section>
                     <LazyLoad height={"100%"} offsetHorizontal={50}>
                        <LazyLoadImage
                            effect="blur"
                            className=""
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                      </LazyLoad>
                    </section>
                </div>
                <div className="col-md-9 excerpt">
                    <section>
                        <div className='excerpt-content'>{renderHTML(blog.excerpt)}</div>
                            {/*<div className='views'>{ blog && blog.views blog.views.length} views</div>*/}
                            <div className='readbtn'>
                             <a href={`/blogs/${blog.slug}`}><button className='readmore'>Read more</button></a>
                            </div>
                    </section>
                    <section>
                        {/*showBlogCategories(blog)*/}
                        {/*showBlogTags(blog)*/}
                    </section>
                </div>
            </div>
            <style global jsx>{`
              .excerpt-content{
                font-family: 'Source Sans Pro', sans-serif;
                font-size:17px;
              }
              .views{
                padding-top: 4px;
                font-family: monospace;
              }
              p{
                margin-top: 20px!important;
              }

            .blog-container{
              padding: 10px;
              margin:10px;

            }
            @media(max-width: 767px){
              .blog-container{
                padding: 1px;
                margin:0px;
                margin-bottom: 20px;
                margin-top: 20px;
              }

              .col{
                padding-left: 5px!important;
                padding-right: 5px!important;
              }
              .col-md-3{
                padding-left:0px!important;
                padding-right:0px!important;
              }
              .col-md-10{
                padding-left: 5px!important;
                padding-right: 5px!important;
              }
              .readmore{

                background-color: #fff;
                font-size: 17px;
                margin-bottom:5px;
                color: #4b49ff;
                border-radius: 100px;
                border: 0px solid #00f;
                font-family: Nunito Sans,sans-serif;
                font-weight: 800;
              }
              .readbtn{
                align-items: center;
                text-align: center;
                justify-content: center;
              }
              .blog-title{
                font-size: 23px;
                padding-top:10px;
                letter-spacing: 1px;
                word-spacing: 2px;
                font-family: 'Nunito Sans', sans-serif;
              }
            }
            .readmore{
              font-size: 17px;
              background-color: #fff;

              color: #4b49ff;
              border-radius: 100px;
              border: 0px solid #00f;
              font-family: Nunito Sans,sans-serif;
              font-weight: 800;
            }

            .card{
              border: 0px solid white;
              padding: 0px!important;
            }
            .col-4{
              padding-right: 0px;
              padding-left: 0px!important;
            }
            .col-8{
              padding-right: 0px;
              padding-left: 0px!important;
            }
            .col-md-8{
              padding-left:0px!important;
              padding-right:0px!important;
            }
            .col-md-5{
              padding-right: 0px;
              padding-left: 0px!important;
            }
            .col-md-4{
              padding-left:0px!important;
              padding-right:0px!important;
            }
            .blog-title{
              font-size:28px;
              padding-top:10px;
              font-family: 'Nunito Sans', sans-serif;
            }
            .img-container{
             padding-left:30px;
            }
            .mark{
              padding:1.2em!important;
              background-color: white!important;
            }
            .container{
             padding-right: 0px!important;
             padding-left: 0px!important;
            }
            .user-container{
              padding:5px;
              padding-left: 13px;
            }
              `}</style>

        </div>

    );
};

export default Card;
