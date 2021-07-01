import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';

const Contact = ({ router }) => {

  const head = () => (
      <Head>
          <title>Cantact us |{APP_NAME}</title>
          <meta
              name="description"
              content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
          />
          <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
          <meta property="og:title" content={`Privacy Policy| ${APP_NAME}`} />
          <meta
              property="og:description"
              content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
          <meta property="og:site_name" content={`${APP_NAME}`} />

          <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
          <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
  );


    return  <Layout>
            {head()}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Reach out to us</h2>
                        <hr />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Layout>
};

export default withRouter(Contact);
