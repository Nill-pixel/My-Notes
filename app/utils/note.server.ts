import { title } from "process"
import { prisma } from "./database.server"
import { Notes } from "~/interface/notes.server"

export const addNotes = async (note: Notes) => {
  try {
    await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
      }
    })
  } catch (error) {
    throw error
  }

}

export const getNotes = async () => {
  try {
    return await prisma.note.findMany()
  } catch (error) {
    throw error
  }

}