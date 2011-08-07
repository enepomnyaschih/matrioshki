KM.Model.Player.Android = KM.Model.Player.extend({
    index       : 1,
    color       : "#F2ED6A",
    unitColor   : "#97C03E",
    
    // override
    createUnitView: function(config)
    {
        return new KM.UI.Unit.Android(config);
    }
});
