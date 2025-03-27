import { NextResponse } from "next/server"

// Mock database for demonstration
let notes = [
  { id: "1", title: "Math Notes", content: "# Algebra\n- Equations\n- Functions", category: "Math" },
  { id: "2", title: "Science Notes", content: "# Physics\n- Motion\n- Energy", category: "Science" },
]

export async function GET() {
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  try {
    const note = await request.json()
    const newNote = { ...note, id: Date.now().toString() }
    notes.push(newNote)
    return NextResponse.json(newNote)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updatedNote = await request.json()
    notes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    return NextResponse.json(updatedNote)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}

