import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import LazyLoad from 'react-lazy-load';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const FlashCard = ({ blog }) => {
  return <>
   <Link href={`/blogs/${blog.slug}`}>
     <a>
       <div className='  mb-4'>
         <div className='row'>
            <div className='col-4'>
             <LazyLoadImage
             effect="blur"
             src={`${API}/blog/photo/${blog.slug}`}
             alt={blog.title}
             className="img img-fluid "
             />
            </div>
            <div className='col-8'>
               <div className=' pl-4'>
                <h6 className='flash-title'> {blog.title} </h6>
                <b> {moment(blog.createdAt).fromNow()} </b>
               </div>
            </div>
         </div>
         <style jsx>{`
           .flash-title{
             font-weight: bold!important;
             font-size: 16px;
             font-family: 'Nunito Sans', sans-serif;
           }
           `}</style>
       </div>
      </a>
  </Link>
         </>
}

export default FlashCard;
