const torres = document.querySelectorAll('.tower');
const fichas = document.querySelectorAll('.fichas');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('modal-close');
const msgFinal = document.getElementById('msg');
let fichaArrastrada;
let movimientos = 0; 

fichas.forEach(ficha=>{
    ficha.addEventListener('mouseover',(e)=>{
        if(e.target.parentElement.lastElementChild===ficha) {
            ficha.setAttribute('draggable','true');
        }
    });
    ficha.addEventListener('dragstart',(e)=>{
        if(e.target.parentElement.lastElementChild===ficha) {
            fichaArrastrada = e.target
        }     
    });
})
torres.forEach(torre =>{
    torre.addEventListener('dragover',(e)=>e.preventDefault())
    torre.addEventListener('drop',(e)=>{
        if (fichaArrastrada.parentElement===torre) return;
        if (torre.firstElementChild!=null && parseInt(fichaArrastrada.id)>parseInt(torre.lastElementChild.id)) return;
        fichaArrastrada.parentElement.removeChild(fichaArrastrada);
        e.target.appendChild(fichaArrastrada);
        fichaArrastrada.removeAttribute('draggable');
        fichaArrastrada.setAttribute('draggable','false');
        movimientos++;
        if (torre.id!=='tower1' && torre.childElementCount===fichas.length) {
            finDelJuego();
        }
    })
});

function finDelJuego() {
    msgFinal.innerHTML = `Has realizado ${movimientos} movimientos`;
    modal.style.display = 'grid';
    let torre1= document.getElementById('tower1');
    fichas.forEach(ficha=>{
        torre1.appendChild(ficha);
        ficha.removeAttribute('draggable');
    });
}

closeButton.addEventListener('click', ()=>{
    modal.style.display = 'none';
    movimientos=0;

});
