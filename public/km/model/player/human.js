KM.Model.Player.Human = KM.Model.Player.extend({
    index       : 0,
    color       : "#FF0000",
    
    // override
    createUnitView: function(config)
    {
        return new KM.UI.Unit.Matreshka(config);
    }
});
