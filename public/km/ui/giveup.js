JW.ns("KM.UI");

KM.UI.Giveup = JW.Svg.extend({
    render: function()
    {
        this._super();
        
        var sprite = new JW.Svg.Image({
            x           : -6,
            y           : -2,
            src         : "images/giveup.svg",
            width       : 36,
            height      : 24
        });
        
        this.addChild(sprite);
        
        this.line(0, 0, 0, 25).attr({
            "stroke": "#888800"
        });
        
        this.setAttr("cursor", "pointer");
    }
});

JW.PreLoader.request({
    url     : "images/giveup.svg",
    viewBox : "0 0 303 191"
});
