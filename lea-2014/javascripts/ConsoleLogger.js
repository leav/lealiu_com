//
// Logger class
//
function ConsoleLogger() {
}

ConsoleLogger.prototype.log = function() {
	var args = Array.prototype.slice.call(arguments, 0);
	var message = '';
	while (args.length > 0)
	{
		var arg = args.shift();
		if (arg instanceof Array)
		{
			if (message.length > 0)
			{
				console.log(message);
				message = '';
			}
			console.log(arg);
		}
		else
		{
			message += arg;
		}
	}
	if (message.length > 0)
	{
		console.log(message);
	}
}

ConsoleLogger.prototype.debug = function(message) {
	this.log("DEBUG - ", message);
}

ConsoleLogger.prototype.error = function(message) {
	this.log("ERROR - ", message);
}