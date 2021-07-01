import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {Button} from 'antd';
import { getKeywords } from '../../actions/keyword';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';


const Keyword = ({ keyword }) => {
    const head = () => (
        <Head>
            <title>
                {"KEYWORDS"} | {APP_NAME}
            </title>
            <meta name="description" content={`Technology articles`} />
            <meta property="og:title" content={` Keywords| ${APP_NAME}`} />
            <meta property="og:description" content={`Technology articles`} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );




    return (
        <React.Fragment>
            {head()}
            <Layout>
            <div className='container text-center'>
              <h1>List of keywords</h1>
            {keyword.map(item => {
              return <a href={`https://geeksocean.com/keywords/${item.slug}`} ><Button type="link">{item.name}</Button></a>
            })}
            </div>
            </Layout>
        </React.Fragment>
    );
};

Keyword.getInitialProps = ({ query }) => {
    return getKeywords().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { keyword: data};
        }
    });
};

export default Keyword;
