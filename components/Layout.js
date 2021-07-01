import Header from './header/Header';
import Footer from './footer/Footer'
import Router from "next/router";
import NProgress from "nprogress";
import './header/Header.css'


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
    return (
        <div className='page-container'>
          <Header  />
          <div className='content'>
            {children}
          </div>

              <Footer />

          <style global jsx>{`
           .page-container{
             display: flex;
               flex-direction: column;
               min-height: 100vh;
           }


footer {
 
  background-color:#f5f5f5;
  flex:1;
  grid-row: 2 / 3;

}
body {
    min-height: 100vh;
    margin: 0;
    display: grid;
    grid-template-rows: 1fr auto;
}

            `}</style>

        </div>
    );
};

export default Layout;
