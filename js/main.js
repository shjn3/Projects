const announcement = document.getElementById('announcement')
const btn__reset = document.getElementById('btn__reset')
const announcement__text = document.getElementById('announcement__text')
const btn__start = document.getElementById('btn__start')
const container = document.querySelector('.container')
let playTurn='X'

const list__text = document.querySelectorAll('.text')
const list__col__4 = document.querySelectorAll('.col-4')

const wingingGrid =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


let array_finish =[-1,-1,-1,-1,-1,-1,-1,-1,-1]
let finished = 0

btn__reset.addEventListener('click',()=>{
    announcement.style.display="none";
    for(let i =0; i< 9;i++){
        list__text[i].innerHTML=""
        list__col__4[i].style.background=""
        list__col__4[i].style.pointerEvents=""

        array_finish[i]=-1
    }
    finished= 0
    container.classList.remove('active')
    btn__start.style.pointerEvents="all"
    btn__start.style.opacity="1"
})

btn__start.addEventListener("click",()=>{
    container.classList.add('active')
    btn__start.style.pointerEvents="none";
    btn__start.style.opacity=".2"
})


/*logic tictac */




for(let i =0; i <list__text.length;i++){
    list__col__4[i].addEventListener("click",()=>{

        list__col__4[i].style.pointerEvents="none"
        list__text[i].innerHTML="X";
        finish(i)
    })
}


let finish = (_index)=>{
    array_finish[_index]= 1
    playTurn="X"
    if(!checkWinging())
    {
        finished++
        if(finished<9){
        let robot
        robot = Math.floor(Math.random()*9) 
        while(array_finish[robot] !== -1){
            robot = Math.floor(Math.random()*9)
        }
        array_finish[robot] = 0
        list__text[robot].innerHTML="O"
        list__col__4[robot].style.pointerEvents="none"
        playTurn="O"
        if(checkWinging()) return;
        finished++
        }
        else if(finished === 9){
            playTurn="HOA"
            displayMessage()

        }
    
    }
}



const checkWinging = ()=>{
    for( let i =0; i< 8 ;i++){
        let elements = wingingGrid[i]
        if(array_finish[elements[0]]===array_finish[elements[1]]&&
            array_finish[elements[0]]===array_finish[elements[2]] &&array_finish[elements[0]]!==-1)
            {
                gameOver(i)
                return true;
            }
    }
    return false

}



const gameOver = (val)=>{
    let array_wining = wingingGrid[val]
    for(const element of array_wining){
        list__col__4[element].style.background="red"
    }
    displayMessage();
}

const displayMessage = ()=>{
    playTurn==='X'?announcement__text.textContent="Play number 1 to Win!!":
        playTurn==='O'?announcement__text.textContent="Play number 2 to Win!!":
        announcement__text.textContent="Play to DRAW!!"

    announcement.style.display="block"
}




