import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import PopularCard from '../../../components/blog/PopularCard';
import Link from 'next/link';
import { withRouter } from 'next/router';
import {listOfAllBlogs} from '../../../actions/blog';
import { useState } from 'react';
import {Input} from 'antd';




const PopularBlog = ({ blogs }) => {

const [checkedBlog, setCheckedBlog] = useState([])
let [count, setCount] = useState(0);

  const showBlogs = () => {
    return blogs.map((blog,i) => {
      const selectPopularBlog = (blog) => {
        console.log(count)
      if(count<=9){
         setCheckedBlog(checkedBlog.concat(blog))
         count++;
          setCount(count)
      }
      }
      return <div key={i} onClick={selectPopularBlog.bind(this, blog)}>
           <PopularCard blog={blog} />
            </div>
    })
  }

const showCheckedBlog = () => {
    return checkedBlog.map((blog,i) => {
      return <div key={i} style={{ marginBottom:"10px", backgroundColor:"#f5f5f5", padding:"10px"}}>
            <PopularCard blog={blog}/>
            <Input placeholder="Rank" />
             </div>
    })
}


  return <>
  <Layout>
     <Admin>
     <div className='container mb-5 mt-5'>
              <div className='row col'>
                 <div className='col-md-4 shadow showBlogs' style={{ maxHeight:"70vh", overflowY:"scroll"}}>
                  {showBlogs()}
                 </div>
                 <div className='col-md-5 showCheckedBlog'>
                 {showCheckedBlog()}
                 </div>
              </div>
            </div>
     </Admin>
  </Layout>
  <style jsx>{`
   .showCheckedBlog{
     margin: 30px;
   }

    `}</style>
         </>
}

PopularBlog.getInitialProps = () => {
    return listOfAllBlogs().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data
            };
        }
    });
};


export default withRouter(PopularBlog);
