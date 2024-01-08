const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220];

utils.formatPercent = (percent) => {
  return (percent * 100).toFixed(2) + "%";
};

// Google chart
// utils.styles = {
//   car: "gray",
//   fish: "red",
//   house: "yellow",
//   tree: "green",
//   bicycle: "cyan",
//   guitar: "blue",
//   pencil: "magenta",
//   clock: "lightgray",
// };

utils.styles = {
  car: { color: "gray", text: "🚗" },
  fish: { color: "red", text: "🐟" },
  house: { color: "yellow", text: "🏠" },
  tree: { color: "green", text: "🌲" },
  bicycle: { color: "cyan", text: "🚲" },
  guitar: { color: "blue", text: "🎸" },
  pencil: { color: "magenta", text: "✏️" },
  clock: { color: "lightgray", text: "🕒" },
};

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(count / max);

  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (array, key) => {
  return array.reduce((result, item) => {
    // Group by key
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
};

if (typeof module !== "undefined") module.exports = utils;
