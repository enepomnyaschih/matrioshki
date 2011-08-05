/**
 * jQuery Templates
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by: Stan Lemon <stanlemon@mac.com>
 *
 * Based off of the Ext.Template library, available at:
 * http://www.extjs.com
 *
 * This library provides basic templating functionality, allowing for macro-based
 * templates within jQuery.
 *
 * Basic Usage:
 *
 * var t = $.template('<div id="foo">Hello ${name}, how are you ${question}?  I am ${me:substr(0,10)}</div>');
 *
 * $(selector).append( t , {
 *     name: 'Stan',
 *     question: 'feeling',
 *     me: 'doing quite well myself, thank you very much!'
 * });
 *
 * Requires: jQuery 1.2+
 *
 *
 * @todo    Add callbacks to the DOM manipulation methods, so that events can be bound
 *          to template nodes after creation.
 */
(function($){
	
	/**
	 * Create a New Template
	 */
	$.template = function(html, options) {
		return new $.template.instance(html, options);
	};

	/**
	 * Template constructor - Creates a new template instance.
	 *
	 * @param 	html 	The string of HTML to be used for the template.
	 * @param 	options An object of configurable options.  Currently
	 * 			you can toggle compile as a boolean value and set a custom
	 *          template regular expression on the property regx by
	 *          specifying the key of the regx to use from the regx object.
	 */
	$.template.instance = function(html, options) {
        // If a custom regular expression has been set, grab it from the regx object
        if ( options && options['regx'] ) options.regx = this.regx[ options.regx ];

		this.options = $.extend({
			compile: 		false,
			regx:           this.regx.standard
		}, options || {});

		this.html = html;

		if (this.options.compile) {
			this.compile();   
		}
		this.isTemplate = true;
	};

	/**
	 * Regular Expression for Finding Variables
	 *
	 * The default pattern looks for variables in JSP style, the form of: ${variable}
	 * There are also regular expressions available for ext-style variables and
	 * jTemplate style variables.
	 *
	 * You can add your own regular expressions for variable ussage by doing.
	 * $.extend({ $.template.re , {
	 *     myvartype: /...../g
	 * }
	 *
	 * Then when creating a template do:
	 * var t = $.template("<div>...</div>", { regx: 'myvartype' });
	 */
	$.template.regx = $.template.instance.prototype.regx = {
	    jsp:        /\$\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        ext:        /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        jtemplates: /\{\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}\}/g
	};
	
	/**
	 * Set the standard regular expression to be used.
	 */
	$.template.regx.standard = $.template.regx.jsp;
	
	/**
	 * Variable Helper Methods
	 *
	 * This is a collection of methods which can be used within the variable syntax, ie:
	 * ${variable:substr(0,30)} Which would only print a substring, 30 characters in length
	 * begining at the first character for the variable named "variable".
	 *
	 * A basic substring helper is provided as an example of how you can define helpers.
	 * To add more helpers simply do:
	 * $.extend( $.template.helpers , {
	 *	 sampleHelper: function() { ... }	
	 * });
	 */
	$.template.helpers = $.template.instance.prototype.helpers = {
		substr : function(value, start, length){
			return String(value).substr(start, length);
		}
	};


	/**
	 * Template Instance Methods
	 */
	$.extend( $.template.instance.prototype, {
		
		/**
		 * Apply Values to a Template
		 *
		 * This is the macro-work horse of the library, it receives an object
		 * and the properties of that objects are assigned to the template, where
		 * the variables in the template represent keys within the object itself.
		 *
		 * @param 	values 	An object of properties mapped to template variables
		 */
		apply: function(values) {
			if (this.options.compile) {
				return this.compiled(values);
			} else {
				var tpl = this;
				var fm = this.helpers;

				var fn = function(m, name, format, args) {
					if (format) {
						if (format.substr(0, 5) == "this."){
							return tpl.call(format.substr(5), values[name], values);
						} else {
							if (args) {
								// quoted values are required for strings in compiled templates, 
								// but for non compiled we need to strip them
								// quoted reversed for jsmin
								var re = /^\s*['"](.*)["']\s*$/;
								args = args.split(',');

								for(var i = 0, len = args.length; i < len; i++) {
									args[i] = args[i].replace(re, "$1");
								}
								args = [values[name]].concat(args);
							} else {
								args = [values[name]];
							}

							return fm[format].apply(fm, args);
						}
					} else {
						return values[name] !== undefined ? values[name] : "";
					}
				};

				return this.html.replace(this.options.regx, fn);
			}
		},

		/**
		 * Compile a template for speedier usage
		 */
		compile: function() {
			var sep = $.browser.mozilla ? "+" : ",";
			var fm = this.helpers;

			var fn = function(m, name, format, args){
				if (format) {
					args = args ? ',' + args : "";

					if (format.substr(0, 5) != "this.") {
						format = "fm." + format + '(';
					} else {
						format = 'this.call("'+ format.substr(5) + '", ';
						args = ", values";
					}
				} else {
					args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
				}
				return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
			};

			var body;

			if ($.browser.mozilla) {
				body = "this.compiled = function(values){ return '" +
					   this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn) +
						"';};";
			} else {
				body = ["this.compiled = function(values){ return ['"];
				body.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn));
				body.push("'].join('');};");
				body = body.join('');
			}
			eval(body);
			return this;
		}
	});


	/**
	 * Save a reference in this local scope to the original methods which we're 
	 * going to overload.
	 **/
	var $_old = {
	    domManip: $.fn.domManip,
	    text: $.fn.text,
	    html: $.fn.html
	};

	/**
	 * Overwrite the domManip method so that we can use things like append() by passing a 
	 * template object and macro parameters.
	 */
	$.fn.domManip = function( args, table, reverse, callback ) {
		if (args[0].isTemplate) {
			// Apply the template and it's arguments...
			args[0] = args[0].apply( args[1] );
			// Get rid of the arguements, we don't want to pass them on
			delete args[1];
		}

		// Call the original method
		var r = $_old.domManip.apply(this, arguments);

		return r;
	};

    /**
     * Overwrite the html() method
     */
	$.fn.html = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.html.apply(this, [value]);

		return r;
	};
	
	/**
	 * Overwrite the text() method
	 */
	$.fn.text = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.text.apply(this, [value]);

		return r;
	};

})(jQuery);/*
 * Date prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds dayNames, abbrDayNames, monthNames and abbrMonthNames static properties and isLeapYear,
 * isWeekend, isWeekDay, getDaysInMonth, getDayName, getMonthName, getDayOfYear, getWeekOfYear,
 * setDayOfYear, addYears, addMonths, addDays, addHours, addMinutes, addSeconds methods
 *
 * Copyright (c) 2006 Jörn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 *
 * Additional methods and properties added by Kelvin Luck: firstDayOfWeek, dateFormat, zeroTime, asString, fromString -
 * I've added my name to these methods so you know who to blame if they are broken!
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * An Array of day names starting with Sunday.
 * 
 * @example dayNames[0]
 * @result 'Sunday'
 *
 * @name dayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * An Array of abbreviated day names starting with Sun.
 * 
 * @example abbrDayNames[0]
 * @result 'Sun'
 *
 * @name abbrDayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * An Array of month names starting with Janurary.
 * 
 * @example monthNames[0]
 * @result 'January'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * An Array of abbreviated month names starting with Jan.
 * 
 * @example abbrMonthNames[0]
 * @result 'Jan'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The first day of the week for this locale.
 *
 * @name firstDayOfWeek
 * @type Number
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.firstDayOfWeek = 1;

/**
 * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.format = 'mm/dd/yyyy';
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

/**
 * The first two numbers in the century to be used when decoding a two digit year. Since a two digit year is ambiguous (and date.setYear
 * only works with numbers < 99 and so doesn't allow you to set years after 2000) we need to use this to disambiguate the two digit year codes.
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.fullYearStart = '20';

(function() {

	/**
	 * Adds a given method under the given name 
	 * to the Date prototype if it doesn't
	 * currently exist.
	 *
	 * @private
	 */
	function add(name, method) {
		if( !Date.prototype[name] ) {
			Date.prototype[name] = method;
		}
	};
	
	/**
	 * Checks if the year is a leap year.
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isLeapYear();
	 * @result true
	 *
	 * @name isLeapYear
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isLeapYear", function() {
		var y = this.getFullYear();
		return (y%4==0 && y%100!=0) || y%400==0;
	});
	
	/**
	 * Checks if the day is a weekend day (Sat or Sun).
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekend();
	 * @result false
	 *
	 * @name isWeekend
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekend", function() {
		return this.getDay()==0 || this.getDay()==6;
	});
	
	/**
	 * Check if the day is a day of the week (Mon-Fri)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekDay();
	 * @result false
	 * 
	 * @name isWeekDay
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekDay", function() {
		return !this.isWeekend();
	});
	
	/**
	 * Gets the number of days in the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDaysInMonth();
	 * @result 31
	 * 
	 * @name getDaysInMonth
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDaysInMonth", function() {
		return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
	});
	
	/**
	 * Gets the name of the day.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName();
	 * @result 'Saturday'
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName(true);
	 * @result 'Sat'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getDayName", function(abbreviated) {
		return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
	});

	/**
	 * Gets the name of the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName();
	 * @result 'Janurary'
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName(true);
	 * @result 'Jan'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getMonthName", function(abbreviated) {
		return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
	});

	/**
	 * Get the number of the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayOfYear();
	 * @result 11
	 * 
	 * @name getDayOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDayOfYear", function() {
		var tmpdtm = new Date("1/1/" + this.getFullYear());
		return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
	});
	
	/**
	 * Get the number of the week of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getWeekOfYear();
	 * @result 2
	 * 
	 * @name getWeekOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getWeekOfYear", function() {
		return Math.ceil(this.getDayOfYear() / 7);
	});

	/**
	 * Set the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.setDayOfYear(1);
	 * dtm.toString();
	 * @result 'Tue Jan 01 2008 00:00:00'
	 * 
	 * @name setDayOfYear
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("setDayOfYear", function(day) {
		this.setMonth(0);
		this.setDate(day);
		return this;
	});
	
	/**
	 * Add a number of years to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addYears(1);
	 * dtm.toString();
	 * @result 'Mon Jan 12 2009 00:00:00'
	 * 
	 * @name addYears
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addYears", function(num) {
		this.setFullYear(this.getFullYear() + num);
		return this;
	});
	
	/**
	 * Add a number of months to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMonths(1);
	 * dtm.toString();
	 * @result 'Tue Feb 12 2008 00:00:00'
	 * 
	 * @name addMonths
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMonths", function(num) {
		var tmpdtm = this.getDate();
		
		this.setMonth(this.getMonth() + num);
		
		if (tmpdtm > this.getDate())
			this.addDays(-this.getDate());
		
		return this;
	});
	
	/**
	 * Add a number of days to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addDays(1);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addDays
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addDays", function(num) {
		this.setDate(this.getDate() + num);
		return this;
	});
	
	/**
	 * Add a number of hours to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addHours(24);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addHours
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addHours", function(num) {
		this.setHours(this.getHours() + num);
		return this;
	});

	/**
	 * Add a number of minutes to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMinutes(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 01:00:00'
	 * 
	 * @name addMinutes
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMinutes", function(num) {
		this.setMinutes(this.getMinutes() + num);
		return this;
	});
	
	/**
	 * Add a number of seconds to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addSeconds(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name addSeconds
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addSeconds", function(num) {
		this.setSeconds(this.getSeconds() + num);
		return this;
	});
	
	/**
	 * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
	 * 
	 * @example var dtm = new Date();
	 * dtm.zeroTime();
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name zeroTime
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("zeroTime", function() {
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	});
	
	/**
	 * Returns a string representation of the date object according to Date.format.
	 * (Date.toString may be used in other places so I purposefully didn't overwrite it)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.asString();
	 * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name asString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("asString", function(format) {
		var r = format || Date.format;
		if (r.split('mm').length>1) { // ugly workaround to make sure we don't replace the m's in e.g. noveMber
			r = r.split('mmmm').join(this.getMonthName(false))
				.split('mmm').join(this.getMonthName(true))
				.split('mm').join(_zeroPad(this.getMonth()+1))
		} else {
			r = r.split('m').join(this.getMonth()+1);
		}
		r = r.split('yyyy').join(this.getFullYear())
			.split('yy').join((this.getFullYear() + '').substring(2))
			.split('dd').join(_zeroPad(this.getDate()))
			.split('d').join(this.getDate());
		return r;
	});
	
	/**
	 * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
	 * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
	 *
	 * @example var dtm = Date.fromString("12/01/2008");
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name fromString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	Date.fromString = function(s)
	{
		var f = Date.format;
		
		var d = new Date('01/01/1970');
		
		if (s == '') return d;

		s = s.toLowerCase();
		var matcher = '';
		var order = [];
		var r = /(dd?d?|mm?m?|yy?yy?)+([^(m|d|y)])?/g;
		var results;
		while ((results = r.exec(f)) != null)
		{
			switch (results[1]) {
				case 'd':
				case 'dd':
				case 'm':
				case 'mm':
				case 'yy':
				case 'yyyy':
					matcher += '(\\d+\\d?\\d?\\d?)+';
					order.push(results[1].substr(0, 1));
					break;
				case 'mmm':
					matcher += '([a-z]{3})';
					order.push('M');
					break;
			}
			if (results[2]) {
				matcher += results[2];
			}
			
		}
		var dm = new RegExp(matcher);
		var result = s.match(dm);
		for (var i=0; i<order.length; i++) {
			var res = result[i+1];
			switch(order[i]) {
				case 'd':
					d.setDate(res);
					break;
				case 'm':
					d.setMonth(Number(res)-1);
					break;
				case 'M':
					for (var j=0; j<Date.abbrMonthNames.length; j++) {
						if (Date.abbrMonthNames[j].toLowerCase() == res) break;
					}
					d.setMonth(j);
					break;
				case 'y':
					d.setYear(res);
					break;
			}
		}

		return d;
	};
	
	// utility method
	var _zeroPad = function(num) {
		var s = '0'+num;
		return s.substring(s.length-2)
		//return ('0'+num).substring(-2); // doesn't work on IE :(
	};
	
})();/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

/* For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
*/

if (!this.JSON) {
  this.JSON = {};
}

(function () {

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }

  if (typeof Date.prototype.toJSON !== 'function') {

    Date.prototype.toJSON = function (key) {

      return isFinite(this.valueOf()) ?
      this.getUTCFullYear()   + '-' +
      f(this.getUTCMonth() + 1) + '-' +
      f(this.getUTCDate())      + 'T' +
      f(this.getUTCHours())     + ':' +
      f(this.getUTCMinutes())   + ':' +
      f(this.getUTCSeconds())   + 'Z' : null;
    };

    String.prototype.toJSON =
    Number.prototype.toJSON =
    Boolean.prototype.toJSON = function (key) {
      return this.valueOf();
    };
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  gap,
  indent,
  meta = {    // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"' : '\\"',
    '\\': '\\\\'
  },
  rep;


  function quote(string) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ?
    '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string' ? c :
      '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' :
      '"' + string + '"';
    }


    function str(key, holder) {

      // Produce a string from holder[key].

      var i,          // The loop counter.
      k,          // The member key.
      v,          // The member value.
      length,
      mind = gap,
      partial,
      value = holder[key];

      // If the value has a toJSON method, call it to obtain a replacement value.

      if (value && typeof value === 'object' &&
      typeof value.toJSON === 'function') {
        value = value.toJSON(key);
      }

      // If we were called with a replacer function, then call the replacer to
      // obtain a replacement value.

      if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
      }

      // What happens next depends on the value's type.

      switch (typeof value) {
        case 'string':
        return quote(value);

        case 'number':

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

        // If the type is 'object', we might be dealing with an object or an array or
        // null.

        case 'object':

        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) {
          return 'null';
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === '[object Array]') {

          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0 ? '[]' :
          gap ? '[\n' + gap +
          partial.join(',\n' + gap) + '\n' +
          mind + ']' :
          '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            k = rep[i];
            if (typeof k === 'string') {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {

          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' :
        gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
        mind + '}' : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
      }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
      JSON.stringify = function (value, replacer, space) {

        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a JSON text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.

        var i;
        gap = '';
        indent = '';

        // If the space parameter is a number, make an indent string containing that
        // many spaces.

        if (typeof space === 'number') {
          for (i = 0; i < space; i += 1) {
            indent += ' ';
          }

          // If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === 'string') {
          indent = space;
        }

        // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
        (typeof replacer !== 'object' ||
        typeof replacer.length !== 'number')) {
          throw new Error('JSON.stringify');
        }

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.

        return str('', {'': value});
      };
    }


    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
      JSON.parse = function (text, reviver) {

        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid JSON text.

        var j;

        function walk(holder, key) {

          // The walk method is used to recursively walk the resulting structure so
          // that modifications can be made.

          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
            for (k in value) {
              if (Object.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        }


        // Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.

        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (a) {
            return '\\u' +
            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
        }

        // In the second stage, we run the text against regular expressions that look
        // for non-JSON patterns. We are especially concerned with '()' and 'new'
        // because they can cause invocation, and '=' because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.

        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
        // replace all simple value tokens with ']' characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or ']' or
        // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

        if (/^[\],:{}\s]*$/.
          test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

            // In the third stage we use the eval function to compile the text into a
            // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
            // in JavaScript: it can begin a block or an object literal. We wrap the text
            // in parens to eliminate the ambiguity.

            j = eval('(' + text + ')');

            // In the optional fourth stage, we recursively walk the new structure, passing
            // each name/value pair to a reviver function for possible transformation.

            return typeof reviver === 'function' ?
            walk({'': j}, '') : j;
          }

          // If the text is not JSON parseable, then a SyntaxError is thrown.

          throw new SyntaxError('JSON.parse');
        };
      }
      }());
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

function getMD5Algorithms() {

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}



return {
	hex			: hex_md5,
	b64			: b64_md5,
	any			: any_md5,
	hex_hmac	: hex_hmac_md5,
	b64_hmac	: b64_hmac_md5,
	any_hmac	: any_hmac_md5
};

}

var MD5 = getMD5Algorithms();
/*
    JW namespace with various utility methods.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

window.JW = window.JW || {};

$.extend(JW, {
    /**
     * Define namespace.
     * Examples:
     * JW.ns("BBB.AAA");
     * JW.ns("JW.MyNS.A");
     */
    ns: function(ns)
    {
        var p = ns.split(".");
        var r = window;
        for (var i = 0; i < p.length; ++i)
        {
            var n = p[i];
            r[n] = r[n] || {};
            r = r[n];
        }
    },
    
    /**
     * Test whether v is array.
     */
    isArray: function(v)
    {
        return Object.prototype.toString.apply(v) === '[object Array]';
    },
    
    /**
     * Test whether v is object.
     */
    isObject: function(v)
    {
        return Object.prototype.toString.apply(v) === '[object Object]';
    },
    
    /**
     * Test whether v is not undefined.
     */
    isDefined: function(v)
    {
        return typeof v !== "undefined";
    },
    
    /**
     * Test whether v is not undefined or null.
     */
    isSet: function(v)
    {
        return (typeof v !== "undefined") && (v !== null);
    },
    
    /**
     * Test whether v is not undefined, null, false, 0, empty string or empty array.
     */
    isEmpty: function(v)
    {
        return (!v) || (v === "") || (JW.isArray(v) && !v.length);
    },
    
    /**
     * If v is defined, returns one, else returns d as default value.
     */
    def: function(v, d)
    {
        return JW.isDefined(v) ? v : d;
    },
    
    /**
     * If v is set, returns one, else returns d as default value.
     */
    defn: function(v, d)
    {
        return JW.isSet(v) ? v : d;
    },
    
    /**
     * Extends target object with fields of defaults object.
     * Does not override defined values.
     */
    applyIf: function(target, defaults)
    {
        for (var i in defaults)
        {
            if (!JW.isDefined(target[i]))
                target[i] = defaults[i];
        }
        
        return target;
    },
    
    /**
     * Extends target object with fields of defaults object.
     * Does not override defined and not null values.
     */
    applyIfn: function(target, defaults)
    {
        for (var i in defaults)
        {
            if (!JW.isSet(target[i]))
                target[i] = defaults[i];
        }
        
        return target;
    },
    
    /**
     * Builds new object from source removing all undefined values.
     */
    clean: function(source)
    {
        var result = {};
        for (var i in source)
        {
            if (JW.isDefined(source[i]))
                result[i] = source[i];
        }
        return result;
    },
    
    /**
     * Builds new object from source removing all undefined and null values.
     */
    cleann: function(source)
    {
        var result = {};
        for (var i in source)
        {
            if (JW.isSet(source[i]))
                result[i] = source[i];
        }
        return result;
    },
    
    /**
     * Converts arguments object to array.
     */
    args: function(
        a,      // [required] Arguments
        index,  // [optional] Integer, starting index to slice arguments
        count)  // [optional] Integer, count of arguments to slice
    {
        index = index || 0;
        count = count || a.length - index;
        
        var r = [];
        for (var i = 0; i < count; ++i)
            r.push(a[index + i]);
        
        return r;
    },
    
    /**
     * Empty function.
     */
    emptyFn: function() {},
    
    /**
     * Replaces all special characters from text to put it into html properly.
     */
    htmlEncode: function(text)
    {
        return String(text).
            replace(/&/g, "&amp;").
            replace(/>/g, "&gt;").
            replace(/</g, "&lt;").
            replace(/"/g, "&quot;");
    },
    
    /**
     * Removes all <script> tags from html to prevent scripting.
     */
    removeScripts: function(html)
    {
        var result = [];
        var index = 0;
        while (true)
        {
            var from = html.indexOf("<script", index);
            if (from == -1)
                break;
            
            result.push(html.substr(index, from - index));
            index = html.indexOf("</script>", from) + 9;
            
            if (index == -1)
                return result.join("");
        }
        
        result.push(html.substr(index));
        return result.join("");
    },
    
    /**
     * Extends structured string dictionary simple values to full ones.
     * Source is tree-structured dictionary.
     * Source and each subobject must contain "_base" key.
     * All values in N-level subobject will be equal to _base0 + .. + _baseN + value.
     * See samples/01_Core.
     */
    evaluateDictionary: function(source)
    {
        function rec(target, base)
        {
            base = base + target._base;
            for (var key in target)
            {
                var value = target[key];
                if (key === "_base")
                {
                    target[key] = base;
                    continue;
                }
                
                if (typeof value === "string")
                {
                    target[key] = base + value;
                    continue;
                }
                
                rec(value, base);
            }
        }
        
        rec(source, "");
        
        return source;
    },
    
    /**
     * Values comparison function.
     */
    cmp: function(x, y, caseInsensitive)
    {
        if (JW.isArray(x) && JW.isArray(y))
            return Array.cmp(x, y, caseInsensitive);
        
        if (caseInsensitive)
        {
            if (typeof x === "string")
                x = x.toLowerCase();
            
            if (typeof y === "string")
                y = y.toLowerCase();
        }
        
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
    },
    
    /**
     * Iterates object or array.
     */
    each: function(
        source,     // [required] Object or Array
        callback,   // [required] Function(item, key, source)
        scope)      // [optional] Object
    {
        if (JW.isArray(source))
        {
            for (var i = 0; i < source.length; ++i)
                callback.call(scope || this, source[i], i, source);
        }
        else
        {
            for (var i in source)
                callback.call(scope || this, source[i], i, source);
        }
    },
    
    /**
     * Returns obj[field] where field is "xxx.xxx.xxx".
     * Returns undefined if can't retrieve specified value.
     * Returns obj if field is empty.
     */
    get: function(obj, field, def)
    {
        if (JW.isEmpty(field))
            return JW.def(obj, def);
        
        field = field.split(".");
        for (var i = 0; i < field.length; ++i)
        {
            if (!obj)
                return def;
            
            obj = obj[field[i]];
        }
        
        return JW.def(obj, def);
    },
    
    equal: function(x, y, recursively, strict)
    {
        var pairs = [];
        var eq = strict ? JW.seq : JW.eq;
        var req;
        
        function rec(x, y)
        {
            // Either not object/array
            if (typeof x !== "object" || typeof y !== "object")
                return eq(x, y);
            
            // May be the same?
            if (x === y)
                return true;
            
            // May be have different type? (object/array)
            var xa = JW.isArray(x);
            var ya = JW.isArray(y);
            
            if (xa !== ya)
                return false;
            
            // May be this is infinite inclusion?
            for (var i = 0; i < pairs.length; ++i)
            {
                if ((pairs[i][0] === x && pairs[i][1] === y) ||
                    (pairs[i][0] === y && pairs[i][1] === x))
                    return true;
            }
            
            pairs.push([ x, y ]);
            
            // May be they are both arrays?
            if (xa)
            {
                if (x.length !== y.length)
                    return false;
                
                for (var i = 0; i < x.length; ++i)
                {
                    if (!req(x[i], y[i]))
                        return false;
                }
                
                return true;
            }
            
            // They are objects!
            var keys = {};
            
            for (var i in x)
            {
                keys[i] = true;
                if (!req(x[i], y[i]))
                    return false;
            }
            
            for (var i in y)
            {
                if (!keys[i])
                    return false;
                delete keys[i];
            }
            
            for (var i in keys)
                return false;
            
            return true
        }
        
        req = recursively ? rec : eq;
        
        return rec(x, y);
    },
    
    eq: function(x, y)
    {
        return x == y;
    },
    
    seq: function(x, y)
    {
        return x === y;
    },
    
    /**
     * JSON.stringify which sorts keys in all objects to make equal objects'
     * digests equal.
     */
    smartEncode: function(value)
    {
        var buf = [];
        
        function str(value)
        {
            buf.push(
                '"' + value.
                replace(/\\/g, "\\\\").
                replace(/\n/g, "\\n").
                replace(/\t/g, "\\t").
                replace(/\r/g, "\\r") + '"'
            );
        }
        
        function rec(value)
        {
            if (typeof value === "function")
                throw new Error("Can't encode object containing function");
            
            if (typeof value === "undefined")
            {
                buf.push("undefined");
                return;
            }
            
            if (typeof value === "string")
            {
                str(value);
                return;
            }
            
            if (typeof value !== "object")
            {
                buf.push(value);
                return;
            }
            
            if (value === null)
            {
                buf.push("null");
                return;
            }
            
            if (JW.isArray(value))
            {
                buf.push("[");
                for (var i = 0; i < value.length; ++i)
                {
                    if (i !== 0)
                        buf.push(",");
                    rec(value[i]);
                }
                buf.push("]");
                return;
            }
            
            var keys = [];
            for (var i in value)
                keys.push(i);
            keys.sort();
            
            buf.push("{");
            for (var i = 0; i < keys.length; ++i)
            {
                if (i !== 0)
                    buf.push(",");
                str(keys[i]);
                buf.push(":");
                rec(value[keys[i]]);
            }
            buf.push("}");
        }
        
        rec(value);
        return buf.join("");
    },
    
    /**
     * Converts array of tokens to solid path string.
     * Tokens are joined by points.
     * Tokens are escaped the next way: "\" => "\\", "." => "\."
     */
    pathString: function(path)
    {
        var buf = [];
        for (var i = 0; i < path.length; ++i)
        {
            if (JW.isSet(path[i]))
                buf.push(path[i].toString().replace(/\\/g, "\\\\").replace(/\./g, "\\."));
            else
                buf.push(path[i]);
        }
        
        return buf.join(".");
    },
    
    /**
     * Converts configuration option to array.
     * If v is not set, returns empty array.
     * If v is array, returns v, else returns [v].
     */
    makeArray: function(v)
    {
        return JW.isArray(v) ? v : JW.isSet(v) ? [v] : [];
    },
    
    /**
     * Calculates modulo value.
     */
    mod: function(value, mod)
    {
        return value - mod * Math.floor(value / mod);
    },
    
    /**
     * Calculates 128-bit hash value.
     * Parameter must be serializable.
     */
    hash: function(value)
    {
        return MD5.hex(JW.smartEncode(value));
    },
    
    /**
     * Generates 128-bit unique ID
     */
    uid: function()
    {
        JW.__lastUid = JW.hash([
            JW.__lastUid,
            new Date().getTime(),
            Math.random() * 65536
        ]);
        
        return JW.__lastUid;
    }
});

if (!window.console)
    window.console = { log: JW.emptyFn };
/*
    JW simple inheritance.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.ClassUtil = {
    /**
     * Base class. Constructor is "init" method.
     */
    Class: function()
    {
        if (this.init)
            this.init.apply(this, arguments);
        
        return this;
    },
    
    /**
     * Create empty class.
     */
    newClass: function()
    {
        var cl = function()
        {
            cl.superclass.constructor.apply(this, arguments);
            return this;
        }
        
        return cl;
    },
    
    /**
     * Class inheritance function.
     * 
     * Arguments purposes depend on their types:
     * extend() - create JW.Class subclass
     * extend(body:Object) - create JW.Class subclass with specified body
     * extend(supc:Function) - create supc subclass
     * extend(supc:Function, body:Object) - create supc with specified body
     * extend(subc:Function, supc:Function) - inherits subc from supc
     * extend(subc:Function, supc:Function, body:Object) - inherits subc from supc with specified body
     * 
     * Function returns subclass always.
     */
    extend: function(a, b, c)
    {
        var subc, supc, body;
        
        if (!a || typeof a == "object")
        {
            if (c)
                throw "Can't extend: subclass is undefined";
            
            if (b)
                throw "Can't extend: superclass is undefined";
            
            subc = JW.ClassUtil.newClass();
            supc = JW.ClassUtil.Class;
            body = a;
        }
        else if (!b || typeof b == "object")
        {
            if (c)
                throw "Can't extend: superclass is undefined";
            
            subc = JW.ClassUtil.newClass();
            supc = a;
            body = b;
        }
        else
        {
            subc = a;
            supc = b;
            body = c;
        }
        
        var F = function(){};
        
        F.prototype = supc.prototype;
        subc.prototype = new F();
        subc.prototype.constructor = subc;
        subc.superclass = supc.prototype;
        subc.extend = JW.ClassUtil.extendThis;
        
        for (var i in body)
            subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
        
        return subc;
    },
    
    /**
     * Scope inheritance function.
     */
    extendThis: function(a, b)
    {
        return JW.ClassUtil.extend(this, a, b);
    },
    
    /**
     * Create subclass method. Adds this._super call support.
     */
    extendMethod: function(sub, sup)
    {
        if (typeof sup !== "function" ||
            typeof sub !== "function" ||
            sub.superclass)
            return sub;
        
        return function()
        {
            var tmp = this._super;
            this._super = sup;
            var result = sub.apply(this, arguments);
            this._super = tmp;
            return result;
        }
    }
};

JW.Class = JW.ClassUtil.Class;
JW.ClassUtil.extend(JW.Class, Object);

JW.Class.prototype.init = function() {};
JW.Class.prototype.destroy = function() {};
/*
    JW observer pattern implementation.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

/**
 * Event object.
 */
JW.Event = JW.Class.extend({
    type    : null, // [required][read-only] String
    target  : null, // [required][read-only] JW.Observable
    
    init: function(type, target)
    {
        this.type   = type;
        this.target = target;
    }
});

/**
 * Base observable object.
 * Used to dispatch events.
 */
JW.Observable = JW.Class.extend({
    __listeners : null, // [private] Map from type to Array of JW.Observable.Listener
    __observers : null, // [private] JW.Map from scope to Array of JW.Observable.Listener
    __flags     : null, // [private] Map from type to Mixed (true - registered, Array - event args)
    
    destroy: function()
    {
        this.purgeAll();
    },
    
    /**
     * Add event handler.
     * Supports many various signatures.
     */
    bind: function(
    /* Signature 1 */
        type,       // [required] String, event type
        handler,    // [required] Function, event handler
        scope,      // [optional] Object, recommended. If specified, event handler will be called in specified scope. Also the handler will be registered to remove on purge(scope) or unbind (type, handler, scope) call
        disposable  // [optional] Boolean, set to true to auto-unbind the listener as soon as event is triggered first time
    
    /* Signature 2
        listeners   // Each argument is Object similar to JW.Observable.Listener */
    
    /* Signature 3
        listeners   // Array of Objects similar to JW.Observable.Listener */
    
    /* Signature 4
        listeners   // Map from type:String to Object { handler, scope, disposable } or handler:Function, and from "scope" and "disposable" to their default values */
    )
    {
        this.__parseListeners(this.__bind, JW.args(arguments));
    },
    
    /**
     * Remove event listener or all listeners of specified event.
     * Supports many various signatures (see bind method for more info).
     */
    unbind: function(
        type,       // [required] String, event type
        handler,    // [optional] Function, event handler
        scope)      // [optional] Object, if specified, only handlers with this scope will be unbound
    {
        this.__parseListeners(this.__unbind, JW.args(arguments));
    },
    
    /**
     * Remove all event listeners registered for specified scope.
     */
    purge: function(
        scope)  // [required] Object
    {
        if (!this.__observers)
            return;
        
        var observers = this.__observers.get(scope);
        if (!observers)
            return;
        
        for (var i = 0; i < observers.length; ++i)
        {
            var observer = observers[i];
            this.__removeHandler(observer);
        }
        
        this.__observers.del(scope);
    },
    
    /**
     * Remove all event listeners. Used in destructor usually.
     */
    purgeAll: function()
    {
        delete this.__listeners;
        delete this.__observers;
    },
    
    /**
     * Fire event to call all registered event handlers for specified event type.
     */
    trigger: function(
        type        // [required] String, event type
        /* args */) // Additional arguments for event handler call
    {
        this.triggerArray(type, JW.args(arguments, 1));
    },
    
    /**
     * Fire event to call all registered event handlers for specified event type.
     */
    triggerArray: function(
        type,   // [required] String, event type
        args)   // [optional] Array, additional arguments for event handler call
    {
        // Generate event
        var event = new JW.Event(type, this);
        var handlerArgs = [ event ].concat(args);
        
        // Store flag event arguments
        if (this.__flags && this.__flags[type])
            this.__flags[type] = handlerArgs;
        
        // Retrieve listeners list
        if (!this.__listeners)
            return;
        
        var listeners = this.__listeners[type];
        if (!listeners)
            return;
        
        triggers = listeners.concat();
        
        // Unbind disposable listeners
        for (var i = 0; i < listeners.length; ++i)
        {
            var listener = listeners[i];
            if (listener.disposable)
            {
                this.__removeObserver(listener);
                listeners.splice(i, 1);
                --i;
            }
        }
        
        if (listeners.length === 0)
            delete this.__listeners[type];
        
        // Trigger event
        for (var i = 0; i < triggers.length; ++i)
        {
            var listener = triggers[i];
            listener.handler.apply(listener.scope || this, handlerArgs);
        }
    },
    
    /**
     * Relay specified event up from another object.
     * Each event of specified type, triggered by source object, will be
     * triggered by this object as well.
     * Use source.unbind(type) to stop events relaying.
     * Returns handler function.
     */
    relay: function(
        source, // [required] JW.Observable, source object to relay events from
        type)   // [required] String, event type, all events by default
    {
        return source.bind(type, this.__relayHandler, this);
    },
    
    /**
     * Registers specified events as flags. If user binds a new listener to
     * flag event which has been triggered already, the listener is called
     * immediately. For example, Ajax "load" event should be flag event to
     * avoid "if (loaded)" checking each time on binding.
     *
     * Can be used several times, for example, on Ajax request reloading.
     */
    resetFlagEvents: function(/* eventTypes */)
    {
        this.resetFlagEventsArray(JW.args(arguments));
    },
    
    resetFlagEventsArray: function(eventTypes)
    {
        this.__flags = this.__flags || {};
        for (var i = 0; i < eventTypes.length; ++i)
            this.__flags[eventTypes[i]] = true;
    },
    
    /**
     * ExtJS adapter for bind method.
     */
    addListener: function()
    {
        return this.bind.apply(this, arguments);
    },
    
    /**
     * ExtJS adapter for unbind method.
     */
    removeListener: function()
    {
        this.unbind.apply(this, arguments);
    },
    
    /**
     * ExtJS adapter for trigger method.
     */
    fireEvent: function()
    {
        this.trigger.apply(this, arguments);
    },
    
    /**
     * Shorthand for ExtJS adapter for bind method.
     */
    on: function()
    {
        return this.bind.apply(this, arguments);
    },
    
    /**
     * Shorthand for ExtJS adapter for unbind method.
     */
    un: function()
    {
        this.unbind.apply(this, arguments);
    },
    
    __parseListeners: function(callback, args)
    {
        var main = args[0];
        
        if (!main)
            return;
        
        // Signature 1
        if (typeof main === "string")
            return callback.call(this, main, args[1], args[2], args[3]);
        
        // Signature 2
        if (main.type)
        {
            for (var i = 0; i < args.length; ++i)
                callback.call(this, args[i].type, args[i].handler, args[i].scope, args[i].disposable);
            return;
        }
        
        // Signature 3
        if (JW.isArray(main))
        {
            for (var i = 0; i < main.length; ++i)
                callback.call(this, main[i].type, main[i].handler, main[i].scope, main[i].disposable);
            return;
        }
        
        // Signature 4
        for (var i in main)
        {
            if (i === "scope" || i === "disposable")
                continue;
            
            var value = main[i];
            if (typeof value === "function")
                callback.call(this, i, value, main.scope, main.disposable);
            else
                callback.call(this, i, value.handler, JW.def(value.scope, main.scope), JW.def(value.disposable, main.disposable));
        }
    },
    
    __bind: function(
        type,       // [required] String, event type
        handler,    // [required] Function, event handler
        scope,      // [optional] Object, recommended. If specified, event handler will be called in specified scope. Also the handler will be registered to remove on purge(scope) or unbind (type, handler, scope) call
        disposable) // [optional] Boolean, set to true to auto-unbind the listener as soon as event is triggered first time
    {
        // For flag events and disposable handler, just call it and return
        if (disposable && this.__flags && JW.isArray(this.__flags[type]))
        {
            handler.apply(scope || this, this.__flags[type]);
            return;
        }
        
        // Else register new listener
        var listener = {
            type        : type,
            handler     : handler,
            scope       : scope,
            disposable  : !!disposable
        };
        
        this.__listeners = this.__listeners || {};
        this.__listeners[type] = this.__listeners[type] || [];
        this.__listeners[type].push(listener);
        
        if (scope)
        {
            this.__observers = this.__observers || new JW.Map();
            var observers = this.__observers.get(scope);
            if (observers)
                observers.push(listener);
            else
                this.__observers.set(scope, [ listener ]);
        }
        
        // For flag events and simple handler, call it
        if (this.__flags && JW.isArray(this.__flags[type]))
            handler.apply(scope || this, this.__flags[type]);
    },
    
    __unbind: function(
        type,       // [required] String, event type
        handler,    // [optional] Function, event handler
        scope)      // [optional] Object, if specified, only handlers with this scope will be unbound
    {
        if (!this.__listeners)
            return;
        
        var listeners = this.__listeners[type];
        if (!listeners)
            return;
        
        for (var i = 0; i < listeners.length; ++i)
        {
            var listener = listeners[i];
            if ((!handler || listener.handler === handler) &&
                (!scope   || listener.scope   === scope))
            {
                this.__removeObserver(listener);
                listeners.splice(i, 1);
                --i;
            }
        }
        
        if (listeners.length === 0)
            delete this.__listeners[type];
    },
    
    __removeObserver: function(listener)
    {
        if (!this.__observers)
            return;
        
        var observers = this.__observers.get(listener.scope);
        if (!observers)
            return;
        
        observers.removeItem(listener);
        if (observers.length === 0)
            this.__observers.del(listener.scope);
    },
    
    __removeHandler: function(listener)
    {
        if (!this.__listeners)
            return;
        
        var listeners = this.__listeners[listener.type];
        if (!listeners)
            return;
        
        listeners.removeItem(listener);
        if (listeners.length === 0)
            delete this.__listeners[listener.type];
    },
    
    __relayHandler: function(event)
    {
        this.triggerArray(event.type, JW.args(arguments).slice(1));
    }
});

// Prototype
JW.Observable.Listener = {
    type        : null, // String
    handler     : null, // Function
    scope       : null, // Object
    disposable  : null  // Boolean
};
/*
    JW simple collection methods.
    By Egor Nepomnyaschih.
    WTFPL licensed.
    
    Usage:
    -   These algorithms are available by default for
        -   Objects as dictionaries
        -   Array instances
        -   JW.Dimap instances
        -   JW.Collection instances
    -   If you want to use these algorithms for instances of class A
        -   Implement A.prototype.every
        -   Call $.extend(A.prototype, JW.Alg.SimpleMethods)
*/

JW.ns("JW.Alg");

$.extend(JW, {
    /**
     * Executes a function on each item in a collection, and returns true if
     * all items have returned value true.
     */
    every: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        if (typeof target === "function")
            return target(callback, scope || window);
        
        if (typeof target !== "object" || !target)
            return true;
        
        if (typeof target.every === "function")
            return target.every(callback, scope);
        
        for (var i in target)
        {
            if (!callback.call(scope || target, target[i], i))
                return false;
        }
        
        return true;
    },
    
    /**
     * Executes a function on each item in a collection.
     */
    each: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        JW.every(target, callback.returns(true), scope);
        return target;
    },
    
    /**
     * Executes a function on each item in a collection, and returns true if
     * at least one item has returned value true.
     */
    some: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        return !JW.every(target, callback.not(), scope);
    },
    
    /**
     * Builds array of all values in a collection.
     */
    getValuesArray: function(
        target)     // [required] Mixed
    {
        var result = [];
        JW.every(target, function(item) {
            result.push(item);
            return true;
        });
        return result;
    },
    
    /**
     * Builds set of all values in a collection (object from items to true).
     */
    getValuesSet: function(
        target)     // [required] Mixed
    {
        var result = {};
        JW.every(target, function(item) {
            result[item] = true;
            return true;
        });
        return result;
    }
});

/**
 * Add these methods to prototype of your simple collection.
 */
JW.Alg.SimpleMethods = {
    each: function(callback, scope)
    {
        return JW.each(this, callback, scope);
    },
    
    some: function(callback, scope)
    {
        return JW.some(this, callback, scope);
    },
    
    getValuesArray: function()
    {
        return JW.getValuesArray(this);
    },
    
    getValuesSet: function()
    {
        return JW.getValuesSet(this);
    }
};
/*
    JW collection building methods.
    By Egor Nepomnyaschih.
    WTFPL licensed.
    
    Usage:
    -   These algorithms are available by default for:
        -   Objects as dictionaries
        -   Array instances
        -   JW.Dimap instances
        -   JW.Collection instances
    -   If you want to use these algorithms for instances of class A
        -   Make A simple collection
        -   Implement A.prototype.createEmpty
        -   Implement A.prototype.pushItem
        -   Call $.extend(A.prototype, JW.Alg.BuildMethods)
*/

JW.ns("JW.Alg");

$.extend(JW, {
    /**
     * Creates a collection of the same type as target, which does not contain
     * any items.
     */
    createEmpty: function(
        target)     // [required] Mixed
    {
        if (typeof target === "function")
            return target();
        
        if (!target || typeof target !== "object")
            return null;
        
        if (typeof target.createEmpty === "function")
            return target.createEmpty();
        
        return {};
    },
    
    /**
     * Updates item value in target collection.
     * Returns updated collection.
     */
    pushItem: function(
        target,     // [required] Mixed
        params)     // [required] Arguments of "every" method
    {
        if (typeof target === "function")
            return target.apply(window, params);
        
        if (!target || typeof target !== "object")
            return target;
        
        if (typeof target.pushItem === "function")
            return target.pushItem.apply(target, params);
        
        target[params[1]] = params[0];
        return target;
    },
    
    /**
     * Constructs a new collection containing the same items that original
     * collection contains (clone copy).
     */
    clone: function(
        target)     // [required] Mixed
    {
        var result = JW.createEmpty(target);
        return JW.merge(result, target);
    },
    
    /**
     * Executes a function on each item in a collection, and constructs a new
     * collection of items in original collection which have returned true
     * value.
     */
    filter: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        var result = JW.createEmpty(target);
        JW.every(target, function() {
            if (callback.apply(scope || this, arguments))
                JW.pushItem(result, arguments);
            return true;
        });
        return result;
    },
    
    /**
     * Finds all item objects which contain field with value equal (==) to specified one
     * and builds new collection of such items.
     * This collection must contain objects only.
     */
    filterBy: function(
        target,     // [required] Mixed
        field,      // [required] String, field name
        value)      // [required] *
    {
        return JW.filter(target, function(item) {
            return JW.get(item, field) == value;
        });
    },
    
    /**
     * Executes a function on each item in a collection, and constructs a new collection
     * of items corresponding to the results of the function on each item in the
     * original collection.
     */
    map: function(
        target,     // [required] Mixed
        callback,   // [required] Function(item, /* keys */)
        scope)      // [optional] Object
    {
        var result = JW.createEmpty(target);
        JW.every(target, function() {
            var args = JW.args(arguments);
            args[0] = callback.apply(scope || this, arguments);
            JW.pushItem(result, args);
            return true;
        });
        return result;
    },
    
    /**
     * Constructs a new map of values of specified field of each item.
     */
    mapBy: function(
        target,     // [required] Mixed
        field)      // [required] String, field name
    {
        return JW.map(target, function(item) {
            return JW.get(item, field);
        });
    },
    
    /**
     * Merged items from source collection into target collection.
     * Returns target collection.
     */
    merge: function(
        target,     // [required] Mixed
        source)     // [required] Mixed
    {
        JW.every(source, function() {
            JW.pushItem(target, arguments);
            return true;
        });
        return target;
    }
});

/**
 * Add these methods to prototype of your building collection.
 */
JW.Alg.BuildMethods = {
    clone: function()
    {
        return JW.clone(this);
    },
    
    filter: function(callback, scope)
    {
        return JW.filter(this, callback, scope);
    },
    
    filterBy: function(field, value)
    {
        return JW.filterBy(this, field, value);
    },
    
    map: function(callback, scope)
    {
        return JW.map(this, callback, scope);
    },
    
    mapBy: function(field, value)
    {
        return JW.mapBy(this, field, value);
    },
    
    merge: function(source)
    {
        return JW.merge(this, source);
    }
};
/*
    JW array prototype extension.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

$.extend(Array.prototype, {
    /**
     * Executes a function on each item in an array, and returns true if
     * all items have returned value true.
     */
    every: function(
        callback,   // [required] Function(item, index, array)
        scope)      // [optional] Object
    {
        for (var i = 0; i < this.length; ++i)
        {
            if (!callback.call(scope || this, this[i], i))
                return false;
        }
        return true;
    },
    
    /**
     * Creates an empty array.
     */
    createEmpty: function()
    {
        return [];
    },
    
    /**
     * Adds an item to array.
     * Returns updated array.
     */
    pushItem: function(value, index)
    {
        this.push(value);
        return this;
    },
    
    /**
     * Finds an item object which contains field with value equal (==) to specified one.
     * This array must contain objects only.
     * Returns item index or -1.
     */
    findBy: function(
        field,      // [required] String, field name
        value)      // [required] *
    {
        for (var i = 0; i < this.length; ++i)
        {
            if (JW.get(this[i], field) == value)
                return i;
        }
        
        return -1;
    },
    
    /**
     * Finds an item object which contains field with value equal (==) to specified one.
     * This array must contain objects only.
     * Returns item itself or null.
     */
    getBy: function(
        field,      // [required] String, field name
        value)      // [required] *
    {
        var index = this.findBy(field, value);
        if (index == -1)
            return undefined;
        
        return this[index];
    },
    
    /**
     * Finds item object which contains field with value equal (==) to specified one
     * and removes all such items.
     * This array must contain objects only.
     */
    removeBy: function(
        field,      // [required] String, field name
        value)      // [required] *
    {
        var index = 0;
        while (index < this.length)
        {
            if (JW.get(this[index], field) == value)
                this.splice(index, 1);
            else
                ++index;
        }
        
        return this;
    },
    
    /**
     * Builds new object by rule:
     * - key is value of specified field in item object
     * - value is item object inself
     *
     * This array must contain objects only.
     */
    createDictionary: function(
        key)        // [required] String, field name
    {
        var result = {};
        for (var i = 0; i < this.length; ++i)
        {
            var k = JW.get(this[i], key);
            if (JW.isSet(k))
                result[k] = this[i];
        }
        
        return result;
    },
    
    /**
     * Removes all items equal (==) to specified value.
     */
    removeItem: function(item)
    {
        for (var i = 0; i < this.length; ++i)
        {
            if (this[i] == item)
            {
                this.splice(i, 1);
                --i;
            }
        }
        
        return this;
    },
    
    /**
     * Compares two arrays by items respectively (==).
     */
    equals: function(arr)
    {
        if (this == arr)
            return true;
        
        if (this.length != arr.length)
            return false;
        
        for (var i = 0; i < this.length; ++i)
        {
            if (this[i] != arr[i])
                return false;
        }
        
        return true;
    },
    
    /**
     * Adds multiple items to array.
     */
    pushAll: function(items)
    {
        if (!items)
            return this;
        
        this.push.apply(this, items);
        return this;
    },
    
    /**
     * Sorts array using value of specified item field for comparing the items.
     * This array must contain objects only.
     */
    sortBy: function(field, order)
    {
        order = order || 1;
        this.sort(function(x, y) {
            return JW.cmp(JW.get(x, field), JW.get(y, field)) * order;
        });
    },
    
    /**
     * Returns last element of array.
     */
    top: function()
    {
        return this[this.length - 1];
    },
    
    /**
     * Considering all items of this array as arrays, builds new array
     * containing all items of child arrays. Supports arbitrary collapsing
     * depth. If depth is undefined, collapses all levels.
     */
    collapse: function(depth)
    {
        var result = [];
        for (var i = 0; i < this.length; ++i)
        {
            if (!JW.isArray(this[i]))
            {
                result.push(this[i]);
                continue;
            }
            
            if (!JW.isSet(depth))
            {
                result.pushAll(this[i].collapse());
                continue;
            }
            
            if (depth)
            {
                result.pushAll(this[i].collapse(depth - 1));
                continue;
            }
            
            result.push(this[i]);
        }
        
        return result;
    }
});

$.extend(Array.prototype, JW.Alg.SimpleMethods);
$.extend(Array.prototype, JW.Alg.BuildMethods);

$.extend(Array, {
    /**
     * Arrays comparison function.
     */
    cmp: function(x, y, caseInsensitive)
    {
        var n = Math.min(x.length, y.length);
        for (var i = 0; i < n; ++i)
        {
            var result = JW.cmp(x[i], y[i], caseInsensitive);
            if (result)
                return result;
        }
        
        return JW.cmp(x.length, y.length);
    }    
});
/*
    JW date prototype extension.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

$.extend(Date.prototype, {
    /**
     * Clone this date.
     */
    clone: function()
    {
        return new Date(this.getTime());
    },
    
    /**
     * Set day of the week.
     */
    setDay: function(day)
    {
        return this.addDays(day - this.getDay());
    },
    
    /**
     * Get seconds number from zero date.
     */
    getGlobalSecond: function()
    {
        return 60 * this.getGlobalMinute() + this.getSeconds();
    },
    
    /**
     * Get minutes number from zero date.
     */
    getGlobalMinute: function()
    {
        return 60 * this.getGlobalHour() + this.getMinutes();
    },
    
    /**
     * Get hours number from zero date.
     */
    getGlobalHour: function()
    {
        return 24 * this.getGlobalDay() + this.getHours();
    },
    
    /**
     * Get days number from zero date.
     */
    getGlobalDay: function()
    {
        return Math.round((this.clone().zeroTime().getTime() - new Date(0).zeroTime().getTime()) / Date.MS_PER_DAY);
    },
    
    /**
     * Get weeks number from zero date.
     */
    getGlobalWeek: function()
    {
        return Math.round((this.clone().zeroTime().setDay(0).getTime() - Date.FIRST_SUNDAY.getTime()) / Date.MS_PER_WEEK);
    },
    
    /**
     * Get months number from zero date.
     */
    getGlobalMonth: function()
    {
        return 12 * this.getGlobalYear() + this.getMonth();
    },
    
    /**
     * Get years number from zero date.
     */
    getGlobalYear: function()
    {
        return this.getFullYear() - 1970;
    },
    
    /**
     * Add weeks.
     */
    addWeeks: function(num)
    {
        return this.addDays(num * 7);
    }
});

Date.MS_PER_SECOND  = 1000;
Date.MS_PER_MINUTE  = 60 * Date.MS_PER_SECOND;
Date.MS_PER_HOUR    = 60 * Date.MS_PER_MINUTE;
Date.MS_PER_DAY     = 24 * Date.MS_PER_HOUR;
Date.MS_PER_WEEK    =  7 * Date.MS_PER_DAY;

/**
 * Number of milliseconds between zero dates in current timezone and Grinwitch.
 */
Date.TIMEZONE_OFFSET = function() {
    var date = new Date(0);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.getTime();
}();

/**
 * First sunday after zero date.
 */
Date.FIRST_SUNDAY = new Date(0).zeroTime().addDays(7).setDay(0);

$.extend(Date, {
    /**
     * Converts value to Date.
     * Value can be
     * - Number (timestamp)
     * - String (timestamp)
     * - Date
     */
    getDate: function(v)
    {
        if (!v)
            return new Date();
        
        if (typeof v === "number")
            return new Date(v);
        
        if (typeof v === "string")
        {
            var i = parseInt(v);
            return isNaN(i) ? new Date(v) : new Date(i);
        }
        
        return v;
    },
    
    /**
     * Converts value to timestamp Number.
     * Value can be
     * - Number (timestamp)
     * - String (timestamp)
     * - Date
     */
    getTime: function(v)
    {
        if (!v)
            return new Date().getTime();
        
        if (typeof v === "string")
        {
            var i = parseInt(v);
            return isNaN(i) ? new Date(v).getTime() : i;
        }
        
        return (typeof v === "number") ? v : v.getTime();
    }
});
/*
    JW function prototype extension.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

$.extend(Function.prototype, {
    /**
     * Returns callback with specified scope.
     */
    inScope: function(scope)
    {
        var callee = this;
        return function()
        {
            return callee.apply(scope, arguments);
        }
    },
    
    /**
     * Returns callback with empty arguments list.
     */
    noArgs: function()
    {
        var callee = this;
        return function() {
            return callee.call(this);
        }
    },
    
    /**
     * Returns callback with specified arguments inserted.
     */
    insertArgs: function(index /*, args */)
    {
        return this.insertArgsArray(index, JW.args(arguments, 1));
    },
    
    /**
     * Returns callback with specified arguments inserted.
     */
    insertArgsArray: function(index, args)
    {
        var callee = this;
        return function() {
            var args_new = JW.args(arguments);
            while (args_new.length < index)
                args_new.push(undefined);
            args_new.splice.apply(args_new, [ index, 0 ].concat(args));
            return callee.apply(this, args_new);
        }
    },
    
    /**
     * Returns callback with specified arguments.
     * Pass "\x" to insert original argument with x index (x = 0..7).
     */
    withArgs: function(/* args */)
    {
        return this.asArray(null, arguments);
    },
    
    /**
     * Returns callback with specified arguments.
     * Pass "\x" to insert original argument with x index (x = 0..7).
     */
    withArgsArray: function(args)
    {
        return this.asArray(null, args);
    },
    
    /**
     * Universal callback builder.
     * Optimized combination of inScope and withArgs methods.
     */
    as: function(scope /*, args */)
    {
        return this.asArray(scope, JW.args(arguments, 1));
    },
    
    /**
     * Universal callback builder.
     * Optimized combination of inScope and withArgs methods.
     */
    asArray: function(scope, args)
    {
        var callee = this;
        return function() {
            var args_new = [];
            for (var i = 0; i < args.length; ++i)
            {
                var a = args[i];
                if (typeof a === "string" && a.length == 1 && (a.charCodeAt(0) < 8))
                    args_new.push(arguments[a.charCodeAt(0)]);
                else
                    args_new.push(a);
            }
            return callee.apply(scope || this, args_new);
        }
    },
    
    /**
     * Returns callback which runs function and returns specified value.
     */
    returns: function(value)
    {
        var callee = this;
        return function()
        {
            callee.apply(this, arguments);
            return value;
        }
    },
    
    /**
     * Returns callback which runs function and returns specified argument.
     */
    returnsArg: function(index)
    {
        var callee = this;
        return function()
        {
            callee.apply(this, arguments);
            return arguments[index];
        }
    },
    
    /**
     * Returns callback which returns opposite boolean value.
     */
    not: function()
    {
        var callee = this;
        return function() {
            return !callee.apply(this, arguments);
        }
    },
    
    /**
     * Returns callback which returns conjunction of several function results.
     */
    and: function(/* callbacks */)
    {
        return Function.and.apply(Function, [ this ].concat(JW.args(arguments)));
    },
    
    /**
     * Returns callback which returns disjunction of several function results.
     */
    or: function(/* callbacks */)
    {
        return Function.or.apply(Function, [ this ].concat(JW.args(arguments)));
    },
    
    /**
     * Returns callback which returns boolean sum of several function results.
     */
    xor: function(/* callbacks */)
    {
        return Function.xor.apply(Function, [ this ].concat(JW.args(arguments)));
    },
    
    /**
     * Returns callback which returns implication of 2 function results.
     */
    impl: function(callback)
    {
        return Function.impl(this, callback);
    },
    
    /**
     * Runs function after specified number of milliseconds.
     * Returns JS timer descriptor.
     */
    defer: function(ms)
    {
        return setTimeout(this, ms);
    }
});

$.extend(Function, {
    /**
     * Returns callback which returns conjunction of several function results.
     */
    and: function(/* callbacks */)
    {
        var callbacks = JW.args(arguments);
        return function() {
            for (var i = 0; i < callbacks.length; ++i)
            {
                if (!callbacks[i].apply(this, arguments))
                    return false;
            }
            return true;
        }
    },

    /**
     * Returns callback which returns disjunction of several function results.
     */
    or: function(/* callbacks */)
    {
        var callbacks = JW.args(arguments);
        return function() {
            for (var i = 0; i < callbacks.length; ++i)
            {
                if (callbacks[i].apply(this, arguments))
                    return true;
            }
            return false;
        }
    },

    /**
     * Returns callback which returns boolean sum of several function results.
     */
    xor: function(/* callbacks */)
    {
        var callbacks = JW.args(arguments);
        return function() {
            var result = 0;
            for (var i = 0; i < callbacks.length; ++i)
                result = result ^ callbacks[i].apply(this, arguments);
            return result;
        }
    },

    /**
     * Returns callback which returns implication of 2 function results.
     */
    impl: function(x, y)
    {
        return function() {
            return !x.apply(this, arguments) || y.apply(this, arguments);
        }
    },

    /**
     * Returns callback which returns specified value.
     */
    returns: function(value)
    {
        return function() {
            return value;
        }
    },

    /**
     * Returns callback which returns specified argument.
     */
    returnsArg: function(index)
    {
        return function() {
            return arguments[index];
        }
    }
});
/*
    JW string prototype extension.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

$.extend(String.prototype, {
    /**
     * See core.js
     */
    htmlEncode: function()
    {
        return JW.htmlEncode(this);
    },
    
    /**
     * See core.js
     */
    removeScripts: function()
    {
        return JW.removeScripts(this);
    },
    
    /**
     * Shortens string to specified length using ellipsis.
     */
    ellipsis: function(
        length,     // [required] Integer, string length to shorten to
        ellipsis)   // [optional] String, defaults to "..."
    {
        if (this.length <= length)
            return this;
        
        ellipsis = ellipsis || "...";
        return this.substr(0, length - ellipsis.length) + ellipsis;
    }
});
/*    JW Ajax action adapter.    By Egor Nepomnyaschih.    WTFPL licensed.*/JW.Action = JW.Class.extend({    requestCls          : null,         // [optional] Class ~ JW.Request        url                 : null,         // [required] String    data                : null,         // [optional] Object or String    timeout             : null,         // [optional] Number, see $.ajax for default value    type                : null,         // [optional] String, see $.ajax for default value    dataType            : null,         // [optional] String, see $.ajax for default value    contentType         : null,         // [optional] String, see $.ajax for default value    jsonp               : null,         // [optional] String, see $.ajax for default value    jsonpCallback       : null,         // [optional] String, see $.ajax for default value    username            : null,         // [optional] String, see $.ajax for default value    password            : null,         // [optional] String, see $.ajax for default value    scriptCharset       : null,         // [optional] String, see $.ajax for default value    cache               : null,         // [optional] Boolean, see $.ajax for default value    global              : null,         // [optional] Boolean, see $.ajax for default value    ifModified          : null,         // [optional] Boolean, see $.ajax for default value    processData         : null,         // [optional] Boolean, see $.ajax for default value    traditional         : null,         // [optional] Boolean, see $.ajax for default value        init: function(config)    {        this._super();        $.extend(this, config);        this.requestCls = this.requestCls || JW.Request;    },        createRequest: function()    {        var cls = this.requestCls;                return new cls({            url             : this.url,            data            : this.data,            timeout         : this.timeout,            type            : this.type,            dataType        : this.dataType,            contentType     : this.contentType,            jsonp           : this.jsonp,            jsonpCallback   : this.jsonpCallback,            username        : this.username,            password        : this.password,            scriptCharset   : this.scriptCharset,            async           : this.async,            cache           : this.cache,            global          : this.global,            ifModified      : this.ifModified,            processData     : this.processData,            traditional     : this.traditional        });    }});JW.Animation = JW.Observable.extend({
    easing          : "linear", // [optional] String or Function
    duration        : 1000,     // [optional] Number
    applyOnStart    : false,    // [optional] Boolean
    autoStart       : false,    // [optional] Boolean
    noIPad          : false,    // [optional] Boolean
    
    id              : 0,        // [readonly] Number
    started         : false,    // [readonly] Boolean
    time            : 0,        // [readonly] Number
    position        : 0,        // [readonly] Number
    easValue        : 0,        // [readonly] Number
    
    init: function(config)
    {
        this._applyConfig(config);
        
        if (this.autoStart)
            this.start();
    },
    
    // virtual
    apply: function()
    {
    },
    
    // virtual
    finish: function()
    {
    },
    
    getParam: function(from, to)
    {
        return from + (to - from) * this.easValue;
    },
    
    start: function(config)
    {
        this._applyConfig(config);
        
        JW.Animation.Core.start(this);
    },
    
    stop: function()
    {
        JW.Animation.Core.stop(this);
    },
    
    reset: function()
    {
        this.time       = 0;
        this.position   = 0;
        this.easValue   = 0;
    },
    
    _applyConfig: function(config)
    {
        $.extend(this, config);
        if (typeof this.easing === "string")
            this.easing = JW.Easing[this.easing];
    }
});

JW.Animation.CoreClass = JW.Observable.extend({
    STEP        : 50,
    
    animations  : null,     // [readonly] Map from index to JW.Animation
    timer       : null,     // [readonly] JW.Timer
    lastTime    : 0,        // [readonly] Number
    
    _lastId     : 0,        // [readonly] Number
    _count      : 0,        // [readonly] Number
    
    _init: function()
    {
        if (this.animations)
            return;
        
        this.animations = {};
        this.timer = new JW.Timer(this.STEP, true);
        this.timer.bind("tick", this._onTick, this);
    },
    
    start: function(animation)
    {
        if (animation.started)
            return;
        
        this._init();
        
        animation.id = this._lastId++;
        this.animations[animation.id] = animation;
        animation.started = true;
        ++this._count;
        
        if (animation.applyOnStart)
            animation.apply();
        
        this.lastTime = new Date().getTime();
        this.timer.start();
    },
    
    stop: function(animation)
    {
        if (!animation.started)
            return;
        
        this._init();
        
        delete this.animations[animation.id];
        animation.started = false;
        --this._count;
        
        if (this._count == 0)
            this.timer.stop();
    },
    
    _onTick: function()
    {
        var animations = [].merge(this.animations);
        var time = Date.getTime();
        var step = time - this.lastTime;
        this.lastTime = time;
        for (var i = 0; i < animations.length; ++i)
        {
            var animation = animations[i];
            if (animation.noIPad && JW.Browsers.isIPad)
                animation.time = animation.duration;
            else
                animation.time += step;
            
            if (animation.time >= animation.duration)
            {
                animation.position = 1;
                animation.easValue = 1;
                animation.apply();
                animation.stop();
                animation.finish();
            }
            else
            {
                animation.position = animation.time / animation.duration;
                animation.easValue = animation.easing(animation.position);
                animation.apply();
            }
        }
    }
});

JW.Animation.Core = new JW.Animation.CoreClass();
/*
    JW browser detection.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Browsers = (function()
{
    ua = navigator.userAgent.toLowerCase();
    function check(r){
        return r.test(ua);
    };
    
    var isStrict = document.compatMode == "CSS1Compat",
        isOpera = check(/opera/),
        isChrome = check(/\bchrome\b/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && check(/msie 7/),
        isIE8 = isIE && check(/msie 8/),
        isIE6 = isIE && !isIE7 && !isIE8,
        isGecko = !isWebKit && check(/gecko/),
        isGecko2 = isGecko && check(/rv:1\.8/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isBorderBox = isIE && !isStrict,
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isAir = check(/adobeair/),
        isLinux = check(/linux/),
        isIPad = check(/ipad/),
        isSecure = /^https/i.test(window.location.protocol);
    
    var isPaddingWideTd = !(isChrome || isIPad);
    
    return {
        isStrict    : isStrict,
        isOpera     : isOpera,
        isChrome    : isChrome,
        isWebKit    : isWebKit,
        isSafari    : isSafari,
        isSafari2   : isSafari2,
        isSafari3   : isSafari3,
        isSafari4   : isSafari4,
        isIE        : isIE,
        isIE7       : isIE7,
        isIE8       : isIE8,
        isIE6       : isIE6,
        isGecko     : isGecko,
        isGecko2    : isGecko2,
        isGecko3    : isGecko3,
        isBorderBox : isBorderBox,
        isWindows   : isWindows,
        isMac       : isMac,
        isAir       : isAir,
        isLinux     : isLinux,
        isIPad      : isIPad,
        isSecure    : isSecure,
        
        isPaddingWideTd    : isPaddingWideTd
    };
})();
/*
    JW ordered collection.
    By Egor Nepomnyaschih.
    WTFPL licensed.
    
    This is an adapter of array that triggers events about modifications.
    Events are taken from ActionScript's CollectionEventKind (with small
    reasonable changes).
*/

JW.Collection = JW.Observable.extend({
    EVENT_ADDED     : "added",      // handler(event, index, item)
    EVENT_REMOVED   : "removed",    // handler(event, index, item)
    EVENT_REPLACED  : "replaced",   // handler(event, index, oldItem, newItem)
    EVENT_MOVED     : "moved",      // handler(event, fromIndex, toIndex, item)
    EVENT_CLEARED   : "cleared",    // handler(event)
    EVENT_REORDERED : "reordered",  // handler(event)
    EVENT_FILTERED  : "filtered",   // handler(event)
    EVENT_RESETTED  : "resetted",   // handler(event)
    
    base: null, // [readonly] Array
    
    init: function(
        base)   // [optional] Array
    {
        this._super();
        this.base = JW.makeArray(base);
    },
    
    getLength: function()
    {
        return this.base.length;
    },
    
    getItemAt: function(index)
    {
        return this.base[index];
    },
    
    addItem: function(
        item)   // [required] *
    {
        this.addItemAt(item, this.getLength());
    },
    
    addItemAt: function(
        item,   // [required] *
        index)  // [required] Integer
    {
        this.base.splice(index, 0, item);
        this.trigger("added", index, item);
    },
    
    removeItem: function(
        item)   // [required] *
    {
        var index = this.base.indexOf(item);
        if (index != -1)
            this.removeItemAt(index);
    },
    
    removeItemAt: function(
        index)  // [required] Integer
    {
        var item = this.base[index];
        this.base.splice(index, 1);
        this.trigger("removed", index, item);
    },
    
    setItem: function(
        index,  // [required] Integer
        item)   // [required] *
    {
        var oldItem = this.base[index];
        this.base[index] = item;
        this.trigger("replaced", index, oldItem, item);
    },
    
    moveItem: function(
        fromIndex,  // [required] Integer
        toIndex)    // [required] Integer
    {
        var item = this.base[fromIndex];
        this.base.splice(fromIndex, 1);
        this.base.splice(toIndex, 0, item);
        this.trigger("moved", fromIndex, toIndex, item);
    },
    
    clear: function()
    {
        this.base.splice(0, this.base.length);
        this.trigger("cleared");
    },
    
    triggerReordered: function()
    {
        this.trigger("reordered");
    },
    
    triggerFiltered: function()
    {
        this.trigger("filtered");
    },
    
    triggerResetted: function()
    {
        this.trigger("resetted");
    },
    
    every: function(
        callback,   // [required] Function(item, index, array)
        scope)      // [optional] Object
    {
        return this.base.every(callback, scope);
    },
    
    createEmpty: function()
    {
        return new JW.Collection();
    },
    
    pushItem: function(value, index)
    {
        this.base.push(value);
        return this;
    }
});

$.extend(JW.Collection.prototype, JW.Alg.SimpleMethods);
$.extend(JW.Collection.prototype, JW.Alg.BuildMethods);

JW.Collection.getCollection = function(collection)
{
    return (collection instanceof JW.Collection) ? collection : JW.Collection(collection);
}
/*
    JW config object.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Config = JW.Class.extend({
    init: function(config)
    {
        this._super();
        $.extend(this, config);
    }
});
/*
    JW multidimensional map.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Dimap = JW.Class.extend({
    dim     : 0,    // [required] Number, number of dimentions in map
    length  : 0,    // [read-only] Number, number of items in map
    
    init: function(dim, base)
    {
        this.dim = dim;
        this._isAdapter = JW.isSet(base);
        if (this._isAdapter)
        {
            this._map = base;
            this.every(function() {
                ++this.length;
                return true;
            }, this);
        }
    },
    
    /**
     * Add/modify map item.
     */
    set: function(/* ... keys, data */)
    {
        var secKeys = JW.args(arguments, 0, this.dim - 1);
        var primKey = arguments[this.dim - 1];
        var data    = arguments[this.dim];
        
        this._map = this._map || {};
        var root = this._map;
        for (var i = 0; i < this.dim - 1; ++i)
        {
            var key = secKeys[i];
            root[key] = root[key] || {};
            root = root[key];
        }
        
        if (!JW.isDefined(root[primKey]))
            ++this.length;
        
        root[primKey] = data;
        
        return this;
    },
    
    /**
     * Get map item.
     */
    get: function(/* ... keys */)
    {
        var root = this._map;
        for (var i = 0; i < arguments.length; ++i)
        {
            if (!root)
                return undefined;
            
            root = root[arguments[i]];
        }
        
        return root;
    },
    
    /**
     * Delete map item.
     */
    del: function(/* ... keys */)
    {
        var root = this._map;
        for (var i = 0; i < arguments.length - 1; ++i)
        {
            if (!root)
                return undefined;
            
            root = root[arguments[i]];
        }
        
        if (!root)
            return undefined;
        
        var key = arguments[arguments.length - 1];
        var value = root[key];
        if (value)
        {
            --this.length;
            delete root[key];
        }
        
        return value;
    },
    
    /**
     * Clear map.
     */
    clear: function()
    {
        if (!this._isAdapter)
        {
            delete this._map;
        }
        else if (this._map)
        {
            var keys = [];
            for (var i in this._map)
                keys.push(i);
            for (var i = 0; i < keys.length; ++i)
                delete this._map[keys[i]];
        }
        
        this.length = 0;
        
        return this;
    },
    
    /**
     * Executes a function on each item in a map, and returns true if
     * all items have returned value true.
     */
    every: function(
        callback,   // Function(value, ... keys)
        scope)      // Object
    {
        var values = new Array(this.dim + 1);
        var map = this;
        
        function rec(data, dir)
        {
            if (dir == map.dim)
            {
                values[0] = data;
                return callback.apply(scope || map, values);
            }
            
            if (!data)
                return true;
            
            for (var i in data)
            {
                values[dir + 1] = i;
                if (!rec(data[i], dir + 1))
                    return false;
            }
            
            return true;
        }
        
        return rec(this._map, 0) !== false;
    },
    
    createEmpty: function()
    {
        return new JW.Dimap(this.dim);
    },
    
    pushItem: function(item /*, keys */)
    {
        return this.set.apply(this, JW.args(arguments, 1, this.dim).concat([ item ]));
    }
});

$.extend(JW.Dimap.prototype, JW.Alg.SimpleMethods);
$.extend(JW.Dimap.prototype, JW.Alg.BuildMethods);

/**
 * Builds map from array or dictionary.
 * Keys are values of specified fields.
 * Values are keys of corresponding values in source object.
 */
JW.Dimap.createIndexer = function(source /*, keys */)
{
    var keys = JW.args(arguments, 1);
    var values = new Array(keys.length + 1);
    
    var map = new JW.Dimap(keys.length);
    JW.each(source, function(item, index) {
        for (var j = 0; j < keys.length; ++j)
            values[j] = item[keys[j]];
        values[keys.length] = index;
        map.set.apply(map, values);
    });
    return map;
}

/**
 * Builds map from tree-dictionary.
 * Keys are keys in source tree-dictionary.
 * Values are values in sources tree-dictionary.
 */
JW.Dimap.createByDictionary = function(source, dim)
{
    var map = new JW.Dimap(dim);
    var values = new Array(dim + 1);
    
    function rec(source, dir)
    {
        if (dir == dim)
        {
            values[dim] = source;
            map.set.apply(map, values);
            return;
        }
        
        for (var i in source)
        {
            values[dir] = i;
            rec(source[i], dir + 1);
        }
    }
    
    rec(source, 0);
    
    return map;
}

/**
 * Builds map from array or dictionary.
 * Keys are values of specified fields.
 * Values are corresponding values in source object.
 */
JW.Dimap.createByArray = function(source /*, keys */)
{
    var keys = JW.args(arguments, 1);
    var values = new Array(keys.length + 1);
    
    var map = new JW.Dimap(keys.length);
    JW.each(source, function(item) {
        for (var j = 0; j < keys.length; ++j)
            values[j] = item[keys[j]];
        values[keys.length] = item;
        map.set.apply(map, values);
    });
    return map;
}

/**
 * Builds map from array or dictionary.
 * Keys are values of specified fields.
 * Values are specified field values of corresponding items in source object.
 */
JW.Dimap.createByArrayValued = function(source /*, ... keys, field */)
{
    var keys = JW.args(arguments, 1, arguments.length - 2);
    var field = arguments[arguments.length - 1];
    var values = new Array(keys.length + 1);
    
    var map = new JW.Dimap(keys.length);
    JW.each(source, function(item) {
        for (var j = 0; j < keys.length; ++j)
            values[j] = item[keys[j]];
        values[keys.length] = item[field];
        map.set.apply(map, values);
    });
    return map;
}
JW.Easing = {
    linear: function(x)
    {
        return x;
    },
    
    inQuad: function(x)
    {
        return x * x;
    },
    
    outQuad: function(x)
    {
        return 1 - (1 - x) * (1 - x);
    }
};
/*
    JW arbitrary mapping.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Map = JW.Class.extend({
    _gc: 0,
    
    set: function(key, value)
    {
        this._items = this._items || [];
        var item = this._items.getBy("key", key);
        if (item)
            item.value = value;
        else
            this._items.push({ key: key, value: value });
    },
    
    get: function(key)
    {
        if (!this._items)
            return undefined;
        
        var item = this._items.getBy("key", key);
        return item ? item.value : undefined;
    },
    
    del: function(key)
    {
        if (!this._items)
            return undefined;
        
        var index = this._items.findBy("key", key);
        if (-1 === index)
            return undefined;
        
        var value = this._items[index].value;
        this._items[index] = {};
        
        if (this._items.length < (2 * ++this._gc))
        {
            this._gc = 0;
            this._items = this._items.filter(this._filterFn);
        }
        
        return value;
    },
    
    _filterFn: function(item)
    {
        return item.key !== undefined;
    }
});
/*
    JW base data model object with serialization.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Model = JW.Observable.extend({
    init: function(config)
    {
        this._super();
        $.extend(this, config);
    },
    
    /**
     * Iterates fields recursively and returns raw JS object.
     * Ignores undefined values, functions and "private" fields starting from "_".
     */
    serialize: function()
    {
        var result = {};
        for (var i in this)
        {
            if (i.charAt(0) === "_")
                continue;
            
            var value = this[i];
            if (typeof value === "function" ||
                typeof value === "undefined")
                continue;
            
            result[i] = JW.Model.serialize(value);
        }
        
        return result;
    }
});

$.extend(JW.Model, {
    serialize: function(value)
    {
        return (value && typeof value.serialize === "function") ? value.serialize() : value;
    },
    
    encode: function(value)
    {
        return JSON.stringify(JW.Model.serialize(value));
    }
});

$.extend(Array.prototype, {
    serialize: function()
    {
        var result = [];
        for (var i = 0; i < this.length; ++i)
            result.push(JW.Model.serialize(this[i]));
        
        return result;
    }
});
/*
    JW timer.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Timer = JW.Observable.extend({
    // Events
    EVENT_TICK: "tick",
    
    // Config options, read-only properties
    delay   : 0,
    repeat  : false,
    
    init: function(delay, repeat)
    {
        $.extend(this, {
            delay   : delay,
            repeat  : repeat
        });
    },
    
    start: function()
    {
        if (this.isStarted())
            return;
        
        var runner = this.repeat ? setInterval : setTimeout;
        this._handle = runner(this._onTimeout.inScope(this), this.delay);
    },
    
    stop: function()
    {
        if (!this.isStarted())
            return;
        
        var stopper = this.repeat ? clearInterval : clearTimeout;
        stopper(this._handle);
        delete this._handle;
    },
    
    restart: function()
    {
        this.stop();
        this.start();
    },
    
    isStarted: function()
    {
        return !!this._handle;
    },
    
    _onTimeout: function()
    {
        this.trigger("tick");
    }
});
/*
    JW Ajax request adapter.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Request = JW.Observable.extend({
    EVENT_LOAD          : "load",       // handler(event, xhr, params)
    EVENT_COMPLETE      : "complete",   // handler(event, xhr, textStatus)
    EVENT_SUCCESS       : "success",    // handler(event, response, textStatus, xhr)
    EVENT_ERROR         : "error",      // handler(event, xhr, textStatus, errorThrown)
    EVENT_ABORT         : "abort",      // handler(event, xhr)
    
    url                 : null,         // [required] String
    data                : null,         // [optional] Object or String
    timeout             : null,         // [optional] Number, see $.ajax for default value
    type                : null,         // [optional] String, see $.ajax for default value
    dataType            : null,         // [optional] String, see $.ajax for default value
    contentType         : null,         // [optional] String, see $.ajax for default value
    jsonp               : null,         // [optional] String, see $.ajax for default value
    jsonpCallback       : null,         // [optional] String, see $.ajax for default value
    username            : null,         // [optional] String, see $.ajax for default value
    password            : null,         // [optional] String, see $.ajax for default value
    scriptCharset       : null,         // [optional] String, see $.ajax for default value
    cache               : null,         // [optional] Boolean, see $.ajax for default value
    global              : null,         // [optional] Boolean, see $.ajax for default value
    ifModified          : null,         // [optional] Boolean, see $.ajax for default value
    processData         : null,         // [optional] Boolean, see $.ajax for default value
    traditional         : null,         // [optional] Boolean, see $.ajax for default value
    
    status              : "ready",      // [read-only] JW.Request.Status
    response            : null,         // [read-only] *
    xhr                 : null,         // [read-only] XMLHttpRequest
    textStatus          : null,         // [read-only] String, see $.ajax handlers
    errorThrown         : null,         // [read-only] String, see $.ajax error handler
    
    init: function(config)
    {
        this._super();
        $.extend(this, config);
    },
    
    load: function(extraData, extraParams)
    {
        if (this.isLoading())
            return;
        
        this._load(extraData, extraParams);
    },
    
    reload: function(extraData, extraParams)
    {
        this.abort();
        this.load(extraData, extraParams);
    },
    
    abort: function()
    {
        if (!this.isLoading())
            return;
        
        this.status = "abort";
        this.textStatus = "abort";
        this.xhr.abort();
        this.trigger("abort", this.xhr);
        this.trigger("complete", this.xhr, this.textStatus);
    },
    
    reset: function()
    {
        this.abort();
        
        this.status = "ready";
        delete this.response;
        delete this.xhr;
        delete this.textStatus;
        delete this.errorThrown;
    },
    
    isLoading: function()
    {
        return this.status === "load";
    },
    
    isComplete: function()
    {
        return  this.status === "success" ||
                this.status === "error";
    },
    
    _load: function(extraData, extraParams)
    {
        this.reset();
        
        var data = $.extend({}, this.data, extraData);
        
        var params = $.extend({
            url             : this.url,
            data            : data,
            timeout         : this.timeout,
            type            : this.type,
            dataType        : this.dataType,
            contentType     : this.contentType,
            jsonp           : this.jsonp,
            jsonpCallback   : this.jsonpCallback,
            username        : this.username,
            password        : this.password,
            scriptCharset   : this.scriptCharset,
            async           : this.async,
            cache           : this.cache,
            global          : this.global,
            ifModified      : this.ifModified,
            processData     : this.processData,
            traditional     : this.traditional
        }, extraParams);
        
        params = JW.cleann(params);
        
        $.extend(params, {
            success : this._onSuccess.inScope(this),
            error   : this._onError.inScope(this)
        });
        
        this.status = "load";
        this.xhr = $.ajax(params);
        this.trigger("load", this.xhr, params);
    },
    
    _onSuccess: function(response, textStatus, xhr)
    {
        this.status         = "success";
        this.response       = response;
        this.textStatus     = textStatus;
        
        this.trigger("success", response, textStatus, xhr);
        this._onComplete(xhr, textStatus);
    },
    
    _onError: function(xhr, textStatus, errorThrown)
    {
        if (this.status === "abort")
            return;
        
        this.status         = "error";
        this.textStatus     = textStatus;
        this.errorThrown    = errorThrown;
        
        this.trigger("error", xhr, textStatus, errorThrown);
        this._onComplete(xhr, textStatus);
    },
    
    _onComplete: function(xhr, textStatus)
    {
        this.trigger("complete", xhr, textStatus);
    }
});

JW.Request.Status = {
    READY       : "ready",
    LOAD        : "load",
    SUCCESS     : "success",
    ERROR       : "error",
    ABORT       : "abort"
};
/*
    JW auto Ajax request repeater.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.RequestRepeater = JW.Class.extend({
    request : null, // [read-only] JW.Request
    timer   : null, // [read-only] JW.Timer
    
    init: function(request, delay)
    {
        this._super();
        
        this.request = request;
        this.request.bind("load", this._onLoad, this);
        this.request.bind("complete", this._onComplete, this);
        
        this.timer = new JW.Timer(delay);
        this.timer.bind("tick", this._onTick, this);
    },
    
    destroy: function()
    {
        this.timer.destroy();
        this._super();
    },
    
    _onTick: function()
    {
        this.request.load();
    },
    
    _onLoad: function()
    {
        this.timer.stop();
    },
    
    _onComplete: function()
    {
        this.timer.start();
    }
});
/*
    JW ordered collection syncher.
    By Egor Nepomnyaschih.
    WTFPL licensed.
    
    This class offers a new solution of working with ordered collections.
    User must define 5 simple callback functions only to handle collection
    change events.
    This way prevents a lot of copy-paste and is very simple to use.
    
    Let's name bound collection "model" and scope object "controller".
    Model is a collection of submodels.
    Controller is a collection of subcontrollers.
    
    You want to observe model changes and provide changes in controller
    correspondingly:
    -   If submodel is added to model, then new subcontroller must be created
        and added into controller
    -   If submodel is removed from model, then corresponding subcontroller
        must be removed from controller and destroyed
    -   If submodel is moved from one position to another then corresponding
        subcontroller must move in controller (without recreation, optimized)
    -   If model is cleared then controller must be cleared
    -   When controller is created on existing model, the subcontrollers must
        initialize immediately
    -   When controller is destroyed, all subcontrollers must be destroyed as
        well
    
    To provide this behavior, you just need to define 5 simple callbacks:
    -   creator(submodel):subcontroller
        Creates a subcontroller and binds it to corresponding submodel
    -   inserter(subcontroller, index)
        Inserts a subcontroller into specified position in controller
    -   remover(index):subcontroller
        Removes a subcontroller from specified position in controller
    -   destroyer(subcontroller)
        Destroys a subcontroller and unbinds it from corresponding submodel
    -   isEmpty():Boolean
        Tests whether at least one subcontroller is present in controller
*/

JW.Syncher = JW.Class.extend({
    collection  : null,     // [required] JW.Collection
    
    creator     : null,     // [required] Function(submodel):subcontroller
    inserter    : null,     // [required] Function(subcontroller, index)
    remover     : null,     // [required] Function(index):subcontroller
    destroyer   : null,     // [required] Function(subcontroller)
    isEmpty     : null,     // [required] Function():Boolean
    
    scope       : null,     // [optional] Object
    
    skipInit    : false,    // [optional] Boolean, if true, doesn't initialize
                            // subcontrollers in contructor
    
    init: function(config)
    {
        $.extend(this, config);
        
        this.collection.bind("added",    this._onAdded,    this);
        this.collection.bind("removed",  this._onRemoved,  this);
        this.collection.bind("replaced", this._onReplaced, this);
        this.collection.bind("moved",    this._onMoved,    this);
        this.collection.bind("cleared",  this._onCleared,  this);
        
        if (this.skipInit)
            return;
        
        for (var i = 0; i < this.collection.getLength(); ++i)
            this._inserter(this._creator(this.collection.getItemAt(i)), i);
    },
    
    destroy: function()
    {
        while (!this._isEmpty())
            this._destroyer(this._remover(0));
    },
    
    _creator: function(data)
    {
        return this.creator.call(this.scope || this, data);
    },
    
    _inserter: function(controller, index)
    {
        this.inserter.call(this.scope || this, controller, index);
    },
    
    _remover: function(index)
    {
        return this.remover.call(this.scope || this, index);
    },
    
    _destroyer: function(controller)
    {
        this.destroyer.call(this.scope || this, controller);
    },
    
    _isEmpty: function()
    {
        return this.isEmpty.call(this.scope || this);
    },
    
    _onAdded: function(event, index, item)
    {
        this._inserter(this._creator(item), index);
    },
    
    _onRemoved: function(event, index)
    {
        this._destroyer(this._remover(index));
    },
    
    _onReplaced: function(event, index, oldItem, newItem)
    {
        this._destroyer(this._remover(index));
        this._inserter(this._creator(newItem), index);
    },
    
    _onMoved: function(event, fromIndex, toIndex)
    {
        this._inserter(this._remover(fromIndex), toIndex);
    },
    
    _onCleared: function(event)
    {
        while (!this._isEmpty())
            this._destroyer(this._remover(0));
    }
});
/*    JW jQuery element prototype extension.    By Egor Nepomnyaschih.    WTFPL licensed.*/$.extend($.fn, {    insert: function(item, index)    {        if (index == 0)            this.prepend(item);        else            $(this.children()[index - 1]).after(item);    }});/*
    JW base UI component implementation.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Component = JW.Observable.extend({
    renderTo        : null, // [optional] jQuery element, if specified, this.el will be appended to renderTo automatically
    plugins         : null, // [optional] Array of JW.Plugin
    
    el              : null, // [read-only] jQuery element
    initialConfig   : null, // [read-only] Object
    
    init: function(config)
    {
        this._super();
        $.extend(this, config);
        this.initialConfig = config;
        this._initComponent();
        this._render();
        this._afterRender();
        this._afterAppend();
    },
    
    destroy: function()
    {
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].destroy();
        
        this.destroyComponent();
        
        if (this.el)
            this.el.remove();
        
        delete this.renderTo;
        delete this.plugins;
        delete this.el;
        
        this._super();
    },
    
    /**
     * Component initialization.
     * Override this to specify initial values for component properties.
     * You can build plugins array here, these plugins will prepend ones from config object.
     * Prepend superclass method call.
     */
    initComponent: function()
    {
    },
    
    /**
     * Component rendering.
     * Override this to render component's HTML.
     * Must build this.el property and set it to some jQuery element.
     * Prepend superclass method call.
     */
    render: function()
    {
    },
    
    /**
     * Component post-render operations.
     * Override this to specify any actions that require HTML tree to be built.
     * Append superclass method call.
     */
    afterRender: function()
    {
    },
    
    /**
     * After append to DOM.
     * Override this to specify any actions that require element to be inserted into DOM.
     * Used for layouting usually.
     * Append superclass method call.
     */
    afterAppend: function()
    {
    },
    
    /**
     * Component destructor.
     */
    destroyComponent: function()
    {
    },
    
    getPlugin: function(xtype)
    {
        return this.plugins.getBy("xtype", xtype);
    },
    
    _initComponent: function()
    {
        var plugins = this.plugins || [];
        this.plugins = [];
        
        this.initComponent();
        
        this.plugins = this.plugins.concat(plugins);
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].attach(this);
    },
    
    _render: function()
    {
        this.render();
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].render();
    },
    
    _afterRender: function()
    {
        this.afterRender();
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].afterRender();
    },
    
    _afterAppend: function()
    {
        if (!this.renderTo || !this.el)
            return;
        
        $(this.renderTo).append(this.el);
        this.afterAppend();
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].afterAppend();
    }
});

/**
 * Templates definition.
 * Use this function to build HTML templates for this component.
 * Defined templates can be accessed as this.templates.<name>
 */
JW.Component.template = function(cls, tpls)
{
    cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
    cls.prototype.templates = new cls.prototype.Templates();
}

JW.Component.template(JW.Component);
/*
    JW base plugin to UI components.
    By Egor Nepomnyaschih.
    WTFPL licensed.
*/

JW.Plugin = JW.Observable.extend({
    xtype   : null, // [readonly] String
    target  : null, // [readonly] JW.Component to attach plugin to
    
    init: function(config)
    {
        $.extend(this, config);
    },
    
    attach: function(target)
    {
        this.target = target;
        this.initPlugin();
    },
    
    // virtual
    initPlugin: function()
    {
    },
    
    // virtual
    render: function()
    {
    },
    
    // virtual
    afterRender: function()
    {
    },
    
    // virtual
    afterAppend: function()
    {
    },
    
    // virtual
    destroy: function()
    {
    }
});
JW.webRoot = "\/jwidget";
