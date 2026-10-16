//
// LoadingBar extends createjs.Container
//
function LoadingBar(total) {
	this.initialize(total);
}

LoadingBar.prototype = new createjs.Container();
LoadingBar.prototype.Container_initialize = LoadingBar.prototype.initialize;
LoadingBar.prototype.initialize = function(total) {
	this.Container_initialize();
	this.total = (total ? total : 0);
	this.loaded = 0;
	
	var background = new createjs.Shape();
	this.addChild(background);
	
	var bar = new createjs.Shape();
	this.addChild(bar);
	bar.stroke = 4;
	bar.width = 512;
	bar.height = 64;
	bar.regX = bar.width / 2;
	bar.regY = bar.height * 1.1;
	bar.numSquares = 10;
	bar.squarePadding = 8;
	bar.squareDist = 6;
	bar.squareWidth = (bar.width - bar.squarePadding * 2 - bar.squareDist * (bar.numSquares - 1)) / bar.numSquares;
	bar.squareHeight = bar.height - bar.squarePadding * 2;
	
	bar.backgroundColor = 'rgba(0, 0, 0, 1.0)';
	bar.strokeColor = 'rgba(104, 89, 65, 1.0)';
	bar.fillColor = 'rgba(235, 254, 114, 1.0)';
	
	var logo = AsyncImage.get('Logo');
	this.addChild(logo);
	logo.regY = logo.asset.height * 1.2 + bar.regY;
	logo.regX = bar.regX;
	
	var text = new createjs.Text('Loading', '1.8em Calibri', bar.strokeColor);
	this.addChild(text);
	text.regX = bar.regX;
	text.regY = -text.getMeasuredHeight() * 0.1;
	var textBlinkTimeout = 1;
	var textBlinkCount = 0;
	var textBlinkStage = 0;
	
	var self = this;
	this.doLayout = function() {
		if (!self.visible || !self.alpha > 0) {
			return;
		}
		
		// background
		background.graphics.clear().
			beginFill(bar.backgroundColor).
			drawRect(0, 0, getWindowWidth(), getWindowHeight());
			
		// logo
		
		bar.graphics.clear().
			// bar
			setStrokeStyle(bar.stroke).beginStroke(bar.strokeColor).
			beginFill(bar.fillColor).
			drawRect(0, 0, bar.width, bar.height).
			endStroke().
			endFill().
			// squares
			beginFill(bar.strokeColor)
		var numSquaresVisible = Math.round(self.getRatio() * bar.numSquares);
		for (var i = 0; i < numSquaresVisible; i++) {
			bar.graphics.drawRect(bar.squarePadding + bar.squareWidth * i + bar.squareDist * i, bar.squarePadding, bar.squareWidth, bar.squareHeight);
		}
			
			
		logo.x = text.x = bar.x = getWindowWidth() / 2;
		logo.y = text.y = bar.y = getWindowHeight() / 2;
		logo.scaleX = logo.scaleY = text.scaleX = text.scaleY = bar.scaleX = bar.scaleY =
			getWindowHeight() / bar.height * 0.05;
	}
	
	this.doLayout();
	window.addEventListener("resize", this.doLayout);
	
	var updateText = function(event){
		if (self.getRatio() >= 1.0){
			createjs.Ticker.removeEventListener("tick", updateText);
			text.text = 'Loading'
		}
		else {
			textBlinkCount += event.delta / 1000;
			if (textBlinkCount >= textBlinkTimeout) {
				textBlinkCount = 0;
				textBlinkStage = (textBlinkStage + 1) % 4;
				text.text = 'Loading';
				for (var i = 0; i < textBlinkStage; i++) {
					text.text += '.';
				}
			}
		}
	}
	createjs.Ticker.addEventListener("tick", updateText);
	
}

LoadingBar.prototype.getRatio = function() {
	if (this.total <= 0) {
		return 1.0;
	}
	else {
		return this.loaded / this.total > 1.0 ? 1.0 : this.loaded / this.total;
	}
}

LoadingBar.prototype.setLoaded = function(n) {
	var oldLoaded = this.loaded;
	this.loaded = n;
	if (oldLoaded != n) {
		this.doLayout();
	}
}