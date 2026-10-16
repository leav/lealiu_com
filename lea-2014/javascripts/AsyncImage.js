//
// AsyncImage extends createjs.Container
//
function AsyncImage(asset) {
	this.initialize(asset);
}
createjs.EventDispatcher.initialize(AsyncImage.prototype); // mixin EventDispatcher
AsyncImage.prototype = new createjs.Container();

AsyncImage.total = 0;
AsyncImage.loaded = 0;

AsyncImage.prototype.Container_initialize = AsyncImage.prototype.initialize;
AsyncImage.prototype.initialize = function(asset) {
	this.Container_initialize();
	if (asset) {
		this.setAsset(asset);
	}
}

AsyncImage.prototype.setAsset = function(asset) {

	if (this.asset == asset) {
		return;
	}

	this.asset = asset;
	this.width = asset.width;
	this.height = asset.height;

	// place holder rectangle shape
	if (!this.placeHolder) {
		this.placeHolder = new createjs.Shape();
	}
	this.placeHolder.graphics.clear().beginStroke("#AAAAAA").drawRect(0, 0, asset.width, asset.height);
	this.placeHolder.cache();
	this.addChild(this.placeHolder);

	// load the actual image
	var preload = createLoadQueue();
	preload.on("fileload", this.onFileload, this);
	preload.loadFile(asset.path);
	
	AsyncImage.total++;
	
	if (this.bitmap) {
		this.bitmap.image = null;
		//this.bitmap.visible = false;
	}
	this.placeHolder.visible = true;
	
	$stage.needUpdate = true;
}

AsyncImage.prototype.onFileload = function(event) {
	//$log.debug(event.item.src + ' loaded')
	$stage.needUpdate = true;
	AsyncImage.loaded++;
	if (!this.bitmap)
	{
		this.bitmap = new createjs.Bitmap(event.result);
		this.addChild(this.bitmap);
	}
	else
	{
		this.bitmap.image = event.result;
	}
	this.bitmap.visible = true;
	this.placeHolder.visible = false;
	this.dispatchEvent({type: 'fileload', asset : this.asset});
}

AsyncImage.cache = {};
AsyncImage.get = function(asset) {
	if (typeof asset === "string")
	{
		asset = findAsset(asset);
		if (!asset)
		{
			$log.error('asset ' + asset + ' not found');
		}
	}
	//$log.debug("AsyncImage.get(" + asset.name + ")");
	return new AsyncImage(asset);
	// var image = this.cache[asset.path];
	// if (!image)
	// {
		// image = new AsyncImage(asset);
		// this.cache[asset.path] = image;
	// }
	// return image;
}