//
// Works extends createjs.Container
//
function Works() {
	this.initialize();
}
Works.prototype = new createjs.Container();
Works.prototype.Container_initialize = Works.prototype.initialize;
Works.prototype.initialize = function() {
	this.Container_initialize();
	
	var worksTitle = AsyncImage.get('Title_Works');
	this.addChild(worksTitle);
	
	var introPage = new createjs.Container();
	this.addChild(introPage);
	
	var worksBox = new createjs.Shape();
	introPage.addChild(worksBox);
	
	var canvasDiv = document.createElement('div');
	introPage.addChild(new createjs.DOMElement(canvasDiv));
	document.getElementById("mainDiv").appendChild(canvasDiv);
	
	canvasDiv.style.position = 'absolute';
	canvasDiv.style.left = '11%';
	canvasDiv.style.top = '15%';
	canvasDiv.style.width = '78%';
	canvasDiv.style.height = '77%';
	canvasDiv.style.overflowY = 'auto';
	canvasDiv.style.color = 'rgba(255,255,255,1.0)';
	canvasDiv.style.font = '1.0em Calibri';

	var canvas = document.createElement('canvas');
	canvasDiv.appendChild(canvas);
	canvas.id = 'worksCanvas';
	canvas.style.width = '100%';
	canvas.width = 1280;
	var canvasY = 0;
	
	var stage = new createjs.Stage("worksCanvas");
	this.stage = stage;
	stage.enableMouseOver();
	var updateStage = function(){
		if ($state.state == 'Works') {
			stage.update();
		}
	}
	
	var projectTitle = AsyncImage.get('Works_ProjectsUndertaken');
	stage.addChild(projectTitle);
	projectTitle.scaleX = projectTitle.scaleY = 1.0;
	projectTitle.addEventListener('fileload', updateStage);
	canvasY += projectTitle.asset.height * projectTitle.scaleY * 1.2;

	var works = ['Fatloot', 'TLBB', 'MicroEra', 'Honglou', 'ScamperingCarnival', 'BCO'];
	$state.lastWorksTag = works[works.length-1];
	
	var workLogoColumns = 4;
	var workLogoWidth = 0.2;
	var workLogoPadding = 0.04;
	
	var maxHeight = 0;
	var logoX = canvas.width * workLogoPadding;
	var logoColumn = 0;
	works.forEach(function(work){
		AsyncImage.get('Workspage_' + work); // preload
	
		var asset = findAsset('Works_' + work, ['Works']);
		var logo = AsyncImage.get(asset);
		stage.addChild(logo);
		logo.addEventListener('fileload', updateStage);
		logo.x = logoX;
		logo.y = canvasY;
		logo.addEventListener('click', function(){
			$state.switch($state.state, work);
		});
		addCursorPointer(logo);

		logoColumn++;
		if (logo.asset.height > maxHeight) {
			maxHeight = logo.asset.height;
		}
		if (logoColumn >= workLogoColumns) {
			logoX = canvas.width * workLogoPadding;
			canvasY += maxHeight * 1.1;
			logoColumn = 0;
			maxHeight = 0;
		}
		else {
			logoX = (logoColumn * workLogoWidth + (logoColumn + 1) * workLogoPadding) * canvas.width;
		}
	});
	canvasY += maxHeight * 1.1;
	
	var othersTitle = AsyncImage.get('Works_OtherWorksEngagement');
	stage.addChild(othersTitle);
	othersTitle.y = canvasY;
	othersTitle.scaleX = othersTitle.scaleY = 1.0;
	othersTitle.addEventListener('fileload', updateStage);
	canvasY += othersTitle.asset.height * othersTitle.scaleY;
	
	canvas.height = canvasY;
	
	var othersDiv = document.createElement('div');
	canvasDiv.appendChild(othersDiv);
	introPage.addChild(new createjs.DOMElement(othersDiv));
	othersDiv.style['padding-left'] = '1em';

	othersDiv.addHeader = function(text) {
		var element = document.createElement('h3');
		othersDiv.appendChild(element);
		element.appendChild(document.createTextNode(text));
	};
	
	othersDiv.addLine = function(text) {
		var element = document.createElement('span');
		othersDiv.appendChild(element);
		element.style['padding-left'] = '1em';
		element.appendChild(document.createTextNode(text));
		return element;
	};
	
	othersDiv.addLinebreak = function() {
		othersDiv.appendChild(document.createElement('br'));
	}
	
	othersDiv.addURL = function(text, url) {
		var element = document.createElement('a');
		othersDiv.appendChild(element);
		element.href = url;
		element.target = "_blank";
		element.style['padding-left'] = '1em';
		element.style.color = 'rgba(255,255,255,1.0)';
		element.appendChild(document.createTextNode(text));
	};
	
	othersDiv.addHeader('• Online CG lecturer');
	othersDiv.addLine('SUCCOOL, September 2014 – present.');
	othersDiv.addLinebreak();
	othersDiv.addLine('Teaching the skill of CG painting in a 1.5 hour lecture three times a week.');
	othersDiv.addLinebreak();
	
	othersDiv.addHeader('• Poster illustrator');
	othersDiv.addLine('Doll Paradise, August 2014 - present.');
	othersDiv.addLinebreak();
	othersDiv.addLine('Illustrating posters for their new Lolita dress products.');
	othersDiv.addLinebreak();
	
	othersDiv.addHeader('• Contributor (Articles)');
	othersDiv.addLine('Zhihu Daily, Game Grapes Daily, June 2014 - present.');
	othersDiv.addLinebreak();
	othersDiv.addLine('e.g.');
	othersDiv.addLinebreak();
	othersDiv.addURL('How does the inapppurchase (inappurchase) influence the game industry?',
		'http://www.zhihu.com/question/23368865/answer/24488250');
	othersDiv.addLinebreak();
	othersDiv.addURL('How to invite a game artist to join the game developing team?',
		'http://mp.weixin.qq.com/s?__biz=MjM5OTc2ODUxMw==&mid=200241724&idx=2&sn=880b464404884933e071937e268b480b&scene=2&from=timeline&isappinstalled=0#rd');
	othersDiv.addLinebreak();

	othersDiv.addHeader('• Fan-art contributor , 2009 - 2011');
	othersDiv.addLine('Contributing illustrations for following fan-art books: ');
	var line = othersDiv.addLine('Poka Poka Wyvern Village, Dark History, Granado Espada2011, Aurora, Kat.SM, Lacaida, Hundred Baidu Artists, Moe Hunter, Kono Hana, Seasons.')
	line.style['font-style'] = 'italic';
	line.style['padding-left'] = '0';
	
	var detailPage = new AsyncImage();
	this.addChild(detailPage);
	
	var video = document.createElement("iframe");
	document.getElementById("mainDiv").appendChild(video);
	var videoElement = new createjs.DOMElement(video);
	this.addChild(videoElement);
	video.style.position = 'fixed';
	video.allowfullscreen = true;
	video.frameborder = '0';
	var protocol = $local ? 'https:' : '';
	var videoSrcs = {
		'MicroEra' : protocol + '//www.youtube.com/embed/NDmdfsyPiTM',
		'Honglou' : protocol + '//www.youtube.com/embed/iEFAa6e_5jw',
	}
	


	var self = this;
	var doLayout = function() {
	
		var worksIndex = works.indexOf($state.tag);
	
		if ($state.state == 'Works') {
			self.visible = true;
			
			if (worksIndex == -1) {
				$state.prevState = 'About';
				$state.prevTag = null;
				$state.prevPage = null;
			}
			else {
				$state.prevState = 'Works';
				$state.prevPage = null;
				if (worksIndex == 0) {
					$state.prevTag = null;
				}
				else {
					$state.prevTag = works[worksIndex - 1];
				}
			}
			
			if (worksIndex >= works.length - 1) {
				$state.nextState = 'Gallery';
				$state.nextTag = $state.galleryTag;
				$state.nextPage = 1;
			}
			else {
				$state.nextState = 'Works';
				$state.nextTag = works[worksIndex + 1];
				$state.nextPage = null;
			}
			
			// detail pages
			if ($state.tag) {
				var asset;
				if (worksIndex == -1 || !(asset = findAsset('Workspage_' + $state.tag))) {
					$state.switch($state.state);
					return;
				}
				introPage.visible = false;
				detailPage.visible = true;
				detailPage.setAsset(asset);
				var scaleX = getWindowWidth() * 0.82 / asset.width;
				var scaleY = getWindowHeight() * 0.86 / asset.height;
				var scale = scaleX < scaleY ? scaleX : scaleY;
				detailPage.scaleX = detailPage.scaleY = scale;
				detailPage.x = worksBox.x = (getWindowWidth() - asset.width * scale) / 2;
				detailPage.y = worksBox.y = (getWindowHeight() * 0.86 - asset.height * scale) / 2 + getWindowHeight() * 0.11;
				worksBox.width = asset.width * scale;
				worksBox.height = asset.height * scale;
			}
			// intro page
			else {
				introPage.visible = true;
				detailPage.visible = false;
				canvasDiv.focus();
				
				worksBox.width = getWindowWidth() * 0.82;
				worksBox.height = getWindowHeight() * 0.86;
				worksBox.x = (getWindowWidth() - worksBox.width) / 2;
				worksBox.y = getWindowHeight() * 0.1;
				worksBox.radius = getWindowHeight() * 0.02;
				worksBox.graphics.clear().
					beginFill("rgba(0,0,0,0.85)").
					drawRoundRect(0, 0, worksBox.width, worksBox.height, worksBox.radius).
					endFill().
					beginStroke("rgba(128,128,128,0.85)").
					setStrokeStyle(2).
					drawRoundRect(0, 0, worksBox.width, worksBox.height, worksBox.radius);
				worksBox.cache(-4, -4, worksBox.width + 8, worksBox.height + 8);
			}
			
			if ($state.tag == 'MicroEra') {
				videoElement.visible = true;
				video.src = videoSrcs[$state.tag];
				video.style.left = detailPage.x + asset.width * scale * 0.025 + 'px';
				video.style.top = detailPage.y + asset.height * scale * 0.23 + 'px';
				video.width = asset.width * scale * 0.415;
				video.height = asset.height * scale * 0.515;
			}
			else if ($state.tag == 'Honglou') {
				videoElement.visible = true;
				video.src = videoSrcs[$state.tag];
				video.style.left = detailPage.x + asset.width * scale * 0.05 + 'px';
				video.style.top = detailPage.y + asset.height * scale * 0.262 + 'px';
				video.width = asset.width * scale * 0.368;
				video.height = asset.height * scale * 0.43;				}
			else {
				videoElement.visible = false;
			}
			
			worksTitle.x = worksBox.x;
			worksTitle.y = getWindowHeight() * 0.02;
			worksTitle.scaleX = worksTitle.scaleY = getWindowHeight() / worksTitle.asset.height * 0.08;
			
			stage.update();
		}
		else {
			self.visible = false;
			
		}
	}
		
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);

	
	doLayout();
	
}