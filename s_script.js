document.addEventListener("DOMContentLoaded",()=>{
    let grid=document.querySelector('.grid')
    let squares=document.querySelectorAll(".grid div")
    const scoreDisplay=document.querySelector("span")
    const startBtn=document.querySelector(".start");
    const closepop=document.querySelector('.fa-times');
    const popmessage=document.getElementById('popmessage');

    message=setTimeout(() => {
        popmessage.remove();
    }, 5000);


    const width=20
    let currentIndex=0  //first div in the grid
    let appleIndex=0    //first div in grid
    let currentSnake=[2,1,0]    //the div grid being 2(for the HEAD),and 0 being the end
                                //(TAIL,with all 1's being the body from now on)
    let direction=1
    let score=0
    let speed=0.5
    let intervelTime=0
    let intervel=0



    //  to start,and restart the game
    function startGame(){
        currentSnake.forEach(index=> squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple")
        clearInterval(intervel)
        score=0
        randomApple()    
        direction=1
        scoreDisplay.innerText=score
        intervelTime=150
        currentSnake=[2,1,0]
        currentIndex=0
        currentSnake.forEach(index => squares[index].classList.add("snake"))
        intervel=setInterval(moveOutcomes,intervelTime)
    }

    //  function that deals with ALL the ove outComes of the snake  //
    function moveOutcomes(){

        //deals with snake hitting boder and snake hitting itself//
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) ||    //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) ||    //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) ||    //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||    //if snake hits top
            squares[currentSnake[0] + direction].classList.contains("snake")    //if snake hits itself
        ){
            return clearInterval(intervel)   //this will clear the intervel if any of the above happe
        }

        const tail=currentSnake.pop()   //remove last it of the array and show it
        squares[tail].classList.remove('snake') //removes clases of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction)   //gives direction to the head of the array

        //  deals with snake getting apple  //
        if(squares[currentSnake[0]].classList.contains("apple")){
            squares[currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent=score;
            clearInterval(intervel);
            intervelTime=intervelTime - speed;
            intervel = setInterval(moveOutcomes,intervelTime);
        }
        else if(squares[currentSnake[0]].classList.contains("booster")){
            squares[currentSnake[0]].classList.remove("booster");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            randomApple();
            score+=5;
            scoreDisplay.textContent=score;
            clearInterval(intervel);
            intervelTime=intervelTime - 5;
            intervel = setInterval(moveOutcomes,intervelTime);

        }
        squares[currentSnake[0]].classList.add("snake")
    }


    let booster=0
    //generate new apple once apple is eatern
    function randomApple(){
        do{
            appleIndex=Math.floor(Math.random() * squares.length)
            booster++
        }
        while(squares[appleIndex].classList.contains("snake"));
        if(booster==5){
            squares[appleIndex].classList.add("booster");
            booster=0;
        }
        else{
            squares[appleIndex].classList.add("apple");
        }
    }


    //  assign function keyCodes  //
    function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode ===39){
            direction=1 //if we press the right arrow on our keybord,the snake right one
        }
        else if(e.keyCode === 38){
            direction=-width    //if we press the up arrow,the snake will go back then divs,appearing to go up
        }
        else if(e.keyCode === 37){
            direction= -1   //if we press left,snake will go left on divs
        }
        else if(e.keyCode === 40){
            direction=+width    //if we press down,the snake had will insantly appear
        }
    }

    document.addEventListener('click',function(e){
        squares[currentIndex].classList.remove('snake')

        if(e.target.classList.contains('fa-angle-right')){
            direction=1 //if we press the right arrow on our keybord,the snake right one
        }
        else if(e.target.classList.contains('fa-angle-up')){
            direction=-width    //if we press the up arrow,the snake will go back then divs,appearing to go up
        }
        else if(e.target.classList.contains('fa-angle-left')){
            direction= -1   //if we press left,snake will go left on divs
        }
        else if(e.target.classList.contains('fa-angle-down')){
            direction=+width    //if we press down,the snake had will insantly appear
        }
    })

    document.addEventListener('touchstart',function(e){
        squares[currentIndex].classList.remove('snake')

        if(e.target.classList.contains('fa-angle-right')){
            direction=1 //if we press the right arrow on our keybord,the snake right one
        }
        else if(e.target.classList.contains('fa-angle-up')){
            direction=-width    //if we press the up arrow,the snake will go back then divs,appearing to go up
        }
        else if(e.target.classList.contains('fa-angle-left')){
            direction= -1   //if we press left,snake will go left on divs
        }
        else if(e.target.classList.contains('fa-angle-down')){
            direction=+width    //if we press down,the snake had will insantly appear
        }
    },false);

    closepop.addEventListener('click',function(){
        popmessage.remove();
    });

    document.addEventListener("keyup",control)
    startBtn.addEventListener("click",startGame)


})