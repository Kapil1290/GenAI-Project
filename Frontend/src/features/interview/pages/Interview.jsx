
// export default Interview
import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate, useParams } from 'react-router'

export default function Interview() {
  // const sample = {
  //   matchScore: 70,
  //   technicalQuestion: [
  //     {
  //       question: 'What is the difference between monolithic and microservices architecture?',
  //       intention: "To assess the candidate's understanding of software architecture",
  //       result:
  //         "The candidate provided a clear and concise answer, demonstrating a good understanding of the topic",
  //     },
  //     {
  //       question: 'How do you optimize the performance of a web application?',
  //       intention: 'To evaluate the candidate\'s knowledge of web development best practices',
  //       result:
  //         'The candidate provided several relevant suggestions, including code optimization, caching, and database indexing',
  //     },
  //   ],
  //   behavioralQuestion: [
  //     {
  //       question: 'Can you describe a situation where you had to work with a team to solve a complex problem?',
  //       intention: "To assess the candidate's teamwork and problem-solving skills",
  //       result:
  //         'The candidate provided a relevant example from their experience, demonstrating their ability to collaborate and communicate effectively',
  //     },
  //     {
  //       question: 'How do you handle feedback or criticism of your code?',
  //       intention: 'To evaluate the candidate\'s attitude towards continuous learning and improvement',
  //       result:
  //         'The candidate demonstrated a positive attitude, acknowledging the importance of feedback and expressing a willingness to learn and improve',
  //     },
  //   ],
  //   skillGap: [
  //     { skill: 'Node.js and Express.js', severity: 'medium', result: 'Lacks experience with Node.js and Express.js' },
  //     { skill: 'MongoDB or MySQL databases', severity: 'low', result: 'Some MySQL knowledge but limited MongoDB experience' },
  //   ],
  //   preparationPlan: [
  //     { day: 1, focus: 'Review of Java and JavaScript fundamentals', task: ['Complete online tutorials and exercises', 'Review notes and textbooks'] },
  //     { day: 2, focus: 'Introduction to Node.js and Express.js', task: ['Complete online tutorials and exercises', 'Work on a small project'] },
  //     { day: 3, focus: 'Review of database management systems', task: ['Review DBMS notes', 'Practice queries on MySQL or MongoDB'] },
  //   ],
  // }

  // const data = report

  const { report, getReportById, loading } = useInterview()
  const { interviewId } = useParams()

  useEffect(()=>{
    if(interviewId){
      getReportById(interviewId)
    }
  },[interviewId])


  const initialTabs = [
    { id: 'technical', label: '⚙️ Technical Questions' },
    { id: 'behavioral', label: '💬 Behavioral Questions' },
    { id: 'roadmap', label: '🧭 Roadmap' },
  ]

  const [tabs, setTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState('technical')
  const [dragIndex, setDragIndex] = useState(null)

  // accordion state - only one open at a time per active tab
  const [openIndex, setOpenIndex] = useState(0)

  const colors = ['#ff6b88', '#7f83ff', '#6ee7b7', '#ffb86b', '#6bb9ff']

  const handleDragStart = (e, index) => {
    setDragIndex(index)
    try { e.dataTransfer.effectAllowed = 'move' } catch (err) {}
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    if (dragIndex === null) return
    const newTabs = [...tabs]
    const [moved] = newTabs.splice(dragIndex, 1)
    newTabs.splice(index, 0, moved)
    setTabs(newTabs)
    setDragIndex(null)
  }

  const addTab = () => {
    const id = 'custom-' + Date.now()
    setTabs((t) => [...t, { id, label: 'New Tab' }])
  }

  const toggleOpen = (index) => setOpenIndex((prev) => (prev === index ? -1 : index))

  return (
    <div className="interview-page">
      <aside className="left-nav" aria-label="navigation">
        <ul className="nav-list" role="tablist">
          {tabs.map((t, i) => (
            <li
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`nav-item ${activeTab === t.id ? 'active' : ''} ${dragIndex === i ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i)}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-column">
        <section className="main-header">
          <h2>{tabs.find((x) => x.id === activeTab)?.label || 'Technical Questions'}</h2>
          <p className="lead">
            {activeTab === 'technical' && 'Refine your technical execution with curated algorithmic and systems-focused challenges.'}
            {activeTab === 'behavioral' && 'Demonstrate your soft skills and ability to work in teams through behavioral insights.'}
            {activeTab === 'roadmap' && 'Follow this preparation plan to bridge your skill gaps and improve your performance.'}
          </p>
        </section>

        <section className="center-content">
          {activeTab === 'technical' && (
            <div className="questions-block">
              <h3 className="block-title">⚙️ Technical Questions ({report.technicalQuestion?.length || 0})</h3>
              <div className="cards">
                {Array.isArray(report.technicalQuestion) && report.technicalQuestion.length > 0 ? (
                  report.technicalQuestion.map((q, i) => (
                    <article className={`qa-card ${openIndex === i ? 'open' : ''}`} key={i}>
                      <div className="qa-header" role="button" tabIndex={0} onClick={() => toggleOpen(i)} onKeyDown={(e) => e.key === 'Enter' && toggleOpen(i)} aria-expanded={openIndex === i}>
                        <div className="qa-left">
                          <span className="qa-dot" style={{ backgroundColor: colors[i % colors.length] }} />
                          <h4 className="qa-question"><span className="qa-number">Q{i + 1}.</span> {q.question}</h4>
                        </div>
                        <div className="qa-right">
                          <span className="qa-chev" aria-hidden>{openIndex === i ? '▴' : '▾'}</span>
                        </div>
                      </div>
                      <div className="qa-body">
                        <div className="qa-field">
                          <h5>Intention</h5>
                          <p className="qa-intention">{q.intention}</p>
                        </div>
                        <div className="qa-field">
                          <h5>Result</h5>
                          <p className="qa-result">{q.result}</p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="center-card">No technical questions available</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'behavioral' && (
            <div className="questions-block">
              <h3 className="block-title">💬 Behavioral Questions ({report.behavioralQuestion?.length || 0})</h3>
              <div className="cards">
                {Array.isArray(report.behavioralQuestion) && report.behavioralQuestion.length > 0 ? (
                  report.behavioralQuestion.map((q, i) => (
                    <article className={`qa-card ${openIndex === i ? 'open' : ''}`} key={i}>
                      <div className="qa-header" role="button" tabIndex={0} onClick={() => toggleOpen(i)} onKeyDown={(e) => e.key === 'Enter' && toggleOpen(i)} aria-expanded={openIndex === i}>
                        <div className="qa-left">
                          <span className="qa-dot" style={{ backgroundColor: colors[i % colors.length] }} />
                          <h4 className="qa-question"><span className="qa-number">Q{i + 1}.</span> {q.question}</h4>
                        </div>
                        <div className="qa-right">
                          <span className="qa-chev" aria-hidden>{openIndex === i ? '▴' : '▾'}</span>
                        </div>
                      </div>
                      <div className="qa-body">
                        <div className="qa-field">
                          <h5>Intention</h5>
                          <p className="qa-intention">{q.intention}</p>
                        </div>
                        <div className="qa-field">
                          <h5>Result</h5>
                          <p className="qa-result">{q.result}</p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="center-card">No behavioral questions available</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="roadmap-block">
              <h3 className="block-title">🧭 Preparation Roadmap</h3>
              <div className="roadmap-cards">
                {Array.isArray(report.preparationPlan) && report.preparationPlan.length > 0 ? (
                  report.preparationPlan.map((plan, idx) => (
                    <article className="roadmap-card" key={idx}>
                      <div className="roadmap-day-badge">Day {plan.day}</div>
                      <div className="roadmap-content">
                        <h4 className="roadmap-focus">{plan.focus}</h4>
                        <ul className="roadmap-tasks">
                          {plan.task && plan.task.map((task, i) => (
                            <li key={i}>
                              <span className="task-check">✓</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="center-card">No preparation plan available</div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <aside className="right-panel" aria-label="summary">
        <div className="score-widget">
          <div className="score-circle" style={{ ['--score']: report.matchScore }}>
            <span className="score-number">{report.matchScore}%</span>
          </div>
          <div className="score-label">Resume Score</div>
        </div>

        <div className="skill-gap">
          <h4>Skill Gaps</h4>
          {Array.isArray(report.skillGap) && report.skillGap.length > 0 ? (
            report.skillGap.map((s, idx) => (
              <div className={`skill-row ${s.severity || ''}`} key={idx}>
                <div className="skill-name">{s.skill}</div>
                <span className={`skill-severity-badge ${s.severity || ''}`}>{s.severity}</span>
              </div>
            ))
          ) : (
            <p className="no-data">No skill gaps identified</p>
          )}
        </div>
      </aside>
    </div>
  )
}
