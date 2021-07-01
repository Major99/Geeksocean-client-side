import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import * as Sentry from '@sentry/browser';
Sentry.init({dsn: "https://951f22f8e7e0422b8955eb3c3809ddd3@o395070.ingest.sentry.io/5246318"});



class MyDocument extends Document {
  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-161776444-1');
        `
      };
    }
  }

     OrganisationSchema() {
      return {
          '@context': 'http://schema.org',
          '@type': 'Organization',
           "url": "https://geeksocean.com",
           "name":"Geeks Ocean",
           "logo": "https://geeksocean.com/static/images/Logo.svg",
           "sameAs": [
                "https://www.facebook.com/Geeksocean-108336497487523/",
                "https://www.instagram.com/geeksocean/",
                "https://twitter.com/geeks_ocean",
                "https://www.linkedin.com/company/geeks-ocean/"
              ]
      }
  }



render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="yes"/>
          <meta name="apple-mobile-web-app-title" content="Geeks Ocean"/>
          <meta name="p:domain_verify" content="b2666a47ce2019ef96afa5b4b91da6a2"/>
          <link rel="alternate" href="https://geeksocean.com" hrefLang="en-us" />
          <link
            rel="stylesheet"
            defer
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link defer rel="dns-prefetch" href="https://geeksocean.com" />
          <link defer rel="preconnect" href="https://geeksocean.com" crossorigin />
          <link defer rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
          <link defer rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
          <link defer href="https://fonts.googleapis.com/css?family=Gruppo|Philosopher|Playfair+Display+SC|Spectral+SC|Trirong|Halant:700|Lateef|Lato|Philosopher|Prata|Source+Sans+ProGotu|Marmelad|EB+Garamond|Nunito+Sans:800|Poppins:500&display=swap" rel="stylesheet" />

          <link rel="icon" href="/static/images/Logo.svg" />
          <script defer async src="https://www.googletagmanager.com/gtag/js?id=UA-161776444-1"></script>
          <script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
          <script  defer dangerouslySetInnerHTML={this.setGoogleTags()} />
          <script
            type='application/ld+json'
            defer
            dangerouslySetInnerHTML={{ __html: JSON.stringify(this.OrganisationSchema()) }}
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
