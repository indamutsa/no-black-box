const constants = require("../common/constants");
const featureFunctions = require("../common/featureFunctions");

const fs = require("fs");
console.log("Extracting features...");
const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

for (const sample of samples) {
  const paths = JSON.parse(
    fs.readFileSync(constants.JSON_DIR + "/" + sample.id + ".json")
  );

  const functions = featureFunctions.inUse.map((f) => f.function);
  sample.point = functions.map((f) => f(paths));

  // It is the same like above
  // sample.point = [
  //   featureFunctions.getPathCount(paths),
  //   featureFunctions.getPointCount(paths),
  // ];
}

// const featureNames = ["Path Count", "Point Count"];
const featureNames = featureFunctions.inUse.map((f) => f.name);

// The data is now ready to be used by the machine learning model.
fs.writeFileSync(
  constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((s) => {
      return {
        label: s.label,
        point: s.point,
      };
    }),
  })
);

// The data used for the web app, it has more information such as the id
fs.writeFileSync(
  constants.FEATURES_JS,
  `const features = ${JSON.stringify({ featureNames, samples })};`
);

console.log("Done extracting features.");
