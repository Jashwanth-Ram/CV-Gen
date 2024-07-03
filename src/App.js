import React, { useEffect, useState } from 'react';
import Generator from './components/generator';

import "react-toastify/dist/ReactToastify.css";
import Profile from './components/profile';
import { ROUTES } from './utils/routes';
import { loadData } from './utils/localStorage';

function App() {
  const[page,setPage] = useState(ROUTES.GENERATOR);
  const[resume,setResume]=  useState();
  const[openAIKey,setOpenAIKey]=  useState();


  useEffect( ()=>
  {
    const fetchLocalData= async()=>
      {
        const fetchedResume = await loadData('resume');
        const fetchedOpenAIKey = await loadData('openAIKey');
        setResume(fetchedResume);
        setOpenAIKey(fetchedOpenAIKey); 
      }
      fetchLocalData();
  },[]);


  switch (page) {
    case ROUTES.GENERATOR:
      return <Generator setPage={setPage}  resume={resume} openAIKey={openAIKey} />
           
    case ROUTES.PROFILE:
      return <Profile 
      setPage={setPage}
       resume={resume} 
       setResume={setResume}
        openAIKey = {openAIKey} 
        setOpenAIKey ={setOpenAIKey}/>
        
   
    default:
      return <Generator setPage={setPage} resume={resume} openAIKey={openAIKey} />
  }



}

export default App;
