JW.ns("KM.Model");

KM.Model.Battle = JW.Model.extend({
    attack              : null,         //[required] KM.Model.Battle.Side
    defence             : null,         //[required] KM.Model.Battle.Side

    attackWins          : null,         //[readonly] Boolean

    //virtual
    fight: function() /*void*/
    {
    },

    //virtual
    dropDices: function(side /*KM.Model.Battle.Side*/) /*Ingeter*/
    {
    },

    getDicePoints: function() /*Ingeter*/
    {
        var points = Math.floor(Math.random() * 6) + 1;
        if (points == 7)
        {
            points = 6;
        }

        return points;
    }
});

KM.Model.Battle.getDicePoints = KM.Model.Battle.prototype.getDicePoints;
