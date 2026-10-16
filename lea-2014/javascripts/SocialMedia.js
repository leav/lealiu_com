//
// SocialMedia extends createjs.Container
//
function SocialMedia() {
	this.initialize();
}
SocialMedia.prototype = new createjs.Container();
SocialMedia.prototype.Container_initialize = SocialMedia.prototype.initialize;
SocialMedia.prototype.initialize = function() {
	this.Container_initialize();
	
	var x = 0;
	var padding = 10;
	var icons = ['Pixiv', 'LinkedIn', 'Facebook', 'Weibo'];
	var urls = {
		'Pixiv' : 'http://www.pixiv.net/member.php?id=979516',
		'LinkedIn' : 'https://www.linkedin.com/profile/view?id=336470518',
		'Facebook' : 'https://www.facebook.com/profile.php?id=100005782034777',
		'Weibo' : 'http://weibo.com/leasybo',
	};
	var height = 0;
	var self = this;
	
	var a = document.createElement('a');
	a.setAttribute('target', '_blank');
	
	icons.forEach(function(icon){
		if (x > 0) {
			x += padding;
		}
		var image = AsyncImage.get('Icon_' + icon);
		self.addChild(image);
		image.x = x;
		if (image.asset.height > height) {
			height = image.asset.height;
		}
		x += image.asset.width;
		image.name = icon;
		image.addEventListener('click', function(){
			if (urls[image.name]) {
				a.setAttribute('href', urls[image.name]);
				a.click();
			}
		});
		
		addCursorPointer(image);
	});
	this.width = x;
	this.height = height;
}