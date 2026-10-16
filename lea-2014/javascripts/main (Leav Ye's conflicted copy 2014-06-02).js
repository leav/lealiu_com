//
// globals
//
var $local;
var $stage, $slideshowData, $sceneManager, $log;
// assets.js: $assets, $tags

//
// init
//
function init() {
	$log = new ConsoleLogger();
	
	$local = (window.location.protocol == 'file:');
	$log.debug('$local = ' + $local);
	
	// create stage
	$stage = new createjs.Stage('mainCanvas');
	
	// create $sceneManager
	$sceneManager = new SceneManager($stage, $tags);
	
	// hashtag
	loadPage(window.location.hash);
	window.addEventListener('hashchange', function () {
		$log.debug('hash change');
		loadPage(window.location.hash)
	});
	
	// update
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addEventListener("tick", onUpdate);
}

function loadPage(hashtag) {
	$log.debug('hashtag URL = ' + hashtag);
	var contents = hashtagSplit(window.location.hash);
	$sceneManager.loadPage(contents);
}

//
// update, called every frame
//
function onUpdate(event) {
	// resize the canvas
	$stage.canvas.width  = getCanvasWidth();
	$stage.canvas.height = getCanvasHeight();
	// update the stage
	$stage.update(event)
}

//
// split the hash tag by '/'
//
function hashtagSplit(hashtag) {
	var result = [];
	if (hashtag != undefined && hashtag.substring(0, 3) == '#!:')
	{
		var contents = hashtag.substring(3).split('/');
		var index ;
		for (index = 0; index < contents.length; ++index) {
			if (contents[index].length > 0)
			{
				result.push(contents[index]);
			}
		}
	}
	$log.debug('hashtagSplit(): ' + result.toString());
	return result;
}

//
// createLoadQueue
//
function createLoadQueue()
{
	return (new createjs.LoadQueue(!$local));
}

//
// findAsset
//
function findAsset(name, tags) {
	var index, indexTag1, indexTag2;
	tags = typeof tags !== 'undefined' ? tags : [];
	for (index = 0; index < $assets.length; ++index) {
		var asset = $assets[index];
		if (asset.name.indexOf(name) > -1 ) {
			var matched = true;
			for (indexTag1 = 0; indexTag1 < tags.length; ++indexTag1) {
				var expectedFound = false;
				var expectedTag = tags[indexTag1];
				for (indexTag2 = 0; indexTag2 < asset.tags.length; ++indexTag2) {
					var assetTag = asset.tags[indexTag2];
					if (expectedTag === assetTag) {
						expectedFound = true;
					}
				}
				if (!expectedFound) {
					matched = false;
					break;
				}
			}
			if (matched) {
				return asset;
			}
		}
	}
	return;
}

function findAssetsByTag(tag) {
	var i;
	var result = [];
	for (i = 0; i < $assets.length; i++)
	{
		var asset = $assets[i];
		if (asset.tags.indexOf(tag) > -1)
		{
			result.push(asset);
		}
	}
	return result;
}

//
// canvas width and height
//
var minWidth = 100;
var minHeight = 100;
var maxWidth = 2000;
var maxHeight = 2000;
var padding = 0;

function getCanvasWidth()
{
	var width = window.innerWidth - padding;
	if (width < minWidth)
		return minWidth;
	if (width > maxWidth)
		return maxWidth
	return width;
}

function getCanvasHeight()
{
	var height = window.innerHeight - padding;
	if (height < minHeight)
		return minHeight;
	if (height > maxHeight)
		return maxHeight
	return height;
}

function fadeIn(object) {
	createjs.Tween.get(object).to({alpha:1.0}, 400, createjs.Ease.get(1));
}

function fadeOut(object) {
	createjs.Tween.get(object).to({alpha:0.0}, 400, createjs.Ease.get(-1));
}