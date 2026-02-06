import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RefreshCcw, CheckCircle2, Building2 } from 'lucide-react'
import flowchartData from './data/flowchart.json'

interface Option {
  label: string
  nextNodeId?: string
  resultId?: string
}

interface Node {
  question: string
  options: Option[]
}

interface Result {
  title: string
  description: string
  color: string
}

interface FlowchartData {
  title: string
  description: string
  startNodeId: string
  nodes: Record<string, Node>
  results: Record<string, Result>
}

const data = flowchartData as FlowchartData

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [resultId, setResultId] = useState<string | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = () => {
    setCurrentNodeId(data.startNodeId)
    setIsStarted(true)
  }

  const handleOptionSelect = (option: Option) => {
    if (option.resultId) {
      setResultId(option.resultId)
      setCurrentNodeId(null)
    } else if (option.nextNodeId) {
      if (currentNodeId) setHistory([...history, currentNodeId])
      setCurrentNodeId(option.nextNodeId)
    }
  }

  const handleReset = () => {
    setCurrentNodeId(null)
    setHistory([])
    setResultId(null)
    setIsStarted(false)
  }

  const currentNode = currentNodeId ? data.nodes[currentNodeId] : null
  const currentResult = resultId ? data.results[resultId] : null

  return (
    <div className="min-h-screen premium-gradient text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 rounded-3xl text-center space-y-6"
            >
              <div className="inline-block p-4 bg-blue-500/20 rounded-2xl mb-4">
                <Building2 className="w-12 h-12 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                {data.title}
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                {data.description}
                <br />
                簡単な質問に答えるだけで、あなたの考えに近い政党を提案します。
              </p>
              <button
                onClick={handleStart}
                className="w-full py-4 px-8 accent-gradient rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-[0.98] group flex items-center justify-center gap-2"
              >
                診断を始める
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : resultId ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="glass p-8 rounded-3xl space-y-8 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-2"
                style={{ backgroundColor: currentResult?.color }}
              />
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-2">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">診断結果</h2>
                <h3 className="text-4xl font-bold" style={{ color: currentResult?.color }}>
                  {currentResult?.title}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed pt-4">
                  {currentResult?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-semibold transition-colors border border-slate-700"
                >
                  <RefreshCcw className="w-5 h-5" />
                  最初からやり直す
                </button>
                <button
                  onClick={() => {
                    if (currentResult) {
                      const text = `だれでも簡単、最短5秒で投票先診断\n私の考えに近いのは【${currentResult.title}】でした！\n#選挙`;
                      const url = window.location.href;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                    }
                  }}
                  className="flex items-center justify-center gap-2 py-4 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-2xl font-semibold transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  Xでシェア
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass p-8 rounded-3xl space-y-8"
            >
              <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                <span>質問 {history.length + 1}</span>
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-4 rounded-full transition-colors ${i <= history.length ? 'bg-blue-500' : 'bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-medium leading-tight">
                {currentNode?.question}
              </h2>

              <div className="grid gap-4">
                {currentNode?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full p-6 text-left glass hover:bg-white/10 rounded-2xl transition-all border border-white/10 flex items-center justify-between group active:scale-[0.99]"
                  >
                    <span className="text-xl font-semibold">{option.label}</span>
                    <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {history.length > 0 && (
                <button
                  onClick={() => {
                    const newHistory = [...history]
                    const prevId = newHistory.pop()
                    if (prevId) {
                      setCurrentNodeId(prevId)
                      setHistory(newHistory)
                    }
                  }}
                  className="text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1 transition-colors pt-4"
                >
                  <RefreshCcw className="w-4 h-4" />
                  前の質問に戻る
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-12 text-center text-slate-600 text-sm">
          v0.9.1
        </footer>
      </div>
    </div>
  )
}
