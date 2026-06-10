import React,{useState, useRef} from 'react'
import '../style/home.scss'
import {useInterview} from '../hooks/useInterview'
import {useNavigate} from 'react-router'

export default function Home() {

    const { loading, generateReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate();

    const handleGenerateReport = async()=>{
        const resumeFile = resumeInputRef.current.files[0];
        const data = await generateReport({jobDescription, selfDescription, resumeFile})
        navigate(`/interview/${data._id}`)
    }

    if(loading){
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan.....</h1>
            </main>
        )
    }
    
    return (
        <main className='home'>
            <div className='interview-text-group'>
                <div className='left'>
                    <label htmlFor="jobdescription">Job Description</label>
                    <textarea onChange={(e)=>{setJobDescription(e.target.value)}} name="jobDescription" placeholder="Enter Job Description..."></textarea>
                </div>
                <div className='right'>
                    <p>Resume <small className='highlight'>Use Resume and self description for best results</small> </p>
                    <div className='inputGroup'>
                        <label className='file-label' htmlFor="resume">Upload Resume</label>
                        <input ref={resumeInputRef} type="file" id="resume" name="resume" accept=".pdf" hidden/>
                    </div>
                    <div className='description'>
                        <label  htmlFor="selfDescription">Self Description</label>
                        <textarea onChange={(e)=>{setSelfDescription(e.target.value)}} name="selfDescription" placeholder="De..."></textarea>
                    </div>
                    <div>
                        <button onClick={handleGenerateReport} className='btn primarybutton'>Generate Interview Report</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

