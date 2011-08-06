JW.ns("KM.Model");

KM.Model.Map = JW.Model.extend({
    CHANGED             : "changed",    // handler(event, KM.Model.Area)
    
    game                : null,         //[required] KM.Model.Game
    mapData             : null,         //[required] Object
    
    areas               : null,         //[readonly] Array<KM.Model.Area>
    
    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        
        this.initAreas();
    },

    initAreas: function() /*void*/
    {
        this.areas = [];
        JW.each(this.mapData.areas, function(areaData, index) /*void*/
        {
            var area = new KM.Model.Area(this, index, areaData);
            this.areas.push(area);
        }, this);
    }
});
