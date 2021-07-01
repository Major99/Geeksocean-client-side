import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import ReadDraft from '../../../components/draft/draft'
import Link from 'next/link';


const Draft = () => {
  return <>
     <Layout>
        <Admin>
           <ReadDraft />
        </Admin>
     </Layout>
         </>
}

export default Draft;
