import Link from 'next/link';
import { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { Button } from 'antd';
import { userById } from '../../actions/user'

const PopularBlog = ({ blog }) => {
 return <div className='mb-3'>
            <div className='row col'>
              <div className='col-md-5'>
              <img
                  className=""
                  style={{ maxHeight: 'auto', width: '100%' }}
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
              />
              </div>
              <div className='col-md-7'>
              <h6 className=''>{blog.title}</h6>
              </div>
            </div>
         </div>
}
export default PopularBlog;
