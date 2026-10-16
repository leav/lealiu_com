//
// Background extends createjs.Container
//
function Background() {
	this.initialize();
}
Background.prototype = new createjs.Container();
Background.prototype.Container_initialize = Background.prototype.initialize;
Background.prototype.initialize = function() {
	this.Container_initialize();
	
	var back = new createjs.Container();
	this.addChild(back);
	
	var l3 = AsyncImage.get('Back-L3');
	back.addChild(l3);
	
	var l2Contents = new createjs.Container();
	back.addChild(l2Contents);
	
	var l2 = AsyncImage.get('Back-L2');
	l2Contents.addChild(l2);
		
	var fullMask = new createjs.Shape();
	this.addChild(fullMask);
	fullMask.width = fullMask.height = 4;
	fullMask.graphics.beginFill("rgba(0,0,0,0.3)").drawRect(0, 0, fullMask.width, fullMask.height);
	fullMask.cache(0, 0, fullMask.width, fullMask.height);
	fullMask.addEventListener('click', function(){$state.switch('Home')});

	var buttons = [];
	
	var modeling = createButton('SL_3D');
	l2Contents.addChild(modeling);
	buttons.push(modeling);
	modeling.addEventListener('click', function(){
		$state.switch('Gallery', 'Modeling', 1);
	});
	modeling.dialogText = "Can't afford GK >.<";

	
	var autoplay = createButton('SL_autoplay');
	l2Contents.addChild(autoplay);
	buttons.push(autoplay);
	autoplay.addEventListener('click', function(){
		$state.startBrowsing();
	});
	autoplay.dialogText = "Start browsing my portfolio";
	
	var fatloot = createButton('SL_fatloot');
	l2Contents.addChild(fatloot);
	buttons.push(fatloot);
	fatloot.addEventListener('click', function(){
		$state.switch('Works', 'Fatloot');
	});
	fatloot.dialogText = "A story about fat people pwning";
	
	var gallery = createButton('SL_gallery');
	l2Contents.addChild(gallery);
	buttons.push(gallery);
	gallery.addEventListener('click', function(){
		$state.switch('Gallery');
	});
	gallery.dialogText = "Many doodles";
	
	var honglou = createButton('SL_honglou');
	l2Contents.addChild(honglou);
	buttons.push(honglou);
	honglou.addEventListener('click', function(){
		$state.switch('Works', 'Honglou');
	});
	honglou.dialogText = "A big hole!";
	
	var honlougallery = createButton('SL_Honlougallery');
	l2Contents.addChild(honlougallery);
	buttons.push(honlougallery);
	honlougallery.addEventListener('click', function(){
		$state.switch('Gallery', 'Dream of the Red Chamber');
	});
	honlougallery.dialogText = "Nice scenes meow!";
	
	var leatest = createButton('SL_leatest');
	l2Contents.addChild(leatest);
	buttons.push(leatest);
	var a = document.createElement('a');
	a.setAttribute('target', '_blank');
	a.setAttribute('href', 'leatest.html');
	leatest.addEventListener('click', function(){
		a.click();
	});
	leatest.dialogText = "Don't click! Secret!";

	var works = createButton('SL_works');
	l2Contents.addChild(works);
	buttons.push(works);
	works.addEventListener('click', function(){
		$state.switch('Works');
	});
	works.dialogText = 'Back to work!';
	
	var autoSlideAssets = findAssetsByTags(['AutoSlides']);
	var autoSlideBack = new AsyncImage();
	var autoSlide = new AsyncImage();
	l2Contents.addChild(autoSlideBack);
	l2Contents.addChild(autoSlide);
	autoSlideBack.x = autoSlide.x = 1334;
	autoSlideBack.y = autoSlide.y = 403;

	var l1 = AsyncImage.get('Back-L1');
	back.addChild(l1);
	
	var self = this;
	
	this.backgroundScrollX = this.backgroundScrollY = 0.5;
	this.updateBackgroundScroll = function() {
		if (self.backgroundScrollX < 0)	{
			self.backgroundScrollX = 0;
		}
		if (self.backgroundScrollX > 1)	{
			self.backgroundScrollX = 1;
		}
		if (self.backgroundScrollY < 0)	{
			self.backgroundScrollY = 0;
		}
		if (self.backgroundScrollY > 1)	{
			self.backgroundScrollY = 1;
		}

		l2Contents.x = (getWindowWidth() / back.scaleX - l2.asset.width) * self.backgroundScrollX;
		l2Contents.y = (getWindowHeight() / back.scaleY - l2.asset.height) * self.backgroundScrollY;
		l1.x = (getWindowWidth() / back.scaleX - l1.asset.width) * self.backgroundScrollX;
		l1.y = (getWindowHeight() / back.scaleY - l1.asset.height) * self.backgroundScrollY;
		l3.x = (getWindowWidth() / back.scaleX - l3.asset.width) * self.backgroundScrollX;
		l3.y = (getWindowHeight() / back.scaleY - l3.asset.height) * self.backgroundScrollY;
		
		if (self.getStage()) {
			self.getStage().needUpdate = true;
		}
		
		// $log.debug('doMousemove l2.x = ' + l2.x);
		// $log.debug('getMousePageX() / getWindowWidth() = ' + getMousePageX() / getWindowWidth());
	};
	this.updateBackgroundScroll();
	
	var scrollSpeed = 2.0;
	var scrollRange = 0.2;
	createjs.Ticker.addEventListener("tick", function(event){
		if ($state.state != "Home") {
			return;
		}
		var dist = scrollSpeed * event.delta / 1000;
		if (getMousePageX() <= getWindowWidth() * scrollRange && self.backgroundScrollX > 0) {
			self.backgroundScrollX -= dist;
			self.updateBackgroundScroll();
		}
		else if (getMousePageX() >= getWindowWidth() * (1 - scrollRange) && self.backgroundScrollX < 1) {
			self.backgroundScrollX += dist;
			self.updateBackgroundScroll();
		}
		if (getMousePageY() <= getWindowHeight() * scrollRange && self.backgroundScrollY > 0) {
			self.backgroundScrollY -= dist;
			self.updateBackgroundScroll();
		}
		else if (getMousePageY() >= getWindowHeight() * (1 - scrollRange) && self.backgroundScrollY < 1) {
			self.backgroundScrollY += dist;
			self.updateBackgroundScroll();
		}
	});

	if (autoSlideAssets.length > 0)
	{
		autoSlide.setAsset(autoSlideAssets[0]);
		if (autoSlideAssets.length > 1)
		{
			var autoSlideInterval = 40;
			var autoSlideCount = 0;
			var autoSlideIndex = 1;
			var doAutoSlide = function(){
				autoSlideCount++;
				if (autoSlideCount > autoSlideInterval) {
					autoSlideCount = 0;
					autoSlideBack.setAsset(autoSlideAssets[autoSlideIndex]);
					fadeIn(autoSlideBack, globalFadeTime);
					fadeOut(autoSlide, globalFadeTime);
					var temp = autoSlideBack;
					autoSlideBack = autoSlide;
					autoSlide = temp;
					autoSlideIndex = (autoSlideIndex + 1) % autoSlideAssets.length;
				}
			};
			createjs.Ticker.addEventListener("tick", doAutoSlide);
		}
	}
	
	var buttonsShuffled = [];
	var buttonBlinkInterval = 6;
	var buttonBlinkCount = 0;
	var doButtonBlink = function(event){
		buttonBlinkCount += event.delta / 1000;
		if (buttonBlinkCount >= buttonBlinkInterval) {
			buttonBlinkCount -= buttonBlinkInterval;
			if (buttonsShuffled.length == 0) {
				buttonsShuffled = shuffle(buttons.slice());
			}
			var button;
			do {
				button = buttonsShuffled.pop();
			} while (button && button.on.alpha > 0)
			// console.log(button);
			if (button) {
				button.blink();
			}
		}
	}
	createjs.Ticker.addEventListener("tick", doButtonBlink);

	var doLayout = function(){
		var scaleWidth = getWindowWidth() / l2.asset.width;
		var scaleHeight = getWindowHeight() / l2.asset.height;
		var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;
		back.scaleX = back.scaleY = scale;
		
		self.width = l2.asset.width * scale;
		
		if ($state.state == 'Home') {
			$state.nextState = 'About';
			$state.nextTag = $state.nextPage = null;
			fullMask.visible = false;
			buttons.forEach(function(v){v.visible = true;});
		}
		else {
			fullMask.visible = true;
			fullMask.scaleX = getWindowWidth() / fullMask.width;
			fullMask.scaleY = getWindowHeight() / fullMask.height;
			buttons.forEach(function(v){v.visible = false;});
		}
		
		self.updateBackgroundScroll();
	};
	doLayout();
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);
	
}


function createBackground() {
	var background = new createjs.Container();
	
	
	return background;
}