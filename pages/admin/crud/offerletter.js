import { Component } from 'react';
import '../../../node_modules/antd/dist/antd.css';
import { Input } from 'antd';
import Head from 'next/head';
import { withRouter } from 'next/router';

import { DatePicker, Button } from 'antd';
import { PDFExport, savePDF } from '../../../node_modules/@progress/kendo-react-pdf';
import { MdReorder } from "react-icons/md";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';

class OfferLetter extends Component {
pdfExportComponent;



  exportPDFWithComponent = () => { console.log(this.pdfExportComponent);
    if(!this.state.name){
      alert("Please fill the name");
      return false;
    }else if(!this.state.permanentAddress1 || !this.state.permanentAddress2 || !this.state.permanentAddress3){
      alert("Please fill the Address");
      return false;
    }else if(!this.state.startDate){
      alert("Please select the Date of Joining");
      return false;
    }else if(!this.state.desi){
      alert("Please fill the degisnation");
      return false;

    }
      console.log(this.pdfExportComponent.save());
        this.onSendMail(this.state.name,this.state.desi);

  }





  state = {

        startDate: '',
        name: '',
        permanentAddress1: '',
        permanentAddress2: '',
        permanentAddress3: '',
        desi: '',


      };

      // startDateChange = date => {
      //     this.setState({
      //       startDate: date
      //     });
      //   };


      onSendMail = (name,designation) => {
        console.log(this.pdfExportComponent);
      fetch(`https://amantiwari.herokuapp.com/amantiwari12081999@gmail.com/Offer Letter/${name+'--'+designation}`)
        .then( result => this.setState({ status: console.log(result.status) }))
        .catch(err => console.log(err))
        console.log('message sent')
      }

      onChangeDate = (date, dateString) => {
       this.setState({ startDate: date })
       console.log(date, dateString);
     }

     head = () => (
       <Head>
           <title>{APP_NAME}</title>
           <meta
               name="description"
               content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
           />
           <link rel="canonical" href={`${DOMAIN}${this.props.router.pathname}`} />
           <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
           <meta
               property="og:description"
               content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
           />
           <meta property="og:type" content="website" />
           <meta property="og:url" content={`${DOMAIN}${this.props.router.pathname}`} />
           <meta property="og:site_name" content={`${APP_NAME}`} />

           <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
           <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
           <meta property="og:image:type" content="image/jpg" />
           <meta property="fb:app_id" content={`${FB_APP_ID}`} />
       </Head>
   );

  render(){
    const d = new Date()
    const date = d.getDate()
    const month = d.getMonth()
    const day = d.getDay()
    const year = d.getFullYear()


const getDate = (day) => {
    if(day==0) return ' Mon '
    if(day==1) return ' Tue '
    if(day==2) return ' Wed '
    if(day==3) return ' Thu '
    if(day==4) return ' Fri '
    if(day==5) return ' Sat '
    if(day==6) return ' Sun '
    else{
      return 'Undefined'
    }
}

const GetMonth = (month) => {
    if(month == 0) return ' January'
    if(month == 1) return ' February'
    if(month == 2) return ' March'
    if(month == 3) return ' April'
    if(month == 4) return ' May'
    if(month == 5) return ' June'
    if(month == 6) return ' July'
    if(month == 7) return ' August'
    if(month == 8) return ' September'
    if(month == 9) return ' October'
    if(month == 10) return ' November'
    if(month == 11) return ' December'

    else {
    return   'Undefined'
    }



}

 const dayString = getDate(day)
 const monthString = GetMonth(month)
 const completeDate = date + monthString +', '+ year
 const onboardDate = new Date( this.state.startDate)
 const joindate =  onboardDate.getDate() + (GetMonth(onboardDate.getMonth()))+ ' '+ onboardDate.getFullYear()



    return   <div className='offer-letter-container'>
    <Layout>
      <Admin>
      {this.head()}
     <div className='row col justify-content-center'>
     <div className='col-md-4' >
            <div className=''>
              <h1 className='text-center'> Offer Letter </h1>
              <h5 className='text-center'>Create new offer letter</h5>
            </div>
            <Input placeholder="Enter Name"  size='large'  onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name}  style={{ width: "100%!important", margin: "5px"}}/>
            <Input placeholder="Address Line 1 eg. flat no. and colony"  onChange={(e) => this.setState({ permanentAddress1: e.target.value })} value={this.state.permanentAddress1}  size='large'  style={{ width: "100%!important", margin: "5px"}} />
            <br />
            <Input placeholder="Address Line 2 eg. city name"  onChange={(e) => this.setState({ permanentAddress2: e.target.value })} value={this.state.permanentAddress2}  size='large'   style={{ width: "100%!important", margin: "5px"}}/>
            <br />
            <Input placeholder="State" size='large'  onChange={(e) => this.setState({ permanentAddress3: e.target.value })} value={this.state.permanentAddress3}  style={{ width: "100%!important", margin: "5px"}}/>
           <DatePicker onChange={this.onChangeDate}   size='large' placeholder='Select onboard date' style={{ width: "100%!important", margin: "5px"}}/>
            <Input placeholder="Designation"  onChange={(e) => this.setState({ desi: e.target.value })} value={this.state.desi}  size='large'  style={{ width: "100%!important", margin: "5px"}}/>
            <div className="text-center">
                <Button type='primary' className="k-button btn-md btn-primary" onClick={this.exportPDFWithComponent}>Download</Button>
            </div>
            </div>



           <div className='container col-md-8' >
     <PDFExport  ref={(component) => this.pdfExportComponent = component} paperSize="A4" >
               <div className='text-center'  >
                 <img src='geekboy.jpg'/>
               </div>
               <div className='ol-header'>
               {completeDate}
               </div>
               <div  className='ol-header'>
               {this.state.name}
               </div>
               <div  className='ol-header'>
               {this.state.permanentAddress1}
               <br />
               {this.state.permanentAddress2}
               <br />
               {this.state.permanentAddress3}

       <div className='text-center'>
          <h5 className=''>Offer Letter</h5>
       </div>
       <div>
          {"Dear " + this.state.name+','}
       </div>

     <div>
     Congratulations! We are very excited to have you on board!
     </div>

     <div className='container'>
     {"The position we are offering you is that of "+ this.state.desi + ". Your working hours will be depend on company Requirement and Work."}
     </div>

     <div className='container'>
     {"We would like you to start work on " + joindate+"."}
     </div>

     <div className='container'>
     Please do E-sign the enclosed copy of this letter and return it within 7 days of offer letter released to indicate your acceptance of this offer.
     </div>

     <div className='container'>
     We are confident you will be able to make a significant contribution to the success of our GeekBoy.tech Private Limited and look forward to working with you.
     </div>

     <div className='container'>
     Sincerely,
     </div>

     <img src='CHRO.jpeg' />
     <div className='container'>
     Chirag Gupta
     <br />
     Chief Human Resource Officer
     <br />
     GeeksOcean.com
     </div>

     <div className='text-center container'>
     <h6>www.GeeksOcean.com</h6>
     </div>




              </div>

     </PDFExport>

           </div>

     </div>
     <style global jsx>{`
      .ol-header{
        margin:10px;

      }
      .offer-letter-container{

      }
      `}</style>

      </Admin>
    </Layout>
   </div>
  }
}

export default withRouter(OfferLetter);
