
// load sample data

//mongoimport --db tweetdb --collection tweets --file  'D:\NTU\SD6103\tech_review\tweets-utf-8.json'
// use tweetdb
db.tweets.findOne();

// This COLLECTION contains some tweets that came from 2017, each documnet is a tweet that contains
// There's also some information about the location, where this tweet was sent from 

// queries
//find all tweets that are replying to the user with screen name allisonsimss
db.tweets.find({"in_reply_to_screen_name": "allisonsimss"});

// say if i only want to know the user name, i can do 
db.tweets.find({"in_reply_to_screen_name": "allisonsimss"},{"user.screen_name":1, _id: 0});



// return user  screen_name who has more than 10000 followers


db.tweets.find({"user.followers_count":{$gt:100000}}, {'user.screen_name':1});
// top 10 user with highest followers_count


db.tweets.aggregate([
    { $project: { "user.screen_name": 1, "user.followers_count": 1, _id: 0 } }, // Include screen_name and followers_count
    { $sort: { "user.followers_count": -1 } }, // Sort by followers_count in descending order
    { $limit: 10 } // Limit to top 10
  ]);



db.tweets.insertOne({
    text: "hello world",
    user: {
      id: 1
    },
  });

db.tweets.find({ "user.id": 1 });
db.tweets.deleteOne({"user.id":1});

db.tweets.find({ "user.id": 1 }).explain("executionStats");
db.tweets.createIndex({ "user.id": 1 });
db.tweets.find({ "user.id": 1 }).explain("executionStats");