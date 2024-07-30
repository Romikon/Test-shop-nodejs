/* eslint-disable no-undef */
const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
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