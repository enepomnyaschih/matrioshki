JW.ns("KM.Audio");

KM.Audio.baseUrl = "http://matreshki.issart.com/audio/background/Jakim/";
KM.Audio.playlist = [
    {
        mp3: "03 - Whatever It Means.mp3",
        ogg: "03 - Whatever It Means.ogg",
        author: "Jakim",
        song: "Whatever It Means",
        duration: 113
    }, {
        mp3: "02 - Mindless.mp3",
        ogg: "02 - Mindless.ogg",
        author: "Jakim",
        song: "Mindless",
        duration: 132
    }, {
        mp3: "04 - A Guy Walks Into A Bar.mp3",
        ogg: "04 - A Guy Walks Into A Bar.ogg",
        author: "Jakim",
        song: "A Guy Walks Into A Bar",
        duration: 83
    }, {
        mp3: "05 - Bez Sensu.mp3",
        ogg: "05 - Bez Sensu.ogg",
        author: "Jakim",
        song: "Bez Sensu",
        duration: 87
    }, {
        mp3: "08 - Valium Candies.mp3",
        ogg: "08 - Valium Candies.ogg",
        author: "Jakim",
        song: "Valium Candies",
        duration: 92
    }, {
        mp3: "09 - Oldschool Groovin'.mp3",
        ogg: "09 - Oldschool Groovin'.ogg",
        author: "Jakim",
        song: "Oldschool Groovin'",
        duration: 129
    }, {
        mp3: "11 - Whatify.mp3",
        ogg: "11 - Whatify.ogg",
        author: "Jakim",
        song: "Whatify",
        duration: 134
    }, {
        mp3: "12 - Copycat.mp3",
        ogg: "12 - Copycat.ogg",
        author: "Jakim",
        song: "Copycat",
        duration: 86
    }, {
        mp3: "13 - Every.mp3",
        ogg: "13 - Every.ogg",
        author: "Jakim",
        song: "Every",
        duration: 98
    }, {
        mp3: "15 - Unfulfilled Hopes.mp3",
        ogg: "15 - Unfulfilled Hopes.ogg",
        author: "Jakim",
        song: "Unfulfilled Hopes",
        duration: 151
    }
];

for (var i = 0; i < KM.Audio.playlist.length; ++i)
{
    KM.Audio.playlist[i].mp3 = KM.Audio.baseUrl + KM.Audio.playlist[i].mp3;
    KM.Audio.playlist[i].ogg = KM.Audio.baseUrl + KM.Audio.playlist[i].ogg;
}
