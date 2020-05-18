// This is a Jest transformer to turn style imports into empty objects
module.exports = {
  process() {
    return "module.exports = {};";
  },
  getCacheKey() {
    // The output is always the same
    return "cssTransform";
  },
};
