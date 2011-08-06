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
            var x = i * 30;
            
            var unitView = this.side.player.createUnitView({
                power   : i,
                x       : x
            });
            
            var diceView = new KM.UI.Dice({
                x       : x
            });
            
            this.unitsView.addChild(unitView);
            this.dicesView.addChild(diceView);
        }
    },
    
    roll: function()
    {
        var dices = Math.min(this.side.inPower, KM.Constants.UNIT_MAX_POWER - this.dicesDone);
        for (var i = 0; i < dices; ++i)
            this.dicesView.children[i].setPoints();
    },
    
    fixDice: function(index)
    {
        this.dicesDone = index + 1;
        if (index >= this.side.inPower)
            return;
        
        this.dicesView.children[index].setPoints(this.side.dicePoints[index]);
    },
    
    showPoints: function()
    {
    },
    
    defeat: function()
    {
    }
});
