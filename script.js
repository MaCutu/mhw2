
function changetoselected(event) {
    const divfotoetick=event.currentTarget;

    //questa parte serve per fare in modo che se venisse messa una spunta ma ce n'è già un'altra allora questa viene tolta dal div in cui è già presente
    const i = divfotoetick.dataset.questionId;    
    const Risposte = document.querySelectorAll('.choice-grid div');
    for(const s of Risposte) {
        if (s.dataset.questionId === i){
            s.classList.remove('selected')
            const x = s.querySelector('.checkbox')
            x.classList.add('hidden')
            const y = s.querySelector('.hidden')
            y.classList.remove('hidden')
            y.classList.add('checkbox')           
        }
    }


    //con questa parte posso mettere le spunte
    const untick=divfotoetick.querySelector('.checkbox')
    const tick=divfotoetick.querySelector('.hidden')
    untick.classList.remove('checkbox')
    untick.classList.add('hidden')
    tick.classList.remove('hidden')
    tick.classList.add('checkbox')    
    


    //Questa parte è per colorare la risposta selezionata e opacizzare quella non selezionata
    const index=divfotoetick.dataset.questionId
    const divrisposteoscurate=document.querySelectorAll('.choice-grid div')
    for(const i of divrisposteoscurate){
        if(i.dataset.questionId===index){
            i.classList.add('unselected')
        }
    }
    divfotoetick.classList.remove('unselected')
    divfotoetick.classList.add('selected')

    personalita[divfotoetick.dataset.questionId]=divfotoetick.dataset.choiceId;
    if(personalita['one']!==undefined && personalita['two']!==undefined && personalita['three']!==undefined){
        risultato();
    }
}

function risultato(){
    const tit=document.createElement('h1')
    const descrizione=document.createElement('p')

    if(personalita['one']==personalita['two']){
        tit.textContent=RESULTS_MAP[personalita['one']].title
        descrizione.textContent=RESULTS_MAP[personalita['one']].contents
    }else if(personalita['two']==personalita['three']){
        tit.textContent=RESULTS_MAP[personalita['two']].title
        descrizione.textContent=RESULTS_MAP[personalita['two']].contents
    }else{
        tit.textContent=RESULTS_MAP[personalita['one']].title
        descrizione.textContent=RESULTS_MAP[personalita['one']].contents
    }
    document.querySelector('#risultato').classList.remove('hidden')

    document.querySelector('#risultato').appendChild(tit)
    document.querySelector('#risultato').appendChild(descrizione)
    const bottone=document.createElement('button')
    bottone.textContent="Ricomincia il test"
    document.querySelector('#risultato').appendChild(bottone)
    tasto(bottone)

    for(const box of freeboxes){
        box.removeEventListener('click', changetoselected)
    }
}

function tasto(button){
    
    button.addEventListener('click', ricomincia)
}

function ricomincia(){
    for(const box of boxes){
        freeboxes.pop(box)
    }

    personalita['one']=undefined
    personalita['two']=undefined
    personalita['three']=undefined

    for(const box of boxes){ 
        box.addEventListener('click', changetoselected)
        freeboxes.push(box)
    }

    const daselectedaneutro=document.querySelectorAll('.selected')
    for(const r of daselectedaneutro){
        r.classList.remove('selected')
        const x=r.querySelector('.checkbox')
        x.classList.add('hidden')
        const y=r.querySelector('.hidden')
        y.classList.remove('hidden')
        y.classList.add('checkbox')
    }
    const danonselectedaneutro=document.querySelectorAll('.unselected')
    for(const u of danonselectedaneutro){
        u.classList.remove('unselected')
    }
    document.querySelector('#risultato').classList.add('hidden')
    document.querySelector('#risultato').innerHTML=''

}

const freeboxes=[];
const personalita={}

const boxes=document.querySelectorAll('.choice-grid div')
for(const box of boxes){
    box.addEventListener('click', changetoselected)
    freeboxes.push(box)
}


