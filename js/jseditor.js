/**
 * This lets a user add their own custom function using cookies.
 * They are limited to 20 functions, each of which must be < 4KB
 */

//This creates a JSEditor object. This object can
//take over the input console and run it's own commands.
function JSEditor() {
	var mode = 0;
	var currentfunction = "";
	var currentfunctionname = "";
	var command_list = this.command_list = [JSEditorHelpCommand, JSEditorStartCommand, 
	JSEditorSaveCommand, JSEditorAppendCommand, JSEditorRunUserFunctionCommand, 
	JSEditorListCommand, JSEditorEraseCommand, JSEditorExitCommand, JSEditorReportCommand]
	var error_handle = JSEditorErrorCommand;

	this.user_input = function() 
	{
		var cmd = check_command(user_in);
		run_command(cmd);
	}

	this.init = function() {

	}
	var set_mode = this.set_mode = function(newmode)
	{
		mode = newmode;
	}
	
	var get_currentfunction = this.get_currentfunction = function()
	{
		return currentfunction;
	}

	var get_currentfunctionname = this.get_currentfunctionname = function()
	{
		return currentfunctionname;
	}
	
	var set_currentfunctionname = this.set_currentfunctionname = function(newname)	{
		currentfunctionname = newname;
	}
	
	var set_currentfunction = this.set_currentfunction = function(text, mode)
	{
		if(mode == 1)
		{
			currentfunction += text;
		} else if (mode == 0)
		{
			currentfunction = text;
		}
	}
	
	function check_command(user_in) {

		//extract all the words from the typed command, seperated
		//by spaces
		var words = [];
		words = user_in.split(' ');
		var cmd = words[0].toLowerCase();
		var args = [];
		var command = false;
		for ( i = 1; i < words.length; i++) {
			args[i - 1] = words[i].toLowerCase();
		}

		//this checks to see if the command entered was actually valid
		if (mode == 0) {
			c = null;
			for(i = 0; i < command_list.length; i++)
			{
				c = new command_list[i](args);
				if(c.cmd == cmd)
				{
					return c;
				}
			}
			c = new error_handle(cmd);
			return c;
			
		} else if (mode == 1) {
			//only allow the save and exit commands
			//while editing a JS function
			temp_list = [JSEditorSaveCommand, JSEditorExitCommand];
			c = null;
			for(i = 0; i < command_list.length; i++)
			{
				c = new command_list[i](args);
				if(c.cmd == cmd)
				{
					return c;
				}
			}
			args[args.length] = cmd;
			c = new JSEditorAppendCommand(args);
			return c;
		}
		return new JSEditorErrorCommand("");
	}

	function run_command(command) {
		if (mode == 0 && !(command.command)) {
			command.execute();
		} else if (mode == 1) {
			//append this line to the current JS function
			//currentfunction += command.command;
			command.execute();
		}
	}

}
