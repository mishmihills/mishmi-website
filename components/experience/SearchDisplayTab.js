import {useState,useEffect} from "react";
import ItenaryTab from "./ItenaryTab";
import ActivityTab from "./ActivityTab";
import AccomodationTab from "./AccomodationTab";
import EventTab from "./EventTab";
import {arrLimiter , getDatabyid} from "../../function/componentFunction";
import adminapi from "../../api/adminapi";
import InfiniteScroll from "../common/InfiniteScroll";

const SearchDisplayTab=(props)=>{
const {AOS,filteredDatas , subfilter , getCalculates , setFilteredDatas,moredata,setMoredata,loadMore} = props;
const base_url = process.env.NEXT_PUBLIC_BASEURL;

function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a new array to avoid modifying the original one
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray; // Return the shuffled array
}

useEffect(() => {
    AOS.init();
    AOS.refresh();

  }, [AOS]);

const onReachBottom=()=>{
    loadMore();
}



return (
	     <>
	           <div className="experience__tab__content">
                    <div className="tab-content" id="myTabContent">
                       <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                         {/*loop starts*/}
                    { (filteredDatas && filteredDatas.length > 0 ) ? filteredDatas.map((filter,key)=>{
                          if(filter.category === 'Itinerary'){

                             return (
                             <div key={key}>
                             <ItenaryTab filter={filter} getCalculates={getCalculates} />
                             </div>
                          	     )

                          }
                           else if(filter.category === 'activity'){

                             return (
                             <div key={key}>
                             <ActivityTab filter={filter}/>
                             </div>
                          	     )

                          }
                            else if(filter.category ===  'Location'){

                             return (
                             <div key={key}>
                             <AccomodationTab filter={filter}/>
                             </div>
                          	     )

                          }
                            else if(filter.category ===  'Event'){

                             return (
                             <div key={key}>
                             <EventTab filter={filter}/>
                             </div>
                                 )

                          }




                    }): ""
                     }
                          {/*loop ends*/}
                        </div>
                    </div>
                </div>
                { moredata.isopen ? <div className="row">
                    <div className="col-lg-12">
                        <div className="experience__more__btn">
                            <button onClick={()=>loadMore()} className="common__btn" style={{border:'none',width:'300px'}}>Load More {subfilter}</button>
                            <InfiniteScroll onReachBottom={onReachBottom}/>
                        </div>
                    </div>
                </div> : ""}
	     </>
	   )

}
export default SearchDisplayTab;