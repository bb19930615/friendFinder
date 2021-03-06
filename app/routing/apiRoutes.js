var friends = require("../data/friends.js");


// CANNOT  GET THE FRIENDS ARRAY TO BE SHOWN WITH THE /api/friends ROUTE

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        //Here we take the result of the user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        //This variable will calculate the difference between the user's scores and the scores of each user in the database
        var totalDifference = 0;

        //Here we loop through all the friend possibilities in the database
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            //We then loop through all the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {

                //We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                //If the sum of difference is less than the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
}