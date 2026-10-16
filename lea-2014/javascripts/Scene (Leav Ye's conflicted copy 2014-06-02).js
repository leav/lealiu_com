//
// Scene_Background class
//
function Scene_Background(container) {
	this.container = container;
	var	bgAsset = findAsset('background');
	if (bgAsset)
	{
		this.background = AsyncImage.get(bgAsset);
		this.background.on('pressmove', this.onMousePressmove);
		this.container.addChild(this.background);
	}
	else
	{
		$log.error('background asset not found');
	}
}

Scene_Background.prototype.load = function() {
	$log.debug("Scene_Background.load()");
}

Scene_Background.prototype.onMousePressmove = function(event) {
	$log.debug("x:" + event.localX + " y:" + event.localY);
}

Mousetrap.bind('left', function() {
    $log.debug('left');
});

//
// Scene_Panel class
//
function Scene_Panel(container) {
	this.container = container;
	this.panel = new TilingPanel(getCanvasWidth(), getCanvasHeight);
	this.container.addChild(this.panel);
}

Scene_Panel.prototype.load = function(panelTag) {
	$log.debug("Scene_Panel.load(" + panelTag + ")");
	var assets = findAssetsByTag(panelTag);
	this.panel.load(assets)
}