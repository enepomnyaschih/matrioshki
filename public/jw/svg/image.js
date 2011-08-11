JW.ns("JW.Svg");

JW.Svg.Image = JW.Svg.extend({
    src: "images/flag-arg.svg",

    width       : 10,
    height      : 10,

    render: function()
    {
        this._super();
        
        this.svgEl = this.addSvgChild(this.src);
        
        var response = JW.PreLoader.getResponse(this.src);
        this.setAttr("viewBox", response.viewBox);
    },
    
    addSvgChild: function(src)
    {
        if (!JW.PreLoader.isComplete(src))
            throw new Error("Resource is not loaded: " + src);
        
        var response = JW.PreLoader.getResponse(src);
        
        var parser = new DOMParser();
        parser.async = false;
        
        var el = parser.parseFromString(response.responseText, 'text/xml').documentElement;
        this.paper.canvas.appendChild(el);
        
        return el;
    }
});