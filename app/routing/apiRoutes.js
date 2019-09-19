var friends = require("../data/friends");

module.exports = function(app) {

  app.post("/api/clear", function(req, res) {
    friends.length = 0;
    res.json({ ok: true });
  });

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    var bestMatch = {
      name: "",
      photo: "",
      difference: 100
    };

    var user = req.body;
    var userScores = user.scores;
    var totalDifference = 0;

    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      for (var j = 0; j < 10; j++) {
        totalDifference += Math.abs(
          parseInt(userScores[j]) - parseInt(friends[i].scores[j])
        );
        console.log(totalDifference);
      }
      if (totalDifference <= bestMatch.difference) {
        bestMatch.name = friends[i].name;
        bestMatch.difference = totalDifference;
        bestMatch.photo = friends[i].photo;
      }
    }
    friends.push(user);
    res.json(bestMatch);
  });
};
