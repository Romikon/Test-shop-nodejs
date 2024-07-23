const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
});

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
}

connectRedis();

module.exports = redisClient