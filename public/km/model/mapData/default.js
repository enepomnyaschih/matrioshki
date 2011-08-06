JW.ns("KM.Model.MapData");

KM.Model.MapData.Default = {
    playersAreas: [
        [{id:0,power:0}],
        [{id:2,power:7}]
    ],
    areas: [
        {
            coordinates: [[0.1,0.1],[0.1,0.9],[0.9,0.9],[0.9,0.1]],
            center: [0.5, 0.5]
        },
        {
            coordinates: [[1.1,0.1],[1.1,0.9],[1.9,0.9],[1.9,0.1]],
            center: [1.5, 0.5]
        },
        {
            coordinates: [[2.1,0.1],[2.1,0.9],[2.9,0.9],[2.9,0.1]],
            center: [2.5, 0.5]
        }
    ],
    areasNeighborders: [
        [1],
        [0,2],
        [1]
    ]
};
