JW.ns("KM.Model.Battle");

KM.Model.Battle.Side = JW.Model.extend({
    player              : null,         //[required] KM.Model.Player
    inPower             : null,         //[required] Integer

    outPower            : null,         //[readonly] Integer
    dicePoints          : null          //[readonly] Integer
});