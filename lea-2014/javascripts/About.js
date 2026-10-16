//
// About extends createjs.Container
//
function About() {
	this.initialize();
}
About.prototype = new createjs.Container();
About.prototype.Container_initialize = About.prototype.initialize;
About.prototype.initialize = function() {
	this.Container_initialize();
	
	var aboutBox = new createjs.Shape();
	this.addChild(aboutBox);
	
	var aboutTitle = AsyncImage.get('Title_About');
	this.addChild(aboutTitle);
	
	var nameText = new createjs.Text('◆ Lea Liu', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(nameText);
	
	var titleText = new createjs.Text('2D Game Artist and Freelance Illustrator', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(titleText);
	
	var divider = new createjs.Shape();
	this.addChild(divider);

	var paraDiv = document.createElement("div");
	document.getElementById("mainDiv").appendChild(paraDiv);
	var paraElement = new createjs.DOMElement(paraDiv);
	this.addChild(paraElement);
	
	paraDiv.style.position = 'absolute';
	paraDiv.style.left = '29%';
	paraDiv.style.top = '40%';
	paraDiv.style.width = '60%';
	paraDiv.style.height = '48%';
	paraDiv.style.overflowY = 'auto';
	paraDiv.style.color = 'rgba(255,255,255,1.0)';
	paraDiv.style.font = '1.2em Calibri';
	var texts = [
		'I’m a girl who have great interested in animation, game, and comic. In 2013, I finished my B.A in the Animation School of Beijing Film Academy. During that time, I was fascinated by game design, and worked on several game projects. My first full time position was character designer for TLBB, a popular Chinese MMORPG by Changyou.com.',
		'In fact, I enjoy making the scene in my mind come true by several ways, such as drawing, fan-art, web design, or game creation. I am especially interested in working in a group, meeting new friends along the way. You can click the button of WORKS to view all my work records.',
		'My favorite games are Monster Hunter and Minecraft, and my hobbies include painting, cooking, collecting Lolita dress, yoga, and (the all-important) sleeping~\(≧▽≦)/~.',
	]
	texts.forEach(function(v){
		var para = document.createElement("p");
		paraDiv.appendChild(para);
		var node = document.createTextNode(v);
		para.appendChild(node);
	});
	
	var imageAssets = findAssetsByTags(['About']);
	var images = new createjs.Container();
	this.addChild(images);
	var imageAssetSize = 0;
	var imageY = 0;
	var imageDistRatio = 1.05;
	var imageAlpha = 0.85;
	var imageMouseOverAlpha = 1.0;
	var imageScrolling = true;

	imageAssets.forEach(function(asset){
		var image = AsyncImage.get(asset);
		images.addChild(image);
		imageAssetSize = asset.width;
		image.y = imageY;
		image.alpha = imageAlpha;
		imageY += asset.height * imageDistRatio;
		image.addEventListener('fileload', function(){
			if ($state.state == 'About') {
				images.cache(0, 0, imageAssetSize, imageAssetSize * 1.1 * imageAssets.length);
			}
		});
		image.addEventListener('mouseover', function(event){
			imageScrolling = false;
			event.currentTarget.alpha = imageMouseOverAlpha;
			images.cache(0, 0, imageAssetSize, imageAssetSize * 1.1 * imageAssets.length);
			$stage.needUpdate = true;
		});
		image.addEventListener('mouseout', function(event){
			imageScrolling = true;
			event.currentTarget.alpha = imageAlpha;
			images.cache(0, 0, imageAssetSize, imageAssetSize * 1.1 * imageAssets.length);
			$stage.needUpdate = true;
		});
	});
	images.height = imageY - imageAssetSize * (imageDistRatio - 1);
	
	var imagesMask = new createjs.Shape();
	imagesMask.cache(0, 0, imageAssetSize, imageAssetSize);
	images.filters = [
		new createjs.AlphaMaskFilter(imagesMask.cacheCanvas)
	];

	var self = this;
	var doLayout = function() {
		if ($state.state == 'About') {
			self.visible = true;
			
			paraDiv.focus();
			
			$state.nextState = 'Works';
			$state.nextTag = $state.nextPage = $state.prevState = $state.prevTag = $state.prevPage = null;
			
			aboutBox.width = getWindowWidth() * 0.82;
			aboutBox.height = getWindowHeight() * 0.86;
			aboutBox.x = (getWindowWidth() - aboutBox.width) / 2;
			aboutBox.y = getWindowHeight() * 0.1;
			aboutBox.radius = getWindowHeight() * 0.02;
			aboutBox.graphics.clear().
				beginFill("rgba(0,0,0,0.85)").
				drawRoundRect(0, 0, aboutBox.width, aboutBox.height, aboutBox.radius).
				endFill().
				beginStroke("rgba(128,128,128,0.85)").
				setStrokeStyle(2).
				drawRoundRect(0, 0, aboutBox.width, aboutBox.height, aboutBox.radius);
			aboutBox.cache(-4, -4, aboutBox.width + 8, aboutBox.height + 8)

			aboutTitle.x = aboutBox.x;
			aboutTitle.y = getWindowHeight() * 0.02;
			aboutTitle.scaleX = aboutTitle.scaleY = getWindowHeight() / aboutTitle.asset.height * 0.08;
			
			nameText.font = Math.round(getWindowHeight() * 0.06) + 'px Calibri';
			nameText.x = getWindowWidth() * 0.29;
			nameText.y = getWindowHeight() * 0.23;
			
			titleText.font = Math.round(getWindowHeight() * 0.03) + 'px Calibri';
			titleText.x = getWindowWidth() * 0.29;
			titleText.y = getWindowHeight() * 0.3;
			
			var dividerLeft = titleText.x;
			var dividerRight = getWindowWidth() * 0.89;
			var dividerY = getWindowHeight() * 0.38;
			divider.graphics.clear().
				beginStroke("rgba(128,128,128,1)").
				setStrokeStyle(2).
				moveTo(dividerLeft, dividerY).
				lineTo(dividerRight, dividerY);
			divider.cache(dividerLeft - 4, dividerY - 2, dividerRight - dividerLeft + 8, 4);
			
			if (images.children.length > 0) {
				images.x = getWindowWidth() * 0.13;
				images.y = getWindowHeight() * 0.13;
				images.scaleX = images.scaleY = getWindowWidth() / imageAssetSize * 0.14;
				
				var maskGradientHeight = imageAssetSize / 2;
				var maskHeight = getWindowHeight() * 0.8 / images.scaleY;
				imagesMask.graphics.clear().
					beginLinearGradientFill(["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"], [0, 1], 0, 0, 0, maskGradientHeight).
					drawRect(0, 0, imageAssetSize, maskGradientHeight).
					beginLinearGradientFill(["rgba(0, 0, 0, 1.0)", "rgba(0, 0, 0, 0.0)"], [0, 1], 0, maskHeight - maskGradientHeight, 0, maskHeight).
					drawRect(0, maskHeight - maskGradientHeight, imageAssetSize, maskGradientHeight).
					beginFill('rgba(0, 0, 0, 1)').
					drawRect(0, maskGradientHeight - 1, imageAssetSize, maskHeight - 2 * maskGradientHeight + 2);
				$log.debug('getWindowHeight() = ' + getWindowHeight() + ' scale = ' +
					images.scaleY + ' imageAssetSize = ' + imageAssetSize + ' maskHeight = ' + maskHeight);
				imagesMask.height = maskHeight;
				imagesMask.cache(0, 0, imageAssetSize, maskHeight);
				images.cache(0, 0, imageAssetSize, maskHeight);
			}
			
		}
		else {
			self.visible = false;
		}
	}
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);
	doLayout();
	
	var scrollSpeed = 20;
	var updateImagesScroll = function(event) {
		if ($state.state != 'About' || !imageScrolling) {
			return;
		}
		if (images.height + imageAssetSize * imageDistRatio <= imagesMask.height) {
			return;
		}
		var scrollDist = scrollSpeed * event.delta / 1000;
		images.children.forEach(function(v) {
			// console.log(v);
			// console.log(v.y);
			v.y -= scrollDist;
			if (v.y < -imageAssetSize) {
				v.y += images.height + imageAssetSize * (imageDistRatio - 1);
			}
		});
		images.cache(0, 0, imageAssetSize, imagesMask.height);
		$stage.needUpdate = true;
	}
	createjs.Ticker.addEventListener("tick", updateImagesScroll);

}