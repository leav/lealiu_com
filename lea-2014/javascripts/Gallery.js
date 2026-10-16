// Gallery extends createjs.Container
//
function Gallery() {
	this.initialize();
}
Gallery.prototype = new createjs.Container();
Gallery.prototype.Container_initialize = Gallery.prototype.initialize;
Gallery.prototype.initialize = function() {
	this.Container_initialize();
	
	var galleryListBox = new createjs.Shape();
	this.addChild(galleryListBox);
	
	var galleryTitle = AsyncImage.get('Title_Gallery');
	this.addChild(galleryTitle);
	
	var galleryDivider = new createjs.Shape();
	this.addChild(galleryDivider);
	
	var galleryTagButtons = new createjs.Container;
	this.addChild(galleryTagButtons);
	
	// var galleryPagePrev = createButton('Button_Prev');
	// this.addChild(galleryPagePrev);
	// galleryPagePrev.addEventListener('click', function(event){
		// if (event.currentTarget.targetState) {
			// $state.switch(event.currentTarget.targetState, event.currentTarget.targetTag, event.currentTarget.targetPage, null);
		// }
	// });
	
	// var galleryPageNext = createButton('Button_Next');
	// this.addChild(galleryPageNext);
	// galleryPageNext.addEventListener('click', function(event){
		// if (event.currentTarget.targetState) {
			// $state.switch(event.currentTarget.targetState, event.currentTarget.targetTag, event.currentTarget.targetPage, null);
		// }
	// });
	
	var imageSamples = new createjs.Container();
	this.addChild(imageSamples);
	
	var galleryImageBox = new createjs.Shape();
	this.addChild(galleryImageBox);
	galleryImageBox.addEventListener('click', function(event){
		$state.switch('Gallery', $state.tag, $state.page, null);
	});
	
	var galleryImage = new AsyncImage();
	this.addChild(galleryImage);
	
	var self = this;
	
	var doLayout = function() {
		// Gallery
		if ($state.state == 'Gallery') {
		
			self.visible = true;
			
			$state.galleryTag = $state.tag;
			
			var galleryAssets = [];
			var tags = ['Gallery'];
			if ($state.tag && $state.tag != 'All') {
				tags.push($state.tag);
			}
			galleryAssets = findAssetsByTags(tags);
			galleryAssets = sortAssets(galleryAssets);
			
			var imageSize = getWindowHeight() * 0.2;
			var imagePadding = getWindowHeight() * 0.04;
			var columns = Math.floor(getWindowWidth() * 0.82 / (imageSize + imagePadding));
			if (columns == 0){
				columns = 1;
			}
			var imageNumber = columns * 3;
			
			var pageMax = Math.floor((galleryAssets.length - 1) / imageNumber + 1);
			if (pageMax == 0) {
				pageMax = 1;
			}
			
			$log.debug('$state.page = ' + $state.page);
			
			if ($state.page > pageMax || $state.page == -1) {
				$state.switch($state.state, $state.tag, pageMax, $state.image);
				return;
			}
			if ($state.page == pageMax) {
				$state.nextState = 'Contact';
				$state.nextTag = $state.nextPage = null;
			}
			else {
				$state.nextState = 'Gallery';
				$state.nextTag = $state.tag;
				$state.nextPage = $state.page + 1;
			}
			if ($state.page <= 1) {
				$state.prevState = 'Works';
				$state.prevTag = $state.lastWorksTag
				$state.prevPage = null;
			}
			else {
				$state.prevState = 'Gallery';
				$state.prevTag = $state.tag;
				$state.prevPage = $state.page - 1;
			}
						
			galleryListBox.visible = true;
			galleryListBox.width = columns * imageSize + (columns + 1) * imagePadding;
			galleryListBox.height = getWindowHeight() * 0.86;
			galleryListBox.x = (getWindowWidth() - galleryListBox.width) / 2;
			galleryListBox.y = getWindowHeight() * 0.1;
			galleryListBox.radius = getWindowHeight() * 0.02;
			galleryListBox.graphics.clear().
				beginFill("rgba(0,0,0,0.7)").
				drawRoundRect(0, 0, galleryListBox.width, galleryListBox.height, galleryListBox.radius).
				endFill().
				beginStroke("rgba(128,128,128,0.7)").
				setStrokeStyle(2).
				drawRoundRect(0, 0, galleryListBox.width, galleryListBox.height, galleryListBox.radius);
			galleryListBox.cache(-4, -4, galleryListBox.width + 8, galleryListBox.height + 8)
			
			galleryTitle.visible = true;
			galleryTitle.x = galleryListBox.x;
			galleryTitle.y = getWindowHeight() * 0.02;
			galleryTitle.scaleX = galleryTitle.scaleY = getWindowHeight() / galleryTitle.asset.height * 0.08;

			galleryDivider.visible = true;
			galleryDivider.width = galleryListBox.width - imagePadding * 2;
			galleryDivider.height = 2;
			galleryDivider.x = (getWindowWidth() - galleryDivider.width) / 2;
			galleryDivider.y = getWindowHeight() * 0.19;
			galleryDivider.graphics.clear().
				beginFill("rgba(128,128,128,0.7)").
				drawRect(0, 0, galleryDivider.width, galleryDivider.height);
			galleryDivider.cache(0, 0, galleryDivider.width, galleryDivider.height);
						
			// tag buttons
			while(galleryTagButtons.children.length > 0) {
				galleryTagButtons.children.pop();
			}
			galleryTagButtons.x = galleryDivider.x;
			var tagFontSize = Math.round(getWindowHeight() * 0.02);
			var tagPadding = Math.round(getWindowHeight() * 0.005);
			var tagBoundWidth = galleryDivider.width;
			var tagLineHeight = tagFontSize * 1.1;
			var tagX = 0;
			var tagY = 0;
			var tagLines = 1;
			var tagMaxLines = 3;
			var addTag = function(tag){
				if (tagLines > tagMaxLines) {
					return;
				}
				
				var button = new createjs.Container();
				if ($state.tag == tag) {
					button.on = new createjs.Text('[' + tag + ']', tagFontSize + 'px Calibri', 'rgba(128,128,128,1.0)');
					button.off = new createjs.Text('[' + tag + ']', tagFontSize + 'px Calibri', 'rgba(0,0,0,1.0)');
				}
				else {
					button.on = new createjs.Text('[' + tag + ']', tagFontSize + 'px Calibri', 'rgba(255,255,255,1.0)');
					button.off = new createjs.Text('[' + tag + ']', tagFontSize + 'px Calibri', 'rgba(128,128,128,1.0)');
				}
				var bounds = button.off.getBounds();
				bounds.y++;
				bounds.height++;
				button.on.visible = false;
				button.addEventListener('mouseover', function(){
					button.on.visible = true;
					button.off.visible = false;
					if (button.getStage()) {
						button.getStage().needUpdate = true;
					}
				});
				button.addEventListener('mouseout', function(){
					button.on.visible = false;
					button.off.visible = true;
					if (button.getStage()) {
						button.getStage().needUpdate = true;
					}
				});
				button.tag = tag;
				button.addEventListener('click', function(){
					$state.switch($state.state, button.tag, 1);
				});
				button.hitArea = new createjs.Shape();
				button.hitArea.graphics.beginFill("rgba(255,255,255,1.0)").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
				button.hitArea.cache(bounds.x, bounds.y, bounds.width, bounds.height);
				if ($state.tag == tag) {
					button.addChild(button.hitArea);
				}
				button.addChild(button.on);
				button.addChild(button.off);
				addCursorPointer(button);
				galleryTagButtons.addChild(button);
				
				button.x = tagX;
				button.y = tagY;
				tagX += bounds.width;
				if (tagX > tagBoundWidth) {
					tagLines++;
					if (tagLines > tagMaxLines) {
						galleryTagButtons.children.pop();
						return;
					}
					button.x = 0;
					button.y = tagY = tagY + tagLineHeight;
					tagX = bounds.width;
				}
				tagX += tagPadding;
			};
			addTag('All');
			$galleryTags.forEach(addTag);
			galleryTagButtons.y = galleryDivider.y - tagY - tagLineHeight * 1.3;
			
			imageSamples.visible = true;
			while (imageSamples.children.length > 0) {
				imageSamples.children.pop();
			}
			for (var i = 0; i < imageNumber; i++) {
				var galleryAsset = galleryAssets[($state.page - 1) * imageNumber + i];
				if (!galleryAsset) {
					break; // end of list
				}
				if (!galleryAsset.sample) {
					continue;
				}
				
				var imageSample = new createjs.Container();
				imageSamples.addChild(imageSample);
				imageSample.image = AsyncImage.get(galleryAsset.sample);
				imageSample.addChild(imageSample.image);
				imageSample.cover = new createjs.Shape();
				imageSample.addChild(imageSample.cover);
				imageSample.cover.graphics.beginFill("rgba(0,0,0,0.25)").drawRect(0, 0, galleryAsset.sample.width, galleryAsset.sample.height);
				imageSample.cover.cache(0, 0, galleryAsset.sample.width, galleryAsset.sample.height);
				imageSample.frame = new createjs.Shape();
				imageSample.addChild(imageSample.frame);
				imageSample.frame.graphics.beginStroke("rgba(128,128,128,1.0)").
					setStrokeStyle(2).
					drawRect(0, 0, galleryAsset.sample.width, galleryAsset.sample.height);
				imageSample.frame.cache(-2, -2, galleryAsset.sample.width + 4, galleryAsset.sample.height + 4);
				imageSample.addEventListener('mouseover', function(event){
					event.currentTarget.cover.visible = false;
					if (imageSample.getStage()) {
						imageSample.getStage().needUpdate = true;
					}
				});
				imageSample.addEventListener('mouseout', function(event){
					event.currentTarget.cover.visible = true;
					if (imageSample.getStage()) {
						imageSample.getStage().needUpdate = true;
					}
				});
				imageSample.originalName = galleryAsset.name;
				imageSample.addEventListener("click", function(event){
					if (!$state.image) {
						$state.switch('Gallery', $state.tag, $state.page, event.currentTarget.originalName);
					}
				});
				addCursorPointer(imageSample);
				var row = Math.floor(i / columns);
				var column = i % columns;
				imageSample.x = galleryListBox.x + imagePadding + column * (imagePadding + imageSize);
				imageSample.y = galleryDivider.y + imagePadding + row * (imagePadding + imageSize);
				imageSample.scaleX = imageSize / galleryAsset.sample.width;
				imageSample.scaleY = imageSize / galleryAsset.sample.height;
			}
			
			if ($state.image) {
				var asset = findAsset($state.image);
				if (!asset)	{
					$log.error('asset ' + $state.image + ' not found');
					$state.switch($state.state, $state.tag, $state.page);
				}
				else
				{
					galleryImage.visible = true;
					galleryImageBox.visible = true;
					var scaleWidth = getWindowWidth() * 0.88 / asset.width;
					var scaleHeight = getWindowHeight() * 0.88 / asset.height;
					var scale = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;
					if (scale > 1.0) {
						scale = 1.0;
					}
					galleryImage.setAsset(asset);
					galleryImage.scaleX = galleryImage.scaleY = scale;
					galleryImage.x = (getWindowWidth() - galleryImage.asset.width * scale) / 2;
					galleryImage.y = (getWindowHeight() - galleryImage.asset.height * scale) / 2;
					var boxScale = scale * 1.1;
					var boxPadding = getWindowHeight() * 0.03;
					var boxX = galleryImage.x - boxPadding;
					var boxY = galleryImage.y - boxPadding;
					var boxWidth = galleryImage.asset.width * scale + boxPadding * 2;
					var boxheight = galleryImage.asset.height * scale + boxPadding * 2;
					$log.debug('boxWidth = ' + boxWidth + 'imageWidth = ' + galleryImage.asset.width * scale);
					galleryImageBox.graphics.clear().
						beginFill("rgba(0,0,0,0.3)").
						drawRect(0, 0, getWindowWidth(), getWindowHeight()).
						beginFill("rgba(0,0,0,1.0)").
						drawRect(boxX, boxY, boxWidth, boxheight);
					galleryImageBox.cache(0, 0, getWindowWidth(), getWindowHeight());
				}
			}
			else
			{
					galleryImage.visible = false;
					galleryImageBox.visible = false;
			}
		}
		else {
			self.visible = false;
		}
	}
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);
	
	doLayout();
}