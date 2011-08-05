JW.ns("KM");

KM.ConstantsClass = JW.Class.extend({
    VIEWPORT_WIDTH  : 800,
    VIEWPORT_HEIGHT : 600,
    
    MAP_VIEW_X      : 0,
    MAP_VIEW_Y      : 0,
    MAP_VIEW_WIDTH  : 600,
    MAP_VIEW_HEIGHT : 450,
    
    UNIT_SCALE_MIN  : 1,
    UNIT_SCALE_COEF : .25
});

KM.Constants = new KM.ConstantsClass();
