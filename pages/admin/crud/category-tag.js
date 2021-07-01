import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
import Link from 'next/link';
 

const CategoryTag = () => {
    return (
 
        <Layout>
            <Admin>
               <div className='outer'>
               <div className='container cat-manage-container shadow'>
               <div className='row col  justify-content-center'>
                  <div className='col-md-4 category-input' style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    <Category />
                  </div>
                  <div className='col-md-4 tag-input' style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    <Tag />
                  </div>
              </div>
            </div>
         </div>
            </Admin>
            <style jsx>{`
            .outer{
              padding: 20px;
            }
            .cat-manage-container{
              margin-top: 100px;
              padding: 2px;
            }
            .category-input{
              margin: 20px;
            }
            .tag-input{
              margin: 20px;
            }
            .col{
              padding-left:0px!important;
              padding-right:0px!important;
            }
              `}</style>
        </Layout>
 
    );
};

export default CategoryTag;
