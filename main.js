song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreLeftWrist=0
scorerightWrist=0

function preload() {
    song=loadSound("music.mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialised");
}

function gotPoses(results) {
    if (results.length >0) {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x ;
        leftwristY=results[0].pose.leftWrist.y ;
        console.log("leftwristX = "+leftwristX+" leftwristY = "+leftwristY);

        scorerightWrist=results[0].pose.keypoints[10].score;
        rightwristX=results[0].pose.rightWrist.x ;
        rightwristY=results[0].pose.rightWrist.y ;
        console.log("rightwristX = "+rightwristX+" rightwristY = "+rightwristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red")

    if (scoreLeftWrist>0.2){
    circle(leftwristX, leftwristY, 20);
    InNumberleftwristY=Number(leftwristY);
    remove_decimal=floor(InNumberleftwristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
   
    fill("red");
    stroke("red");
    circle(rightwristX, rightwristY, 20)

if (scorerightWrist>0.2){

if(rightWristY >0 && rightWristY <= 100)
{
	document.getElementById("speed").innerHTML = "Speed = 0.5x";		
	song.rate(0.5);
}
else if(rightWristY >100 && rightWristY <= 200)
{
	document.getElementById("speed").innerHTML = "Speed = 1x";		
	song.rate(1);
}
else if(rightWristY >200 && rightWristY <= 300)
{
	document.getElementById("speed").innerHTML = "Speed = 1.5x";		
	song.rate(1.5);
}
else if(rightWristY >300 && rightWristY <= 400)
{
	document.getElementById("speed").innerHTML = "Speed = 2x";		
	song.rate(2);
}
else if(rightWristY >400 && rightWristY <= 500)
{
	document.getElementById("speed").innerHTML = "Speed = 2.5x";		
	song.rate(2.5);
}
}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
