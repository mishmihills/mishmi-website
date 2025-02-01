import {useState,useEffect,memo ,useCallback} from "react";
import {DataSubmittedtoapi} from '../../function/enquiry';
import { useRouter } from 'next/router';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";



const CheckAvailability=(props)=>{

const {AOS,toggle,setToggle,nameite,setSuccesspage,sendMail,Tagmanageri,name} = props;
const [error,setError] = useState({message:'',firstName:"",lastName:"",contact:"",email:"",message:''});
const [submitData,setSubmitData] = useState({nameite:nameite,travelSdate:"",travelEdate:"",traveller:"",destination:"",firstName:"",lastName:"",contact:"",email:"",message:''});
const [bloading,setBloading] = useState(false);
const router = useRouter();
const { executeRecaptcha } = useGoogleReCaptcha();
const [notification,setNotification] = useState('');
const [finalsubmit,setFinalsubmit] = useState(false);
const mobileRegex = /^[6-9]\d{9}$/;
const msgregex = /^.{10,}$/;


useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);
const todate=(val)=>{
let today = val ? new Date(val) : new Date();

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
return today;

}
const onChangeHandler=(e)=>{
if(e.target.name === 'traveller' && e.target.value > 0){
setSubmitData({...submitData,[e.target.name]:e.target.value});	
}
if(e.target.name !== 'traveller'){
setSubmitData({...submitData,[e.target.name]:e.target.value});	
}


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

useEffect(()=>{
 let startc = new Date(submitData.travelSdate);
 if(startc){
   let endc = todate(startc.setDate(startc.getDate() + 1));

   setSubmitData({...submitData,travelEdate : endc});
 }

},[submitData.travelSdate]);



const composeMessage=(data)=>{
let hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
let message = `${data.message}.`;
message += "<br/><br/>";
message += "<div>" + `Name: ${data.firstName} ${data.lastName}` + "</div>";
message += "<div>" + `Mobile Number: ${data.contact}` + "</div>";
message += "<div>" + `Email: ${data.email}`  + "</div>";
if(data.travelSdate){
message += "<div>" + `Travel Dates: Start Date: ${data.travelSdate} - End Date: ${data.travelEdate}`  + "</div>";    
}
if(data.destination){
message += "<div>" + `Destination: ${data.destination}`  + "</div>";
}
if(data.traveller){
message += "<div>" + `Number of Traveller: ${data.traveller}`  + "</div>";
}


message += "<p>" + `Source: ` + "<a href='" + hostname + "/" + router.asPath + "' target='_new'>" + router.asPath + "</a>" + "</p>";

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
const submitEnquiryForm = (gReCaptchaToken) => {
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
      console.log(resx.status);
      if (resx.status && resx.status === "success") {
        setFinalsubmit(true);
        setNotification(resx.message);
      } else {
        setNotification(resx.message);
      }
    });

    }
useEffect(()=>{
if(finalsubmit === true){
submitAll(submitData);  
}

return(()=>setFinalsubmit(false));

},[finalsubmit])
console.log(finalsubmit);
const submitAll=async(submitData)=>{
	let exc = {firstName:"",lastName:"",contact:"",email:"",message:'',travelSdate:'',travelEdate:'',traveller:''};

  if(submitData.travelSdate === ""){
    exc.travelSdate = "Start Date required";
  }else{
  exc.travelSdate = ""; 
  }
  if(submitData.travelEdate === ""){
    exc.travelEdate = "End Date required";
  }else{
  exc.travelEdate = ""; 
  }

	if(submitData.firstName === ""){
    exc.firstName = "Firstname required";
	}else{
	exc.firstName = "";	
	}
	if(submitData.lastName === ""){
    exc.lastName = "Lastname required";
	}else{
	exc.lastName = "";	
	}
	if(!mobileRegex.test(submitData.contact)){
    exc.contact = "Invalid Mobile Number";
	}else{
	exc.contact = "";	
	}
	if(submitData.email === "" || !ValidateEmail(submitData.email)){
    exc.email = "Invalid Email";
	}else{
	exc.email = "";	
	}
    if(!msgregex.test(submitData.message)){
    exc.message = "Message required & Message Length Should be atleast 10 Characters";
    }else{
    exc.message = "";  
    }
 


if(exc.message !== "" || exc.email !== "" || exc.contact !== "" || exc.firstName !==""  || exc.lastName !=="" || exc.travelSdate !=="" || exc.travelEdate !=="" || exc.traveller !=="" ){
 setError(exc);
 console.log(exc)
  return;  
}else{
setError({firstName:"",lastName:"",contact:"",email:"",message:'',travelSdate : '',travelEdate : '',traveller : ''});
setBloading(true);


const message = composeMessage(submitData);
const uploaddata = {name:`${submitData.firstName} ${submitData.lastName}`,email:submitData.email,phone:submitData.contact,message:message,tag:'accomodation-availability',info:submitData};
let dataSubmitted = await DataSubmittedtoapi(uploaddata);

if(dataSubmitted && dataSubmitted.success === true){
setSuccesspage(uploaddata);

let maildata = {subject:`Enquiry for check availability ${name}`,text:message};
let mailresponse = await sendMail(maildata);
if(mailresponse){
    console.log('Mail has been sent');
}else{
    console.log('Mail server error');  
}

Tagmanageri([{pagename:'accommodation'}],'new_enquiry'); 
setBloading(false);
setSubmitData({firstName:"",lastName:"",contact:"",email:"",message:'',travelSdate : '',travelEdate : '',traveller : ''});
}else{
setSuccesspage('');
setBloading(false);
}
setFinalsubmit(false);

}
    
}


return ( 
	   <>
       <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
            <div className="sidebar__title">
                <h4>Accommodation Availability Enquiry</h4>
                <h6 style={{fontSize:'1rem',cursor:'pointer',position: 'absolute',right:'10px',top:'20px'}} onClick={()=>{setToggle(false)}}>close</h6>
            </div>
        <div className="sidebar__total__price mb-5"> 
            </div>
          <form onSubmit={handleSumitForm}>
         
                <div className="sidebar__form__wrap">
                    <span className="sidebar__lebel">Primary Guest</span>
                     <div className="sidebar__form__single">
                        <label>Checkin</label>
                        <input  name="travelSdate" className={error && error.travelSdate ? "error" : "dff"} id="travelSdate" type="date" min={todate()} onChange={(e)=>onChangeHandler(e)} value={submitData.travelSdate  ? submitData.travelSdate : ''}/>
                    </div>
                    <div className="sidebar__form__single">
                        <label>Checkout</label>
                        <input  name="travelEdate" className={error && error.travelEdate ? "error" : "dff"} id="travelEdate" type="date" min={submitData.travelEdate && submitData.travelEdate ? submitData.travelEdate : ''} onChange={(e)=>onChangeHandler(e)} value={submitData.travelEdate ? submitData.travelEdate : '' }/>
                    </div>
                      <div className="sidebar__select__wrap">

                <div style={{width:'100%'}}  className="sidebar__select__single">
                    <label>No. of Guests <small style={{fontSize: '0.6rem',color:'red'}}>{error && error.traveller}</small></label>
                     <select style={{width:'100%'}}  className={error && error.traveller ? "form-select error" : "form-select"} type="number" id="traveller" name="traveller" min={1} max={20} onChange={(e)=>onChangeHandler(e)} value={submitData.traveller ? submitData.traveller : 1}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    
                    </select>

                </div>
            
            </div>
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
                        <input type="text" className={error && error.contact ? "error" : "dff"}  name="contact" id="contact" onChange={(e)=>onChangeHandler(e)} value={submitData.contact || ''}/>
                    </div>
                    <div className="sidebar__form__single">
                        <label htmlFor="">Email</label>
                        <input type="email" className={error && error.email ? "error" : "dff"}  name="email" id="email" onChange={(e)=>onChangeHandler(e)} value={submitData.email || ''}/>
                    </div>
                     <div className="sidebar__form__single">
                        <label htmlFor="">Message</label>
                        <textarea  style={{width:'100%',border: "1px solid #C0C0C0",borderRadius: "5px",color: "#B4B4B4",fontSize: "16px",fontWeight: "400",padding: "10px"}} className={error && error.message ? "error" : "dff"} placeholder="Enter your Message" name="message" id="message" onChange={(e)=>onChangeHandler(e)} value={submitData.message || ''}/>
                    </div>
                </div>
              {Object.values(error).filter(err => err !== '').length > 0 && (
                    <div className="light-red-div">
                      <ul>
                        {Object.values(error).filter(err => err !== '').map((err, e) => (
                          <li key={e}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
export default memo(CheckAvailability);