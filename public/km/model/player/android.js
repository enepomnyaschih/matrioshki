KM.Model.Player.Android = KM.Model.Player.extend({
    index       : 1,
    color       : "#97C03E",
    
    // override
    createUnitView: function(config)
    {
        return new KM.UI.Unit.Android(config);
    }
});
