JW.ns("KM.Model");

KM.Model.Area = JW.Model.extend({
    CHANGED             : "changed",    //handler(event, KM.Model.Area)
    coordinates         : null,         //[required] Array<Array<Integer>>
    center              : null,         //[required] Array<Integer>

    //private
    player              : null,         //[readonly] KM.Model.Player
    power               : null,         //[readonly] Integer

    update: function(player /*KM.Model.Player*/, power /*Integer*/) /*void*/
    {
        this.player = player;
        this.power = power;
        this.trigger("changed");
    },

    getPower: function() /*Integer*/
    {
        return this.power;
    },

    setPower: function(power /*Integer*/) /*void*/
    {
        this.power = power;
        this.trigger("changed");
    },

    getPlayer: function() /*Integer*/
    {
        return this.player;
    },

    setPlayer: function(player /*KM.Model.Player*/) /*void*/
    {
        this.player = player;
        this.trigger("changed");
    },

    getCoordinates: function()  /*Array<Array<Integer>>*/
    {
        return this.coordinates;
    },

    setCoordinates: function(coordinates /*Array<Array<Integer>>*/) /*void*/
    {
        this.coordinates = coordinates;
        this.trigger("changed");
    },

    getCenter: function()  /*Array<Integer>*/
    {
        return this.center;
    },

    setCenter: function(center /*Integer*/) /*void*/
    {
        this.center = center;
        this.trigger("changed");
    }
});
