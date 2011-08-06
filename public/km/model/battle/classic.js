JW.ns("KM.Model.Battle");

KM.Model.Battle.Classic = KM.Model.Battle({
    fight: function() /*void*/
    {
        this.attackWins = this.dropDices(this.attack) > this.dropDices(this.defence);
        if (this.attackWins)
        {
            this.attack.outPower  = this.attack.inPower;
            this.defence.outPower = 0;
        }
        else
        {
            this.defence.outPower = this.defence.inPower;
            this.attack.outPower  = 0;
        }
    },

    dropDices: function(side /*KM.Model.Battle.Side*/) /*Ingeter*/
    {
        var result = 0;
        var power = side.inPower;
        side.dicePoints = [];
        for (var i = 0; i < power; ++i)
        {
            var points = this.getDicePoints();
            side.dicePoints.push(points);
            result += points;
        }

        return result;
    }
});

