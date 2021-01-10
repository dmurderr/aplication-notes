import noteComponent from "./componentsNote.js"

const date = new Date()
var hoy = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`

  
class Note
{
    constructor(value = "" , id = 0 , date = hoy , styles)
    {
        this.date = date
        this.value = value 
        this.id = id
        this.noteadd = "Nota" + this.id
        this.styles = styles
    }

    saveNote()
    {
        let  json = {
            date : this.date,
            value : this.value,
            id : this.id,
            styles: this.styles
        }

        
        localStorage.setItem(this.noteadd , JSON.stringify(json))
        
    }

    updateNote(value)
    {
        let json = JSON.parse(localStorage.getItem(this.noteadd))
        
        // modificaciones
        this.value = value
        //Estilos
        //la eliminamo
        localStorage.removeItem(this.noteadd)
        //estilos
        this.saveNote()
    }

}

// Al tener un componente para la nota y tener un objeto para la misma nota , considere que era mejor tener un controlador para el componente y la nota
class Controler
{
    constructor()
    {
        this.notes = []
        this.padre = document.getElementById("main")
        this.totalNotes = localStorage.length
        this.recuperarNotas() // Al iniciar la pagina las notas se tiene que volver a "fabricar"

    }

    addNote(padre) { 
                // basicamente cuando el cliente es nuevo se crea un nuevo contructor y las notas partirian desde el 1 por sumarle entonces hacemos una condicional para arreglar el bug
        let estilos =  {
            color: "#fff",
            background : "rgba(242, 230, 255)",
            backgroundNav : "rgba(231, 207, 255)",
            fontSize:"24px" , 
        }        
        let note = new Note("",this.totalNotes, hoy , estilos ) 
        padre.appendChild(new noteComponent(note))
        note.saveNote()
        this.totalNotes++
    }

    recuperarNotas()
    {
        // Con esto succeden varios bugs, a mi parecer se pueden mejorar quizas 
        // en vez de ir a buscar cada nota individualmente al localStorage , usar un JSON para despues solo sacar un elemento del localStorge

        if(this.totalNotes > 0) // por si no tenemos caché, asi evitamos buscar "innecesariamente"
        {
             
            let i = 0;
        
            while (this.notes.length < this.totalNotes) // al usar un for tenemos un problema para saber cuando detenerlo, por ende al saber la cantidad totald notas en caché un while viene perfecto
            {
                if(localStorage.getItem("Nota" + i) == null) // para evitar conflictos
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
            //no sucede nada
        }    
         
    }

    loadNotes()
    {
        const padre = document.getElementById("main")
        let fragment = new DocumentFragment()
        this.notes.forEach(stirngNote =>
        {
            let objectNote = JSON.parse(stirngNote)
            let note = new Note(objectNote.value , objectNote.id , objectNote.date , objectNote.styles) 
            fragment.appendChild(new noteComponent(note))
        })

        padre.appendChild(fragment)
    }

    event()
    {
        // para futuras cosas
    }


}

export default Controler




