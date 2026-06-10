import { generateInterviewReport, getAllInterviewReports, getInterviewReportById} from '../services/interview.api'
import {useContext, useEffect} from 'react'
import { InterviewContext } from '../interview.context'
import { useParams } from 'react-router'

export const useInterview = () =>{
    const { interviewId } = useParams();

    const context = useContext(InterviewContext)

    if(!context) {
        throw new Error("useInterview must use within interviewprovider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        let response = null;
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReportById = async (interviewId) =>{
        setLoading(true)
        let response = null
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () =>{
        setLoading(true)
        let response = null;
        try{
            const response = await getAllInterviewReports()
            setReport(response.interviewReports)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        return response.interviewReports
    }

    useEffect(()=>{
        if(interviewId){
            getReportById(interviewId)
        }
    }, [interviewId])

    return {loading, setLoading, report, setReport, reports, setReports}
}