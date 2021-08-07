const redis = require("redis");

let Redis = redis.createClient({
  port: 6379,
  host: "localhost",
});
Redis.on("connect", () =>
  console.log("Connected to Redis! ".bgYellow.black.bold)
);

// Drop All Redis
if (JSON.parse(process.env.DROP_DB)) {
  Redis.flushdb(function (err, succeeded) {
    console.log("Redis DropAll:".bgGreen.white.bold, succeeded); // will be true if successfull
  });
}

module.exports = Redis;
