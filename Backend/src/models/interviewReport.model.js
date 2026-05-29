
// const mongoose = require('mongoose')


// /**
//  * - job description: String
//  * - resume text: String
//  * - self description: String
//  * 
//  * - matchScore: number
//  * 
//  * 
//  * - Tech ques.  : [{
//  *                   ques: "",
//  *                  intension:"",
//  *                  result:""               
//  *                 }]
//  * - Behavioral ques. : [{
//  *                   ques: "",
//  *                  intension:"",
//  *                  result:""               
//  *                 }]
//  * - skill gaps : [{
//  *                skill:"",
//  *                severity:{
//  *                    type:String,
//  *                    enum:[high, low, medium]
//  *  }               
//  * }]
//  * - preparation plan : [{
//  *                          day: Number,
//  *                          focus: String,
//  *                          task: []
//  *                      }]
//  */

// const technicalQuestionSchema = new mongoose.Schema({
//     question:{
//         type: String,
//         required: [true, "Technical question is required"]
//     },
//     intention:{
//         type: String,
//         required: [true, "Intention is required"]
//     },
//     result:{
//         type: String,
//         required: [true, "answer is required"]
//     }
// },
// {
//     _id:false
// }
// )

// const behavioralQuestionSchema = new mongoose.Schema({
//     question:{
//         type: String,
//         required: [true, "Behavioral question is required"]
//     },
//     intention:{
//         type: String,
//         required: [true, "Intention is required"]
//     },
//     result:{
//         type: String,
//         required: [true, "answer is required"]
//     }
// },
// {
//     _id:false
// }
// )

// const skillGapSchema = new mongoose.Schema({
//     skill:{
//         type: String,
//         required: [true, "Skill is required"]
//     },
//     severity:{
//         type: String,
//         enum: ["low", "medium", "high"],
//         required: [true, "Severity is required"]
//     },
//     result:{
//         type: String,
//         required: [true, "answer is required"]
//     }
// },
// {
//     _id:false
// }
// )

// const preparationPlanSchema = new mongoose.Schema({
//     day:{
//         type: Number,
//         required: [true, "Day is required"]
//     },
//     focus:{
//         type: String,
//         required: [true, "Focus is required"]
//     },
//     task:[{
//       type: String,
//       required:[true, "Task is required"]
//     }]
// }
// )

// const interviewReportSchema = new mongoose.Schema({
//     jobDescription:{
//         type: String,
//         required: [true, "job description is required"]
//     },
//     resume:{
//         type: String,

//     },
//     selfDescription:{
//         type:String,
//     },
//     matchScore:{
//         type: Number,
//         min: 0,
//         max: 100
//     },
//     technicalQuestion: [technicalQuestionSchema],
//     behavioralQuestion: [behavioralQuestionSchema],
//     skillGap: [skillGapSchema],
//     preparationPlan: [preparationPlanSchema]
// },
// {
//     timestamps: true
// })


// const interviewReport = mongoose.model("InterviewReport", interviewReportSchema);

// module.exports = interviewReport;



const mongoose = require('mongoose')

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    result: {
        type: String,
        required: [true, "Answer guidance is required"]
    }
}, { _id: false })

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    result: {
        type: String,
        required: [true, "Answer guidance is required"]
    }
}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: {
            values: ["low", "medium", "high"],
            message: "Severity must be low, medium, or high"
        },
        required: [true, "Severity is required"]
    },
    result: {
        type: String,
        required: [true, "Skill gap details are required"]
    }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day number is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus area is required"]
    },
    task: [{
        type: String,
        required: [true, "Task is required"]
    }]
}, { _id: false })

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: [0, "Match score cannot be less than 0"],
        max: [100, "Match score cannot exceed 100"]
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        type: String,
        required: [true, "job title is required"]
    }
}, {
    timestamps: true
})

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = InterviewReport