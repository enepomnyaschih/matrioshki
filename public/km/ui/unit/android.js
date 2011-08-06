KM.UI.Unit.Android = KM.UI.Unit.extend({
    render: function()
    {
        this._super();
        
        this.setAttr("fill", "#97C03E");
    },
    
    // override
    _drawHead: function()
    {
        this.headView.path("M0 -5L-2 -3L2 -3");
    },
    
    // override
    _drawBody: function()
    {
        this.bodyView.path("M2 -2L-2 -2L-2 3L2 3");
    }
});
