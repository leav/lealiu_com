//
// Menu extends createjs.Container
//
function Menu() {
	this.initialize();
}
Menu.prototype = new createjs.Container();
Menu.prototype.Container_initialize = Menu.prototype.initialize;
Menu.prototype.initialize = function() {
	this.Container_initialize();
	
	// top
	
	var top = new createjs.Container();
	this.addChild(top);
	
	var maskTop = new createjs.Shape();
	top.addChild(maskTop);
	maskTop.graphics.beginFill('rgba(0, 0, 0, 0.7)').
		drawRect(0, 0, 64, 240).
		beginFill('rgba(160, 160, 147, 0.7)').
		drawRect(0, 240, 64, 2);
	maskTop.cache(0, 0, 64, 242);
	maskTop.regX = 64;
	maskTop.regY = 120;
	maskTop.width = 64;
	maskTop.height = 122;
	
	// buttons
	
	var button;
	var buttonPadding = 4;
	var buttonX = -buttonPadding;
	var buttonY = maskTop.height - 2;
	
	button = createButton('Button_Contact');
	top.addChild(button);
	button.y = buttonY;
	buttonX -= button.off.asset.width + buttonPadding;
	button.x = buttonX;
	button.addEventListener('click', function(){
		$state.switch('Contact');
	});
	button.dialogText = 'Ways to catch me';
	
	button = createButton('Button_Gallery');
	top.addChild(button);
	button.y = buttonY;
	buttonX -= button.off.asset.width + buttonPadding;
	button.x = buttonX;
	button.addEventListener('click', function(){
		$state.switch('Gallery', 'All', 1);
	});
	button.dialogText = 'Doodles';
	
	button = createButton('Button_Works');
	top.addChild(button);
	button.y = buttonY;
	buttonX -= button.off.asset.width + buttonPadding;
	button.x = buttonX;
	button.addEventListener('click', function(){
		$state.switch('Works');
	});
	button.dialogText = 'Holes';
	
	button = createButton('Button_About');
	top.addChild(button);
	button.y = buttonY;
	buttonX -= button.off.asset.width + buttonPadding;
	button.x = buttonX;
	button.addEventListener('click', function(){
		$state.switch('About');
	});
	button.dialogText = 'Want to know about me?';
	
	button = createButton('Button_Home');
	top.addChild(button);
	button.y = buttonY;
	buttonX -= button.off.asset.width + buttonPadding;
	button.x = buttonX;
	button.addEventListener('click', function(){
		$state.switch('Home');
	});

	// logo
	
	var logo = AsyncImage.get('Logo');
	top.addChild(logo);
	logo.regY = -8;
	logo.regX = logo.asset.width + 16;
	
	// prev / next buttons
	
	var prevButton = createButton('Button_Prev');
	this.addChild(prevButton);
	prevButton.addEventListener('click', function(event){
		if ($state.prevState) {
			$state.switch($state.prevState, $state.prevTag, $state.prevPage);
		}
	});
	
	var nextButton = createButton('Button_Next');
	this.addChild(nextButton);
	nextButton.addEventListener('click', function(event){
		if ($state.nextState) {
			$state.switch($state.nextState, $state.nextTag, $state.nextPage);
		}
	});	

	// bottom
	
	var bottom = new createjs.Container();
	this.addChild(bottom);
	bottom.x = getWindowWidth();
	bottom.y = getWindowHeight();
	
	var maskBottom = new createjs.Shape();
	bottom.addChild(maskBottom);
	maskBottom.graphics.beginFill('rgba(0, 0, 0, 0.7)').
		drawRect(0, 2, 64, 112).
		beginFill('rgba(160, 160, 147, 0.7)').
		drawRect(0, 0, 64, 2);
	maskBottom.cache(0, 0, 64, 114);
	maskBottom.regX = 64;
	maskBottom.regY = 56;
	maskBottom.width = 64;
	maskBottom.height = 58;
	
	
	
	// var maskBottom = AsyncImage.get('Mask-bottom');
	// bottom.addChild(maskBottom);
	// maskBottom.regY = maskBottom.asset.height;
	// maskBottom.regX = maskBottom.asset.width;
	
	var socialMedia = new SocialMedia();
	bottom.addChild(socialMedia);
	socialMedia.regY = socialMedia.height + 8;
	socialMedia.regX = socialMedia.width + 16;
	
	var license = AsyncImage.get('cc');
	license.regX = socialMedia.width + 16 + license.width + 16;
	license.regY = license.height + 8;
	addCursorPointer(license);
	license.a = document.createElement('a');
	license.a.setAttribute('target', '_blank');
	license.a.setAttribute('href', "http://creativecommons.org/licenses/by-nc/4.0/");
	license.addEventListener('click', function(){
			license.a.click();
	});
	bottom.addChild(license);
	
	// character
	
	var character = new createjs.Container();
	this.addChild(character);
	
	var eyeWhite = AsyncImage.get('ani_eyes_white');
	character.addChild(eyeWhite);
	eyeWhite.x = 295;
	eyeWhite.y = 137;
	
	var eyeBall = AsyncImage.get('ani_eyes_ball');
	character.addChild(eyeBall);
	var eyeBallXMin = 295 + 9;
	var eyeBallXRange = 4;
	var eyeBallYMin = 137 + 5;
	var eyeBallYRange = 3;
	eyeBall.x = eyeBallXMin + eyeBallXRange / 2;
	eyeBall.y = eyeBallYMin + eyeBallYRange / 2;
	
	var characterBody = AsyncImage.get('Character');
	character.addChild(characterBody);
	
	var eyeBlink2 = AsyncImage.get('ani_eyes_blink2');
	character.addChild(eyeBlink2);
	eyeBlink2.x = 295;
	eyeBlink2.y = 137;
	eyeBlink2.visible = false;
	
	var eyeBlink3 = AsyncImage.get('ani_eyes_blink3');
	character.addChild(eyeBlink3);
	eyeBlink3.x = 295;
	eyeBlink3.y = 137;
	eyeBlink3.visible = false;
	
	// create Dialog
	$dialog = new DialogBubble();
	character.addChild($dialog);
	$dialog.x = characterBody.asset.width * 0.7;
	$dialog.y = 120;
	
	document.addEventListener('mousemove', function (event) {
		if ($state.state != 'Home') {
			return;
		}
		var x = getMousePageX() / getWindowWidth() * eyeBallXRange + eyeBallXMin;
		var y = getMousePageY() / getWindowHeight() * eyeBallYRange + eyeBallYMin;
		if (x != eyeBall.x || y != eyeBall.y) {
			eyeBall.x	= x;
			eyeBall.y	= y;
			$stage.needUpdate = true;
		}
	});
		
	// doLayout()
	
	var doLayout = function(event) {
		if ($state.state == 'Home') {
			character.visible = true;
			character.regY = characterBody.asset.height;
			character.x = 0.05 * getWindowWidth();
			character.y = getWindowHeight();
			character.scaleX = character.scaleY = 0.8 * getWindowHeight() / characterBody.asset.height;
		}
		else {
			character.visible = false;
		}
		
		// buttons
		top.x = getWindowWidth();
		var tweenTime = (event && event.type == 'switch' ? 0.3 : 0);
		bottom.x = getWindowWidth();
		if ($state.state == 'Home') {
			tweenTo(top, top.x, 0, tweenTime)
			tweenTo(bottom, bottom.x, getWindowHeight(), tweenTime)
		}
		else {
			tweenTo(top, top.x, -0.1 * getWindowHeight(), tweenTime)
			tweenTo(bottom, bottom.x, getWindowHeight() + 0.05 * getWindowHeight(), tweenTime)
		}
		top.scaleX = top.scaleY = getWindowHeight() / maskTop.height * 0.1;
		maskTop.scaleX = getWindowWidth() / maskTop.width / top.scaleX;
		bottom.scaleX = bottom.scaleY = getWindowHeight() / maskBottom.height * 0.05;
		maskBottom.scaleX = getWindowWidth() / maskBottom.width / bottom.scaleX;
		
		prevButton.visible = ($state.state != 'Home' && $state.state != 'About');
		nextButton.visible = ($state.state != 'Home' && $state.state != 'Contact');
		prevButton.regX = prevButton.width / 2;
		prevButton.regY = prevButton.height / 2;
		nextButton.regX = nextButton.width / 2;
		nextButton.regY = nextButton.height / 2;
		prevButton.x = getWindowWidth() * 0.05;
		nextButton.x = getWindowWidth() * 0.95;
		prevButton.y = nextButton.y = getWindowHeight() / 2;
		prevButton.scaleX = prevButton.scaleY = getWindowHeight() * 0.12 / prevButton.height;
		nextButton.scaleX = nextButton.scaleY = getWindowHeight() * 0.12 / nextButton.height;
	};
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);
	
	doLayout();
	
	
	var blinkTimeoutMin = 3;
	var blinkTimeoutMax = 6;
	var blinkTimeout = blinkTimeoutMin + Math.random() * (blinkTimeoutMax - blinkTimeoutMin);
	var blinkNumberCount = 1 + Math.floor(Math.random() * 2);
	var blink2Timeout = 0.05;
	var blink3Timeout = 0.05;
	var blinkCount = 0;
	var blinkState = 'waiting';
	createjs.Ticker.addEventListener("tick", function(event){
		if ($state.state != 'Home') {
			return;
		}
		blinkCount += event.delta / 1000;
		if (blinkState == 'waiting') {
			if (blinkCount >= blinkTimeout) {
				blinkState = 'blink2';
				eyeBlink2.visible = true;
				$stage.needUpdate = true;
				blinkCount = 0;
				blinkTimeout = blinkTimeoutMin + Math.random() * (blinkTimeoutMax - blinkTimeoutMin);;
			}
		}
		else if (blinkState == 'blink2') {
			if (blinkCount >= blink2Timeout) {
				blinkState = 'blink3';
				eyeBlink2.visible = false;
				eyeBlink3.visible = true;
				$stage.needUpdate = true;
				blinkCount = 0;
			}
		}
		else if (blinkState == 'blink3') {
			if (blinkCount >= blink3Timeout) {
				eyeBlink3.visible = false;
				$stage.needUpdate = true;
				blinkCount = 0;
				blinkNumberCount--;
				if (blinkNumberCount > 0) {
					blinkState = 'blink2';
				}
				else {
					blinkState = 'waiting';
					blinkNumberCount = 1 + Math.floor(Math.random() * 2);
				}
			}
		}
	});

};




