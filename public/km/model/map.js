JW.ns("KM.Model");

KM.Model.Map = JW.Model.extend({
    mapData: null, /*[required] Object*/

    //private
    areas: null, /*Array<KM.Model.Area>*/
    neighborders: null, /*JW.Map*/

    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        this.neighborders = new JW.Map();
        this.initAreas();
    },

    initAreas: function() /*void*/
    {
        this.areas = [];
        JW.each(this.mapData.areas, function(area) /*void*/
        {
            var area = new KM.Model.Area({
                coordinates: area.coordinates,
                center: area.center
            });

            this.relay(area, "changed");
            this.areas.push(area);
        }, this);

        this.neighborders = new JW.Map();
        JW.each(this.mapData.areasNeighborders, function(neighborders /*Array<Integer>*/, id /*Integer*/) /*void*/
        {
            var neighborders_list = []; /*Array<KM.Model.Area>*/
            JW.each(neighborders, function(neighborder /*Integer*/) /*void*/
            {
                neighborders_list.push(this.areas[neighborder]);
            }, this);

            this.neighborders.set(this.areas[id], neighborders_list);
        }, this);
    },

    getAreas: function() /*Array<KM.Model.Area>*/
    {
        return this.areas;
    },

    getArea: function(id /*Integer*/) /*Array<KM.Model.Area>*/
    {
        return this.areas[id];
    },

    getNeighborders: function(area /*KM.Model.Area*/) /*Array<KM.Model.Area>*/
    {
        return this.neighborders.get(area);
    }
});
