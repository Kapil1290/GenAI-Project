const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

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

module.exports = { generateInterviewReportController }