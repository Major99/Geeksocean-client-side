import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Admin>
            <div className='container create-blog'>
              <div className='create-blog-title text-center'>Write an article</div>
              <BlogCreate />
            </div>
            </Admin>
            <style global jsx>{`
            .create-blog{

            }
            .create-blog-title{
              font-size: 33px;
            }
            .ql-toolbar.ql-snow {
            border: 1px solid #ccc;
            box-sizing: border-box;
            background-color: white!important;
            font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
            padding: 8px;
}
            .ql-editor{
              background-color: white!important;
            }
              `}</style>
        </Layout>
    );
};

export default Blog;
