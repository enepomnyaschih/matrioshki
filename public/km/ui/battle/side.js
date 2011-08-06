KM.UI.Battle.Side = JW.Svg.extend({
    side        : null,     // [required] KM.Model.Battle.Side
    dicesPos    : null,     // [required] Number (1 or -1)
    
    unitsView   : null,     // [readonly] JW.Svg
    dicesView   : null,     // [readonly] JW.Svg
    
    dicesDone   : 0,        // [readonly] Integer
    
    render: function()
    {
        this._super();
        
        this.unitsView = new JW.Svg();
        this.dicesView = new JW.Svg({
            y: this.dicesPos * KM.Constants.BATTLE_DICES_Y
        });
        
        this.addChild(this.unitsView);
        this.addChild(this.dicesView);
        
        for (var i = 0; i < this.side.inPower; ++i)
        {
            var unitView = this.side.player.createUnitView({
                power   : i,
                x       : i * 30
            });
            
            this.unitsView.addChild(unitView);
        }
    },
    
    roll: function()
    {
    },
    
    fixDice: function(index)
    {
    },
    
    showPoints: function()
    {
    },
    
    defeat: function()
    {
    }
});
