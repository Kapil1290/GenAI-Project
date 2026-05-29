// const {GoogleGenAI} = require('@google/genai')
// const {z} = require('zod')
// const {zodToJsonSchema} = require('zod-to-json-schema')
// const {resume, selfDescription, jobDescription} = require('./temp')
// const { ZodSchema } = require('zod/v3')


// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GEN_API_KEY
// })


// // async function invokeGeminiAi(){
// //     const response = await ai.models.generateContent({
// //         model:"gemini-2.5-flash",
// //         contents:"Hello Gemini ! Explain what is interview"
// //     })

// //     console.log(response.text)
// // }

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("The match score between the candidate and the job description, can be a number between 0 to 100"),
//     technicalQuestion: z.array(z.object({
//         question:z.string().describe("The technical questions can be asked in the interview"),
//         intention:z.string().describe("The intention behind asking the technical question"),
//         result:z.string().describe("How to answer the questions, what points to be covered in the answer, what approach to take etc.")
//     })).describe("The technical questions that can be asked in the interview"),
//     behavioralQuestion: z.array(z.object({
//         question:z.string().describe("The behavioral questions can be asked in the interview"),
//         intention:z.string().describe("The intention behind asking the behavioral question"),
//         result:z.string().describe("How to answer the behavioral question, what points to be covered in the answer, what approach to take etc.")
//     })).describe("The behavioral questions that can be asked in the interview"),
//     skillGap: z.array(z.object({
//         skill:z.string().describe("The skill in which the candidate is lacking"),
//         severity:z.enum(['high', 'medium', 'low']).describe("The severity of the skill gap"),
//         result:z.string().describe("Additional details about the skill gap")
//    })).describe("The skill gaps that need to be addressed"),
//    preparationPlan: z.array(z.object({
//     day:z.number().describe("The day number of the preparation plan"),
//     focus:z.string().describe("The focus of the day, can be technical questions, behavioral questions, resume building, mock interviews etc."),
//     task:z.array(z.string()).describe("The tasks to be done on that day to prepare for the interview")
//    }))
// })


// async function generateInterviewReport({resume, selfDescription, jobDescription}){

//     const prompt = `Given below are the resume, self description and job description, generate an interview report for the candidate. The interview report should contain the following sections:
//     resume: ${resume}
//     self description: ${selfDescription}
//     job description: ${jobDescription}`

//     const response = await ai.models.generateContent({
//         model:"gemini-2.5-flash-lite",
//         contents: prompt,
//         config:{
//             responseMimeType: "application/json", 
//             responseSchema: zodToJsonSchema(interviewReportSchema, {
//             $refStrategy: "none",      // ← flattens $defs/refs inline
//             target: "jsonSchema7"      // ← clean JSON Schema draft-7 format
//         })
//         }
//     })

    
// const res = (response.text)
// console.log(res)
// }

// module.exports = generateInterviewReport;



// const { GoogleGenAI } = require('@google/genai')
// const { z } = require('zod')

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GEN_API_KEY
// })

// // Plain JSON Schema — no zodToJsonSchema, no $ref issues
// const interviewReportJsonSchema = {
//     type: "object",
//     properties: {
//         matchScore: {
//             type: "number",
//             description: "Match score between candidate and job description, between 0 and 100"
//         },
//         technicalQuestion: {
//             type: "array",
//             description: "Technical questions that can be asked in the interview",
//             items: {
//                 type: "object",
//                 properties: {
//                     question: { type: "string", description: "The technical question" },
//                     intention: { type: "string", description: "Why this question is being asked" },
//                     result: { type: "string", description: "How to answer it, key points to cover" }
//                 },
//                 required: ["question", "intention", "result"]
//             }
//         },
//         behavioralQuestion: {
//             type: "array",
//             description: "Behavioral questions that can be asked in the interview",
//             items: {
//                 type: "object",
//                 properties: {
//                     question: { type: "string", description: "The behavioral question" },
//                     intention: { type: "string", description: "Why this question is being asked" },
//                     result: { type: "string", description: "How to answer it, key points to cover" }
//                 },
//                 required: ["question", "intention", "result"]
//             }
//         },
//         skillGap: {
//             type: "array",
//             description: "Skill gaps the candidate needs to address",
//             items: {
//                 type: "object",
//                 properties: {
//                     skill: { type: "string", description: "The skill the candidate is lacking" },
//                     severity: {
//                         type: "string",
//                         enum: ["high", "medium", "low"],
//                         description: "Severity of the skill gap"
//                     },
//                     result: { type: "string", description: "Details about the gap and how to fix it" }
//                 },
//                 required: ["skill", "severity", "result"]
//             }
//         },
//         preparationPlan: {
//             type: "array",
//             description: "Day-by-day preparation plan for the interview",
//             items: {
//                 type: "object",
//                 properties: {
//                     day: { type: "number", description: "Day number" },
//                     focus: { type: "string", description: "Focus area for that day" },
//                     task: {
//                         type: "array",
//                         items: { type: "string" },
//                         description: "List of tasks to complete that day"
//                     }
//                 },
//                 required: ["day", "focus", "task"]
//             }
//         }
//     },
//     required: ["matchScore", "technicalQuestion", "behavioralQuestion", "skillGap", "preparationPlan"]
// }

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     const prompt = `You are an expert technical interviewer and career coach.

// Analyze the candidate's resume, self description, and job description below.
// You MUST respond with a JSON object containing EXACTLY these fields:
// - matchScore (number 0-100)
// - technicalQuestion (array of objects with: question, intention, result)
// - behavioralQuestion (array of objects with: question, intention, result)
// - skillGap (array of objects with: skill, severity (must be "high"/"medium"/"low"), result)
// - preparationPlan (array of objects with: day, focus, task (array of strings))

// Do NOT add any other fields. Do NOT rename any fields.

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}`

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",        // ← upgraded from flash-lite
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: interviewReportJsonSchema
//         }
//     })

//     const parsed = JSON.parse(response.text)
//     return parsed
// }

// module.exports = generateInterviewReport



const Groq = require("groq-sdk");
const { z } = require("zod");
const InterviewReport = require("../models/interviewReport.model");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


// ZOD SCHEMA

const interviewReportSchema = z.object({

    matchScore: z.number(),

    technicalQuestion: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            result: z.string()
        })
    ).min(5),

    behavioralQuestion: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            result: z.string()
        })
    ).min(5),

    skillGap: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"]),
            result: z.string()
        })
    ).min(3),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            task: z.array(z.string())
        })
    ).min(7),

    title:z.string().describe("The title of the job for which interview is generated"),
    

});



async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        const prompt = `
You are a JSON API.

Return ONLY valid raw JSON.

Do not write markdown.
Do not write explanation.
Do not use \`\`\`json.

Follow this structure EXACTLY:

{
  "matchScore": number,

  "technicalQuestion": [
    {
      "question": string,
      "intention": string,
      "result": string
    }
  ],

  "behavioralQuestion": [
    {
      "question": string,
      "intention": string,
      "result": string
    }
  ],

  "skillGap": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high",
      "result": string
    }
  ],

  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "task": [string]
    }
  ]
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;



        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.2,

            response_format: {
                type: "json_object"
            }

        });


        const rawResponse =
            completion.choices[0].message.content;

        // console.log(rawResponse);



        // PARSE JSON

        const parsedResponse =
            JSON.parse(rawResponse);

            return parsedResponse;



        // const validatedData =
        //     interviewReportSchema.parse(parsedResponse);


        // const savedReport =
        //     await InterviewReport.create({

        //         ...validatedData,

        //         resume,
        //         selfDescription,
        //         jobDescription
        //     });

        // return savedReport;

    }

    catch (err) {

        console.log("ERROR:");
        console.log(err);

        throw err;
    }
}


module.exports = generateInterviewReport;