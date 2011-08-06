JW.ns("KM.UI");

KM.UI.Dice = JW.Svg.extend({
    points      : 0,        // [optional] Number
    
    pointsView  : null,     // [readonly] JW.Svg
    
    width       : KM.Constants.DICE_VIEW_SIZE,
    height      : KM.Constants.DICE_VIEW_SIZE,
    
    render: function()
    {
        this._super();
        
        this.setAttr("pointer-events", "none");
        
        this.path("M5 5L5 -5L-5 -5L-5 5").attr({
            "fill"          : "white",
            "stroke"        : "black",
            "stroke-width"  : 1
        });
        
        this.pointsView = new JW.Svg();
        this.addChild(this.pointsView);
        
        this.setPoints(this.points);
        
        this.setAttr("viewBox", "0 0 10 10");
    },
    
    setPoints: function(value)
    {
        this.pointsView.paper.clear();
        
        this.points = value || KM.Model.Battle.getDicePoints();
        
        var points = KM.UI.Dice.POINTS[this.points - 1];
        for (var i = 0; i < points.length; ++i)
        {
            var point = points[i];
            this.pointsView.circle(point[0], point[1], 1).attr("fill", "black").node.setAttribute("cx", point[0]);
        }
    }
});

KM.UI.Dice.POINTS = [
    [ [  0,  0 ] ],
    [ [  2,  2 ], [ -2, -2 ] ],
    [ [  2, -2 ], [  0,  0 ], [ -2,  2 ] ],
    [ [  2,  2 ], [  2, -2 ], [ -2, -2 ], [ -2,  2 ] ],
    [ [  2,  2 ], [  2, -2 ], [ -2, -2 ], [ -2,  2 ], [  0,  0 ] ],
    [ [  2,  2 ], [  2,  0 ], [  2, -2 ], [ -2, -2 ], [ -2,  0 ], [ -2,  2 ] ]
];
