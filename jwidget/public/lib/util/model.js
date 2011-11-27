/*
    JW base data model object with serialization.
    
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

JW.Model = JW.Observable.extend({
    init: function(config)
    {
        this._super();
        JW.apply(this, config);
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

JW.apply(JW.Model, {
    serialize: function(value)
    {
        return (value && typeof value.serialize === "function") ? value.serialize() : value;
    },
    
    encode: function(value)
    {
        return JSON.stringify(JW.Model.serialize(value));
    }
});

JW.apply(Array.prototype, {
    serialize: function()
    {
        var result = [];
        for (var i = 0; i < this.length; ++i)
            result.push(JW.Model.serialize(this[i]));
        
        return result;
    }
});
