const ContactSection=()=>{

return (
	   <div style={{marginTop:'4.5rem'}} className="container">
        <div className="row">
            <div className="col-md-12">
                <address>
                   <strong>Registered Office:</strong><br/>
                    {process.env.NEXT_PUBLIC_COMPANYNAME}<br/>
                    {process.env.NEXT_PUBLIC_RE_ADDRESS}<br/>
                    {process.env.NEXT_PUBLIC_CITY} – {process.env.NEXT_PUBLIC_PIN}, {process.env.NEXT_PUBLIC_STATE}<br/>
                    GST:  {process.env.NEXT_PUBLIC_GST}
                </address>
            </div>
            <div className="col-md-12">
                <address>
                    <strong>Corporate Office:</strong><br/>
                    {process.env.NEXT_PUBLIC_COR_ADDRESS}<br/>
                    {process.env.NEXT_PUBLIC_CITY} - {process.env.NEXT_PUBLIC_PIN}<br/>
                     Phone: {process.env.NEXT_PUBLIC_PHONE}<br/>
                    Email: <a href={`mailto${process.env.NEXT_PUBLIC_SUPPORTEMAIL}`}>{process.env.NEXT_PUBLIC_SUPPORTEMAIL}</a>
                </address>
            </div>
        </div>
    </div>

	   )

}
export default ContactSection;