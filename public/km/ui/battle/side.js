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
            var x = 50 + i * 30;
            
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
        var diceIndex = KM.Constants.UNIT_MAX_POWER - index - 1;
        if (diceIndex >= this.side.inPower)
            return;
        
        this.dicesView.children[diceIndex].setPoints(this.side.dicePoints[diceIndex]);
    },
    
    showPoints: function()
    {
        var power = 0;
        for (var i = 0; i < this.side.dicePoints.length; ++i)
            power += this.side.dicePoints[i];
        
        this.paper.text(15, 0, power.toString()).attr({
            "fill"          : this.side.player.unitColor,
            "font-size"     : 20,
            "font-family"   : "Comic Sans MS,serif"
        });
    },
    
    defeat: function()
    {
    }
});
