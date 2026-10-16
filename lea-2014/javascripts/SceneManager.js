//
// SceneManager class
//
function SceneManager(container, tags) {
	this.container = container;
	this.tags = tags;
	
	this.background = new Scene_Background(container);
	this.panel = new Scene_Panel(container);
}

SceneManager.prototype.loadPage = function(contents) {
	// background
	this.background.load();
	// panel
	var panelTag = this.getPanelTag(contents);
	if (panelTag)
	{
		this.panel.load(panelTag);
	}
	// content
}

SceneManager.prototype.getPanelTag = function(contents) {
	if (contents.length === 0)
	{
		return;
	}
	var i;
	var content = contents[0];
	if (this.tags.indexOf(content) > -1)
	{
		return content;
	}
	return;
}