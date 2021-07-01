import { useState, useEffect } from 'react'
import { Comment, Avatar, Form, Button, List, Input,Spin } from 'antd';
import moment from 'moment';
import { commentBlog } from '../../actions/blog';
const { TextArea } = Input;
import { LoadingOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazy-load';
import { isAuth } from '../../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CommentList = ({ comments }) => (
<List
  dataSource={comments}
  itemLayout="horizontal"
  renderItem={props => <Comment {...props} />}
/>
);





const BlogComment = ({ id }) => {

const [comments, setComments] = useState([{

}]);
const [submitting, setSubmitting] = useState(false);
const [value, setValue] = useState('');
const [user, setUserProfile] = useState(null);
const [commentBtnText,setCommentBtnText] = useState()


useEffect(() => {
if(process.browser){
   let user;
    user = JSON.parse(localStorage.getItem('user'))
  setUserProfile(user)
 }
 checkSignIn();
},[]);


const checkSignIn = () => {
     if(isAuth()){
       return setCommentBtnText('Add Comment')
     }
   setCommentBtnText('Sign in to comment')
}

// on writing comment will change the state
const onChangeComment = (e) => {
  setValue(e.target.value)
  console.log(value)
}



//on click to add comment
const handleSubmit = (_id) => {
  if (user ===null ) {
  console.log('Please sign in')
  Router.push('/signin')
  return;
  }
if(!value){
  return toast.info('Please write something')
}
setSubmitting(true)
 setTimeout(() => {
 setSubmitting(false)
   setComments([
            {
              author: user.name,
              avatar: user.picture,
              content: <p>{value}</p>,
              datetime: moment().fromNow(),
            },
            ...comments,
          ])
 },1000)

  commentBlog(id._id, {author: user.name,avatar: user.picture, content: value, datetime: moment(new Date()).format('LLLL') })

};


    return (
      <div className='container'>
            <ToastContainer />
         <div className='row justify-content-center'>
           <LazyLoad height={"100%"} offsetHorizontal={50}>
             <img src='https://img.icons8.com/officel/40/000000/user.png' width={40} height={40} style={{ borderRadius: "30px", margin: "5px"}} alt="user"/>
           </LazyLoad>
           <TextArea rows={4} onChange={onChangeComment} style={{ width: "90%"}} className='col'/>
         </div>
         <div className='text-center' style={{ marginTop: "10px"}}>

         <Button  onClick={handleSubmit} type="primary" size="large">
           {commentBtnText}
        </Button>
        <br />
     {submitting && <Spin indicator={antIcon} style={{ marginTop: '10px'}}/>}
        </div>

    {comments.length > 1 && <CommentList comments={comments} />}
      </div>
    );

}

export default BlogComment;
