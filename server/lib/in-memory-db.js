"use strict";

// Requiring a JSON file automatically parses it and returns the data. These
// are just example tweets to make it less tedious to style the app initially.
const db = {
  tweets: require("../data-files/initial-tweets")
}

module.exports = db;

/* db = {
tweets: [ { User: {}, Content: {}, Created: number }, , , , { User2: {}, Content2: {}, Created2: number } ]
} */

/* 
-db is an object with one key named tweets
-tweets has its values in an array, two objects as elements
-each object element has 3 keys, 2 with objects as values
*/