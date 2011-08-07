JW.Svg = JW.Component.extend({
    x           : null, // [optional] Number
    y           : null, // [optional] Number
    width       : null, // [optional] Number
    height      : null, // [optional] Number
    visible     : true, // [optional] Boolean
    clip        : false,// [optional] Boolean
    
    paper       : null, // [read-only] Raphael
    children    : null, // [read-only] Array of JW.Svg
    parent      : null, // [read-only] JW.Svg
    
    render: function()
    {
        this._super();
        
        var dummy = $("<div />");
        this.paper      = Raphael(dummy[0]);
        this.el         = $(this.paper.canvas);
        this.children   = [];
        
        this.setX(this.x);
        this.setY(this.y);
        this.setWidth(this.width);
        this.setHeight(this.height);
        
        this.setVisible(this.visible);
        
        if (!this.clip)
            this.setAttr("overflow", "visible");
    },
    
    destroyComponent: function()
    {
        if (this.parent)
            this.parent.removeChild(this);
        
        this._super();
    },
    
    creationComplete: function()
    {
        for (var i = 0; i < this.children.length; ++i)
            this.children[i].creationComplete();
    },
    
    addChild: function(child)
    {
        this.el.append(child.el);
        this.children.push(child);
        child.parent = this;
    },
    
    addChildAt: function(child, index)
    {
        if (!this.children.length && !index)
            return this.addChild(child);
        
        if (!index)
            this.children[0].el.before(child.el);
        else
            this.children[index - 1].el.after(child.el);
        
        this.children.splice(index, 0, child);
        child.parent = this;
    },
    
    removeChild: function(child)
    {
        child.el.remove();
        delete child.parent;
        this.children.removeItem(child);
    },
    
    removeChildAt: function(child, index)
    {
        var child = this.children[index];
        child.el.remove();
        delete child.parent;
        this.children.splice(index, 1);
    },
    
    removeAll: function()
    {
        for (var i = 0; i < this.children.length; ++i)
        {
            var child = this.children[i];
            child.el.remove();
            delete child.parent;
        }
        
        this.children = [];
    },
    
    toFront: function(child)
    {
        this.children.removeItem(child);
        this.addChild(child);
    },
    
    toBack: function(child)
    {
        this.children.removeItem(child);
        this.addChildAt(child, 0);
    },
    
    setX: function(x)
    {
        this.setAttr("x", x);
    },
    
    getX: function()
    {
        return this.getNumberAttr("x");
    },
    
    setY: function(y)
    {
        this.setAttr("y", y);
    },
    
    getY: function()
    {
        return this.getNumberAttr("y");
    },
    
    setWidth: function(width)
    {
        this.setAttr("width", width);
    },
    
    getWidth: function()
    {
        return this.getNumberAttr("width");
    },
    
    setHeight: function(height)
    {
        this.setAttr("height", height);
    },
    
    getHeight: function()
    {
        return this.getNumberAttr("height");
    },
    
    setXY: function(x, y)
    {
        this.setX(x);
        this.setY(y);
    },
    
    setSize: function(width, height)
    {
        this.setWidth (width);
        this.setHeight(height);
    },
    
    locate: function(x, y, width, height)
    {
        this.setXY(x, y);
        this.setSize(width, height);
    },
    
    setVisible: function(value)
    {
        if (value)
            this.show();
        else
            this.hide();
    },
    
    isVisible: function()
    {
        return this.getAttr("visibility") !== "hidden";
    },
    
    show: function()
    {
        this.removeAttr("visibility");
    },
    
    hide: function()
    {
        this.setAttr("visibility", "hidden");
    },
    
    setAttr: function(name, value)
    {
        if (JW.isSet(value))
            this.el[0].setAttribute(name, value);
        else
            this.el[0].removeAttribute(name);
    },
    
    getAttr: function(name)
    {
        return this.el[0].getAttribute(name);
    },
    
    getNumberAttr: function(name)
    {
        return parseFloat(this.getAttr(name) || "0");
    },
    
    removeAttr: function(name)
    {
        this.el[0].removeAttribute(name);
    },
    
    line: function(x0, y0, x1, y1)
    {
        return this.path("M" + x0 + " " + y0 + "L" + x1 + " " + y1);
    },
    
    path: function()
    {
        var path = this.paper.path.apply(this.paper, arguments);
        path.node.removeAttribute("stroke");
        path.node.removeAttribute("fill");
        return path;
    },
    
    rect: function()
    {
        var rect = this.paper.rect.apply(this.paper, arguments);
        rect.node.removeAttribute("stroke");
        rect.node.removeAttribute("fill");
        return rect;
    },
    
    circle: function()
    {
        var circle = this.paper.circle.apply(this.paper, arguments);
        circle.node.removeAttribute("stroke");
        circle.node.removeAttribute("fill");
        return circle;
    },
    
    rect: function()
    {
        var rect = this.paper.rect.apply(this.paper, arguments);
        rect.node.removeAttribute("stroke");
        rect.node.removeAttribute("fill");
        return rect;
    },
    
    stretchChildren: function()
    {
        for (var i = 0; i < this.children.length; ++i)
            this.children[i].setSize(this.getWidth(), this.getHeight());
    }
});
