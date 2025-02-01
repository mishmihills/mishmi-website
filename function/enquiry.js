import adminapi from "../api/adminapi";
const DataSubmittedtoapi =async (data) =>{
try{
const localresponse = await adminapi.post("/addinquiry",JSON.stringify(data));
const {_id} = localresponse.data.inquiry;

       if(_id && _id !== ""){
        return {success:true , message : _id}
      }else{
        return {success:false , message :"Data not save"}
      }	
  }catch(e){

    return {success:false , message :e}

  }





}

export {DataSubmittedtoapi};