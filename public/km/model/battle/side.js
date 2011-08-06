JW.ns("KM.Model.Battle");

KM.Model.Battle.Side = JW.Model.extend({
    inPower             : null,         //[required] Integer

    outPower            : null,         //[readonly] Integer
    dicePoints          : null          //[readonly] Integer
});