function JSEditorHelpCommand(in_args) {
	this.args = in_args;
	this.execute = function() {

	}
}

function JSEditorStartCommand(in_args) {
	this.args = in_args;
	this.execute = function() {
		JSEditor.set_mode(1);
		Display.update_display('--- Begin JS function, type \'exit\' to exit without saving, or \'save\' to save and exit ---');
	}
}

//This command is responsible for saving
//the defined functions into cookies.
function JSEditorSaveCommand(in_args) {

	this.args = in_args;
	this.execute = function() {
		var functionname = this.args[0];
		JSEditor.set_currentfunctionname(functionname);

		//alert('currentfunctionname - ' + JSEditor.get_currentfunctionname());
		//alert('currentfunction - ' + JSEditor.get_currentfunction());
		//eval(JSEditor.get_currentfunction());

		/*In here, do the following:
		* 1) Determine how many cookies the user has already saved
		* 2) Determine how many bytes the user has already saved
		* 3) If either is > max (20 cookies, 4KB), display an error and ask the user
		* 	  to delete a function with 'erase'
		* 4) If not, write the function into a new cookie with the given name
		* 5) Save the function into the list of available user functions in the JSEditor
		*/

		//Writes the function to 'storage'
		if (!functionname) {
			functionname = Math.floor(Math.random() * 1000);
		}
		$.cookie(functionname, JSEditor.get_currentfunction(), {
			expires : 30,
			domain : ''
		});
		JSEditor.set_currentfunction('', 1);
		JSEditor.set_mode(0);
	}
}

/**
 *The append command appends all the values entered
 * to the currentfunction of the JS Editor
 */
function JSEditorAppendCommand(in_args) {
	this.args = in_args;
	this.execute = function() {
		var args = this.args;
		var text = args[args.length - 1];
		for ( i = 0; i < args.length - 1; i++) {
			text += " " + args[i];
		}
		JSEditor.set_currentfunction(text, 1);
	}
}

function JSEditorErrorCommand(in_args) {
	this.execute = function() {
		Display.update_display('\'' + in_args + '\' is not recognized as a command', 0);
	}
}

function JSEditorRunUserFunctionCommand(in_args)
{
	this.func_name = in_args[0];
	this.execute = function()
	{
		var func = $.cookie(this.func_name);
		if(!func)
		{
			Display.update_display('Error - no user defined function with the name '
			+'\''+this.func_name+'\' is available. Use \'list\' to see available'
			+' functions.')
		} else {
			eval(func);
		}
	}
}

function JSEditorListCommand(in_args) {
	this.args = in_args;
	this.execute = function() {
		/*
		 *	In here, do the following:
		 * 	1) Get a list of all cookies set by this domain
		 * 	2) List the keys of these cookies as function names
		 */
		//var cookies = $.cookie();
		var pairs = document.cookie.split(";");
		var cookies = [];
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split("=");
			cookies[i] = unescape(pair[0]);
		}
		if (cookies) {
			Display.update_display('Available user defined functions:');

			for ( i = 0; i < cookies.length; i++) {
				Display.update_display(cookies[i]);
			}
		} else {
			Display.update_display('No user defined functions')
		}

	}
}

function JSEditorEraseCommand(in_args) {
	this.args = in_args;
	this.execute = function() {
		var functionname = this.args[0];
		/*
		 *	In here, do the following:
		 * 	1) Check to see if the function name provided matches an existing cookie key
		 * 	2) If so, erase that cookie by setting it to expire.
		 */
	}
}

function JSEditorHelpCommand(in_args) {
	this.execute = function() {
		Display.update_display('The JS Editor allows you to write your own applications that will run ' + 'on the console. To start defining a function, type \'begin\' and then your JS code. To end your' + 'function, type \'save [name]\'. This will save the function under the given name. Now the function' + 'will be accessible from the console. To return to the console, type \'exit\'');
	}
}

function JSEditorExitCommand(in_args) {
	this.execute = function() {
		JSEditor.set_mode(0);
		Display.set_mode(0);
		JSEditor.set_currentfunction("", 0);
	}
}

function add_user_defined_function() {
	$.cookie('testf', '{alert("test");}');

}

function read_user_defined_function() {
	var f = $.cookie('testf');
	eval(f);
}

function newUserFunctionCommand(in_args) {
	this.args = in_args;
	this.execute = function() {

	}
}
