JW.ns("KM.Model");

KM.Model.Player = JW.Observable.extend({
    index       : null,     // [required] Integer
    color       : null,     // [required] String
    
    // virtual
    createUnitView: function(config)
    {
        return null;
    }
});
