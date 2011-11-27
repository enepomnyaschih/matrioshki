/*
    JW multidimensional map.
    
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

JW.apply(JW.Dimap.prototype, JW.Alg.SimpleMethods);
JW.apply(JW.Dimap.prototype, JW.Alg.BuildMethods);

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
