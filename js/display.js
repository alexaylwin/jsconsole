/*
 * Display.js
 * 
 * This file is the controller of the CLI. It maintains the
 * state in a variable 'mode', which refers to the running module
 * (ie, Console, JSEditor). It also makes public methods available
 * for displaying to the CLI. It pushes user input into the 
 * currently running module.
 * 
 */

function Display(inputelement, displayelement, cursorelement)
{
	var mode = 0;
	var display = $(displayelement);
	var input = $(inputelement);
	var cursor = $(cursorelement);
	
	
	var inputhistory = [];
	var inputcounter = 0;
	var historymax = 1000;
	var inputhistorypos = 0;
	
	
	var update_display = this.update_display = function(newtext, replace) {
		if (replace) {
			display.html(newtext + '<br />');
		} else {
			displayhtml = display.html();
			displayhtml = displayhtml + newtext + '<br />';
			display.html(displayhtml);
		}
		$('html, body').animate({scrollTop:$(document).height()}, 'slow');
	}
	
	var set_mode = this.set_mode = function(newmode) {
		mode = newmode;
		switch(mode)
		{
			case 0:
				cursor.html('> ');
				update_display('Starting Console', 0);
				input.keyup();
				break;
			case 1:
				cursor.html('JS> ');
				update_display('Starting JS Editor', 0);
				input.keyup();
		}
		
		
	}
	
	var user_input = this.user_input = function(e) {
		//We only send a line to a module after the
		//user enters it. 
		if ( (e.which == 13 || e.keyCode == 13)) {
			user_in = input.val();
			
			//Save the line into history
			i = inputcounter % historymax;
			inputhistory[i] = user_in;
			inputcounter++;
			inputhistorypos = i;
			
			update_display(cursor.html() + user_in, 0);
			input.val('');
			switch(mode)
			{
				case 0:
					Console.user_input(user_in);
					break;
				case 1:
					JSEditor.user_input(user_in);
					break;
				default:
					Console.user_input(user_in);
			}
		} 
		//set the input box to the new command
		else if(e.which == 38 || e.keyCode == 38)
		{
			input.val(inputhistory[inputhistorypos]);
			inputhistorypos--;
			inputhistorypos = (inputhistorypos < 0) ? 0 : inputhistorypos;
		} else if(e.which == 40 || e.keyCode == 40)
		{
			input.val(inputhistory[inputhistorypos]);
			inputhistorypos++;
			inputhistorypos = (inputhistorypos > historymax) ? historymax : inputhistorypos;
			
		}
	}
	
	function init()
	{
		//we bind the input element to the display 
		//user input method
		input.keyup(user_input);
	}
	
	init();

}
