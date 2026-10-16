//
// Contact extends createjs.Container
//
function Contact() {
	this.initialize();
}
Contact.prototype = new createjs.Container();
Contact.prototype.Container_initialize = Contact.prototype.initialize;
Contact.prototype.initialize = function() {
	this.Container_initialize();
	
	var bgBox = new createjs.Shape();
	this.addChild(bgBox);
	
	var title = AsyncImage.get('Title_Contact');
	this.addChild(title);
	
	var email = new createjs.Text('leasylvia0@gmail.com', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(email);
	email.textAlign = 'center';
	
	var phone = new createjs.Text('(+86)15210665245', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(phone);
	phone.textAlign = 'center';
	
	var social = new createjs.Text('Social Media:', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(social);
	social.textAlign = 'center';
	
	var socialMedia = new SocialMedia();
	this.addChild(socialMedia);
	
	var QR = new createjs.Text('QR Code:', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(QR);
	QR.textAlign = 'center';
	
	var QRQQ = AsyncImage.get('QR_QQ');
	this.addChild(QRQQ);

	var QRWeChat = AsyncImage.get('QR_WeChat');
	this.addChild(QRWeChat);
	
	var QQ = new createjs.Text('QQ', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(QQ);
	QQ.textAlign = 'center';
	
	var WeChat = new createjs.Text('WeChat', '1em Calibri', 'rgba(255,255,255,1.0)');
	this.addChild(WeChat);
	WeChat.textAlign = 'center';
	
	var self = this;
	var doLayout = function() {
		if ($state.state == 'Contact') {
			self.visible = true;
			
			$state.nextState = 'Home';
			$state.nextTag = $state.nextPage = null;
			
			$state.prevState = 'Gallery';
			$state.prevTag = $state.galleryTag;
			$state.prevPage = -1;
			
			bgBox.width = getWindowWidth() * 0.60;
			bgBox.height = getWindowHeight() * 0.86;
			bgBox.x = (getWindowWidth() - bgBox.width) / 2;
			bgBox.y = getWindowHeight() * 0.1;
			bgBox.radius = getWindowHeight() * 0.02;
			bgBox.graphics.clear().
				beginFill("rgba(0,0,0,0.85)").
				drawRoundRect(0, 0, bgBox.width, bgBox.height, bgBox.radius).
				endFill().
				beginStroke("rgba(128,128,128,0.85)").
				setStrokeStyle(2).
				drawRoundRect(0, 0, bgBox.width, bgBox.height, bgBox.radius);
			bgBox.cache(-4, -4, bgBox.width + 8, bgBox.height + 8)

			title.regX = title.asset.width / 2;
			title.regY = title.asset.height / 2;
			title.x = getWindowWidth() / 2;
			title.y = getWindowHeight() * 0.18;
			title.scaleX = title.scaleY = getWindowHeight() * 0.15 / title.asset.height;
			
			email.font = getWindowHeight() * 0.03 + 'px Calibri';
			email.x = getWindowWidth() / 2;
			email.y = getWindowHeight() * 0.30;

			phone.font = getWindowHeight() * 0.03 + 'px Calibri';
			phone.x = getWindowWidth() / 2;
			phone.y = getWindowHeight() * 0.34;

			social.font = getWindowHeight() * 0.03 + 'px Calibri';
			social.x = getWindowWidth() / 2;
			social.y = getWindowHeight() * 0.42;
			
			socialMedia.regX = socialMedia.width / 2;
			socialMedia.regY = socialMedia.height / 2;
			socialMedia.x = getWindowWidth() / 2;
			socialMedia.y = getWindowHeight() * 0.50;
			socialMedia.scaleX = socialMedia.scaleY = getWindowHeight() * 0.05 / socialMedia.height;
			
			QR.font = getWindowHeight() * 0.03 + 'px Calibri';
			QR.x = getWindowWidth() / 2;
			QR.y = getWindowHeight() * 0.56;
			
			QRQQ.regX = QRQQ.asset.width / 2;
			QRQQ.regY = QRQQ.asset.height / 2;
			
			QRWeChat.regX = QRWeChat.asset.width / 2;
			QRWeChat.regY = QRWeChat.asset.height / 2;
			
			QRQQ.y = QRWeChat.y = getWindowHeight() * 0.73;
			QRQQ.scaleX = QRQQ.scaleY = getWindowHeight() * 0.23 / QRQQ.asset.height;
			QRWeChat.scaleX = QRWeChat.scaleY = getWindowHeight() * 0.23 / QRWeChat.asset.height;
			QRQQ.x = (getWindowWidth() * 0.98 - getWindowHeight() * 0.05 - QRQQ.asset.width * QRQQ.scaleX) / 2;
			QRWeChat.x = (getWindowWidth() * 0.98 + getWindowHeight() * 0.05 + QRWeChat.asset.width * QRWeChat.scaleX) / 2;
			
			QQ.font = getWindowHeight() * 0.03 + 'px Calibri';
			QQ.x = QRQQ.x;

			WeChat.font = getWindowHeight() * 0.03 + 'px Calibri';
			WeChat.x = QRWeChat.x;
			
			QQ.y = WeChat.y = getWindowHeight() * 0.85;
		}
		else {
			self.visible = false;
		}
	}
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);

	doLayout();

}