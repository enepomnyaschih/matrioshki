JW.ns("KM.Model");

KM.Model.Player = JW.Observable.extend({
    color       : null,     // [required] String
    
    // virtual
    createUnitView: function(config)
    {
        return null;
    }
});
