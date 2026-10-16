//
// Data class
//
function Data()
{
	this.player = new Player();
  this.text = new GroundText();
	this.textFound = false;
	this.textArray = [
		'黑暗。',
		'寻觅。',
		'停靠。',
		'仰望。',
		'在七十亿人当中',
		'找到了因果线那端的你',
		'我最亲爱的大狸子。',
		'在这个特别的日子',
		'要给你一份特别的礼物',
		'我不是高富帅',
		'无法立刻现身在你旁边给予你巧克力',
		'也不是文艺青年',
		'造不出最动人的篇章和最华丽的画卷。',
		'亲爱的大狸子',
		'我能给你的只有一个承诺',
		'一个跟你共同创造世界的承诺',
		'每个世界所用的一砖一瓦',
		'就从这个页面开始。',
	]
	this.fullText = "黑暗。寻觅。停靠。仰望。\n在七十亿人当中\n找到了因果线那端的你\n我最亲爱的大狸子。\n在这个特别的日子\n要给你一份特别的礼物\n我不是高富帅\n无法立刻现身在你旁边给予你巧克力\n也不是文艺青年\n造不出最动人的篇章和最华丽的画卷。\n亲爱的大狸子\n我能给你的只有一个承诺\n一个跟你共同创造世界的承诺\n每个世界所用的一砖一瓦\n就从这个页面开始。\n\n2014年2月14日";
	this.state = 'init';
	this.endX = this.endY = 0;
}

Data.prototype.handleClick = function(x, y)
{
	console.log(this.state)
	// walk to there
	this.player.setDest(x, y);
	// generate text
	if ((this.state == 'searching' || this.state == 'init'))
	{
		console.log('generate text');
		if (this.player.isOutOfSense(x, y))
		{
			this.placeText(x, y);
		}
		else
		{
			var dist = getDist(this.player.x, this.player.y, x, y);
			var plusX = this.player.sense / dist * (x - this.player.x);
			var plusY = this.player.sense / dist * (y - this.player.y);
			this.placeText(this.player.x + plusX, this.player.y + plusY);
		}
	}
}

Data.prototype.handleSkipToEnd = function()
{
	this.state = 'end';
	this.endX = this.player.x;
	this.endY = this.player.y;
}

Data.prototype.update = function(event)
{
	this.player.update(event);
	
	// state machine
	if (this.state == 'searching')
	{
		if (!this.player.isOutOfSense(this.text.x, this.text.y))
		{
			this.state = 'found';
		}
	}
	else if (this.state == 'found')
	{
		if (!this.player.isOutOfTouch(this.text.x, this.text.y))
		{
			this.state = 'visited';
		}
		if (this.player.isOutOfSense(this.text.x, this.text.y))
		{
			this.state = 'searching';
		}
	}
	else if (this.state == 'visited')
	{
		if (this.player.isOutOfDispose(this.text.x, this.text.y))
		{
			this.textArray.shift();
			if (this.textArray.length > 0)
			{
				this.state = 'searching';
			}
			else
			{
				this.state = 'end';
				this.endX = this.player.x;
				this.endY = this.player.y;
			}
		}
	}
}

Data.prototype.placeText = function(x, y)
{
	this.text.set(this.textArray[0], x, y, this.player.x, this.player.y);
	this.state = 'searching';
}

Data.prototype.findText = function()
{
	this.textFound = true;
	this.textArray.shift;
}

Data.prototype.toScreenX = function(x)
{
	return x - this.player.x + this.player.getScreenX();
}

Data.prototype.toScreenY = function(y)
{
	return y - this.player.y + this.player.getScreenY();
}

Data.prototype.toX = function(screenX)
{
	return screenX - this.player.getScreenX() + this.player.x;
}

Data.prototype.toY = function(screenY)
{
	return screenY - this.player.getScreenY() + this.player.y;
}

//
// Player class
//
function Player()
{
	this.x = this.y = this.destX = this.destY = 0;
	this.dir = 2;
	this.speed = 1;
	this.sight = 128.0;
	this.sense = this.sight * 1.1; // text generating only happens outside sense
	this.touch = this.sight / 2; // consider text is visited if closer than touch
	this.dispose = this.sight * 2; // only dispose text out of this range
}

Player.prototype.isOutOfSense = function(x, y)
{
	return getDist(this.x, this.y, x, y) > this.sense;
}

Player.prototype.isOutOfTouch = function(x, y)
{
	return getDist(this.x, this.y, x, y) > this.touch;
}

Player.prototype.isOutOfDispose = function(x, y)
{
	return getDist(this.x, this.y, x, y) > this.dispose;
}

Player.prototype.getScreenX = function()
{
	return getCanvasWidth() / 2;
}

Player.prototype.getScreenY = function()
{
	return getCanvasHeight() / 2;
}

Player.prototype.setDest = function(x, y)
{
	this.destX = x;
	this.destY = y;
}

Player.prototype.isMoving = function()
{
	return this.x != this.destX || this.y != this.destY;
}

Player.prototype.update = function(event)
{
	if (this.isMoving())
	{
		// dir
		var xDiff = this.destX - this.x;
		var yDiff = this.destY - this.y;
		if (Math.abs(xDiff) >= Math.abs(yDiff))
		{
			this.dir = xDiff > 0 ? 6 : 4;
		}
		else
		{
			this.dir = yDiff > 0 ? 2 : 8;
		}
		// move
		var dist = getDist(this.x, this.y, this.destX, this.destY);
		if (dist < this.speed)
		{
			this.x = this.destX;
			this.y = this.destY;
		}
		else
		{
			var mx = this.speed / dist * (this.destX - this.x);
			var my = this.speed / dist * (this.destY - this.y);
			this.x += mx;
			this.y += my;
		}
	}
}

// GroundText class

function GroundText()
{
  this.text = null;
  this.x = this.y = 0;
  this.anchor = 1;
}

GroundText.prototype.set = function(text, x, y, playerX, playerY) 
{
	this.text = text;
	this.x = x;
	this.y = y;
	
	if (x > playerX)
	{
		if (y > playerY)
		{
			this.anchor = 7;
		}
		else
		{
			this.anchor = 1;
		}
	}
	else
	{
		if (y > playerY)
		{
			this.anchor = 9;
		}
		else
		{
			this.anchor = 3;
		}
	}
}

// util functions

function getDist(x1, y1, x2, y2)
{
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}



