"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash, Save, X } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Note {
  id: string
  title: string
  content: string
  category: string
}

export function NotesOrganizer() {
  const [notes, setNotes] = useState<Note[]>([])
  const [categories, setCategories] = useState<string[]>(["Uncategorized", "Math", "Science", "Language"])
  const [activeCategory, setActiveCategory] = useState("All")
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: "",
    content: "",
    category: "Uncategorized",
  })
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    // Fetch notes from API
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes")
        if (response.ok) {
          const data = await response.json()
          setNotes(data)
        }
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
    }

    fetchNotes()
  }, [])

  const filteredNotes = activeCategory === "All" ? notes : notes.filter((note) => note.category === activeCategory)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(filteredNotes)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update the notes array with the reordered items
    const updatedNotes = notes.map((note) => {
      const reorderedNote = items.find((item) => item.id === note.id)
      return reorderedNote || note
    })

    setNotes(updatedNotes)
  }

  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.content) return

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newNote,
          id: Date.now().toString(),
        }),
      })

      if (response.ok) {
        const createdNote = await response.json()
        setNotes([...notes, createdNote])
        setNewNote({
          title: "",
          content: "",
          category: "Uncategorized",
        })
        setIsCreating(false)
      }
    } catch (error) {
      console.error("Error creating note:", error)
    }
  }

  const handleUpdateNote = async () => {
    if (!editingNote) return

    try {
      const response = await fetch("/api/notes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingNote),
      })

      if (response.ok) {
        const updatedNote = await response.json()
        setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
        setEditingNote(null)
      }
    } catch (error) {
      console.error("Error updating note:", error)
    }
  }

  const handleDeleteNote = async (id: string) => {
    // In a real app, you would call an API to delete the note
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row">
            <TabsTrigger value="All">All Notes</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Button onClick={() => setIsCreating(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-lg p-4 mb-6"
        >
          <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Note Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>
            <div>
              <Textarea
                placeholder="Note Content (Markdown supported)"
                rows={5}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
            </div>
            <div>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNote}>Create Note</Button>
            </div>
          </div>
        </motion.div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No notes found. Create a new note to get started.
                </div>
              ) : (
                filteredNotes.map((note, index) => (
                  <Draggable key={note.id} draggableId={note.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border rounded-lg overflow-hidden"
                        >
                          {editingNote && editingNote.id === note.id ? (
                            <div className="p-4 space-y-4">
                              <Input
                                value={editingNote.title}
                                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                              />
                              <Textarea
                                rows={5}
                                value={editingNote.content}
                                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                              />
                              <select
                                className="w-full p-2 border rounded-md bg-background"
                                value={editingNote.category}
                                onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                              >
                                {categories.map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setEditingNote(null)}>
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateNote}>
                                  <Save className="mr-2 h-4 w-4" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Card>
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="text-lg font-semibold">{note.title}</h3>
                                    <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                                      {note.category}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingNote(note)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(note.id)}>
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
                                  <ReactMarkdown>{note.content}</ReactMarkdown>
                                </div>
                              </div>
                            </Card>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

