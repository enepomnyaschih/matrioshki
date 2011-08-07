KM.UI.Flag.Point = JW.Svg.extend({
    flag        : null,     // [required] KM.Model.Flag
    
    flagView    : null,     // [readonly] KM.UI.Flag
    
    creationComplete: function()
    {
        this._super();
        
        this.flag.bind("playerchanged", this._onPlayerChanged, this);
        this._updateFlag();
    },
    
    _updateFlag: function()
    {
        if (this.flagView)
            this.flagView.destroy();
        
        var state = (this.flag.getPlayer().index == 0) ? "Victory" : "Defeat";
        var country = this.flag.country;
        var cls = KM.UI.Flag[state][country];
        
        this.flagView = new cls({
            x: KM.Constants.modelToViewX(this.flag.coordinates[0]),
            y: KM.Constants.modelToViewY(this.flag.coordinates[1])
        });
        
        this.addChild(this.flagView);
        this.flagView.creationComplete();
    },
    
    _onPlayerChanged: function()
    {
        this._updateFlag();
    }
});
