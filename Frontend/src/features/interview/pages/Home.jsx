import React from 'react'
import '../style/home.scss'

export default function Home() {
    return (
        <main className='home'>
            <div className='interview-text-group'>
                <div className='left'>
                    <label htmlFor="jobdescription">Job Description</label>
                    <textarea name="jobDescription" placeholder="Enter Job Description..."></textarea>
                </div>
                <div className='right'>
                    <p>Resume <small className='highlight'>Use Resume and self description for best results</small> </p>
                    <div className='inputGroup'>
                        <label className='file-label' htmlFor="resume">Upload Resume</label>
                        <input type="file" id="resume" name="resume" accept=".pdf" hidden/>
                    </div>
                    <div className='description'>
                        <label  htmlFor="selfDescription">Self Description</label>
                        <textarea name="selfDescription" placeholder="De..."></textarea>
                    </div>
                    <div>
                        <button className='btn primarybutton'>Generate Interview Report</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

