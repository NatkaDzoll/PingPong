'use strick'
//создание кнопки Старт!
var button = document.createElement('input');
button.setAttribute('type','button');
button.setAttribute('value','старт!');

document.body.appendChild (button);
button.addEventListener('click', start);

// Создание поля
var field = document.createElement('div');
field.style.position = 'relative';
field.style.border = 'solid';
field.style.backgroundColor = '#FFF3A8';
field.style.borderColor = 'black';
field.style.borderWidth = '1px';
field.style.width = '650px';
field.style.height = '400px';
field.style.left = '10px';
field.style.top = '40px';
document.body.appendChild(field);

// создание мячика
var ball = document.createElement('div');
ball.style.position = 'absolute';
ball.style.backgroundColor = '#EB1339FF';
ball.style.width = '30px';
ball.style.height = '30px';
ball.style.borderRadius = '15px';

var div = document.body.lastChild;
div.appendChild(ball);
//позиционируем мяч посередине поля
ball.style.left = (parseInt(field.offsetWidth)/2 - parseInt(ball.offsetWidth)/2) +'px';
ball.style.top = (field.offsetHeight/2 - ball.offsetHeight/2) + 'px';
ball.style.zIndex = '1';
ball.speedBallX = 1;
ball.speedBallY = 1;


//создание поля счета
var score =  document.createElement('div');
document.body.appendChild (score);
score.style.position = 'absolute';
score.style.fontSize = '45px';
score.style.left =  '315px';
score.style.top = '20px';
var score1 = 0;
var score2 = 0;
score.innerHTML = score1 + ':' + score2;


//кнопка старт - движение шарика
function start() {
	button.removeEventListener('click', start);

	time = 10;
	ball.style.left = (parseInt(field.offsetWidth)/2 - parseInt(ball.offsetWidth)/2) +'px';
	ball.style.top = (field.offsetHeight/2 - ball.offsetHeight/2) + 'px';
	
	clickTimer = setInterval(ballMoove, time)
	ball.speedBallX = randomDiap((-1),1);
	ball.speedBallY = randomDiap((-1),1);

}
	//увеличиваем скорость через время  -------------------------- НЕ РАБОТАЕТ!!!!
	setInterval(speedNext, 300)
		function speedNext() {
		 	time += 15; 
		}  		
//рандомное направление шарика
function randomDiap(n,m) {
	var numb = 0;
	do {
		numb = Math.floor(Math.random()*(m-n+1))+n;
	}
	while (numb == 0); 
    return numb;
}

//создание ракеток

function Rocket(color) {
	
	this.rocket = init();

	function init() {
		var rocket = document.createElement('div');
		rocket.style.position = 'absolute';
		rocket.style.width = '10px';
		rocket.style.height = '100px';
		rocket.style.backgroundColor = color;
		rocket.zIndex = '2';
		rocket.style.borderRadius = '3px';
		div.appendChild(rocket);
		return rocket;
	}
}
var rocket1 = new Rocket('#268C5F');
rocket1.rocket.style.left = '0px';
rocket1.rocket.style.top = parseInt(field.offsetHeight)/2 - parseInt(rocket1.rocket.style.height)/2 + 'px';

var rocket2 = new Rocket('#235B8E');
rocket2.rocket.style.left = parseInt(field.offsetWidth) - parseInt(rocket2.rocket.style.width) + 'px';
rocket2.rocket.style.top = parseInt(field.offsetHeight)/2 - parseInt(rocket2.rocket.style.height)/2 + 'px';



// УПРАВЛЕНИЕ РАКЕТКАМИ

window.addEventListener("keydown", byKey)

function byKey(event) { 
   // Перемещение ракетки 1
    if (event.keyCode == '16'){	 //двигается вверх по кнопке Shift
    	rocket1.rocket.style.top = parseInt(rocket1.rocket.offsetTop) - 10 + 'px';
      	if (parseInt(rocket1.rocket.style.top) <= 0) { //если достиг конца поля, то отменяет обработчик
      		rocket1.rocket.style.top = 0;
      	}
    }
    else if (event.keyCode == '17'){ 	//двигается вниз по кнопке Ctrl
    	rocket1.rocket.style.top = parseInt(rocket1.rocket.offsetTop) + 10 + 'px';
      	if ((parseInt(rocket1.rocket.offsetTop)+parseInt(rocket1.rocket.offsetHeight)) >=  parseInt(field.offsetHeight)) { //если достиг конца поля, то отменяет обработчик
      		rocket1.rocket.style.top = field.offsetHeight - rocket1.rocket.offsetHeight+ 'px';
      	}
    }
	// Перемещение ракетки 2
    if (event.keyCode == '38'){ //двигается вверх по стрелке
    	rocket2.rocket.style.top = parseInt(rocket2.rocket.offsetTop) - 10 + 'px';
      	if (parseInt(rocket2.rocket.style.top) <= 0) { //если достиг конца поля, то отменяет обработчик
      		rocket2.rocket.style.top = 0;
      	}
    }
	else if (event.keyCode == '40'){ //двигается вниз по стрелке
    	rocket2.rocket.style.top = parseInt(rocket2.rocket.offsetTop) + 10 + 'px';
      	if ((parseInt(rocket2.rocket.offsetTop)+parseInt(rocket2.rocket.offsetHeight)) >=  parseInt(field.offsetHeight)) { //если достиг конца поля, то отменяет обработчик
      		rocket2.rocket.style.top = field.offsetHeight - rocket2.rocket.offsetHeight+ 'px';
      	}
    }
}

function updatScore(elem) {
 		 	elem += 1;
			score.innerHTML = score1 + ':' + score2;
 		 } 

//движение мячика по полю	
function ballMoove() {
	var ballX = parseInt(ball.offsetLeft);
	var ballY = parseInt(ball.offsetTop);
	
	ball.style.left = ballX - ball.speedBallX + 'px';
  		console.log(ball.offsetLeft);
 //Вылетел ли мяч левее стены
  	if ( parseInt(ball.offsetLeft) <= 0) {
 		score2 += 1;
		score.innerHTML = score1 + ':' + score2;
		clearInterval(clickTimer);
		button.addEventListener('click', start);
 	}

//Если мяч коснулся rocket1 (левой)
 	var centerBall = parseInt(ball.offsetHeight)/2; //координаты середины мяча
 	if (ball.offsetLeft <= rocket1.rocket.offsetWidth && (ball.offsetTop + centerBall) > rocket1.rocket.offsetTop && (rocket1.rocket.offsetTop + rocket1.rocket.offsetHeight > parseInt(ball.offsetTop) + centerBall)){
 		ball.speedBallX = - ball.speedBallX;
 	}

//Вылетел ли мяч правее стены
 	if (parseInt(ball.offsetLeft+ball.offsetWidth) > parseInt(field.offsetWidth)) {
		score1 += 1;
		score.innerHTML = score1 + ':' + score2;
		clearInterval(clickTimer);
		button.addEventListener('click', start);
 	}
 	if (parseInt(ball.offsetLeft+ball.offsetWidth) > parseInt(field.offsetWidth)-parseInt(rocket2.rocket.offsetWidth)&&(ball.offsetTop + centerBall) > rocket2.rocket.offsetTop && (rocket2.rocket.offsetTop + rocket2.rocket.offsetHeight > parseInt(ball.offsetTop) + centerBall)){
 		ball.speedBallX = - ball.speedBallX;
 	}	

 	ball.style.top = ballY - ball.speedBallY + 'px';
 	if (parseInt(ball.offsetTop) <= 0) {
 		ball.speedBallY = - ball.speedBallY;
 	}
 	if (parseInt(ball.offsetTop+ball.offsetHeight) >  parseInt(field.offsetHeight)) {
 		ball.speedBallY = - ball.speedBallY;
 		ball.style.top = parseInt(field.offsetHeight) - parseInt(ball.offsetHeight) + 'px';
 	}	
 	return false;
}

// полечениее координат элемента относительно верхнего левого угла страницы
function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}
 