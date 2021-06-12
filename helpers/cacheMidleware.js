const cache = require("memory-cache");
// const flatCache = require("flat-cache");

const memCache = new cache.Cache();
// const cache = flatCache.load("userCache");

// using cache memory
// after server goes down the cached data will be lost
const memCacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

// using flat cache
// the cached data won't be lost
const flatCacheMidleware = (req, res, next) => {
  let key = "--express--" + req.originalUrl || req.url;
  let cacheContent = cache.getKey(key);
  if (cacheContent) {
    res.send(cacheContent);
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.setKey(key, body);
      cache.save();
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = {
  memCacheMiddleware
}