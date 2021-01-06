///let note = document.getElementById("note")
///let startTime ,  endTime;
///
///note.onmousedown = function() {
///    console.log("Estoy presionado, haz lo que necesites...");
///    console.log(this.getBoundingClientRect()) 
///};
///
///
///note.onmouseup = function() {
///  };

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
    background-color: rgba(231, 207, 255) ;
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
    height: 100%;
    border: 1px solid black;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 15px;
    background-color: rgba(242, 230, 255);
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
<p>04/01/2021</p>
<div>
<button><i class="fas fa-trash-alt"></i></button>
<button><i class="far fa-save"></i></i></button>
</div>
</div>
<div class="contenido">
<textarea name="" id="" cols="30" rows="10"></textarea>
</div>
</div>`


class Note extends HTMLElement {
    constructor() {
      super();
      this.template = document.createElement("template")
      this.attachShadow({mode:"open"})
    }
    //innerHTML
    connectedCallback()
    {
      // estructura basica para que funcione un componente
      this.template.innerHTML = htmlEstruct
      let cloneDom = document.importNode(this.template.content , true)
      this.shadowRoot.appendChild(cloneDom)
    } 

    
}

  window.customElements.define("note-template", Note);