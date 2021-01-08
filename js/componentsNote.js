
class noteComponent extends HTMLElement {
    constructor(note) {
      super();
      this.template = document.createElement("template")
      this.note = note
      this.attachShadow({mode:"open"})

    }

    connectedCallback()
    {
      // estructura basica para que funcione un componente
      this.template.innerHTML = this.formarNota()
      let cloneDom = document.importNode(this.template.content , true)
      this.shadowRoot.appendChild(cloneDom)
      //Fin

      this.event() // cargamos lo elementos al conectarse con el DOM

        
    }
    
    deleteComponent()
    {
        let botonDelete = this.shadowRoot.getElementById("boton_delete")
        botonDelete.addEventListener("click" , () => 
        {   
            //this referencia al actual Objecto 
            this.parentNode.removeChild(this)
            localStorage.removeItem("Nota" + this.note.id)
        })
    }

    formarNota() // Al usar Un objeto como nota , nos facilita el uso para crear el html
    {
        const links =  ` 
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
                        `
        const estilos = `
<style>

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.note
{
    margin: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 450px;
}

.note .nav
{
    display: flex;
    flex-direction: row;    
    height: 35px;
    justify-content: space-between;
    border: 2px solid black;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 0;
    background-color: ${this.note.styles.backgroundNav} ;
    align-items: center;
}

.note .nav p 
{
    color: black;
    margin: 0 0 0 15px;
}

.note .contenido , .note .contenido textarea
{
    width: 100%;
    height: 100%;rgba(242, 230, 255)
    border: 1px solid black;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 15px;
    background-color: ${this.note.styles.background};
}


.note .nav div button
{
    padding: 5px;
    width: 25px;
    height: 100%;
    border-radius: 3px;
    background: inherit;
    font-size: 15px;
    border-style: none;
} 

.note .nav div button:hover
{
    background-color: rgb(185, 154, 212, 0.9);
}

.note .nav div button:last-child
{
    color: red;
     
}
        </style>`

        const htmlEstruct = `${links}${estilos}
        <div class="note">
            <div class="nav">
            <p>${this.note.date}</p>
                <div>
                    <button id="option"><i class="far fa-sticky-note"></i></button>
                    <button id="boton_delete"><i class="fas fa-trash-alt"></i></button>
                    <button id="boton_update"><i class="far fa-save"></i></i></button>
            </div>
        </div>
            <div class="contenido">
                <textarea name="contenido" id="input-area" cols="30" rows="10" >${this.note.value}</textarea>
            </div>
        </div>` 

        return htmlEstruct
    }

    actualizarContenido()
    {
        const button_update = this.shadowRoot.getElementById("boton_update")

        button_update.addEventListener("click", () =>
        {
            const contenido = this.shadowRoot.getElementById("input-area")

            this.note.updateNote(contenido.value)  
        })
    }
    
    event()
    {
        this.deleteComponent()
        this.actualizarContenido()
    }
}

window.customElements.define("note-template", noteComponent);

export default noteComponent