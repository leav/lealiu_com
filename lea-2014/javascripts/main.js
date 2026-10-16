//
// globals
//
var $local;
var $stage, $slideshowData, $sceneManager, $log;
var $dialog;
// assets.js: $assets, $tags

//
// init
//
function init() {
	$log = new ConsoleLogger();
	
	$local = (window.location.protocol == 'file:');
	$log.debug('$local = ' + $local);
	
	// create menu state
	// $menuStage = new createjs.Stage('menuCanvas');
	// $menuStage.enableMouseOver();
	
	// create stage
	$stage = new createjs.Stage('mainCanvas');
	$stage.enableMouseOver();
	
	// needUpdateTimeout
	$stage.needUpdateTimeout = 0;
	$stage.setNeedUpdateTimeout = function(timeout) {
		if (timeout > $stage.needUpdateTimeout) {
			$stage.needUpdateTimeout = timeout;
		}
	}
	
	// load logo first
	AsyncImage.get('Logo');
	
	// create layers
	createLayers();
	
	// create state machine
	$state = new StateMachine();
	defineState($state);
	
	// create background
	$background = new Background();
	$backgroundLayer.addChild($background);
	
	// create Menu
	$menuLayer.addChild(new Menu());
		
	// create Gallery
	$contentLayer.addChild(new Gallery());
	
	// create About
	$contentLayer.addChild(new About());

	// create Works
	$contentLayer.addChild(new Works());
	
	// create Contact
	$contentLayer.addChild(new Contact());

	// hashtag
	loadPageWithHash(window.location.hash);
	window.addEventListener('hashchange', onHashChange);
	
	// update
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addEventListener("tick", function(event){
		// resize the canvas
		var width = getWindowWidth();
		var height = getWindowHeight();
		if ($stage.canvas.width != width || $stage.canvas.height != height) {
			$stage.canvas.width = width;
			$stage.canvas.height = height;
			$stage.needUpdate = true;
		}
		if ($stage.needUpdateTimeout > 0) {
			$stage.needUpdateTimeout -= event.delta / 1000;
			$stage.needUpdate = true;
		}
		// update the stage
		if ($stage.needUpdate) {
			$stage.needUpdate = false;
			$stage.update(event)
			// $log.debug('$stage.update(event) $stage.needUpdateTimeout ' + $stage.needUpdateTimeout);
		}
	});
	
	// LoadingBar
	var loadingBar = new LoadingBar(AsyncImage.total);
	$stage.addChild(loadingBar);
	$backgroundLayer.alpha = $menuLayer.alpha = $contentLayer.alpha = 0.0;
	
	var updateLoaded = function(){
		loadingBar.setLoaded(AsyncImage.loaded);
		$log.debug(loadingBar.loaded + '/' + loadingBar.total);
		if (loadingBar.loaded >= loadingBar.total){
			$stage.needUpdate = true;
			createjs.Ticker.removeEventListener("tick", updateLoaded);
			fadeIn($backgroundLayer, globalFadeTime);
			fadeIn($menuLayer, globalFadeTime);
			fadeIn($contentLayer, globalFadeTime);
			fadeOut(loadingBar, globalFadeTime);
			$dialog.setText('Welcome!', 0, 3);
			$dialog.setText('Click here to start browsing my portfolio', 4, 6);
		}
	}
	createjs.Ticker.addEventListener("tick", updateLoaded);
	
	// stageNeedUpdate
	var stageNeedUpdate = function() {
		// $log.debug('stageNeedUpdate()');
		$stage.needUpdate = true;
	}
	
	$state.addEventListener('switch', stageNeedUpdate);
	window.addEventListener('resize', stageNeedUpdate);
}

function createLayers() {
	$log.debug('createLayers()');
	$backgroundLayer = new createjs.Container();
	$stage.addChild($backgroundLayer);
	// $imageLayer = new createjs.Container();
	// $stage.addChild($imageLayer);
	$menuLayer = new createjs.Container();
	$stage.addChild($menuLayer);
	$contentLayer = new createjs.Container();
	$stage.addChild($contentLayer);
}

var $noReloading = false;

function setHashTagWithoutReloading() {
	var args = Array.prototype.slice.call(arguments, 0);
	var hash = "#!:" + args.join('/');
	if (window.location.hash != hash)
	{
		$noReloading = true;
		window.location.hash = hash;
	}
}

function onHashChange() {
	$log.debug('hash change');
	loadPageWithHash(window.location.hash)
}

function loadPageWithHash(hashtag) {
	if ($noReloading) {
		$log.debug('noReloading');
		$noReloading = false;
		return;
	}
	
	$log.debug('hashtag URL = ' + hashtag);
	var tags = hashtagSplit(window.location.hash);

	if (tags.length > 0) {
		// extract category and page
		var category = tags[0].toLocaleLowerCase();
		// call appropriate handler for each category
		if (category.localeCompare('gallery') === 0) {
			$state.switch('Gallery', tags[1], tags[2], tags[3]);
			return;
		}		
		if (category.localeCompare('about') === 0) {
			$state.switch('About');
			return;
		}
		if (category.localeCompare('works') === 0) {
			$state.switch('Works', tags[1]);
			return;
		}
		if (category.localeCompare('contact') === 0) {
			$state.switch('Contact');
			return;
		}
	}
	// default to home
	$state.switch('Home');
}

function defineState(state) {
	state.addEventListener('switch', function(event) {
		var state = event.newState;
		$log.debug('main state swith, state = ' + state);
		var tag = event.newTag;
		var page = event.newPage;
		var	image = event.newImage;
		
		if (state == 'Gallery') {
			if (!tag)	{
				tag = 'All';
			}
			page = parseInt(page, 10);
			if (isNaN(page)) {
				page = 1;
			}
			if (image) {
				setHashTagWithoutReloading('Gallery', tag, page.toString(), image);
			}
			else {
				setHashTagWithoutReloading('Gallery', tag, page.toString());
			}
		}
		else if (state == 'Works') {
			page = image = null;
			if (tag) {
				setHashTagWithoutReloading(state, tag);
			}
			else {
				setHashTagWithoutReloading(state);
			}
		}
		else {
			setHashTagWithoutReloading(state);
			tag = page = image = null;
		}
		$state.tag = tag;
		$state.page = page;
		$state.image = image;
	});
	
}

var $imageCache = {}
function getImage(asset) {
	if ($imageCache[asset]) {
		return $imageCache[asset];
	}
	else {
		var image = AsyncImage.get(asset);
		if (image) {
			$imageLayer.addChild(image);
		}
		return image;
	}
}

function showImage(asset)
{
	var image = getImage(asset);
	if (image) {
		image.visible = true;
	}
}

function hideImage(asset)
{
	var image = getImage(asset);
	if (image) {
		image.visible = false;
	}
}

//
// split the hash tag by '/'
//
function hashtagSplit(hashtag) {
	var result = [];
	if (hashtag != undefined && hashtag.substring(0, 3) == '#!:') {
		result = hashtag.substring(3).split('/');
	}
	$log.debug('hashtagSplit(): ' + result.toString());
	return result;
}

function createBlackRect(width, height) {
	var image = new createjs.Shape();
	image.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, width, height);
	return image;
}

