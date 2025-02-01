import {useState,useEffect} from 'react';
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "../components/destinations/FormSection";
import Places from "../components/destinations/Places";
import {Tagmanageri} from "../components/common/tagmanageri";
import BookingEnquiry from "../components/common/BookingEnquiry";
import sendMail from "../function/sendMail";



const Destinations=()=>{

const [successpage,setSuccesspage] = useState("");
const base_url = process.env.BASEURL;

useEffect(()=>{
Tagmanageri();

},[]);


return (
         <>
	     <HtmlHead/>
         <Header/>
         {successpage === "" ? 
         <>
         <FormSection AOS={AOS} successpage={successpage} setSuccesspage = {setSuccesspage} sendMail={sendMail} Tagmanageri={Tagmanageri}/>
         <Places AOS={AOS}/>
         </>
         :<BookingEnquiry AOS = {AOS}  successpage={successpage}/>
         }
         <Footer/>
         </>
	   )

}
export default Destinations;