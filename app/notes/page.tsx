import { NotesOrganizer } from "@/components/notes/notes-organizer"

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Notes Organizer</h1>
      <NotesOrganizer />
    </div>
  )
}

