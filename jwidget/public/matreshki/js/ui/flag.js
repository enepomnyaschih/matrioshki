JW.ns("KM.UI");

KM.UI.Flag = JW.Svg.extend({
    flagName: "images/flag-arg.svg",

    width       : KM.Constants.FLAG_VIEW_SIZE,
    height      : KM.Constants.FLAG_VIEW_SIZE,
    
    creationComplete: function()
    {
        this._super();
        
        this.setAttr("pointer-events", "none");
        
        this._drawFlag();
        
        this.children[0].setXY(this.xOffset, this.yOffset);
        
        this.line(0, 0, 0, -25).attr({
            "stroke": "#888800"
        });
    },
    
    // virtual
    _drawFlag: function()
    {
        this.flag = new JW.Svg.Image({
            width   : this.width,
            height  : this.height,
            src     : this.flagName
        });

        this.addChild(this.flag);
    }
});