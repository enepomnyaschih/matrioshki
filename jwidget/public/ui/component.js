/*
    JW base UI component.
    
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

JW.ns("JW.UI");

JW.UI.Component = JW.Observable.extend({
    renderTo    : null, // [optional] jQuery
    renderAs    : null, // [optional] jQuery
    plugins     : null, // [optional] Array of JW.UI.Plugin
    cls         : null, // [optional] String or Array of String
    visible     : true, // [optional] Boolean
    
    el          : null, // [readonly] jQuery Element
    
    init: function(config)
    {
        this._super();
        JW.apply(this, config);
        this._initComponent();
        this._render();
    },
    
    destroy: function()
    {
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].destroy();
        
        this.destroyComponent();
        
        if (this.el)
            this.el.remove();
        
        delete this.renderTo;
        delete this.renderAs;
        delete this.plugins;
        delete this.el;
        
        this._super();
    },
    
    /**
     * Component initialization.
     * Override this to specify initial values for component properties.
     * You can build plugins array here, these plugins will prepend ones from config object.
     * Append superclass method call.
     */
    initComponent: function()
    {
    },
    
    /**
     * Component rendering.
     * Override this to render component's HTML.
     * Template is applied here and all elements are defined.
     * You can customize elements' properties in this method and finish rendering.
     * Prepend superclass method call.
     */
    render: function()
    {
    },
    
    /**
     * After append to DOM.
     * Override this to specify any actions that require element to be inserted into DOM.
     * Used for layouting usually.
     * This method must be called manually!
     * Append superclass method call (optional).
     */
    afterAppend: function()
    {
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].afterAppend();
    },
    
    /**
     * Component destructor.
     */
    destroyComponent: function()
    {
    },
    
    /**
     * Get plugin instance by its xtype.
     */
    getPlugin: function(xtype)
    {
        return this.plugins.getBy("xtype", xtype);
    },
    
    /**
     * Focus first element with "auto-focus" class.
     */
    focus: function()
    {
        $(this.el.find(".auto-focus")[0]).focus();
    },
    
    _initComponent: function()
    {
        var cls = JW.makeArray(this.cls);
        this.cls = [];
        
        var plugins = this.plugins || [];
        this.plugins = [];
        
        this.initComponent();
        
        this.cls = JW.makeArray(this.cls).concat(cls);
        
        this.plugins = this.plugins.concat(plugins);
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].attach(this);
    },
    
    _render: function()
    {
        this._applyTemplate();
        
        this.render();
        for (var i = 0; i < this.plugins.length; ++i)
            this.plugins[i].render();
        
        this._applyRenderTo();
    },
    
    _applyTemplate: function()
    {
        this.el = $(this.templates.main);
        this.el.addClass(this.cls.join(" "));
        
        if (!this.visible)
            this.el.hide();
        
        var jwClass = this.el.attr("jwclass");
        if (jwClass)
        {
            this.el.removeAttr("jwclass");
            this.el.addClass(jwClass);
        }
        
        var anchorEls = this.el.find("[jwid]");
        for (var i = 0; i < anchorEls.length; ++i)
        {
            var anchorEl = $(anchorEls[i]);
            var jwId = anchorEl.attr("jwid");
            this[jwId.camel() + "El"] = anchorEl;
            anchorEl.removeAttr("jwid");
            
            if (jwClass)
                anchorEl.addClass(jwClass + "-" + jwId.hyphen());
        }
    },
    
    _applyRenderTo: function()
    {
        if (this.renderTo)
        {
            $(this.renderTo).append(this.el);
        }
        else if (this.renderAs)
        {
            var el = $(this.renderAs);
            el.after(this.el);
            
            this.el.addClass(el.attr("class") || "");
            if (el.attr("id"))
                this.el.attr("id", el.attr("id"));
            
            el.remove();
        }
    }
});

JW.UI.template(JW.UI.Component, {
    main: '<div />'
});
