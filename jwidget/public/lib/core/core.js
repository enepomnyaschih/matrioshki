/*
    JW namespace with various utility methods.
    
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

window.JW = window.JW || {};

/**
 * Extends target object with fields of source objects.
 * Overrides defined values.
 */
JW.apply = function(target /*, sources */)
{
    for (var i = 1; i < arguments.length; ++i)
    {
        var source = arguments[i];
        if (!source)
            continue;
        
        for (var key in source)
            target[key] = source[key];
    }
    
    return target;
},

JW.apply(JW, {
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
     * Test whether v is integer number.
     */
    isInt: function(v)
    {
        return Math.round(v) === v;
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
     * Extends target object with fields of source objects.
     * Does not override defined values.
     */
    applyIf: function(target /*, sources */)
    {
        for (var i = 1; i < arguments.length; ++i)
        {
            var source = arguments[i];
            if (!source)
                continue;
            
            for (var key in source)
            {
                if (!JW.isDefined(target[key]))
                    target[key] = source[key];
            }
        }
        
        return target;
    },
    
    /**
     * Extends target object with fields of source objects.
     * Does not override defined and not null values.
     */
    applyIfn: function(target /*, sources */)
    {
        for (var i = 1; i < arguments.length; ++i)
        {
            var source = arguments[i];
            if (!source)
                continue;
            
            for (var key in source)
            {
                if (!JW.isSet(target[key]))
                    target[key] = source[key];
            }
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
     * Back function to htmlEncode.
     * WARNING: requires jQuery.
     */
    htmlDecode: function(text)
    {
        return $("<div />").html(text).text();
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
     * Extends structured string dictionary of simple values to full ones.
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
        if (typeof x === "boolean" && typeof y === "boolean")
            return x ? (y ? 0 : 1) : (y ? -1 : 0);
        
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
     * Returns class or finds it by name.
     */
    makeClass: function(v)
    {
        return (typeof v === "string") ? BBB.get(window, v) : v;
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
    },
    
    /**
     * Get field value.
     * If field name is started with "-", returns variable value.
     * Else tries to run getter method or returns variable value.
     */
    getField: function(target, field)
    {
        if (!field)
            return null;
        
        if (field.charAt(0) === "-")
            return target[field];
        
        var m = "get" + field.substr(1).capitalize();
        if (typeof target[m] === "function")
            return target[m]();
        
        return target[field];
    },
    
    /**
     * Set field value.
     * If field name is started with "-", changes variable value.
     * Else tries to run setter method or changes variable value.
     * Does nothing if value is already the same strictly.
     */
    setField: function(target, field, value)
    {
        if (!field)
            return;
        
        if (BBB.getField(target, field) === value)
            return;
        
        if (field.charAt(0) === "-")
        {
            target[field] = value;
            return target;
        }
        
        var m = "set" + field.substr(1).capitalize();
        if (typeof target[m] === "function")
            return target[m](value);
        
        target[field] = value;
        return target;
    },
    
    /**
     * Try to bind an event handler.
     */
    bindEvent: function(target, event, handler, scope)
    {
        if (!event || typeof target.bind !== "function")
            return;
        
        target.bind(event, handler, scope);
    },
    
    /**
     * Takes first symbol in string to upper case.
     */
    capitalize: function(s)
    {
        return s.capitalize();
    },
    
    /**
     * Converts all hyphen/lowercase pairs to uppercase symbols.
     */
    camel: function(s)
    {
        return s.camel();
    },
    
    /**
     * Converts all uppercase letters to hyphen/lowercase pairs.
     */
    hyphen: function(s)
    {
        return s.hyphen();
    },
    
    /**
     * Parses string to boolean.
     */
    parseBool: function(s)
    {
        return (typeof s === "string") ? (s === "true") : !!s;
    }
});

if (!window.console)
    window.console = { log: JW.emptyFn };
