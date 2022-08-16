import { database, getDate } from '../../firebase_config';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
// toast messages
import { toast } from 'react-toastify';
import Loader  from './../loader';
// ----------------------------------------------


function DashResponses({user}) {
  // hold the posts data
  const [responses, setResponses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const responseCollection = collection(database, 'responses');
  const queryResponses = query(responseCollection, orderBy('name'));

  const fetchResponse = ()=>{
    getDocs(queryResponses)
    .then((docSnapshot)=>{
      let tempArray = [];

      docSnapshot.docs.forEach((document)=>{
        tempArray.push({...document.data(), id: document.id, sentTime: getDate(document.data().time)});
      });

      setResponses(tempArray);
      setIsLoaded(true);
    })
    .catch(err=>{
      toast(err.message);
    });
    }

  useEffect(()=>{
    fetchResponse();
  },[]);

  const delResponse = (e, responseId)=>{
    e.preventDefault();
    setIsLoaded(false);
    const thisResponse = doc(database, 'responses', responseId);
        deleteDoc(thisResponse)
            .then(()=>{
                fetchResponse();
            })
            .catch(err=>toast(err.message));
  }

  if (user){
    return (
      <main className='dash-main' id='dash-responses'>
        <section className='dash-dataInfo'>
          <p id='datainfoType'> Total (<span id='datainfoCount'>{responses.length}</span>) Responses</p>
        </section>

        <section className='data' id='postData'>
            <div className='data-table'>
              {!isLoaded ?
              
              (<Loader message/>) :

              (responses.map((response)=>
                <div key={response.id} className="responseItem lightOverlay">
                  <p>Sender Info</p>
                  <div className='responseMeta'>
                  <h3>{response.name}</h3>
                  <p>Email: {response.email}</p>
                  <p>Time: {response.sentTime}</p>
                  </div>
                <p>{response.messages}</p>   

                <button className='btnDanger' onClick={(e)=>delResponse(e, response.id)}> Delete</button> 
                </div>
              ))
              }
              

            </div>
        </section>
        
      </main>
    );
  } else {
    return <p>Refresh the page and sign in please</p>
  }
  

}


export default DashResponses;