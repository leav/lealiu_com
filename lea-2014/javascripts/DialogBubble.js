//
// DialogBubble extends createjs.Container
//
function DialogBubble() {
	this.initialize();
}
DialogBubble.prototype = new createjs.Container();
DialogBubble.prototype.Container_initialize = DialogBubble.prototype.initialize;
DialogBubble.prototype.initialize = function() {
	this.Container_initialize();
	
	this.addEventListener('click', function(){
		$state.startBrowsing();
	});
	
	var bubble =  new createjs.Shape();
	this.addChild(bubble);
	
	var textOutline = new createjs.Text('', '30px comic sans MS', 'rgba(104, 89, 65, 0.7)');
	this.addChild(textOutline);
	textOutline.outline = 5;
	var textDisplay = new createjs.Text('', '30px comic sans MS', 'rgba(255, 255, 255, 1.0)');
	this.addChild(textDisplay);
	textDisplay.shadow = new createjs.Shadow('rgba(104, 89, 65, 1.0)', 0, 0, 10);
	textDisplay.lineWidth = 800;
	
	
	var self = this;
	this.doLayout = function() {
		if (!self.text) {
			self.visible = false;
		}
		else {
			self.visible = true;
			textDisplay.text = self.text;
			textOutline.text = textDisplay.text;

			var padding = 8;
			var bounds = textDisplay.getBounds();
			bounds.width += padding * 2;
			bounds.height += padding * 2;
			var radius = 16;
			var anchorLeftX = 10;
			var anchorTickX = 8;
			var anchorHeight = 15;
			var anchorRightX = 25;
			bubble.graphics.clear().setStrokeStyle(6).beginStroke('rgba(104, 89, 65, 0.7)').
				beginFill('rgba(235, 254, 114, 0.7)').
				//beginFill('rgba(117, 127, 57, 0.8)').
				moveTo(0, radius).
				lineTo(0, radius + bounds.height).
				arc(radius, radius + bounds.height, radius, Math.PI, Math.PI / 2, true).
				lineTo(radius + anchorLeftX, radius * 2 + bounds.height).
				lineTo(radius + anchorTickX, radius * 2 + bounds.height + anchorHeight).
				lineTo(radius + anchorRightX, radius * 2 + bounds.height).
				lineTo(radius + bounds.width, radius * 2 + bounds.height).
				arc(radius + bounds.width, radius + bounds.height, radius, Math.PI / 2, 0, true).
				lineTo(radius * 2 + bounds.width, radius).
				arc(radius + bounds.width, radius, radius, 0, Math.PI * 1.5, true).
				lineTo(radius, 0).
				arc(radius, radius, radius, Math.PI * 1.5, Math.PI, true).
				closePath().
				endFill().
				endStroke();
				
			textDisplay.x = radius + padding; // don't know why have to move it
			textOutline.x = textDisplay.x;
			textDisplay.y = (radius + padding) * 0.75; // don't know why have to move it
			textOutline.y = textDisplay.y;
				
			this.regY = radius * 2 + bounds.height;
		}
	}

	this.doLayout();
	
	var idleTimeoutMin = 2;
	var idleTimeoutMax = idleTimeout = 4;
	var idleCount = 0;
	var idleTextDuration = 3;
	var idleTexts = [
		'Look for the surprises in the chamber meow!',
		'Feel free to hang around',
		'Meow~',
		'Meowumi~',
		'Leav-the-bear is still in his bed!',
		'Lolita dresses! Buy buy buy!',
		'Tree house meow~',
		'Monster Hunter meow~',
		'Minecraft meow~',
		'Get up!!!',
	];
	var idleTextsShuffled = [];
	
	createjs.Ticker.addEventListener("tick", function(event){
		if (self.text && self.duration) {
			self.duration -= event.delta / 1000;
			if (self.duration <= 0) {
				self.duration = 0;
				self.text = null;
				self.doLayout();
			}
		}
		if (self.startText && self.start) {
			self.start -= event.delta / 1000;
			if (self.start <= 0) {
				self.start = 0;
				self.setText(self.startText, 0, self.startDuration);
			}
		}
		if (!self.text && !self.startText && idleTexts.length > 0) {
			idleCount += event.delta / 1000;
			if (idleCount >= idleTimeout) {
				idleCount = 0;
				idleTimeout = idleTimeoutMin + Math.random() * (idleTimeoutMax - idleTimeoutMin);
				if (idleTextsShuffled.length == 0) {
						idleTextsShuffled = shuffle(idleTexts.slice());
				}
				self.setText(idleTextsShuffled.pop(), 0, idleTextDuration);
			}
		}
	});
}

DialogBubble.prototype.setText = function(text, start, duration) {
	// $log.debug('setText text = ' + text + ' start = ' + start + ' duration = ' + duration);
	if (text && start) {
		this.start = start;
		this.startText = text;
		this.startDuration = duration;
	}
	else {
		this.start = this.startText = this.startDuration = null;
		this.text = text;
		this.duration = duration;
	}
	this.doLayout();
}