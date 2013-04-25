/**
 * This file represents a storage system, implemented as
 * cookies in the user's browser. It wraps the read/write
 * functions for the cookies in an API, and has some 'storage'
 * management, mainly reporting on available space and ensuring
 * that writes that would max out the 4KB storage limit fail. 
 */

function Harddrive()
{
	//we have 20 write sectors (cookies)
	//they will be numbered 0-19
	var sectors = 20;
	
	//we have a max size of 4KB per sector
	//we don't allow users to write to a spot in a sector,
	//only to specify a sector and write to it.
	//we will return the sector number after a successful write
	var max_size = 4000;
	
	//this overwrites a sector with the new data
	this.write = function(sector, value )
	{
		sector = validate_sector_name(sector);
		if(!sector){return false;}
		$.cookie(sector, value, {expires: 30, domain: ''});
		return sector;
	}
	
	//this reads a sectors data and returns it.
	var read = this.read = function(sector, length)
	{
		sector = validate_sector_name(sector);
		if(sector == "false"){return false;}
		val = $.cookie(sector, {path: ''});
		return val;
	}
	
	this.erase = function(sector)
	{
		sector = validate_sector_name(sector);
		if(!sector){return false;}
	}
	
	this.report = function(sector)
	{
		//if there is no sector specified, then write
		//a report for the whole drive
		if(!validate_sector_name(sector))
		{
			sector = null;
		}
		if(sector == null)
		{
			length = 0;
			for(i = 0; i < 20; i++)
			{
				val = read(i);
				if(val != null)
				{
					length = length + val.length;
				}
			}
			return length;
		} 
		else 
		{
			val = read(sector);
			length = val.length;
			return length;
		}
	}
	
	function validate_sector_name(in_name)
	{
		if(in_name == null)
		{
			return false;
		}
		if(in_name.length > 2)
		{
			return false;
		}
		if(parseInt(in_name) == "NaN")
		{
			return false;
		}
		if(in_name > 19 || in_name < 0)
		{
			return false;
		}
		return parseInt(in_name);
	}
	
	function format_drive()
	{
		var c = $.cookie();
		for(i = 0; i < c.length; i++)
		{
			$.removeCookie(c[i]);
		}
	}
	
}
