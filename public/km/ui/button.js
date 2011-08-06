JW.ns("KM.UI");

KM.UI.Button = JW.Svg.extend({
    text: "Button", // [optional] String
    
    render: function()
    {
        this._super();
        
        this.rect(0, 0, this.getWidth(), this.getHeight(), 5).attr({
            "fill"          : "white",
            "stroke"        : "black",
            "stroke-width"  : 3
        });
        
        this.paper.text(this.getWidth() / 2, this.getHeight() / 2 + 7, this.text).attr({
            "fill"          : "black",
            "font-size"     : 20,
            "font-family"   : "Comic Sans MS,serif"
        });
        
        this.setAttr("cursor", "pointer");
    }
});
