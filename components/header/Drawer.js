import { Drawer, Button } from 'antd';
import '../../node_modules/antd/dist/antd.css';
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
import { signout, isAuth } from "../../actions/auth";
import Link from "next/link";
import { AiFillRead, AiFillGift } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { IoIosCreate,IoMdSettings } from "react-icons/io";
import { FaUserCircle,FaUserCheck,FaUsers,FaUser,FaTags,FaFirstdraft,FaLightbulb } from "react-icons/fa";
import { MdDeleteSweep,MdHelp,MdPublic } from "react-icons/md";
import GoogleLogin from './../auth/LoginGoogle';
import FacebookLogin from './../auth/LoginFacebook';

import Router from "next/router";



class Sidebar extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };



  render() {
    const DrawerTitle = () => {
    if(isAuth() && isAuth().role === 0){
      return `${isAuth().name}`
    }
    if(isAuth() && isAuth().role === 1){
      return `${isAuth().name}`
    }
    else{
      return 'Geek menu'
    }
     }

    return (
      <div>
        <MenuIcon  type="primary" onClick={this.showDrawer} />
        <Drawer
          title={<DrawerTitle />}
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <List>


     {!isAuth() &&<Link href="/signin">
            <ListItem button>
              <ListItemIcon><GoSignIn className='drawer-icons' style={{ color:"black"}}/></ListItemIcon>
              <ListItemText style={{ color:"black"}}>Sign in</ListItemText>
            </ListItem>
            </Link>}


          {!isAuth() &&  <Link href="/signup">
               <a><Button className='get-started' block>Get started</Button></a>
            </Link>
           }

    { isAuth() && isAuth().role===1 &&
      <Link  href="/admin/crud/blog">
      <ListItem button>
              <ListItemIcon><IoIosCreate className='drawer-icons'  style={{ color: "#9254de"}} /></ListItemIcon>
              <ListItemText >Write</ListItemText>
            </ListItem>
      </Link>}

      { isAuth() && isAuth().role===1 &&
        <Link  href="/admin/crud/blogs">
        <ListItem button>
                <ListItemIcon><MdDeleteSweep className='drawer-icons' style={{ color: "#faad14"}} /></ListItemIcon>
                <ListItemText >Edit</ListItemText>
              </ListItem>
        </Link>}

      { isAuth() && isAuth().role===1 &&
        <Link  href="/admin/crud/category-tag">
        <ListItem button>
                <ListItemIcon><FaTags className='drawer-icons' style={{ color: "#a0d911"}}/></ListItemIcon>
                <ListItemText >Tag /Category</ListItemText>
              </ListItem>
        </Link>}


        {isAuth() && isAuth().role===1 && <Link  href="/admin/draft">
        <ListItem button>
                <ListItemIcon><FaFirstdraft className='drawer-icons' style={{ color: "#00e5ff"}}/></ListItemIcon>
                <ListItemText >Draft</ListItemText>
              </ListItem>
        </Link>}

        {/*isAuth() && isAuth().role===1 && <Link  href="/admin/popularBlog">
        <ListItem button>
                <ListItemIcon><FaLightbulb className='drawer-icons' style={{ color: "#40a9ff"}}/></ListItemIcon>
                <ListItemText >Popular articles</ListItemText>
              </ListItem>
        </Link>*/}

          {/* isAuth() && isAuth().role===1 &&
            <Link  href="/admin/crud/offerletter">
            <ListItem button>
                    <ListItemIcon><AiFillGift className='drawer-icons' style={{ color: "#cf1322"}}/></ListItemIcon>
                    <ListItemText >Offer Letter</ListItemText>
                  </ListItem>
            </Link>*/}

            {/* isAuth() && isAuth().role===1 &&
              <Link  href="/admin/crud/offerletter">
              <ListItem button>
                      <ListItemIcon><MdPublic className='drawer-icons' style={{ color: "#40a9ff"}}/></ListItemIcon>
                      <ListItemText >Marketing</ListItemText>
                    </ListItem>
              </Link>*/}



              { isAuth() && isAuth().role===1 &&
                <Link  href="/admin/crud/users">
                <ListItem button>
                        <ListItemIcon><FaUsers className='drawer-icons' style={{ color: "#13c2c2"}}/></ListItemIcon>
                        <ListItemText >Users</ListItemText>
                      </ListItem>
                </Link>}




        { isAuth() &&
          <Link  href="/user/setting">
          <ListItem button>
                  <ListItemIcon><IoMdSettings className='drawer-icons' style={{ color: "#434343"}}/></ListItemIcon>
                  <ListItemText >Setting</ListItemText>
                </ListItem>
          </Link>}

          {isAuth() && <div className='text-center'>
             <Button className='sign-out'  type='primary' onClick={() => signout(() => Router.replace(`/`))} danger block>
                    Sign out
              </Button>
              </div>}


        </List>
        </Drawer>
        <style global jsx>{`
  .ant-drawer-body{
    padding: 10px!important;
  }
  .MuiListItem-root{
    padding-bottom: 15px!important;

  }

          `}</style>
      </div>
    );
  }
}

export default Sidebar;
