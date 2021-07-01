import {
  LinkedinShareButton,
} from 'react-share';

import {
  LinkedinIcon,
} from 'react-share';

const linkedin = (props) => {
  return   <div className='social-btn'>
         <LinkedinShareButton url={props.url}>
         <LinkedinIcon size={30} round={true} />
         </LinkedinShareButton>
         <style jsx>{`
           .social-btn{
             margin:3px;
           }
           `}</style>
          </div>

}
export default linkedin;
