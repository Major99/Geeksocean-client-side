
import Layout from '../../../components/Layout';
import {Button} from 'antd';

const Marketing = () => {
  return <Layout>
          <div className='container text-center'>
             <div className='col row justify-content-center'>
                 <div className='col-md-6'>
                  <Button primary type='primary' className='marketing-tool' block size='large' ghost>Bulk mail</Button>
                  <Button primary type='primary' className='marketing-tool' block  size='large' ghost>Template tool</Button>
                  </div>
             </div>

          </div>
          <style global jsx>{`
.marketing-tool{
  margin:5px!important;
}
            `}</style>
       </Layout>
}
export default Marketing;
