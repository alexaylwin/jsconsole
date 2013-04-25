/**
 * @author Alex
 */
function Console() {

	var command_list = this.command_list = [HelpCommand, ClearCommand, NavigateCommand, ProjectCommand, JSEditorCommand, StartCommand];
	var error_handle = ErrorCommand;
	
	this.user_input = function (user_in)
	{
		var cmd = check_command(user_in);
		run_command(cmd);
	}
	
	/*
	 * This function validates and parses user input into a command
	 * object. This command object (or false, for an unknown command)
	 * is then returned, and run_command is called.
	 */
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
	}

	function run_command(command) {
				command.execute();
	}

	/**
	 * This initializes the object, happens after the constructor is run
	 */
	function init() {

	}
	init();

}
