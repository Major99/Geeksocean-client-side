import React from 'react';
import ReactModal from 'react-modal';
import renderHTML from 'react-render-html';
import {Button} from 'antd'
import './preview.css';

const customStyles = {
  content : {
    height                : '80%',
    padding               : '20px',
    width                 : '80%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'white',
    borderRadius          : '0px',
    boxShadow             : '0 .5rem 1rem rgba(0,0,0,.15)',
    border                : '0px solid rgb(204, 204, 204)'
  }
};


 const Preview = (props) => {
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal(){
    setIsOpen(false);
  }


const renderArticle = (props) => {
  if(props.body){
    return renderHTML(props.body)
  }
}

const renderPhoto = () => {
  if(process.browser && props.photo && typeof(props.photo)==='object'){
    return URL.createObjectURL(props.photo);
  }
}
    return (
      <div>
        <Button onClick={openModal} block type="primary" primary>Preview</Button>
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}

        >
         <div className='container'>
         <h1 className='text-center blog-title mb-5'>{props.title}</h1>
           <div className='text-center m-3'>
            <img src={renderPhoto()} width="100%"/>
           </div>
          <div className="lead" style={{ color: "black"}}>{renderArticle(props)}</div>

         </div>
        </ReactModal>
      </div>
    );
}

export default Preview;
