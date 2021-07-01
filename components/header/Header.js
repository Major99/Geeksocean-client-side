import {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {ListItemIcon,
        ListItemText,
        ListItem,List,
        Toolbar,
        AppBar,
        Divider,
        IconButton,
        CssBaseline,
        Typography } from '@material-ui/core';
import { AiFillRead, AiFillGift } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { IoIosCreate,IoMdSettings } from "react-icons/io";
import { FaUserCircle,FaUserCheck,FaUsers,FaUser,FaTags,FaThLarge,FaFirstdraft,FaLightbulb  } from "react-icons/fa";
import { MdDeleteSweep,MdHelp,MdPublic } from "react-icons/md";
import { DiGoogleAnalytics} from "react-icons/di";
import LazyLoad from 'react-lazy-load';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {Button} from 'antd'
import { useMediaQuery } from 'react-responsive'
import Router from "next/router";
import Link from "next/link";
import { APP_NAME, DOMAIN } from "../../config";
import { signout, isAuth } from "../../actions/auth";
import Drawer from './Drawer'
import './Header.css'




const MiniDrawer = () => {

  const isDesktopOrLaptop = useMediaQuery({  query: '(min-device-width: 767px)' })
  const isMobileOrTablet = useMediaQuery({  query: '(max-device-width: 766px)' })
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const mobileCss = () =>{
    if(isMobileOrTablet){
      return { bg: "background-color: #3a4173;",
               zIndex:  "z-index: 100;",
               paddTop: "padding-top: 0px;",
               pos: "position: fixed!important;",
               top: "top: 0;",
               wid: "width: 100%;",
               logoColor:"color: white;",
               drawerColor: "color: white;"
               }
    }
    return;
  }
  const mStyle = mobileCss()


  return (
     <>
    <div className="header-style">
   <Toolbar className='container heading-container'>

{!isDesktopOrLaptop &&  <>

   <IconButton
       color="inherit"
       aria-label="open drawer"
       edge="start"
     >

   <Drawer />
  </IconButton>
  <Typography variant="h6" noWrap>
    <Link href='/'>
       <a className='logo-style'>Geeks Ocean</a>
    </Link>
</Typography>

</>}

   <div className='row col '>
     <div className='col-6 row'>
         {isDesktopOrLaptop && <div className='container row' >

          <div className='stage'>
          <LazyLoad height={"100%"} offsetHorizontal={50} throttle>
            <LazyLoadImage src='/static/images/Logo.svg' alt='' height={70} className='box bounce-2'/>
          </LazyLoad>
          </div>
        <Typography variant="h6" noWrap>
          <Link href='/'>
             <a className='logo-style'>Geeks Ocean</a>
          </Link>
      </Typography> </div>}
    </div>
    {!isAuth() && isDesktopOrLaptop && <div className='col-6'>

     <Link href='/signup'>
      <a><Button className='float-right get-started'>Get started</Button></a>
      </Link>
       <Link href='/signin'>
        <a><Button className='float-right sign-in'>Sign in</Button></a>
       </Link>
     </div>}



 {isAuth() && isDesktopOrLaptop && <div className='col-6'>
    <Button className='float-right sign-out'  type='primary' onClick={() => signout(() => Router.replace(`/`))} danger>
           Sign out
     </Button>
     </div>}

   </div>
  </Toolbar>


{isAuth() && isAuth().role===1 && isDesktopOrLaptop &&
  <div className='row justify-content-center'>
    <Link  href="/admin/crud/blog">
      <a><Button className='heading-button'><IoIosCreate className='heading-icons' style={{ color: "#9254de"}}/>Write</Button></a>
    </Link>


    <Link  href="/admin/draft">
      <a><Button className='heading-button'><FaFirstdraft className='heading-icons' style={{ color: "#00e5ff"}}/>Draft</Button></a>
    </Link>

    <Link  href="/admin/crud/blogs">
      <a><Button className='heading-button'><MdDeleteSweep className='heading-icons' style={{ color: "#faad14"}}/>Edit</Button></a>
    </Link>

    <Link  href="/admin/crud/category-tag">
      <a><Button className='heading-button'><FaTags  className='heading-icons' style={{ color: "#a0d911"}}/>Tags/Category</Button></a>
    </Link>
      {/*<Link  href="/admin/crud/offerletter">
      <a><Button className='heading-button'><AiFillGift className='heading-icons' style={{ color: "#cf1322"}}/>Offer letter</Button></a>
     </Link>*/}
    {/*<Link  href="/admin/popularBlog">
     <a><Button className='heading-button'><FaLightbulb  className='heading-icons' style={{ color: "#40a9ff"}}/>Popular articles</Button></a>
    </Link>*/}
      <Link  href="/admin/crud/users">
      <a><Button className='heading-button'><FaUsers className='heading-icons' style={{ color: "#13c2c2"}}/>Users</Button></a>
      </Link>
  {/*    <Link  href="/admin/analytics">
     <a><Button className='heading-button'><DiGoogleAnalytics className='heading-icons' style={{ color: "#f4511e"}}/>Analytics</Button></a>
     </Link>*/}
       <Link  href="/user/setting">
      <a><Button className='heading-button'><IoMdSettings className='heading-icons' style={{ color: "#434343"}}/>Setting</Button></a>
      </Link>

  </div>}
  {isDesktopOrLaptop && <div className='container'>
    <hr />
  </div>}

    </div>
    <style global jsx>{`


.drawer-icons{
 font-size: 23px;
}
.heading-icons{
font-size:25px;
margin-right:1px;

}
.heading-button{
  color:black!important;
  font-weight:bold!important;
  margin:5px;
  border:0px solid white!important;
}
a{

}
.heading-container{
  padding-top: 10px;
  ${mStyle && mStyle.bg}
  ${mStyle && mStyle.zIndex}
  ${mStyle && mStyle.paddTop}
}
.MuiTypography-noWrap{
  padding-left:5px;
  padding-top:10px;
}
.logo-style{
font-family: 'Philosopher', sans-serif;
font-size:30px;



}

.get-started{
  border: 0px solid white!important;
  background: #8E2DE2!important;
  background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2)!important;
  background: linear-gradient(to right, #4A00E0, #8E2DE2)!important;
  color:white!important;
  margin:5px;
  height:35px!important;
}
.MuiToolbar-root{

  width: 100%
}
.MuiSvgIcon-root {
  font-size: 2.2rem!important;
}
.MuiTypography-h6{
    font-size: 1.3rem!important;
}
.MuiIconButton-edgeStart {
    margin-left: -9px!important;
}
.sign-in{
  margin:5px!important;
    height:35px!important;
    color:black;
    border:1px solid white!important;
}
.stage {
      display: flex;
  }
  .box {
      align-self: flex-end;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      transform-origin: bottom;
  }
  .bounce-2 {
    width:90px;
      animation-name: bounce-2;
      animation-timing-function: ease;
  }
  @keyframes bounce-2 {
      0%   { transform: translateY(0); }
      50%  { transform: translateY(-5px); }
      100% { transform: translateY(0); }
  }
.sign-out{

}
.header-style{

}
      `}</style>
      </>
  );
}

export default MiniDrawer;
