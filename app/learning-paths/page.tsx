import { LearningPaths } from "@/components/learning-paths/learning-paths"

export default function LearningPathsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Personalized Learning Paths</h1>
      <LearningPaths />
    </div>
  )
}

