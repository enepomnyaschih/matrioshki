JW.ns("KM.Model.MapData");

KM.Model.MapData.Default = {
    areas: [
        {
            coordinates: [[0.1,0.1],[0.1,0.9],[0.9,0.9],[0.9,0.1]],
            center: [0.5, 0.5],
            player: 0,
            power: 5,
            borders: [1]
        },
        {
            coordinates: [[1.1,0.1],[1.1,0.9],[1.9,0.9],[1.9,0.1]],
            center: [1.5, 0.5],
            player: 1,
            power: 1,
            borders: [0, 2]
        },
        {
            coordinates: [[2.1,0.1],[2.1,0.9],[2.9,0.9],[2.9,0.1]],
            center: [2.5, 0.5],
            player: 1,
            power: 8,
            borders: [1]
        }
    ]
};
