import {
  FacebookShareButton,
} from 'react-share';

import {
  FacebookIcon,
} from 'react-share';

const facebook = (props) => {
  return  <div className='social-btn'>
         <FacebookShareButton url={props.url}>
         <FacebookIcon size={30} round={true} />
         </FacebookShareButton>
         <style jsx>{`
           .social-btn{
             margin:3px;
           }
           `}</style>
          </div>
}
export default facebook;
