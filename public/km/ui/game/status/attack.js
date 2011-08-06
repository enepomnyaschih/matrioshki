KM.UI.Game.Status.Attack = KM.UI.Game.Status.extend({
    sourceAreaView  : null,     // [required] KM.UI.Area
    targetAreaView  : null,     // [required] KM.UI.Area
    
    sourceArea      : null,     // [readonly] KM.Model.Area
    targetArea      : null,     // [readonly] KM.Model.Area
    
    battleView      : null,     // [readonly] KM.UI.Battle
    
    init: function(sourceAreaView, targetAreaView)
    {
        this._super();
        
        this.sourceAreaView = sourceAreaView;
        this.targetAreaView = targetAreaView;
        
        this.sourceArea = this.sourceAreaView.area;
        this.targetArea = this.targetAreaView.area;
    },
    
    // override
    run: function()
    {
        this.gameView.endTurnButton.hide();
        
        var attack = new KM.Model.Battle.Side({
            player  : this.sourceArea.getPlayer(),
            inPower : this.sourceArea.power
        });
        
        var defence = new KM.Model.Battle.Side({
            player  : this.targetArea.getPlayer(),
            inPower : this.targetArea.power
        });
        
        var battle = new KM.Model.Battle.Classic({
            attack  : attack,
            defence : defence
        });
        
        battle.fight();
        
        this.battleView = new KM.UI.Battle({
            battle: battle
        });
        
        this.gameView.addChild(this.battleView);
        
        this.battleView.bind("finished", this._onFinished, this);
        this.battleView.run();
    },
    
    _onFinished: function()
    {
        if (this.battleView.battle.attackWins)
        {
            this.targetArea.setPlayer(this.sourceArea.player);
            this.targetArea.setPower(this.sourceArea.power - 1);
        }
        
        this.sourceArea.setPower(1);
        
        this.battleView.destroy();
        this.gameView.resetStatus();
    }
});
