import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import DraftUpdate from '../../../components/crud/DraftUpdate';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 className='text-center'>Update Draft</h2>
                         <hr />
                        </div>
                        <div className="col-md-12">
                            <DraftUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;
