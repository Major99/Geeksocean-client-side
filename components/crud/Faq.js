import { useState } from 'react'
import { Button } from 'antd';
import ReactModal from 'react-modal';
import { Input } from 'antd'
import { TextField } from '@material-ui/core';
import { MdCancel } from "react-icons/md";
import { getCookie, isAuth } from '../../actions/auth';



const customStyles = {
  content : {
    height                : '70%',
    padding               : '20px',
    width                 : '90%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#2d2c2d',
    borderRadius          : '0px',
    boxShadow             : '0 .5rem 1rem rgba(0,0,0,.15)',
    border                : '0px solid rgb(204, 204, 204)'
  }
};


const Faq = (props) => {

  const token = getCookie('token');

  const [modalIsOpen,setIsOpen] = useState(false);
  const [faq,setFaq] = useState([{
      question: '',
      answer: ''
  }])

  function openModal() {
    setIsOpen(true);
    if(props.faq){
      setFaq(props.faq)

    }
  }
  function closeModal(){
    setIsOpen(false);
  }






  const handleQuestionChange = idx => evt => {
      const addNewQuestion = faq.map((fuckFAQ, sidx) => {
        if (idx !== sidx) return fuckFAQ;
        return { ...fuckFAQ, question: evt.target.value };
      });
      setFaq(addNewQuestion)
    };

  const handleAnswerChange = idx => evt => {
      const addNewAnswer = faq.map((fuckFAQ, sidx) => {
        if (idx !== sidx) return fuckFAQ;
        return { ...fuckFAQ, answer: evt.target.value };
      });
      setFaq(addNewAnswer)
    };


  const handleAddFAQ = () => {
          setFaq(faq.concat([{ question: "", answer:""}]))
        };

  const handleRemoveFAQ = idx => () => {
          setFaq(faq.filter((s, sidx) => idx !== sidx))
        };




   return <div className=''>
       <Button block type='primary' primary onClick={openModal}>{props.faqOps}</Button>
       <ReactModal
         isOpen={modalIsOpen}
         onRequestClose={closeModal}
         style={customStyles}>
         <div>

                  {faq &&
                    faq.map((faq, idx) => (
                        <div className="p-1 pb-3 mb-2 faq-container">
                            <MdCancel onClick={handleRemoveFAQ(idx)} className="float-right close-btn mb-1" />
                                <div>
                                  <TextField
                                  className='mb-2 field'
                                  fullWidth={true}
                                  variant="outlined"
                                  label={`Question ${idx + 1}`}
                                  value={faq.question}
                                  onChange={handleQuestionChange(idx)} />

                                  <TextField
                                  className='field'
                                  fullWidth={true}
                                  variant="outlined"
                                  label="Answer"
                                  onChange={handleAnswerChange(idx)}
                                  value={faq.answer} />
                                </div>
                              <style global jsx>{`
                                 .close-btn{
                                  background-color: white;
                                  font-size: 30px;
                                  color: #e53935;
                                  border-radius: 36px;
                                  cursor: pointer!important;
                               }
                              .field{
                                background-color:white!important;
                              }
                              .faq-container{
                                border-radius: 5px!important;
                               border: 1px solid gainsboro!important;
                               background-color:white;
                              }
                              .createFAQ{
                                background-color:#531dab!important;
                                border: 0px solid black!important;

                              }
                                `}</style>
                        </div>
                        ))

                  }

          <div className='text-center'>
            <Button type='primary' primary onClick={handleAddFAQ} className="" size="large">Add More Question</Button>
          </div>

          <div className='text-center mt-5'>
            <Button type='primary' primary className="" size="large"  className="createFAQ" onClick={props.create.bind(this,faq)}>{props.operation}</Button>
          </div>

        </div>
       </ReactModal>
       <hr />

         </div>
}

export default Faq;
