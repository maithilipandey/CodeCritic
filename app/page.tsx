'use client'

import { useState } from 'react'
import { CodeSubmission } from '@/components/code-submission'
import { EvaluationResults } from '@/components/evaluation-results'
import { Header } from '@/components/header'
import type { EvaluationResult } from '@/components/evaluation-results'

export default function Home() {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleEvaluate = async (code: string, language: string) => {
    setIsLoading(true)
    console.log('[v0] Submitting evaluation request')
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      console.log('[v0] Response status:', response.status)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log('[v0] Received evaluation:', data)
      
      if (data.result) {
        setEvaluation(data.result)
      }
    } catch (error) {
      console.error('[v0] Evaluation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <CodeSubmission onEvaluate={handleEvaluate} isLoading={isLoading} />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-3">
            {evaluation ? (
              <EvaluationResults result={evaluation} />
            ) : (
              <div className="flex items-center justify-center min-h-96 border-2 border-dashed border-border rounded-xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">✨</div>
                  <p className="text-muted-foreground text-lg">
                    Submit your code to see the magic happen
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
