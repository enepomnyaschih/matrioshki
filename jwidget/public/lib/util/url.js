/*
    JW URL formatter and parser.
    
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

JW.Url = JW.Class.extend({
    _protocol   : "",
    _hostname   : "",
    _port       : "",
    _pathname   : "",
    _search     : "",
    _hash       : "",
    
    init: function()
    {
        this.apply.apply(this, arguments);
    },
    
    apply: function()
    {
        this.clear();
        if (arguments.length == 0)
            return this;
        
        if (arguments.length == 1 && typeof arguments[0] === "string")
            return this.href(arguments[0]);
        
        if (arguments.length == 1 && typeof arguments[0] === "object")
            return this.config(arguments[0]);
        
        return this.tokens.apply(this, arguments);
    },
    
    clear: function()
    {
        delete this._protocol;
        delete this._hostname;
        delete this._port;
        delete this._pathname;
        delete this._search;
        delete this._hash;
        
        return this;
    },
    
    config: function(config)
    {
        for (var key in config)
            this[key](config.key);
        
        return this;
    },
    
    tokens: function(protocol, hostname, port, pathname, search, hash)
    {
        this.protocol   (protocol);
        this.hostname   (hostname);
        this.port       (port);
        this.pathname   (pathname);
        this.search     (search);
        this.hash       (hash);
        
        return this;
    },
    
    host: function(value)
    {
        if (typeof value === "undefined")
        {
            if (!this._hostname.length)
                return '';
            else if (this._port.length)
                return this._hostname + ":" + this._port;
            else
                return this._hostname;
        }
        
        if (!value)
        {
            delete this._hostname;
            delete this._port;
            
            return;
        }
        
        var index = value.indexOf(":");
        if (index == -1)
        {
            this._hostname = value;
            delete this._port;
            
            return;
        }
        
        this._hostname = value.substr(0, index);
        this._port = value.substr(index + 1);
        
        return this;
    },
    
    href: function(value)
    {
        if (typeof value === "undefined")
        {
            var buf = [];
            
            var protocol    = this.protocol();
            var host        = this.host();
            var pathname    = this.pathname();
            var search      = this.search();
            var hash        = this.hash();
            
            if (protocol.length && host.length)
                buf.push(protocol + "//");
            
            buf.push(host, pathname, search, hash);
            
            return buf.join("");
        }
        
        this.clear();
        
        var pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
        var rx = new RegExp(pattern);
        var parts = rx.exec(value);
        
        this.protocol(parts[1]  || "");
        this.hostname(parts[5]  || "");
        this.port    (parts[6]  || "");
        this.pathname(parts[7]  || "");
        this.search  (parts[8]  || "");
        this.hash    (parts[10] || "");
        
        return this;
    },
    
    addSearch: function(key, value)
    {
        if (!key)
            return this;
        
        if (typeof key === "object")
        {
            for (var i in key)
                this.addSearch(i, key[i]);
            
            return this;
        }
        
        if (!JW.isSet(value))
            return;
        
        var prefix = this._search.length ? "&" : "?";
        this._search += prefix + escape(key) + "=" + escape(value);
        
        return this;
    }
});

JW.Url.createProperty = function(name)
{
    var p = JW.Url.prototype;
    var _name = "_" + name;
    
    p[_name] = "";
    p[name] = function(value)
    {
        if (typeof value === "undefined")
            return this[_name];
        
        if (!JW.isEmpty(value))
            this[_name] = String(value);
        else
            delete this[_name];
        
        return this;
    }
}

JW.Url.createProperty("protocol");
JW.Url.createProperty("hostname");
JW.Url.createProperty("port");
JW.Url.createProperty("pathname");
JW.Url.createProperty("search");
JW.Url.createProperty("hash");

delete JW.Url.createProperty;

JW.Url.build = function(url, params)
{
    return new JW.Url(url).addSearch(params).href();
}
