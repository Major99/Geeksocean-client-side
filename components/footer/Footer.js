import Link from "next/link";
import { DOMAIN } from '../../config'
import { AiOutlineCopyright} from "react-icons/ai";


const Footer = () => {
  const date = new Date()
  return <footer>
 
        <div className='row justify-content-center'>
            <div className='col-md-3 ft-block-1 text-center'>
                <h1 className='domain'> Geeks Ocean </h1>
            </div>
            <div className='col-md-3 text-center ft-block-2'>
                <p className='tagline'> Individually, we are one geek. Together, we are an ocean of geeks. </p>
            </div>
       </div>


      <div className='row justify-content-center'>

            <div className='col-md-8 ft-block-3 text-center'>

                <a><button className='btn'> About </button></a>
                <a href="/contact"><button className='btn'> Contact us </button></a>
                <a><button className='btn'> Help </button></a>
                <a href="/privacy-policy"><button className='btn'> Legal </button></a>

            </div>

      </div>



        <style  global jsx>
        {`
            .domain{
              font-size: 35px;
              color: black!important;
            }

          .ft-block-1{
               padding-top:15px!important;
               font-family: 'Poppins', sans-serif;
          }
          .ft-block-2{
            padding-left: 10px;
            padding-top:10px!important;
            padding-right: 10px;
            color: black;
            font-family: 'Poppins', sans-serif;

          }
          .ft-block-3{
            padding:5px!important;
            color: black;
          }

          @media(max-width: 767px){
            .domain{
              font-family: 'Poppins', sans-serif;
              padding-top: 15px;
              font-size: 35px;
              line-height:0px;
            }
            .tagline{
              margin-top:0px!important;
              padding-left: 10px!important;
              padding-right: 10px!important;

            }
            .ft-block-2{
              color: black;
              font-family: 'Poppins', sans-serif;
            }
          }

          `}
        </style>
 
       </footer>

}

export default Footer;
