import {useState,useEffect,useCallback} from "react";
import {stateoptions} from '../../function/statedatacenter';
import {DataSubmittedtoapi} from '../../function/enquiry';
import { useRouter } from 'next/router';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


const Contactform=(props)=>{

const {AOS,toggle,setToggle,successpage,setSuccesspage,sendMail,Tagmanageri} = props;
const [error,setError] = useState({travelSdate:"",travelEdate:"",traveller:"",destination:"",firstName:"",lastName:"",contact:"",email:""});
const [submitData,setSubmitData] = useState({nameite:'',travelSdate:"",travelEdate:"",traveller:"",destination:"",firstName:"",lastName:"",contact:"",email:""});
const [bloading,setBloading] = useState(false);
const router = useRouter();
const { executeRecaptcha } = useGoogleReCaptcha();
const [notification,setNotification] = useState('');
const [finalsubmit,setFinalsubmit] = useState(false);




useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);
const todate=()=>{
let today = new Date();

let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
return today;

}
const onChangeHandler=(e)=>{
let xcc = {...submitData};

if(e.target.name === 'traveller' && e.target.value > 0){
xcc = {...xcc,[e.target.name]:e.target.value}
}
if(e.target.name !== 'traveller'){
xcc = {...xcc,[e.target.name]:e.target.value}	
}
setSubmitData(xcc);
}
const onChangeHandlerDate=(e)=>{
let xcc = {...submitData};
let ds = new Date().getTime();
if(e.target.name === 'travelSdate' && new Date(e.target.value).getTime() > ds){
xcc = {...xcc,[e.target.name]:e.target.value}
}
if(e.target.name === 'travelEdate' && new Date(e.target.value).getTime() > ds){
xcc = {...xcc,[e.target.name]:e.target.value}
}

setSubmitData(xcc);
}

const composeMessage=(data)=>{

let message = `${data.firstName} ${data.lastName} want to explore ${data.nameite}.`;
message += "<div>" + `Mobile Number: ${data.contact}` + "</div>";
message += "<div>" + `Email: ${data.email}`  + "</div>";
message += "<div>" + `Travel Dates: Start Date: ${data.travelSdate} - End Date: ${data.travelEdate}`  + "</div>";
message += "<div>" + `Destination: ${data.destination}`  + "</div>";
message += "<div>" + `Number of Traveller: ${data.traveller}`  + "</div>";
message += "<p>" + `Source: ${router.pathname}` + "</p>";

return message;
}


const ValidateEmail=(input)=>{
  let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (input.match(validRegex)) {

    return true;

  } else {

    return false;

  }

}

const handleSumitForm = useCallback(
  (e) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      submitEnquiryForm(gReCaptchaToken);
    });
  },
  [executeRecaptcha]
);
const submitEnquiryForm = async (gReCaptchaToken) => {
  fetch("/api/verify-recaptcha", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recaptchaToken: gReCaptchaToken,
    }),
  })
    .then((res) => res.json())
    .then((resx) => {
      if (resx.status && resx.status === "success") {
        setFinalsubmit(true);
        setNotification(resx.message);
      } else {
        setNotification(resx.message);
        setFinalsubmit(false);
      }
    });
};

useEffect(()=>{
if(finalsubmit === true){
console.log(submitData);
submitAll(submitData);  
}

},[finalsubmit])

const submitAll=async(submitDatax)=>{

	let exc = {...error};
	if(submitDatax.travelSdate === ""){
    exc.travelSdate = "Travel Start date required";
	}
    else if(new Date(submitDatax.travelSdate) < new Date()){
    exc.travelSdate = "Travel Start date Greater than Today";
    }else{
	exc.travelSdate = "";	
	}
	if(submitDatax.travelEdate === ""){
    exc.travelEdate = "Travel End date required";
	}else if(new Date(submitDatax.travelEdate) < new Date(submitDatax.travelSdate)){
    exc.travelSdate = "Travel End date Greater than Start Date";
    }
    else{
	exc.travelEdate = "";	
	}
	if(submitDatax.traveller === "" || submitDatax.traveller < 1 ){
    exc.traveller = "Number of Traveller required";
	}else{
	exc.traveller = "";	
	}
	if(submitDatax.destination === ""){
    exc.destination = "Destination required";
	}else{
	exc.destination = "";	
	}
	if(submitDatax.firstName === ""){
    exc.firstName = "Firstname required";
	}else{
	exc.firstName = "";	
	}
	if(submitDatax.lastName === ""){
    exc.lastName = "Lastname required";
	}else{
	exc.lastName = "";	
	}
	if(submitDatax.contact === "" || submitDatax.contact.length > 10){
    exc.contact = "Mobile required";
	}else{
	exc.contact = "";	
	}
	if(submitDatax.email === "" || !ValidateEmail(submitDatax.email)){
    exc.email = "Email required";
	}else{
	exc.email = "";	
	}

setError({...error,exc});
console.log(exc);

let dfd = Object.values(exc);
let erc = false;
dfd.map((as)=>{
	if(as === ""){
		erc = true;
	}
})

if(erc === false || !erc){
    return;
}

setBloading(true);
const message = composeMessage(submitDatax);
const uploaddata = {name:`${submitDatax.firstName} ${submitDatax.lastName}`,email:submitDatax.email,phone:submitDatax.contact,message:message,tag:'customize-itinerary',info:submitDatax};
let dataSubmitted = await DataSubmittedtoapi(uploaddata);

if(dataSubmitted && dataSubmitted.success === true){
setSuccesspage(uploaddata);


let maildata = {subject:'Enquiry for Customize itinerary',text:message};

let mailresponse = await sendMail(maildata);
if(mailresponse){
    console.log('Mail has been sent');
}else{
    console.log('Mail server error');  
}
if (process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY && process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY !== '') {
Tagmanageri([{email:uploaddata.email,name:uploaddata.name,phone:uploaddata.phone,page:'destination'}],'new_enquiry'); 
}
setBloading(false);
setSubmitData({nameite:'',travelSdate:"",travelEdate:"",traveller:"",destination:"",firstName:"",lastName:"",contact:"",email:""});
}else{
setSuccesspage('');
setBloading(false);
}
setFinalsubmit(false);

}

const submitHandler = (e) => {
  if (process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY && process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY !== '') {
    handleSumitForm(e);
  } else {
    e.preventDefault();
    submitAll(submitData);
  }

}

return ( 
	   <>
       <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
            <div className="sidebar__title">
                <h4>Get Custom itinerary </h4>
                <h6 style={{fontSize:'1rem',cursor:'pointer',position: 'absolute',right:'10px',top:'20px'}} onClick={()=>{setToggle(false)}}>close</h6>
            </div>
        <div className="sidebar__total__price mb-3">
                <h4>Customization Fee: <span style={{color:'green'}}>₹  149/-</span></h4>  
            </div>
        <form onSubmit={submitHandler}>

            <div className="sidebar__select__wrap">
                <div className="sidebar__select__single">
                    <label htmlFor="">Travel Start Date</label>
 
                    <input className={error && error.travelSdate ? "form-select error" : "form-select"} type="date" id="travelSdate" name="travelSdate" min={todate()} onChange={(e)=>onChangeHandlerDate(e)} value={submitData.travelSdate || ''}/>
                </div>
                 <div className="sidebar__select__single">
                    <label htmlFor="">Travel End Date</label>
 
                    <input className={error && error.travelEdate ? "form-select error" : "form-select"} type="date" id="travelEdate" name="travelEdate" min={todate()} onChange={(e)=>onChangeHandlerDate(e)} value={submitData.travelEdate || ''}/>
                </div>
               
            </div>
            <div className="sidebar__select__wrap">
                <div className="sidebar__select__single">
                    <label htmlFor="">No. of Travellers <small style={{fontSize: '0.6rem',color:'red'}}>{error && error.travellers}</small></label>
                     <input type="number" name="traveller" className={error && error.traveller ? "form-select error" : "form-select"} onChange={(e)=>onChangeHandler(e)} value={submitData.traveller || ''}/>
                </div>
                <div className="sidebar__select__single">
                    <label htmlFor="">Destinations <small style={{fontSize: '0.6rem',color:'red'}}>{error && error.travellers}</small></label>
           
                    <select name="destination" className={error && error.destination ? "form-select error" : "form-select"} onChange={(e)=>onChangeHandler(e)} value={submitData.destination || ''}>
                      <option value="">Select State</option>
                    {
                    	stateoptions.map((state,key)=>{
                    	return <option key={"sss" + key} value={state.label}>{state.label}</option>
                    })                  
                    }
                    </select>

                </div>
            </div>
                <div className="sidebar__form__wrap">
                    <span className="sidebar__lebel">Primary Traveller</span>
                    <div className="sidebar__form__single">
                        <label htmlFor="">First Name</label>
                        <input  name="firstName" className={error && error.firstName ? "error" : "dff"} id="firstName" type="text" onChange={(e)=>onChangeHandler(e)} value={submitData.firstName || ''}/>
                    </div>
                    <div className="sidebar__form__single">
                        <label htmlFor="">Last Name</label>
                        <input className={error && error.lastName ? "error" : "dff"} type="text" name="lastName" id="lastName" onChange={(e)=>onChangeHandler(e)} value={submitData.lastName || ''}/>
                    </div>
                    <div className="sidebar__form__single">
                        <label htmlFor="">Contact</label>
                        <input type="text" className={error && error.contact ? "error" : "dff"} placeholder="+91" name="contact" id="contact" onChange={(e)=>onChangeHandler(e)} value={submitData.contact || ''}/>
                    </div>
                    <div className="sidebar__form__single">
                        <label htmlFor="">Email</label>
                        <input type="email" className={error && error.email ? "error" : "dff"} placeholder="your@domain.com" name="email" id="email" onChange={(e)=>onChangeHandler(e)} value={submitData.email || ''}/>
                    </div>
                </div>  
         
            <div className="sidebar__main__btn sidebar2">
                <button style={{border:'none',width:'100%'}}  className="common__btn" disabled ={bloading ? true : false}>{bloading ? <span className="spinner-border" role="status"></span>:'Send'}</button>
            </div>
            </form>
   
        </div>
    </div>
    <div className="offcanvas-overlay"></div>
    </>
	    )



}
export default Contactform;