import { DailyPracticeProblems } from "@/components/daily-practice/daily-practice-problems"

export default function DailyPracticePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Daily Practice Problems</h1>
      <DailyPracticeProblems />
    </div>
  )
}

