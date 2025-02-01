import {useEffect} from 'react';
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../components/common/Footer';
import Banner from "../components/faq/Banner";
import EnqirySection from "../components/faq/EnqirySection";
import ContactSection from "../components/faq/ContactSection";
import {Tagmanageri} from "../components/common/tagmanageri";

const Contactus=({faqdata})=>{


useEffect(()=>{
Tagmanageri();

},[]);

return (
	    <>
	     <HtmlHead/>
         <Header theme={'light'}/>
         <Banner AOS={AOS}/>
         <EnqirySection AOS={AOS}/>
         <div className="container">
           <div className="row">
              <div className="col-md-12">
              <ContactSection/>
              </div>
          
            </div>
          </div>
         <Footer/>

	    </>
	    )

}
export default Contactus;

