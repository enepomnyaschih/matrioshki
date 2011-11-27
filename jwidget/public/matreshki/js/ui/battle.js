JW.ns("KM.UI");

KM.UI.Battle = JW.Svg.extend({
    FINISHED    : "finished",
    
    battle      : null,     // [required] KM.Model.Battle
    
    attackView  : null,     // [readonly] KM.UI.Battle.Side
    defenceView : null,     // [readonly] KM.UI.Battle.Side
    
    dicesDone   : 0,        // [readonly] Integer
    
    x: KM.Constants.BATTLE_VIEW_X,
    y: KM.Constants.BATTLE_VIEW_Y,
    
    render: function()
    {
        this._super();
        
        this.attackView = new KM.UI.Battle.Side.Attack({
            side: this.battle.attack
        });
        
        this.defenceView = new KM.UI.Battle.Side.Defence({
            side: this.battle.defence
        });
        
        this.addChild(this.attackView);
        this.addChild(this.defenceView);
    },
    
    run: function()
    {
        this._timerRoll  = setInterval(this._onRoll .inScope(this), 70);
        this._timerLogic = setInterval(this._onLogic.inScope(this), 90);
    },
    
    _onRoll: function()
    {
        this.attackView .roll();
        this.defenceView.roll();
    },
    
    _onLogic: function()
    {
        this.attackView .fixDice(this.dicesDone);
        this.defenceView.fixDice(this.dicesDone);
        
        if (++this.dicesDone != KM.Constants.UNIT_MAX_POWER)
            return;
        
        clearInterval(this._timerRoll);
        clearInterval(this._timerLogic);
        
        this.attackView .showPoints();
        this.defenceView.showPoints();
        
        if (this.attackWins)
            this.defenceView.defeat();
        else
            this.attackView.defeat();
        
        setTimeout(this._onFinish.inScope(this), 600);
    },
    
    _onFinish: function()
    {
        this.trigger("finished");
    }
});
