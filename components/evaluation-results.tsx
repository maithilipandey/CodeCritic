'use client'

import { useEffect, useState } from 'react'

export interface EvaluationResult {
  overall_score: number
  correctness: {
    score: number
    passed_tests: number
    total_tests: number
    feedback: string
  }
  efficiency: {
    score: number
    time_complexity: string
    space_complexity: string
    feedback: string
  }
  readability: {
    score: number
    issues: string[]
    feedback: string
  }
  best_practices: {
    score: number
    violations: string[]
    feedback: string
  }
}

interface EvaluationResultsProps {
  result: EvaluationResult
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    let current = 0
    const target = Math.round(score)
    const increment = target / 20

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplayScore(target)
        clearInterval(interval)
      } else {
        setDisplayScore(Math.round(current))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [score])

  const percentage = (displayScore / 100) * 360
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 360) * circumference

  const getColor = (s: number) => {
    if (s >= 80) return 'text-chart-2'
    if (s >= 60) return 'text-chart-4'
    if (s >= 40) return 'text-destructive'
    return 'text-destructive'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-3">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted/30"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${getColor(displayScore)} transition-all duration-300`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getColor(displayScore)}`}>
              {displayScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">/ 100</div>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-foreground text-center">{label}</h3>
    </div>
  )
}

function FeedbackCard({
  title,
  icon,
  score,
  children,
}: {
  title: string
  icon: string
  score: number
  children: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-slide-in">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <div className="text-sm font-bold text-accent">{score}/100</div>
          </div>
        </div>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  )
}

export function EvaluationResults({ result }: EvaluationResultsProps) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-card border border-border rounded-lg p-6 animate-slide-in">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 place-items-center">
          <ScoreCircle score={result.overall_score} label="Overall" />
          <ScoreCircle score={result.correctness.score} label="Correctness" />
          <ScoreCircle score={result.efficiency.score} label="Efficiency" />
          <ScoreCircle score={result.readability.score} label="Readability" />
        </div>
      </div>

      {/* Correctness */}
      <FeedbackCard
        title="Correctness"
        icon="✅"
        score={result.correctness.score}
      >
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Tests Passed</span>
            <span className="font-semibold text-chart-2">
              {result.correctness.passed_tests}/{result.correctness.total_tests}
            </span>
          </div>
          <p className="text-foreground">{result.correctness.feedback}</p>
        </div>
      </FeedbackCard>

      {/* Efficiency */}
      <FeedbackCard
        title="Efficiency"
        icon="⚡"
        score={result.efficiency.score}
      >
        <div className="space-y-2 text-sm">
          <div className="bg-input rounded p-2">
            <div className="text-xs text-muted-foreground mb-1">Time Complexity</div>
            <div className="font-mono text-accent font-semibold">
              {result.efficiency.time_complexity}
            </div>
          </div>
          <div className="bg-input rounded p-2">
            <div className="text-xs text-muted-foreground mb-1">Space Complexity</div>
            <div className="font-mono text-accent font-semibold">
              {result.efficiency.space_complexity}
            </div>
          </div>
          <p className="text-foreground pt-2">{result.efficiency.feedback}</p>
        </div>
      </FeedbackCard>

      {/* Readability */}
      <FeedbackCard
        title="Readability"
        icon="📖"
        score={result.readability.score}
      >
        <div className="space-y-2 text-sm">
          {result.readability.issues.length > 0 && (
            <ul className="space-y-1">
              {result.readability.issues.map((issue, i) => (
                <li key={i} className="flex gap-2 text-destructive">
                  <span>•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-foreground pt-2">{result.readability.feedback}</p>
        </div>
      </FeedbackCard>

      {/* Best Practices */}
      <FeedbackCard
        title="Best Practices"
        icon="🏆"
        score={result.best_practices.score}
      >
        <div className="space-y-2 text-sm">
          {result.best_practices.violations.length > 0 && (
            <ul className="space-y-1">
              {result.best_practices.violations.map((violation, i) => (
                <li key={i} className="flex gap-2 text-accent">
                  <span>→</span>
                  <span>{violation}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-foreground pt-2">{result.best_practices.feedback}</p>
        </div>
      </FeedbackCard>
    </div>
  )
}
