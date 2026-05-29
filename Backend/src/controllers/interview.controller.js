const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')


/**
 * @description controller to generate the self description and report 
 */


async function generateInterviewReportController(req, res){
    const resumeFile = req.file

    let resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    // console.log(resumeContent.text)
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI

    })

    res.status(201).json({
        message: "Interview Report generated successfully..",
        interviewReport
    })

}

/**
 * @description Controller to get the interview report by interviewID 
*/

async function getInterviewReportByIdController(req, res){
    const{interviewId} = req.params;

    const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message:"Report Not Found"
        })
    }


    return res.status(200).json({
        message:"Report successfully found.",
        interviewReport
    })
}

/**
 * @description Controller to get all report in sorted order
*/

async function getAllInterviewReports(req, res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(201).json({
        message:"Interview reports are fetched.",
        interviewReports
    })
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReports }