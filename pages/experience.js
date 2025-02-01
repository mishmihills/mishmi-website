import {useState,useEffect} from "react";
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import AOS from "aos";
import "aos/dist/aos.css";
import Searchbar from "../components/experience/Searchbar";
import Footer from '../components/common/Footer';
import SearchDisplayTab from "../components/experience/SearchDisplayTab";
import adminapi from "../api/adminapi";
import {DataFilter} from "../components/search/data/datafilter";
import {getCalculates} from "../components/itenary/calculateitenary";
import { sort } from 'fast-sort';
import { Player, Controls } from '@lottiefiles/react-lottie-player';




const Experience =()=>{
const [searchData,setSearchData] = useState({search:""});
const [searchDataall,setSearchDataall] = useState([]);
const [filteredDatas,setFilteredDatas] = useState([]);
const [subfilter,setSubfilter] = useState('itinerary');
const [searchByState,setSearchByState] = useState("");
const [searchByType,setSearchByType] = useState("all");
const [searchByActivity,setSearchByActivity] = useState("");
const [loading,setLoading] = useState(false);
const [sortData,setSortData] = useState("");
const [moredata , setMoredata] = useState({limit:4,offset:0,isopen:true});


const sortingData=(data,sortxa,subfilter)=>{
//adding sorted code for itenary only
let sorteddata = data;
if(subfilter === 'itenary' || subfilter === 'itinerary' || subfilter === ''){
 
   if(sortxa === '0'){
      sorteddata = sort(data).asc(u=>u.grandtotal[0].gprice);
      
   }
    if(sortxa === '1'){
      sorteddata = sort(data).desc(u=>u.grandtotal[0].gprice);
   }

}

return sorteddata;
}

const createSearchQuery = (search) => {
    const fieldsToSearch = [
        "tempObj.0.location",
        "tempObj.0.location.0.state",
        "tempObj.0.location.0.placename",
        "tempObj.1.location",
        "tempObj.1.location.0.state",
        "tempObj.1.location.0.placename",
    ];

    const orQueries = fieldsToSearch.map(field => ({ [field]: { $regex: search, $options: "i" } }));

    return { $or: orQueries };
}



const loadMore=async()=>{

setLoading(true);
let offset = moredata.offset;
let limit = moredata.limit;


let query = { 'availability': '1' };
if(subfilter === 'itinerary'){
  query = {'itineraryindex.0.position':'published' }
}
if(searchByState !==""){
  let qws = createSearchQuery(searchByState);
  if(subfilter === 'itinerary'){
   query = {...query,...qws}
  }else{
   query = {...query,'state':searchByState} 
  }
}
if(subfilter === 'itinerary'){
if(searchByType === 'all'){
 if(searchByType.hasOwnProperty('itineraryindex.0.commondetails.typeoftrip')){
    delete query['$or'];
 }

}else{
query = {...query,'itineraryindex.0.commondetails.typeoftrip':searchByType} 
}
}else{
setSearchByType('all');
}

let queryx = JSON.stringify(query);
try{
let response;
if(searchData.search !==""){
let searchstring = "";
searchstring += searchData.search;

response = await adminapi.get(`/search?search=${searchstring}`);
}else{
response = await adminapi.get(`/${subfilter}/?limit=${limit}&offset=${offset}&query=${queryx}`); 
}


if(response && response.data && response.data.length > 0){

offset = offset + 1;
 setMoredata({...moredata,offset:offset,isopen:true});
 setFilteredDatas(DataFilter([...filteredDatas,...response.data]));
 setSearchDataall(DataFilter([...searchDataall,...response.data])); 
 setLoading(false);
}else{
 setLoading(false);
 setMoredata({...moredata,isopen:false});  
}

}catch(e){
  console.log(e);
 setLoading(false);
 setMoredata({...moredata,isopen:false});   
}

setLoading(false);

}
const loadinitial=async()=>{
setLoading(true);
let newmore = {limit:10,offset:0,isopen:true};
let offset = newmore.offset;
let limit = newmore.limit;
let query = { 'availability': '1' };
if(subfilter === 'itinerary'){

  query = {'itineraryindex.0.position':'published' }
  
}
if(searchByState !==""){
  if(subfilter === 'itinerary'){
    let qws = createSearchQuery(searchByState);
   query = {...query,...qws}
  }else{
   query = {...query,'state':searchByState} 
  }
}
if(subfilter === 'itinerary'){
 if(searchByType === 'all'){
 if(searchByType.hasOwnProperty('itineraryindex.0.commondetails.typeoftrip')){
    delete query['$or'];
 }
}else{
query = {...query,'itineraryindex.0.commondetails.typeoftrip':searchByType} 
}   
}else{
  setSearchByType('all'); 
}


let queryx = JSON.stringify(query);
try{
let response = await adminapi.get(`/${subfilter}/?limit=${limit}&offset=${offset}&query=${queryx}`);

//end of rectification
if(response && response.data && response.data.length > 0){

offset = offset + 1;
 setMoredata({...newmore,offset:offset,isopen:true});
 setFilteredDatas(DataFilter([...response.data]));
 setSearchDataall(DataFilter([...response.data]));
 setLoading(false);
}else{
 setLoading(false);
 setMoredata({...moredata,isopen:false});
 setFilteredDatas(DataFilter([]));
 setSearchDataall(DataFilter([]));  
}
}catch(e){
setLoading(false);
setMoredata({...newmore,isopen:false});
 setFilteredDatas(DataFilter([]));
 setSearchDataall(DataFilter([]));  
}

}


useEffect(()=>{

setLoading(true);
if(subfilter !== "" || searchByState !== "" || searchByType !== ''){
loadinitial();  
}

setSearchData({search:""});
},[subfilter,searchByState,searchByType]);



const datacsr=async(searchstring,subfilter)=>{

setLoading(true);
const dataPromise = await adminapi.get(`/search?search=${searchstring}&context=${subfilter}`);

 if(dataPromise.data){
    setLoading(false);
    let check = "";
    if(subfilter === 'itinerary'){
      check = "itineraries";
    }
    if(subfilter === 'activity'){
      check = "activities";
    }
     if(subfilter === 'locations'){
      check = "locations";
    }
     if(subfilter === 'events'){
      check = "events";
    }

let sdfdata = dataPromise?.data?.[check] ?? [];
    if(sdfdata.length > 0){

       setFilteredDatas(DataFilter(sdfdata));
     }else{
      setFilteredDatas([]);
     }
   

 }   
}

useEffect(()=>{
if(searchData.search !== ''){
setMoredata({...moredata,isopen:false});
}

},[searchData.search]);

useEffect(()=>{
if(filteredDatas && filteredDatas.length > 0){
let datax = [...filteredDatas];
let sorteddata = sortingData(datax,sortData,subfilter);
setFilteredDatas(sorteddata);
}
},[sortData]);


return (
       <>
       <HtmlHead/>
       <Header/>
        {loading ? <div className="loader">
                        <Player autoplay loop
                           src="/assets/lottie/animation_lm6cykqw.json"
                           style={{ height: '300px', width: '300px' }}
                         >
                           <Controls visible={false}/>
                         </Player>
                       </div>: ""}
        <section className="experience__area">
            <div className="container">
               <Searchbar
                AOS ={AOS}
                searchData = {searchData} 
                setSearchData ={setSearchData} 
                filteredDatas={filteredDatas}
                subfilter={subfilter}
                setSubfilter={setSubfilter}
                setSearchByState={setSearchByState}
                searchByState={searchByState}
                setSearchByActivity={setSearchByActivity}
                searchByActivity={searchByActivity}
                sortData={sortData}
                setSortData={setSortData}
                searchByType={searchByType}
                setSearchByType={setSearchByType}
                datacsr={datacsr}
                loadinitial={loadinitial}
                />
            
          {/*<DisplayBanner/>*/}
            <SearchDisplayTab
               AOS ={AOS}
               filteredDatas={filteredDatas}
               subfilter={subfilter}
               getCalculates={getCalculates}
               setLoading={setLoading}
               setFilteredDatas={setFilteredDatas}
               loadMore={loadMore}
               moredata={moredata}
               setMoredata={setMoredata}

            />
            </div>
        </section>
       <Footer/>
       </>
       )

}
export default Experience;

