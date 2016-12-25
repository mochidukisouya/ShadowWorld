

//var player = document.getElementById("myCanvas");
//var ctx = player.getContext("2d");
var playerStatus={
	Pos_x:50,
	Pos_y:273,
	speed_y:0,
	jumping:false,
	color:"#000000"
}
var enemyStatus = {
	Pos_x:850,
	Pos_y:150,
	speed_x:-10,
	speed_y:10

}
var world=true;
var enemy;
enemy = document.createElement("img");
enemy.src = "img/enemy.png";

function createEmeny(imgSrc) {
	var DOM = document.createElement("img");
	DOM.src = imgSrc;
	return DOM;
}



//obstacles.push(createEmeny("B_obstacle-.jpg"));



setInterval(drawAll, 32);
function drawAll() {
	var ctx = document.getElementById('myCanvas').getContext('2d');
	//影界
	ctx.clearRect(0, 0, 800, 600);
	ctx.fillStyle="#000000";
	ctx.fillRect(0,300,800,300);
	//分界線
	ctx.fillStyle="#888888";
	ctx.fillRect(0,298,800,4);
	//玩家
    ctx.beginPath();
	ctx.arc(playerStatus.Pos_x,playerStatus.Pos_y,25,0,2*Math.PI);
	ctx.fillStyle=playerStatus.color;
    ctx.closePath();
    ctx.fill();
    playerStatus.Pos_y += playerStatus.speed_y;
    if(world==true){
		if (playerStatus.Pos_y < 50) {
			playerStatus.speed_y= 10;
		}
		else if (playerStatus.Pos_y >263) {
			playerStatus.speed_y= 0;
			playerStatus.jumping=false;
		}
	}
	if(world==false){
		if (playerStatus.Pos_y < 337) {
			playerStatus.speed_y = 0;
			playerStatus.jumping=false;
		}
		else if (playerStatus.Pos_y >550) {
			playerStatus.speed_y= -10;
		}		
	}
	
	//敵人
	//ctx.drawImage(enemy,enemyStatus.Pos_x,enemyStatus.Pos_y,50,50);
	//enemyStatus.speed_y=Math.random()*10-5;
	//enemyStatus.Pos_y += enemyStatus.speed_y;
	//enemyStatus.Pos_x += enemyStatus.speed_x;

	//障礙物
	if(Wzone_obscheak==true){
		//console.log(obstacles[0]);
		//for(var index in obstacles){
		ctx.drawImage(Wzone_obstacles[0],Wzone_obstacleStatus.Pos_x,Wzone_obstacleStatus.Pos_y,150,85);
		Wzone_obstacleStatus.Pos_x += Wzone_obstacleStatus.speed_x;
		
	}
	if(Bzone_obscheak==true){
		ctx.drawImage(Bzone_obstacles[0],Bzone_obstacleStatus.Pos_x,Bzone_obstacleStatus.Pos_y,150,85);
		Bzone_obstacleStatus.Pos_x += Bzone_obstacleStatus.speed_x;
	}
	if(Wzone_obstacleStatus.Pos_x<=-200){
		Wzone_obstacles.shift();
		Wzone_obstacleStatus.Pos_x=900;
	}
	if(Bzone_obstacleStatus.Pos_x<=-200){
		Bzone_obstacles.shift();
		Bzone_obstacleStatus.Pos_x=900;
	}
	
}
//障礙物生成檢查
var Wzone_obscheak =false;
var Bzone_obscheak =false;
//現界障礙物陣列
var Wzone_obstacles = [];
//影界障礙物陣列
var Bzone_obstacles = [];
var Wzone_obstacleStatus={
	Pos_x:900,
	Pos_y:213,
	speed_x:-10
}
var Bzone_obstacleStatus={
	Pos_x:900,
	Pos_y:302,
	speed_x:-15
}

function  delay(){
	var W_zone_delay = Math.floor(Math.random() * 2000+1000);
	var B_zone_delay = Math.floor(Math.random() * 2000+1000);
	console.log(W_zone_delay);
	console.log(B_zone_delay);
	setInterval(WzoneObstacles, W_zone_delay);
	setInterval(BzoneObstacles, B_zone_delay);
}
setInterval(delay, 1000);
//現界(Wzone)障礙物生成
function WzoneObstacles() {
	//console.log(Wzone_obstacleStatus.Pos_x);
	
	Wzone_obscheak = true;
	var r = Math.floor(Math.random() * 2);
	var filename;
	switch(r) {
		case 0:
			filename= "img/B_obstacle-1.png";
			break;
		case 1:
			filename= "img/B_obstacle-2.png";
			break;
	}
	Wzone_obstacles.push(createWzoneObstacle(filename));
	
}
function createWzoneObstacle(imgSrc) {
	var DOM = document.createElement("img");
	DOM.src = imgSrc;
	return DOM;
}
//影界(Bzone)障礙物生成
function BzoneObstacles() {
	Bzone_obscheak = true;
	var r = Math.floor(Math.random() * 2);
	var filename;
	switch(r){
		case 0:
			filename= "img/W_obstacle-1.png";
			break;
		case 1:
			filename= "img/W_obstacle-2.png";
			break;
	}		
	Bzone_obstacles.push(createBzoneObstacle(filename));
}
function createBzoneObstacle(imgSrc) {
	var DOM = document.createElement("img");
	DOM.src = imgSrc;
	return DOM;
}


//按鍵事件
var pressed = false;
document.onkeydown=function(event){
	if (pressed) {
		return;
	}
	pressed = true;
	if(event.key=="ArrowUp" && playerStatus.jumping==false){
		playerStatus.jumping=true;
		if(world==true){
			playerStatus.speed_y=-10;
		}else{
			playerStatus.speed_y=10;

		}

	}
	if(event.key=="ArrowDown" && playerStatus.jumping==false ){
		if(world==true){
			playerStatus.Pos_y=327;
			playerStatus.color="#FFFFFF";
			world=false;
		}else{
			playerStatus.Pos_y=273;
			playerStatus.color="#000000";
			world=true;
		}


	}
}
document.onkeyup = function() {
	pressed = false;
}
	
	
	