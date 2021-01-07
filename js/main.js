import Controler from "./objectNote.js"

const controlardor = new Controler()

const addNoteButton = document.getElementById("note-add")
const contenedorNotes = document.getElementById("main")

addNoteButton.addEventListener("click" , () => 
{
    controlardor.addNote(contenedorNotes)
})

