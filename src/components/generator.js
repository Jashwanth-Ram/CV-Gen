import React, { useEffect, useState } from 'react'
import { RiSettingsLine } from "react-icons/ri";
import { ROUTES } from '../utils/routes';
import { loadData } from '../utils/localStorage'
import { initializeChatSession } from '../utils/geminiutil';
 
function Generator({ setPage,resume,openAIKey }) {

  const[isLoading,setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");


  useEffect(() => {
    const fetchJobDesc = async () => {
      try
      {
      const fetchedJob = await loadData('jobDescription');
      console.log(fetchedJob);
      setJobDescription(fetchedJob);
      }
      catch(error)
      {
        console.log("error while fetching job desc",error)
      }

    }
    fetchJobDesc();

  }, [])

  const generateCoverLetter = async () => {
    setIsLoading(true);

    try
    {
      //resume -  user resume content
      // jobDescription - scraped job details from linkedin page.
      const message = `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`;


     const chatSession = initializeChatSession(openAIKey);
     const result = await chatSession.sendMessage(message);




     const MockJsonResp=(result.response.text());
    // console.log(MockJsonResp);


     setCoverLetter(MockJsonResp);

    }
    catch(error)
    {
      console.log(error);
    }
    finally
    {
      setIsLoading(false);
    }
  

  }



  return (
    <div className='flex flex-col'>
      <div className="flex flex-row justify-between mx-5 my-3 items-center">
        <button  disabled={isLoading} onClick={generateCoverLetter} className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        <h2 className="text-2xl font-bold">
          <span className='cover-letter'>LinkedIn</span> <span className="cover-letter"> Cover Letter </span>  <span className='cover-letter'>Generator</span>
        </h2>


        <button onClick={() => { setPage(ROUTES.PROFILE) }} className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
        >
          <RiSettingsLine />


        </button>
      </div>
      <div className='flex mx-5'>
      <textarea
          rows={12}
          className="w-full"
          placeholder="Your Generated cover letter goes here 👇"
          value={coverLetter}
        />
      </div>
    </div>
  )
}

export default Generator