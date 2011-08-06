KM.Model.Player.Human = KM.Model.Player.extend({
    color       : "#FF0000",
    
    // override
    createUnitView: function(config)
    {
        return new KM.UI.Unit.Matreshka(config);
    }
});
