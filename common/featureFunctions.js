const featureFunctions = {};

featureFunctions.getPathCount = function (paths) {
  return paths.length;
};

featureFunctions.getPointCount = function (paths) {
  const points = paths.flat();
  return points.length;
};


// Extracting more features
featureFunctions.getWidth = (paths) => {
  const points = paths.flat();
  const x = points.map((p) => p[0]);
  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  return maxX - minX;
}

featureFunctions.getHeight = (paths) => {
  const points = paths.flat();
  const y = points.map((p) => p[1]);
  const minX = Math.min(...y);
  const maxX = Math.max(...y);
  return maxX - minX;
}
if (typeof module !== "undefined") module.exports = featureFunctions;
