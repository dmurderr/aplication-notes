import noteComponent from "./componentsNote.js"

const date = new Date()
var hoy = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`

class Note
{
    constructor(value = "" , id = 0 , date = hoy)
    {
        this.date = date
        this.value = value 
        this.id = id
        this.noteadd = "Nota" + this.id
    }

    saveNote()
    {
        let  json = {
            date : this.date,
            value : this.value,
            id : this.id
        }

        
        localStorage.setItem(this.noteadd , JSON.stringify(json))
        
    }

    updateNote(value)
    {
        let json = JSON.parse(localStorage.getItem(this.noteadd))
        
        // modificaciones
        this.value = value
        //la eliminamo
        localStorage.removeItem(this.noteadd)
        this.saveNote()
    }

}


class Controler
{
    constructor()
    {
        this.notes = []
        this.padre = document.getElementById("main")
        this.totalNotes = localStorage.length
        this.recuperarNotas()

    }

    addNote(padre) { 
                // basicamente cuando el cliente es nuevo se crea un nuevo contructor y las notas partirian desde el 1 por sumarle entonces hacemos una condicional para arreglar el bug
        let note = new Note("",this.totalNotes, hoy) 
        padre.appendChild(new noteComponent(note))
        note.saveNote()
        this.totalNotes++
    }

    recuperarNotas()
    {

        if(this.totalNotes > 0)
        {
            console.log(this.totalNotes)
        
            let i = 0;
        
            while (this.notes.length < this.totalNotes)
            {
                if(localStorage.getItem("Nota" + i) == null)
                {
                    i++
                    continue
                }else
                {
                    this.notes.push(localStorage.getItem("Nota" + i))
                    i++
                }

                

            }

            this.loadNotes()
            
        }else
        {
        }    
         
    }

    loadNotes()
    {
        const padre = document.getElementById("main")
        this.notes.forEach(stirngNote =>
        {
            let objectNote = JSON.parse(stirngNote)
            let note = new Note(objectNote.value , objectNote.id , objectNote.date) 
            padre.appendChild(new noteComponent(note))

        })
    }

    event()
    {

    }


}

export default Controler




