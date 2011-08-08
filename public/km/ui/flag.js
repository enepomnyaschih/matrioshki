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
        this.flag = new JW.Svg({
            width:  this.width,
            height: this.height
        });

        this.addChild(this.flag);

        this.loadFlag();

        this.flag.setAttr("viewBox", "0 0 " + 303 + " " + 191);
    },

    loadFlag: function() /*void*/
    {
        $.ajax({
            url: this.flagName,
            methods: "get",
            success: function(scope, status, response) {
                var parser = new DOMParser();
                parser.async = false;

                var el = parser.parseFromString(response.responseText, 'text/xml').documentElement;
                this.flag.paper.canvas.appendChild(el);
            }.inScope(this)
        });
    },

});

JW.Component.template(KM.UI.Flag, {
    viewBox: $.template("0 0 ${size} ${size}")
});
