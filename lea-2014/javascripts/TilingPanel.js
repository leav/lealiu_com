//
// TilingPanel class extends createjs.Container
//
function TilingPanel(assets) {
	this.initialize(assets);
}
TilingPanel.prototype = new createjs.Container();
 
TilingPanel.prototype.Container_initialize = TilingPanel.prototype.initialize;
TilingPanel.prototype.initialize = function(width, height) {
	this.Container_initialize();
	// add custom setup logic here.
	this.width = width;
	this.height = height;
}

TilingPanel.prototype.load = function(assets) {
	this.removeAllChildren();
	this.assets = assets;
	var x, y, i, lineHeight;
	x = y = lineHeight = 0;
	for (i = 0; i < this.assets.length; i++) 
	{
		var asset = this.assets[i];
		var image = AsyncImage.get(asset);
		image.x = x;
		image.y = y;
		this.addChild(image);
		
		if (asset.height > lineHeight)
		{
			lineHeight = asset.height
		}
		x += asset.width;
		if (x > this.width)
		{
			y += lineHeight;
			x = lineHeight = 0;
		}
	}
}