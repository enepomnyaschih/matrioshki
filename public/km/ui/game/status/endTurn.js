KM.UI.Game.Status.EndTurn = KM.UI.Game.Status.extend({
    power: 0, // [readonly] Integer
    
    // override
    run: function()
    {
        this.gameView.endTurnButton.hide();
        
        this.power = this._calculatePower();
        
        this._checkPower();
    },
    
    _calculatePower: function()
    {
        var areas   = this.gameView.game.map.areas;
        var n       = areas.length;
        var cur     = 0;
        var was     = [];
        var queue   = [];
        var maxC    = 0;
        
        for (var i = 0; i < n; i++)
        {
            was[i] = -1;
        }

        for (var i = 0; i < n; i++)
        {
            var area = areas[i];

            if (was[i] != -1 || area.player != this.gameView.currentPlayer)
               continue;
            
            queue.push(i);
            
            while (queue.length)
            {
                var v = queue.shift();
                if (was[v] != -1)
                    continue;
                
                was[v] = cur;
                var area1 = areas[v];
                
                JW.each (area1.borders, function(j) {
                    var area2 = areas[j];
                    if (was[j] == -1 && area2.player == area1.player)
                    {
                        queue.push(j);
                    }
                });
            }
            ++cur;
        }

        var result = 1;
        
        for (var i = 0; i < n; i++)
        {
            var temp = 0;

            for (var j = 0; j < n; j++)
            {
                temp += (was[j] == i);
            }

            result = Math.max(result, temp);
        }

        console.log(result);

        return result;
    },
    
    _checkPower: function()
    {
        if (!this.power)
            return this.gameView.nextPlayer();
        
        --this.power;
        if (!this.gameView.game.map.empowerPlayer(this.gameView.currentPlayer))
            this.gameView.nextPlayer();
        else
            setTimeout(this._checkPower.inScope(this), 100);
    }
});
