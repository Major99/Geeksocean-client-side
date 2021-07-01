import {
  TwitterShareButton,
} from 'react-share';

import {
  TwitterIcon,
} from 'react-share';

const twitter = (props) => {
  return     <div className='social-btn'>
         <TwitterShareButton url={props.url}>
         <TwitterIcon  size={30} round={true} />
         </TwitterShareButton>
         <style jsx>{`
           .social-btn{
             margin:3px;
           }
           `}</style>
          </div>

}
export default twitter;
