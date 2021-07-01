import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleKeyword } from '../../actions/keyword';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Keyword = ({ keyword, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {keyword.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Tech articles on  ${keyword.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${keyword.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Tech articles on  ${keyword.name}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
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
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{keyword.name}</h1>
                                {blogs.map((b, i) => (
                                    <div>
                                        <Card key={i} blog={b} />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Keyword.getInitialProps = ({ query }) => {
    return singleKeyword(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { keyword: data.keyword, blogs: data.blogs, query };
        }
    });
};

export default Keyword;
