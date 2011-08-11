JW.ns("KM.UI");

KM.UI.Help = JW.Svg.Image.extend({
    width       : KM.Constants.HELP_SIZE,
    height      : KM.Constants.HELP_SIZE,
    x           : KM.Constants.HELP_X,
    y           : KM.Constants.HELP_Y,
    src         : "images/help-icon.svg"
});

JW.PreLoader.request({
    url: "images/help-icon.svg",
    viewBox: "0 0 400 400"
});