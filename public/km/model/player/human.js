KM.Model.Player.Human = KM.Model.Player.extend({
    index       : 0,
    color       : "#77a2d9",
    unitColor   : "#FF0000",
    
    // override
    createUnitView: function(config)
    {
        return new KM.UI.Unit.Matreshka(config);
    }
});
