JW.ns("KM.UI");

KM.UI.GoogleAsset = JW.Svg.Image.extend({
    width       : KM.Constants.GOOGLE_WIDTH,
    height      : KM.Constants.GOOGLE_HEIGHT,
    x           : KM.Constants.GOOGLE_X,
    y           : KM.Constants.GOOGLE_Y,
    src         : "images/gdd-2011.svg",
    href        : "http://www.google.com/events/developerday/2011/"
});

JW.PreLoader.request({
    url: "images/gdd-2011.svg",
    viewBox: "0 0 176 141"
});