/*
    JW button component.
    
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

JW.UI.Button = JW.UI.Component.extend({
    EVENT_CLICK : "click",  // handler(event)
    
    text        : null,     // [optional] String
    fn          : null,     // [optional] Function
    scope       : null,     // [optional] Object
    enabled     : true,     // [optional] Boolean
    locks       : null,     // [optional] Array of String
    focus       : false,    // [optional] Boolean
    
    initComponent: function()
    {
        this.text = this.text || "Button";
        this.locks = JW.makeArray(this.locks);
        
        this._super();
    },
    
    render: function()
    {
        this._super();
        
        this.el.text(this.text);
        this.el.click(this._onClick.inScope(this));
        
        if (this.fn)
            this.bind("click", this.fn, this.scope || this);
        
        if (!this.enabled)
        {
            delete this.enabled;
            this.locks.push("__disabled");
        }
        
        this.locks = this.locks.createDictionary();
        this._updateEnabled();
        
        if (this.focus)
            this.el.addClass("auto-focus");
    },
    
    disable: function(key)
    {
        key = key || "__disabled";
        delete this.locks[key];
        this._updateEnabled();
    },
    
    enable: function(key)
    {
        key = key || "__disabled";
        this.locks[key] = key;
        this._updateEnabled();
    },
    
    setEnabled: function(value, key)
    {
        if (value)
            this.enable(key);
        else
            this.disable(key);
    },
    
    _updateEnabled: function()
    {
        var enabled = JW.every(this.locks, Function.returns(false)); // false if at least one lock exists
        if (enabled)
            this.el.removeClass("disabled");
        else
            this.el.addClass("disabled");
    },
    
    _onClick: function(event)
    {
        event.preventDefault();
        
        if (this.el.hasClass("disabled"))
            return;
        
        this.trigger("click");
    }
});

JW.UI.template(JW.UI.Button, {
    main: '<a jwclass="jw-button" href="#" />'
});
