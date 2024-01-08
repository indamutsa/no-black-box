const draw = require("../common/draw");
const constants = require("../common/constants");
const utils = require("../common/utils");

const { createCanvas } = require("canvas");
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

const fs = require("fs");

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];

let id = 1;

fileNames.forEach((fileName) => {
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fileName);

  const { session, student, drawings } = JSON.parse(content);

  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    const paths = drawings[label];
    fs.writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(drawings[label])
    );

    generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths);
    utils.printProgress(id, fileNames.length * 8);
    id++;
  }
});

// Write samples to JSON file
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

fs.writeFileSync(
  constants.SAMPLES_JS,
  "const samples=" + JSON.stringify(samples) + ";"
);

function generateImageFile(outputFile, paths) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw.paths(ctx, paths);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputFile, buffer);
}
