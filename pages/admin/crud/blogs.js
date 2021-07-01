 import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
 

const Blog = () => {
    return (
 
        <Layout>

            <Admin>
               <div className='container manage-blogs'>
                 <div className='manage-blogs-title text-center'>Manage blogs</div>
                 <BlogRead />
               </div>
            </Admin>
            <style>{`
               .manage-blogs{

               }
               .manage-blogs-title{
                 font-size: 40px;
                 margin-bottom: 20px;
               }
              `}</style>

        </Layout>
 
    );
};

export default Blog;
