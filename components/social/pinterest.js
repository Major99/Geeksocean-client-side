import {
  PinterestShareButton,
} from 'react-share';

import {
  PinterestIcon,
} from 'react-share';

const pinterest = (props) => {
  return    <div className='social-btn'>
         <PinterestShareButton url={props.url}>
         <PinterestIcon size={30} round={true} />
         </PinterestShareButton>
         <style jsx>{`
           .social-btn{
             margin:3px;
           }
           `}</style>
          </div>

}
export default pinterest;
