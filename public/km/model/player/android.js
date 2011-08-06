KM.Model.Player.Android = KM.Model.Player.extend({
    color       : "#97C03E",
    
    // override
    createUnitView: function(config)
    {
        return new KM.UI.Unit.Android(config);
    }
});
