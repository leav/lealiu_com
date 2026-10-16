//
// global variables
//

var minWidth = 100;
var minHeight = 100;
var maxWidth = 2000;
var maxHeight = 2000;

var loader, stage, data;

//
// canvas width and height
//

function getCanvasWidth()
{
	if (window.innerWidth < minWidth)
		return minWidth;
	if (window.innerWidth > maxWidth)
		return maxWidth
	return window.innerWidth;
}

function getCanvasHeight()
{
	if (window.innerHeight < minHeight)
		return minHeight;
	if (window.innerHeight > maxHeight)
		return maxHeight
	return window.innerHeight;
}

//
// entry point
//

function init() {
	stage = new createjs.Stage("gameCanvas");
	createjs.Touch.enable(stage);
	
	manifest = [
		{src:"valentine/images/player.png", id:"player"},
	];
	loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	
	data = new Data();
	initInput();
}

function initInput()
{
	stage.on("stagemousedown", function(event)
		{
			//console.log("the canvas was clicked at " + data.toX(event.stageX) +","+ data.toY(event.stageY) + " player(" + data.player.x + ',' + data.player.y + ')');
			var x = data.toX(event.stageX);
			var y = data.toY(event.stageY);
			data.handleClick(x, y);
		}
	);
	
	var canvas = document.getElementById("gameCanvas");
	window.addEventListener('keypress', function(event){
		if (event.keyCode == 120) // X
		{
			data.handleSkipToEnd();
		}
	}, false);
}

function handleComplete()
{
	createText();
	createEndText();
	createPlayer();
	createLightMask();
	
	createjs.Ticker.on("tick", update);
	createjs.Ticker.setFPS(60);
}

function createText()
{
	var text = new createjs.Text("", "bold 20px Arial, 微软雅黑, sans-serif", "#000000");
  text.name = 'text';
	stage.addChild(text);
}

function createEndText()
{
	var text = new createjs.Text(data.fullText, "bold 20px Arial, 微软雅黑, sans-serif", "#000000");
  text.name = 'endText';
	var rect = text.getBounds();
	text.regX = rect.width / 2;
	text.regY = rect.height / 2;
	text.alpha = 0;
	text.cache(0, 0, maxWidth, maxHeight);
	stage.addChild(text);
}

function createPlayer()
{
	var walkSpeed = 0.05;
	var spritesheet = new createjs.SpriteSheet({
		"images": [loader.getResult("player")],
		"frames": {'width' : 32, 'height' : 32, regX : 16, regY : 16},
		"animations": {
			"walk2": {
				frames : [1, 0, 1, 2],
				next : "walk2",
				speed : walkSpeed
			},
			"walk4": {
				frames : [4, 3, 4, 5],
				next : "walk4",
				speed : walkSpeed
			},
			"walk6": {
				frames : [7, 6, 7, 8],
				next : "walk6",
				speed : walkSpeed
			},
			"walk8": {
				frames : [10, 9, 10, 11],
				next : "walk8",
				speed : walkSpeed
			},
			"stand2" : { frames : [1]},
			"stand4" : { frames : [4]},
			"stand6" : { frames : [7]},
			"stand8" : { frames : [10]},
		}
	});
	var player = new createjs.Sprite(spritesheet, "stand2");
	player.name = 'player';
	
	stage.addChild(player);
}

function createLightMask()
{
	var lightMask = new createjs.Shape();
	var maskRadius = maxWidth;

	lightMask.name = 'lightMask';
	lightMask.graphics.beginRadialGradientFill(
		["rgba(0,0,0,0.0)", "rgba(0,0,0,1.0)", "rgba(0,0,0,1.0)"],
		[0.0, data.player.sight / maskRadius, 1],
		0, 0, 0,
		0, 0, maskRadius
	);
	lightMask.graphics.drawCircle(0, 0, maskRadius);
	stage.addChild(lightMask);
	lightMask.cache(-maskRadius / 2, -maskRadius / 2, maskRadius, maskRadius);
}

//
// update on every frame
//

function update(event) {
	// update data
	data.update();
	
	// resize the canvas
	stage.canvas.width  = getCanvasWidth();
	stage.canvas.height = getCanvasHeight();

	// update display objects
	var text = stage.getChildByName('text');
	var player = stage.getChildByName('player');
	var lightMask = stage.getChildByName('lightMask');
	var endText = stage.getChildByName('endText');

  // text
	if (data.text.text != null)
	{
		var updateCache = false;
		if (text.text != data.text.text)
		{
			text.text = data.text.text;
			updateCache = true;
		}
		text.x = data.toScreenX(data.text.x);
		text.y = data.toScreenY(data.text.y);
		var rect = text.getBounds();
		switch (data.text.anchor)
		{
			case 1:
				text.regX = 0;
				text.regY = rect.height;
				break;
			case 3:
				text.regX = rect.width;
				text.regY = rect.height;
				break;
			case 7:
				text.regX = 0;
				text.regY = 0;
				break;
			case 9:
				text.regX = rect.width;
				text.regY = 0;
				break;
		}
	}
  
	// player
	var updateAnimation = false;
	player.x = lightMask.x = data.player.getScreenX();
	player.y = lightMask.y = data.player.getScreenY();
	if (data.player.dir != player.dir)
	{
		updateAnimation = true;
		player.dir = data.player.dir;
	}
	if (player.isMoving != data.player.isMoving())
	{
		updateAnimation = true;
		player.isMoving = data.player.isMoving();
	}
	if (updateAnimation)
	{
		var animationName = player.isMoving ? 'walk' : 'stand';
		animationName += player.dir;
		player.gotoAndPlay(animationName);
	}
	
	// end text
	if (data.state == 'end')
	{
		text.visible = false;
		endText.x = data.toScreenX(data.endX);
		endText.y = data.toScreenY(data.endY);
		if (lightMask.alpha > 0)
		{
			lightMask.alpha -= 1.0 / 180;
		}
		else if (endText.alpha < 1.0)
		{
			endText.alpha += 1.0 / 180;
		}
	}
	
	// render the stage
	stage.update(event);
}

