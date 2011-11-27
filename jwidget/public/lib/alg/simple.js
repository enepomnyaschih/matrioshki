/*
    JW simple collection methods.
    
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
    
    ----
    
    Usage:
    -   These algorithms are available by default for
        -   Objects as dictionaries
        -   Array instances
        -   JW.Dimap instances
        -   JW.Collection instances
    -   If you want to use these algorithms for instances of class A
        -   Implement A.prototype.every
        -   Call JW.apply(A.prototype, JW.Alg.SimpleMethods)
*/

JW.ns("JW.Alg");

JW.apply(JW, {
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
     * Returns true if all items' specified field value is equal (==)
     * to specified one. Must contain objects only.
     */
    everyBy: function(
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return JW.every(function(item) {
            return JW.get(item, field) == value;
        });
    },
    
    /**
     * Returns true if all items' specified method result is equal (==)
     * to specified value. Must contain objects only.
     */
    everyByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args,       // [optional] Array of arguments to pass into method
        value)      // [required] *
    {
        args = args || [];
        return JW.every(function(item) {
            return item[method].apply(item, args) == value;
        });
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
     * Executes a method of each item in collection. Must contain objects only.
     */
    eachByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args)       // [optional] Array of arguments to pass into method
    {
        args = args || [];
        return JW.every(function(item) {
            item[method].apply(item, args);
            return true;
        });
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
     * Returns true if some items' specified field value is equal (==)
     * to specified one. Must contain objects only.
     */
    someBy: function(
        target,     // [required] Mixed
        field,      // [required] String
        value)      // [required] *
    {
        return JW.some(function(item) {
            return JW.get(item, field) == value;
        });
    },
    
    /**
     * Returns true if all items' specified method result is equal (==)
     * to specified value. Must contain objects only.
     */
    someByMethod: function(
        target,     // [required] Mixed
        method,     // [required] String
        args,       // [optional] Array of arguments to pass into method
        value)      // [required] *
    {
        args = args || [];
        return JW.some(function(item) {
            return item[method].apply(item, args) == value;
        });
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
    everyBy: function(field, value)
    {
        return JW.everyBy(this, field, value);
    },
    
    everyByMethod: function(method, args, value)
    {
        return JW.everyByMethod(this, method, args, value);
    },
    
    each: function(callback, scope)
    {
        return JW.each(this, callback, scope);
    },
    
    eachByMethod: function(method, args)
    {
        return JW.eachByMethod(this, method, args);
    },
    
    some: function(callback, scope)
    {
        return JW.some(this, callback, scope);
    },
    
    someBy: function(field, value)
    {
        return JW.someBy(this, field, value);
    },
    
    someByMethod: function(method, args, value)
    {
        return JW.someByMethod(this, method, args, value);
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
