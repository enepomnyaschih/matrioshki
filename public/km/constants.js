JW.ns("KM");

KM.ConstantsClass = JW.Class.extend({
    VIEWPORT_WIDTH      : 800,
    VIEWPORT_HEIGHT     : 600,
    
    MAP_MODEL_WIDTH     : 1177.33,
    MAP_MODEL_HEIGHT    : 681.31,
    
    MAP_VIEW_X          : 0,
    MAP_VIEW_Y          : 0,
    MAP_VIEW_WIDTH      : 800,
    MAP_VIEW_HEIGHT     : 450,
    
    MAP_VIEW_TO_MODEL   : null,
    
    UNIT_MODEL_SIZE     : 10,
    UNIT_VIEW_SIZE      : 15,
    UNIT_SCALE_MIN      : 1,
    UNIT_SCALE_COEF     : .4,
    UNIT_MAX_POWER      : 8,
    
    DICE_VIEW_SIZE      : 20,
    
    AREA_LIGHTEN_STD    : 0,
    AREA_LIGHTEN_HIGH   : .3,
    AREA_LIGHTEN_BATTLE : .6,
    
    BATTLE_VIEW_X       : 80,
    BATTLE_VIEW_Y       : 470,
    BATTLE_DICES_Y      : 30,
    
    init: function()
    {
        this._super();
        
        this.MAP_VIEW_TO_MODEL = Math.min(
            this.MAP_VIEW_WIDTH  / this.MAP_MODEL_WIDTH,
            this.MAP_VIEW_HEIGHT / this.MAP_MODEL_HEIGHT
        );
    },
    
    modelToViewX: function(x)
    {
        return x * this.MAP_VIEW_TO_MODEL + this.MAP_VIEW_X;
    },
    
    modelToViewY: function(y)
    {
        return y * this.MAP_VIEW_TO_MODEL + this.MAP_VIEW_Y;
    },
    
    viewToModelX: function(x)
    {
        return (x - this.MAP_VIEW_X) / this.MAP_VIEW_TO_MODEL;
    },
    
    viewToModelY: function(y)
    {
        return (y - this.MAP_VIEW_Y) / this.MAP_VIEW_TO_MODEL;
    }
});

KM.Constants = new KM.ConstantsClass();
