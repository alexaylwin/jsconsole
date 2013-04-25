/**
 * @author Alex
 *
 * This script file defines all the core commands for the CLI
 * Each command class has a single argument constructor, an args property
 * and an execute method. The run_command function calls the execute
 * method on the recieved command, which can access the display API functions
 * for any update/state change operations.
 *
 * Currently, the display API (defined in displayapi.js) defines accessible
 * methods by places them in the global scope. The execute methods of commands
 * can then call them to perform operations.
 *
 **/

function Command(in_command, in_args) {
	this.command = in_command;
	this.args = in_args;
}

function HelpCommand(in_args) {
	this.args = in_args;
	this.help = "This command displays information about a command or option";
	this.cmd = "help"
	this.execute = function() {
		if (!this.args[0]) {
			var dt = "Available commands are:<br />";
			dt += "project [info] [project name] - lists current projects, launches a project or shows detailed info about a project<br />";
			dt += "navigate [resume, blog, campsoc, projects, github] - navigates to a destination<br />";
			dt += "start [gui, game, snow] - starts an application<br />";
			dt += "clear - clear the display<br />";
			dt += "type help [command, option]<br />";
		} else {
			var dt = "No help exists for '" + this.args[0] + "'";
			for ( i = 0; i < Console.command_list.length; i++) {
				c = new Console.command_list[i]();
				if (c.cmd == this.args[0]) {
					break;
				} else {
					c = null;
				}
			}

			if (c != null) {
				dt = c.help;
			}

		}
		Display.update_display(dt, 0);
	}
}

function ClearCommand(in_args) {
	this.args = in_args;
	this.cmd = "clear";
	this.help = "The clear command clears the console screen."
	this.execute = function() {
		Display.update_display('', 1);
	}
}

function NavigateCommand(in_args) {
	this.args = in_args;
	this.cmd = "navigate";
	this.help = "The navigate command redirects the browser to a destination given by the argument. <br />" + "The accepted arguments are 'resume', 'blog', 'campsoc', 'projects', 'github'"
	this.execute = function() {
		destination = this.args[0];
		switch(destination) {
			case "resume":
				window.location = "http://alexaylwin.campsoc.com/?page_id=24";
				Display.update_display('Redirecting...');
				break;
			case "blog":
				window.location = "http://alexaylwin.campsoc.com/";
				Display.update_display('Redirecting...');
				break;
			case "campsoc":
				window.location = "http://campsoc.com";
				Display.update_display('Redirecting...');
				break;
			case "projects":
				window.location = "http://alexaylwin.campsoc.com";
				Display.update_display('Redirecting...');
				break;
			case "github":
				window.location = "http://github.com/alexaylwin";
				Display.update_display("Redirecting...");
			case "":
				break;
			default:
				Display.update_display("'" + destination + "' is an unknown location");
				break;
		}
	}
}

function StartCommand(in_args) {
	this.args = in_args;
	this.cmd = "start";
	this.help = "The start command runs an application or program. To start the GUI, use the 'gui' argument. There are no other" + " programs installed at this time.;"
	this.execute = function() {
		app = this.args[0];
		switch(app) {
			case "gui":
				window.location = "http://alexaylwin.campsoc.com";
				Display.update_display("Booting GUI...");
				break;
			case "game":
				Display.update_display("Sorry, no games are currently installed :(");
				break;
			case "snow":
				Display.update_display("Sorry, snow is not currently installed :(");
				break;
			case "":
				cmd = new HelpCommand('start');
				cmd.execute();
				break;
			default:
				Display.update_display("Program '" + app + "' is not installed");
		}
	}
}

function ProjectCommand(in_args) {
	this.args = in_args;
	this.cmd = "project";
	this.help = "The project commands gives information about projects that I'm working on, and allows you to navigate to those projects." + "<br /> Type 'project list' for a list of current projects"
	this.execute = function() {
		var arg1 = this.args[0];
		if (!arg1) {
			var dt = "The following lists some projects that are in progress,<br />" + "for the source of these projects, try checking github with 'navigate github'.<br />" + "Current projects:<br />" + "CampusSocial - Campus Social is a social networking dashboard for student clubs<br />" + "Snowflakes - Snowflakes is a simple HTML5/js animation that simulates snowfall<br />" + "NWR - NWR Painting is a website designed with CSS/JS/Photoshop for NWR Painting<br />" + "Playbook - Playbook is an interactive quiz website written entirely in Javascript/CSS where users watch a video and asnwer questions<br/>" + "Ballmer - Ballmer is an interactive site written in ASP.NET to calculate how to acheive the perfect Ballmer Peak for any programming marathon<br/><br />" + "To open a project, use 'project projectname'. For more information about a project, use 'project info projectname'";
			Display.update_display(dt, 0);
		} else if (arg1 == "info") {
			arg2 = this.args[1];
			switch (arg2) {
				case "campussocial":
					var dt = "Campus Social is a social networking dashboard/mashup web application. It " + "was written in 2012 originally for the McMaster Engineering Society. The key feature of Campus Social " + "is that it comes with a customized mobile app (Android) and mobile website (for BB/iPhone). The events " + "posted to the app and mobile site can be synchronized with Facebook events and Twitter messages. The " + "mobile app allows users to RSVP, submit comments and bug reports. <br /> <br />" + "The Android app was written as a template, making it easy to re-brand for a new club, society or other " + "student group. All the apps share a common web service for sending/recieving updates from the website. <br /><br />" + "The website is written in ASP.NET MVC3, and the service was demo'd at CUSEC Democamp 2012, and Hamilton Democamp";
					Display.update_display(dt, 0);
					break;
				case "snowflakes":
					var dt = "Snowflakes is a simple animation written in HTML5 and Javascript. It was a practice application " + "to experiment with HTML5 animation effects. It allows the user to customize the snowfall by changing the " + "wind direction/strength, 'gravity', number of snowflakes, etc.<br /><br />" + "One feature that makes Snowflakes unique is that each snowflake is different. It uses a random number generator " + "and a simple algorithm to randomly generate each snowflake as it falls. Unforunately, this can sometimes lead " + "to some ugly snowflakes...";
					Display.update_display(dt, 0);
					break;
				case "nwr":
					var dt = "NWR is a website made for my cousin's painting company, NWR Painting, based out of Canmore AB. " + "It is included as an example website where the focus was design based, rather than on the functionality " + "of the website. It is a traditional website made in HTML/JS/CSS and Photoshop. In an effort to make the " + "website easily updatable, but still lightweight (ie, no database), I created MiniCMS, now a seperate project";
					Display.update_display(dt, 0);
					break;
				case "playbook":
					var dt = "Playbook is a simple website where the user can watch a video and answer a short quiz about the contents. " + "It was written for a friend who intended it for use with coaching sports. Players could watch a video of a play " + "and quiz themselves on their understanding. <br /> <br />" + "One interesting feature of Playbook is that it is written completely in JS. The questions are read from XML " + "files which define question sets. These question sets include the questions, answers and correct answer " + "for a particular video. This was done in an effort to make the website lightweight (no database or server side code) " + "and because of the simple requirements - no user responses needed to be kept etc.";
					Display.update_display(dt, 0);
					break;
				case "ballmer":
					var dt = "Ballmer is a webapp for calculating how much to drink to achieve the perfect programming state of mind " + +"also known as the Ballmer Peak. For more info, check out the XKCD: http://xkcd.com/323/. It was written with " + "ASP.NET as an experiment with default ASP controls. (That's why it looks so bad..)";
					Display.update_display(dt, 0);
					break;
				default:
					Display.update_display("Unknown project '" + arg2 + "'");
			}
		} else {
			switch (arg1) {
				case "campussocial":
					break;
				case "snowflakes":
					break;
				case "nwr":
					break;
				case "playbook":
					break;
				case "ballmer":
					break;
				default:
					Display.update_display("Unknown project '" + arg1 + "'");
			}
		}
	}
}

function ErrorCommand(in_args) {
	this.cmd = "error";
	this.execute = function() {
		Display.update_display('\'' + in_args + '\' is not recognized as a command', 0);
	}
}

/*
 * This command sets the mode to the JS Console
 * It allows the user to write and save custom functions that can run a program
 * within the console.
 */
function JSEditorCommand() {
	this.help = "The js editor command starts the js editor, which allows users to write their own programs";
	this.cmd = "jseditor";
	this.execute = function() {
		Display.set_mode(1);
	}
}

