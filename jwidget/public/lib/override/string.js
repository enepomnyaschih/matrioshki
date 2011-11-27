/*
    JW string prototype extension.
    
    Copyright (C) 2011 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.apply(String.prototype, {
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
    },
    
    /**
     * Prepends string by specified symbols till specified length.
     */
    prepend: function(len, ch)
    {
        var buf = [];
        len -= this.length;
        for (var i = 0; i < len; ++i)
            buf.push(ch);
        buf.push(this);
        return buf.join("");
    },
    
    /**
     * Takes first symbol in string to upper case.
     */
    capitalize: function()
    {
        return this.charAt(0).toUpperCase() + this.substr(1);
    },
    
    /**
     * Converts all hyphen/lowercase pairs to uppercase symbols.
     */
    camel: function()
    {
        return this.replace(/-([a-z])/ig, this._fcamel);
    },
    
    /**
     * Converts all uppercase letters to hyphen/lowercase pairs.
     */
    hyphen: function()
    {
        return this.replace(/([A-Z])/g, this._fhyphen);
    },
    
    _fcamel: function(a, b)
    {
        return b.toUpperCase();
    },
    
    _fhyphen: function(a, b)
    {
        return "-" + b.toLowerCase();
    }
});
