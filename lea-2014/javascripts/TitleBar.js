
function createTitleBar() {
	$log.debug('createTitleBar()');
	var titleBar =  new createjs.Container();
	titleBar.state = 'Home';
	titleBar.galleryTag = null;
	titleBar.galleryPage = 1;
	titleBar.galleryImageName = null;
	
	// Home
	// masks
	var mask = AsyncImage.get('Mask-top');
	var maskHeight = mask.asset.height - 2;
	titleBar.addChild(mask);
	
	var maskBottom = AsyncImage.get('Mask-bottom');
	titleBar.addChild(maskBottom);
	
	var character = AsyncImage.get('Character');
	titleBar.addChild(character);
		
	// title bar buttons
	var top = new createjs.Container();
	titleBar.addChild(top);
	top.buttons = [];
	var button;
	
	button = createButton('Home');
	top.addChild(button);
	top.buttons.push(button);
	titleBar.buttonHome = button;
	
	button = createButton('About');
	top.addChild(button);
	top.buttons.push(button);
	titleBar.buttonAbout = button;
	
	button = createButton('Works');
	top.addChild(button);
	top.buttons.push(button);
	titleBar.buttonWorks = button;
	
	button = createButton('Gallery');
	top.addChild(button);
	top.buttons.push(button);
	titleBar.buttonGallery = button;
	
	button = createButton('Links');
	top.addChild(button);
	top.buttons.push(button);
	titleBar.buttonLinks = button;

	var logo = AsyncImage.get('Logo');
	titleBar.addChild(logo);

	// Gallery
	
	var galleryListBox = new createjs.Shape();
	titleBar.addChild(galleryListBox);
	
	var galleryTitle = AsyncImage.get('Title_Gallery');
	titleBar.addChild(galleryTitle);
	
	var galleryDivider = new createjs.Shape();
	titleBar.addChild(galleryDivider);
	
	var galleryTagButtons = new createjs.Container;
	titleBar.addChild(galleryTagButtons);
	
	var galleryPagePrev = createButton('Prev');
	titleBar.addChild(galleryPagePrev);
	galleryPagePrev.addEventListener('click', function(event){
		if (event.currentTarget.targetPage) {
			$state.switch('Gallery', titleBar.galleryTag, event.currentTarget.targetPage, titleBar.galleryImageName);
		}
	});
	
	var galleryPageNext = createButton('Next');
	titleBar.addChild(galleryPageNext);
	galleryPageNext.addEventListener('click', function(event){
		if (event.currentTarget.targetPage) {
			$state.switch('Gallery', titleBar.galleryTag, event.currentTarget.targetPage, titleBar.galleryImageName);
		}
	});
	
	var imageSamples = new createjs.Container();
	titleBar.addChild(imageSamples);
	
	var galleryImageBox = new createjs.Shape();
	titleBar.addChild(galleryImageBox);
	galleryImageBox.addEventListener('click', function(event){
		//titleBar.galleryImageName = null;
		$state.switch('Gallery', titleBar.galleryTag, titleBar.galleryPage, null);
		//doLayout();
	});
	
	var galleryImage = new AsyncImage();
	titleBar.addChild(galleryImage);
	

	var doLayout = function() {
		var scale = getWindowHeight() / mask.asset.height;
		var padding = 16;
		
		// Home
		// mask
		if (titleBar.state == 'Home') {
			mask.visible = true;
			maskBottom.visible = true;
			character.visible = true;
			
			mask.scaleY = 0.1 * scale;
			mask.scaleX = getWindowWidth() / mask.asset.width;
			maskBottom.regY = maskBottom.asset.height;
			maskBottom.y = getWindowHeight();
			maskBottom.scaleX = getWindowWidth() / maskBottom.asset.width;
			maskBottom.scaleY = 0.05 * getWindowHeight() / maskBottom.asset.height;
			character.regY = character.asset.height;
			character.x = 0.05 * getWindowWidth();
			character.y = getWindowHeight();
			character.scaleX = character.scaleY = 0.8 * getWindowHeight() / character.asset.height;
		}
		else {
			mask.visible = false;
			maskBottom.visible = false;
			character.visible = false;
		}
		
		// buttons
		top.regX = getWindowWidth();
		top.x = getWindowWidth();
		if (titleBar.state == 'Home') {
			top.y = 0.1 * getWindowHeight();
		}
		else {
			top.y = 0;
		}
		top.scaleX = scale * 0.1;
		top.scaleY = scale * 0.1;
		
		var x = getWindowWidth() - padding * 2;
		for (var i = top.buttons.length - 1; i >= 0; i--) {
			var button = top.buttons[i];
			x -= button.width;
			button.x = x;
			x -= padding;
		}
		
		// logo
		if (titleBar.state == 'Home') {
			logo.visible = true;
			logo.regX = logo.asset.width + padding * 4;
			logo.x = getWindowWidth();
			logo.scaleX = scale * 0.1;
			logo.scaleY = scale * 0.1;
		}
		else {
			logo.visible = false;
		}
		
		// Gallery
		if (titleBar.state == 'Gallery') {
			var imageSize = getWindowHeight() * 0.2;
			var imagePadding = getWindowHeight() * 0.04;
			var columns = Math.floor(getWindowWidth() * 0.82 / (imageSize + imagePadding));
			if (columns == 0){
				columns = 1;
			}
			var imageNumber = columns * 3;
			$log.debug("columns = " + columns);
				
			fullMask.visible = true;
			fullMask.scaleX = getWindowWidth() / fullMask.width;
			fullMask.scaleY = getWindowHeight() / fullMask.height;
			
			galleryListBox.visible = true;
			galleryListBox.width = columns * imageSize + (columns + 1) * imagePadding;
			galleryListBox.height = getWindowHeight() * 0.86;
			galleryListBox.x = (getWindowWidth() - galleryListBox.width) / 2;
			galleryListBox.y = getWindowHeight() * 0.1;
			galleryListBox.radius = getWindowHeight() * 0.02;
			$log.debug("width = " + galleryListBox.width + " height = " + galleryListBox.height);
			galleryListBox.graphics.clear().
				beginFill("rgba(0,0,0,0.7)").
				drawRoundRect(0, 0, galleryListBox.width, galleryListBox.height, galleryListBox.radius).
				endFill().
				beginStroke("rgba(128,128,128,0.7)").
				setStrokeStyle(2).
				drawRoundRect(0, 0, galleryListBox.width, galleryListBox.height, galleryListBox.radius);
			galleryListBox.cache(0, 0, galleryListBox.width, galleryListBox.height)
			
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
			
			var galleryAssets = [];
			var tags = ['Gallery'];
			if (titleBar.galleryTag && titleBar.galleryTag != 'All') {
				tags.push(titleBar.galleryTag);
			}
			galleryAssets = findAssetsByTags(tags);
			galleryAssets = sortAssets(galleryAssets);
			
			// tag buttons
			var tagBoundX = galleryDivider.x;
			var tagFontSize = Math.round(getWindowHeight() * 0.02);
			var tagPadding = Math.round(getWindowHeight() * 0.01);
			while(galleryTagButtons.children.length > 0) {
				galleryTagButtons.children.pop();
			}
			$galleryTags.forEach(function(tag){
				var button = new createjs.Text(tag, tagFontSize + 'px Calibri', 'rgba(0,0,0,1.0)')
				galleryTagButtons.addChild(button);
			});
			
			// next/prev buttons
			if (galleryAssets.length > 0) {
				var pageMax = Math.floor((galleryAssets.length - 1) / imageNumber + 1);
				var galleryPageButtonY = galleryListBox.y + galleryListBox.height / 2;
				var galleryPageButtonScale = galleryListBox.height * 0.12;
				var galleryPageButtonDistance = galleryListBox.height * 0.08;
				$log.debug('pageMax = ' + pageMax + ' ' + (titleBar.galleryPage >= pageMax));
				if (titleBar.galleryPage >= pageMax) {
					galleryPageNext.visible = false;
				}
				else {
					galleryPageNext.visible = true;
					galleryPageNext.targetPage = titleBar.galleryPage + 1;
					galleryPageNext.regX = galleryPageNext.width / 2;
					galleryPageNext.regY = galleryPageNext.height / 2;
					galleryPageNext.x = galleryListBox.x + galleryListBox.width + galleryPageButtonDistance;
					galleryPageNext.y = galleryPageButtonY;
					galleryPageNext.scaleX = galleryPageNext.scaleY = galleryPageButtonScale / galleryPageNext.width;
				}
				if (titleBar.galleryPage <= 1) {
					galleryPagePrev.visible = false;
				}
				else {
					galleryPagePrev.visible = true;
					galleryPagePrev.targetPage = titleBar.galleryPage - 1;
					galleryPagePrev.regX = galleryPagePrev.width / 2;
					galleryPagePrev.regY = galleryPagePrev.height / 2;
					galleryPagePrev.x = galleryListBox.x - galleryPageButtonDistance;
					galleryPagePrev.y = galleryPageButtonY;
					galleryPagePrev.scaleX = galleryPagePrev.scaleY = galleryPageButtonScale / galleryPagePrev.width;
				}
			}
			else {
				galleryPagePrev.visible = galleryPageNext.visible = false;
			}
			
			imageSamples.visible = true;
			imageSamples.children.forEach(function(v) {v.visible = false});
			for (var i = 0; i < imageNumber; i++) {
				var galleryAsset = galleryAssets[(titleBar.galleryPage - 1) * imageNumber + i];
				if (!galleryAsset) {
					break;
				}
				if (!galleryAsset.sample) {
					continue;
				}
				var imageSample = imageSamples.children[i];
				if (!imageSample) {
					imageSample = imageSamples.children[i] = AsyncImage.get(galleryAsset.sample);
					imageSample.addEventListener("click", function(event){
						if (!titleBar.galleryImageName) {
							$state.switch('Gallery', titleBar.galleryTag, titleBar.galleryPage, event.currentTarget.originalName);
						}
					});
				}
				else {
					imageSample.setAsset(galleryAsset.sample);
				}
				imageSample.originalName = galleryAsset.name;
				imageSample.visible = true;
				var row = Math.floor(i / columns);
				var column = i % columns;
				imageSample.x = galleryListBox.x + imagePadding + column * (imagePadding + imageSize);
				imageSample.y = galleryDivider.y + imagePadding + row * (imagePadding + imageSize);
				imageSample.scaleX = imageSize / imageSample.asset.width;
				imageSample.scaleY = imageSize / imageSample.asset.height;
			}
			
			if (titleBar.galleryImageName) {
				var asset = findAsset(titleBar.galleryImageName);
				if (!asset)	{
					$log.error('asset ' + titleBar.galleryImageName + ' not found');
				}
				else
				{
					galleryImage.visible = true;
					galleryImageBox.visible = true;
					var scaleWidth = getWindowWidth() * 0.88 / asset.width;
					var scaleHeight = getWindowHeight() * 0.88 / asset.height;
					var scale = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;
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
			galleryTitle.visible = false;
			galleryListBox.visible = false;
			galleryDivider.visible = false;
			imageSamples.visible = false;
			galleryImage.visible = false;
			galleryImageBox.visible = false;
			galleryPagePrev.visible = false;
			galleryPageNext.visible = false;
		}
	}; // doLayout
	
	doLayout();
	window.addEventListener("resize", doLayout);
	
	// states
	titleBar.enterHome = function() {
		titleBar.state = 'Home';
		doLayout();
	}
	titleBar.enterGallery = function(tag, page, image) {
		$log.debug('titleBar.enterGallery() tag = ' + tag + " page = " + page + " image = " + image);
		titleBar.state = 'Gallery';
		titleBar.galleryTag = tag;
		titleBar.galleryPage = page;
		titleBar.galleryImageName = image;
		doLayout();
	};

	
	return titleBar;
}

function createButton(assetName)
{
	var container = new createjs.Container();
	container.name = assetName;
	
	container.off = AsyncImage.get('Button_' + assetName + '_off');
	container.addChild(container.off);
	
	container.on = AsyncImage.get('Button_' + assetName + '_on');
	container.addChild(container.on);
	container.on.visible = false;
	
	container.hitArea = container.off
	container.addEventListener("mouseover", function(event){
		container.on.visible = true;
		container.off.visible = false;
	});
	
	container.mouseout = function(event){
		container.on.visible = false;
		container.off.visible = true;
	};
	container.addEventListener("mouseout", container.mouseout);

	container.width = container.off.asset.width;
	container.height = container.off.asset.height;
	return container;
}