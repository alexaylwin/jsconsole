/**
 * @author Alex
 */
function Console() {

	
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

		//this checks to see if the command entered was actually valid
		switch(cmd) {
			case "help":
				command = new HelpCommand(args);
				break;
			case "clear":
				command = new ClearCommand(args);
				break;
			case "navigate":
				command = new NavigateCommand(args);
				break;
			case "project":
				command = new ProjectCommand(args);
				break;
			case "jseditor":
				command = new JSEditorCommand(args);
				break;
			case "start":
				command = new StartCommand(args);
				break;
			default:
				command = new ErrorCommand(cmd);
				break;
		}
		return command;
	}

	/**
	 * This function is responsible for checking the CLI state to ensure
	 * that the entered command can be executed. If so, then the execute method
	 * is called and control is passed to the command until it is done operation.
	 *
	 * Some examples of invalid state might be - calling 'projects' while running 'game'
	 *
	 * Currently, no state is implemented, so the command is always executed.
	 */
	function run_command(command) {
		/**
		 * If the mode is zero, we're in the default, we're in the default
		 * command mode, where the user can browse projects etc. This means we
		 * only allow the core subset of commands
		 */
			//if the command is unknown, then run_command will return
			//an artibrary command.
				command.execute();

	}

	/**
	 * This initializes the object, happens after the constructor is run
	 */
	function init() {

	}
	init();

}
