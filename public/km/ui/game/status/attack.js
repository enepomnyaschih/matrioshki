KM.UI.Game.Status.Attack = KM.UI.Game.Status.extend({
    sourceAreaView  : null,     // [required] KM.UI.Area
    targetAreaView  : null,     // [required] KM.UI.Area
    
    battleView      : null,     // [readonly] KM.UI.Battle
    
    init: function(sourceAreaView, targetAreaView)
    {
        this._super();
        
        this.sourceAreaView = sourceAreaView;
        this.targetAreaView = targetAreaView;
    },
    
    // override
    run: function()
    {
        var attack = new KM.Model.Battle.Side({
            player  : this.sourceAreaView.area.getPlayer(),
            inPower : this.sourceAreaView.area.power
        });
        
        var defence = new KM.Model.Battle.Side({
            player  : this.targetAreaView.area.getPlayer(),
            inPower : this.targetAreaView.area.power
        });
        
        var battle = new KM.Model.Battle({
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
        this.battleView.destroy();
        this.gameView.setStatus(new KM.UI.Game.Status.SelectSource());
    }
});
