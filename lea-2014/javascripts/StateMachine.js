function StateMachine() {
	this.state = null;
	
	this.browseTimeout = 3;
	this.browseCount = 0;
	this.justStartBrowsing = false;
	var self = this;
	createjs.Ticker.addEventListener("tick", function(event){
		if (self.browsing) {
			self.browseCount += event.delta / 1000;
			self.justStartBrowsing = false;
			if (self.browseCount >= self.browseTimeout) {
				self.browseCount = 0;
				if (self.nextState) {
					self.switch(self.nextState, self.nextTag, self.nextPage, self.nextImage, true);
				}
				else {
					self.switch(self.nextState, self.nextTag, self.nextPage, self.nextImage, false);
				}
			}
		}
	});
	
	document.addEventListener('click', function(){
		if (!self.justStartBrowsing) {
			self.stopBrowsing();
		}
	});
}

createjs.EventDispatcher.initialize(StateMachine.prototype); // mixin EventDispatcher

StateMachine.prototype.switch = function(state, tag, page, image, browsing) {
	// var args = Array.prototype.slice.call(arguments);
	// var state = args.shift();
	
	console.log('switch ' + this.state + ' -> ' + state);
	
	if (!browsing) {
		this.stopBrowsing();
	}
	var oldState = this.state;
	var oldTag = this.tag;
	var oldPage = this.page;
	var oldImage = this.image;
	this.state = state;
	this.tag = tag;
	this.page = page;
	this.image = image;
	this.dispatchEvent({type: 'switch', oldState : oldState, newState : state,
		oldTag : oldTag, newTag : tag,
		oldPage : oldPage, newPage : page,
		oldImage : oldImage, newImage : image
		});
}

StateMachine.prototype.startBrowsing = function() {
	this.browsing = true;
	this.justStartBrowsing = true;
	this.browseCount = this.browseTimeout;
	// $log.debug('this.browseCount ' + this.browseCount + ' this.browseTimeout ' + this.browseTimeout);
}

StateMachine.prototype.stopBrowsing = function() {
	this.browsing = false;
}

// function StateMachineTest() {
	// var machine = new StateMachine();
	// machine['enterState1'] = function (){console.log("enter state 1")};
	// machine['exitState1'] = function (){console.log("exit state 1")};
	// machine['enterState2'] = function (){console.log("enter state 2")};
	
	// machine.switch('State1');
	// machine.switch('State2');
	
	// console.log(machine);
// }

