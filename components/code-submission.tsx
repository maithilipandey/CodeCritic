'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const languages = [
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'javascript', label: 'JavaScript', icon: '⚡' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚙️' },
]

interface CodeSubmissionProps {
  onEvaluate: (code: string, language: string) => void
  isLoading: boolean
}

export function CodeSubmission({ onEvaluate, isLoading }: CodeSubmissionProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      onEvaluate(code, language)
    }
  }

  const addSampleCode = () => {
    const samples: Record<string, string> = {
      python: `def find_max(arr):
    max = arr[0]
    for i in range(len(arr)):
        if arr[i] > max:
            max = arr[i]
    return max`,
      javascript: `function findMax(arr) {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
      typescript: `function findMax(arr: number[]): number {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
      java: `public class Main {
  public static int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    return max;
  }
}`,
      cpp: `int findMax(vector<int> arr) {
  int max = arr[0];
  for (int i = 0; i < arr.size(); i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
    }
    setCode(samples[language])
  }

  return (
    <div className="sticky top-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Language Selector */}
        <div className="bg-card border border-border rounded-lg p-4">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Language
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => setLanguage(lang.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  language === lang.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-1">{lang.icon}</div>
                <div className="text-xs font-medium">{lang.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Input */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Your Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-64 bg-input border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={addSampleCode}
            className="text-xs text-accent hover:text-accent/80 underline"
          >
            Load sample code
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!code.trim() || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⚙️</span>
              Evaluating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>🚀</span>
              Evaluate Code
            </span>
          )}
        </Button>

        {/* Info Box */}
        <div className="bg-accent/10 border border-accent rounded-lg p-3 text-sm text-foreground">
          <div className="font-semibold mb-1">💡 How it works</div>
          <p className="text-xs text-muted-foreground">
            Our AI analyzes your code for correctness, efficiency, readability, and best practices. Get instant, actionable feedback!
          </p>
        </div>
      </form>
    </div>
  )
}
