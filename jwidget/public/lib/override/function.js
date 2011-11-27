/*
    JW function prototype extension.
    
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

JW.apply(Function.prototype, {
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
     * Returns callback which runs another function after current one.
     * Callback returns result of another function.
     */
    forth: function(callback)
    {
        return Function.forth(this, callback);
    },
    
    /**
     * Returns callback which runs another function after current one.
     * Callback returns result of current function.
     */
    back: function(callback)
    {
        return Function.back(this, callback);
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

JW.apply(Function, {
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
     * Returns callback which runs 2 functions and returns result of second function.
     */
    forth: function(x, y)
    {
        return function() {
            x.apply(this, arguments);
            return y.apply(this, arguments);
        }
    },
    
    /**
     * Returns callback which runs 2 functions and returns result of first function.
     */
    back: function(callback)
    {
        return function() {
            var result = x.apply(this, arguments);
            y.apply(this, arguments);
            return result;
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
