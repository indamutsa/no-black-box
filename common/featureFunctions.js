const featureFunctions = {};

featureFunctions.getPathCount = function (paths) {
  return paths.length;
};

featureFunctions.getPointCount = function (paths) {
  const points = paths.flat();
  return points.length;
};

if (typeof module !== "undefined") module.exports = featureFunctions;
