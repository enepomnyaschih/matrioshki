/*
    JW array prototype extension.
    
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

JW.apply(Array.prototype, {
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
    },
    
    /**
     * Find specified item.
     */
    indexOf: Array.prototype.indexOf || function(item) {
        for (var i = 0; i < this.length; ++i)
        {
            if (this[i] == item)
                return i;
        }
        
        return -1;
    }
});

JW.apply(Array.prototype, JW.Alg.SimpleMethods);
JW.apply(Array.prototype, JW.Alg.BuildMethods);

JW.apply(Array, {
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
