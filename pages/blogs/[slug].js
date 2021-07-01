import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated, allcommentBlog } from '../../actions/blog';
import { singleFAQ } from '../../actions/faq';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import BlogComment from '../../components/blog/BlogComment';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { userById } from '../../actions/user'
import Facebook from '../../components/social/facebook'
import Twitter from '../../components/social/twitter'
import Linkedin from '../../components/social/linkedin'
import LazyLoad from 'react-lazy-load';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FaqCard from '../../components/blog/FaqCard';


const CommentList = ({ comments }) => {
  return <div className='container'>
  <List
    dataSource={comments.comments}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
  </div>
};





const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);
    const [comments, setComments] = useState([])
    const [userName, setUserName] = useState([]);


    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                setRelated(data);
            }
        });
    };


    const getComments = () => {
      if(!blog){
        return;
      }
      return allcommentBlog(blog._id).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setComments(data)
          }
        }
      )
    }

    const init = (blog) => {
          userById(blog.postedBy._id)
          .then((res) => {
            setUserName(res.user.username)
          })
          .catch(err => console.log(err))
    }


    useEffect(() => {
         init(blog);
        loadRelated();
        getComments()
    }, []);


const BlogSchema = (blog) => {
  return { "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${DOMAIN}/blogs/${query.slug}`
  },
  "headline": blog.title,
  "image": `${API}/blog/photo/${blog.slug}`,
  "author": {
    "@type": "Person",
    "name": blog.postedBy.name
  },
  "publisher": {
    "@type": "Organization",
    "name": "Geeksocean.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://geeksocean.com/static/images/Logo.jpg",
      "width": 60,
      "height": 60
    }
  },
  "datePublished": blog.createdAt,
  "dateModified": blog.updatedAt
  }
}

const FAQSchema = () => {
  return { "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [blog.faqs[0] && blog.faqs[0].body.map(item => {
    return {
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text":  item.answer
      }
    }
  })]
 }
}

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg"  alt='author'/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@geeks_ocean" />
            <meta name="twitter:account_id" content="1244566301244190720" />
            <meta name="twitter:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta name="twitter:description" content={blog.mdesc} />
            <meta name="twitter:creator" content={blog.postedBy.name} />
            <meta name="twitter:image" content={`${API}/blog/photo/${blog.slug}`} />
            <script
              type='application/ld+json'
              defer
              dangerouslySetInnerHTML={{ __html: JSON.stringify(BlogSchema(blog))}}
          />
          <script
            type='application/ld+json'
            defer
            dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQSchema())}}
        />
        </Head>
    );


    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className=""><Button className='show-blogs-category'>{c.name}</Button>
                <style global jsx>{`
                 .show-blogs-category{
                margin:5px!important;
                color:black!important;
                font-weight:400!important;
                background:rgba(0, 0, 0, 0.05)!important;
                border: 0px solid rgba(0, 0, 0, 0.05)!important;
                 }
                  `}</style>
                  </a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className=""><Button className='show-blogs-tags'>{t.name}</Button>
                <style global jsx>{`
                 .show-blogs-tags{
                   margin:5px!important;
                   color:black!important;
                   font-weight:400!important;
                   background:rgba(0, 0, 0, 0.05)!important;
                   border: 0px solid rgba(0, 0, 0, 0.05)!important;
                 }
                  `}</style>
                </a>
            </Link>
        ));



    const showFAQs = () => {
      return blog.faqs[0] && blog.faqs[0].body.map((t, i) => {
        return <div className='m-2'>
                  <FaqCard  question={t.question} answer={t.answer}/>
                    <style global jsx>{`
                    .MuiExpansionPanelDetails-root {
                    display: flex;
                    padding: 8px 24px 24px;
                    }
                    .MuiExpansionPanelSummary-root {
                    background: #30415f!important;
                    color:white!important;
                    display: flex;
                    padding: 0 24px 0 24px;
                    min-height: 48px;
                    }
                    .MuiSvgIcon-root {
                      color:white!important;
                    }
                    .makeStyles-heading-67 {
                      font-size:20px;
                      font-family: sans-serif;
                    }
                    .makeStyles-heading-36 {
                    font-size: 16px;
                    font-weight: 400;
                    font-family: sans-serif;
                    }
                    `}</style>
               </div>

        })};



    const showRelatedBlog = () => {
        return related.map((blog, i) => (
              <div key={i} style={{ margin:"5px"}} className='col-md-3'>
                <article>
                    <SmallCard blog={blog} />
                </article>
               </div>
        ));
    };

    return (
        <>
            {head()}

            <Layout>

            <div className='blog-detail container'>
                <main>
                    <article>
                        <div className="container">
                            <section>
                                <div className="container col-md-8">
                                    <h1 className="blog-title text-center"> {blog.title} </h1>
                                    <section>
                                        <div className="mark">
                                        <div className='row col container'>
                                           <div className='col-md-8 row'>
                                                <div className='img-container'>
                                                       <LazyLoadImage
                                                       className="profile-img"
                                                       style={{ borderRadius: "60px" }}
                                                       src={`${API}/user/photo/${userName}`}
                                                       alt='' />
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
                                                 <div className='col-md-4 row justify-content-center social-sharing'>
                                                   <Facebook   url={`${DOMAIN}/blogs/${blog.slug}`}/>
                                                   <Twitter  url={`${DOMAIN}/blogs/${blog.slug}`} />
                                                   <Linkedin  url={`${DOMAIN}/blogs/${blog.slug}`} />
                                                 </div>

                                            </div>
                                        </div>

                                    </section>
                                    <section>

                                        <div className="row justify-content-center" style={{ marginTop: '20px!important' }}>
                                        <LazyLoad height={"100%"} offsetHorizontal={50} >
                                            <LazyLoadImage
                                                effect="blur"
                                                src={`${API}/blog/photo/${blog.slug}`}
                                                alt={blog.title}
                                                className="img img-fluid "
                                            />
                                        </LazyLoad>
                                        </div>
                                    </section>



                                </div>
                            </section>
                        </div>

                        <div className="row col justify-content-center">
                               <div className='col-md-8 lead' style={{ color: "black"}}>
                           {renderHTML(blog.body)}
                               </div>
                        </div>

                    <div className='text-center'>

                      { blog.faqs && blog.faqs[0] && blog.faqs[0].body && blog.faqs[0].body[0].question.length >0 &&<div className='row col justify-content-center'>
                        <h2 className='faq-title'>Frequently Asked Questions</h2>
                                  <div className='col-md-8'>{showFAQs()}</div>
                              </div>}
                    </div>
                  {/*  <div className='views text-center'>{blog.views.length} views</div>*/}
                    <div className="p-1 mt-5 container row col justify-content-center">
                      <div className='col-md-8 text-center'>
                          {showBlogCategories(blog)}
                          {showBlogTags(blog)}
                      </div>
                    </div>
                      </article>
                </main>

                <div className='blog-comment '>
                <BlogComment id={blog} />
                <CommentList comments={comments} />

                </div>

                 <div className="container">
                     <h4 className="text-center pt-3 pb-3 more-from-geeksocean">More from Geeksocean.com</h4>
                     <div className="row p-2 col justify-content-center">
                         {showRelatedBlog()}
                     </div>
                 </div>


                <style global jsx>{`
                  .social-sharing{
                    padding-top:16px;
                  }
                 .faq-title{
                   font-weight:bold;
                 }

                  .blog-comment{
                    padding-top:40px;
                  }
                  .more-from-geeksocean{
                    font-family: 'Marmelad', sans-serif;


                  }
                 .blog-detail{
                  padding-left: 20px;
                  padding-right: 20px;

                 }
                 .views{
                   margin-left: 22px;
                   padding-top: 4px;
                   font-family: monospace;
                 }
                 .img-fluid{
                   margin-bottom: 20px;
                 }

                 .blog-title{
                   margin-bottom: 30px!important;
                   font-size: 40px!important;
                   padding-top:65px;
                   letter-spacing: 1px;
                   word-spacing: 2px;
                   font-family: 'EB Garamond', serif!important;

                 }
                 .container{
                   padding-left: 0px!important;
                   padding-right: 0px!important;
                 }
                 .blog-container{

                 }
                 .excerpt{
                 }
                 .container{

                 }
                 @media(max-width: 767px){
                   .blog-container{
                     padding: 1px;
                     margin:0px;
                     margin-bottom: 20px;
                     margin-top: 20px;
                   }
                   .blog-detail{


                   }
                 }

                 .card{
                   border: 0px solid white;

                   padding: 5px!important;
                 }
                 .col-md-8{
                   padding-left:0px!important;
                   padding-right:0px!important;
                 }
                 .col-md-4{
                   padding-left:0px!important;
                   padding-right:0px!important;
                 }

                 .img-container{

                 }
                 .mark{
                   padding:1.2em!important;
                    background-color:white!important;
                   margin-bottom:20px!important;
                 }
                 .user-container{
                   font-family: sans-serif;
                   padding:5px;
                   padding-left: 13px;
                 }
                 textarea.ant-input {
                  margin: 10px;
          }
              .profile-img{
                height:70px!important;
                width:70px!important;
              }
                  `}</style>
              </div>
          </Layout>
        </>
    );
};

SingleBlog.getInitialProps = ({ query}) => {
  return  singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
