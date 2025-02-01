import Image from 'next/image';

const EnquiryComponents=(props)=>{

const {setToggle,toggle} = props;

return (
	     <div onClick={()=>setToggle(true)} style={{width: '60px', height:'60px', borderRadius:'50%', background:'transparent',position: 'fixed',bottom:'3%',right:'1%',boxShadow:'0.2px 1px 3px lightgrey',cursor:'pointer',animation: 'bounchMe 1s infinite',zIndex:'999'}}>
          <Image src='/assets/img/images.jpg' width='60px' height='60px'/> 
	     </div>
	   )

}
export default EnquiryComponents;