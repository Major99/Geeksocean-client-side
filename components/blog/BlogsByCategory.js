import { useState, useEffect } from 'react';
import { topLatestBlogs } from '../../actions/blog';
import FlashCard from './FlashCard'
import { Skeleton } from 'antd';


const Blogs = () => {

  const [gamesBlog, setgamesBlog] = useState([]);
  const [mobileBlog, setmobileBlog] = useState([]);
  const [lifeStyleBlog, setlifeStyleBlog] = useState([]);

  const testId = "5e8d946b9a1d0ebda679f9ac"
  const gameID = "5e7a364b8aebfe29a4acb579"
  const mobileID = "5e7aefe5bb39a641e3c9dd3f"
  const lifestyleID = "5e7bb32dbb39a641e3c9dd50"

      useEffect(() => {
          gamesLatestBlogs();
          mobilesLatestBlogs();
          lifestyleLatestBlogs();
      }, []);


//Games
      const gamesLatestBlogs = () => {
          topLatestBlogs(gameID).then(data => { //game category id
              if (data.error) {
                  console.log(data.error);
              } else {
                 setgamesBlog(data)
              }
          });
      };

   const showGamesBlogs = () => {
     if(gamesBlog.length ==0){
       return  <div className='m-2'> <Skeleton active /></div>
     }
     return gamesBlog.map((blog, i) => {
               return <FlashCard blog={blog} key={i}/>
       });
     }



//Mobiles
     const mobilesLatestBlogs = () => {
         topLatestBlogs(mobileID).then(data => { //mobile category id
             if (data.error) {
                 console.log(data.error);
             } else {
                setmobileBlog(data)
             }
         });
     };

  const showMobilesBlogs = () => {
    if(gamesBlog.length ==0){
      return  <div className='p-2'><Skeleton active /></div>
    }
      return mobileBlog.map((blog, i) => {
              return <FlashCard blog={blog} key={i}/>
      });
    }

//LifeStyle
     const lifestyleLatestBlogs = () => {
         topLatestBlogs(lifestyleID).then(data => { //lifestyle category id
             if (data.error) {
                 console.log(data.error);
             } else {
                setlifeStyleBlog(data)
             }
         });
     };

  const showlifestyleBlogs = () => {
    if(gamesBlog.length ==0){
      return   <div className='p-2'><Skeleton active /></div>
    }
      return lifeStyleBlog.map((blog, i) => {
              return <FlashCard blog={blog} key={i}/>
      });
    }

     return <div className='container'>
              <div className='row col justify-content-center'>
                 <div className='col-md-4'>
                 {showGamesBlogs()}
                 </div>
                 <div className='col-md-4'>
                 {showMobilesBlogs()}
                 </div>
                 <div className='col-md-4'>
                 {showlifestyleBlogs()}
                 </div>
              </div>
           </div>

}



export default Blogs;
