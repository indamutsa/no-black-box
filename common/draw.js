const draw = {};

draw.path = (ctx, path, color = "black") => {
  ctx.strokStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(...path[0]);

  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(...path[i]);
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
};

// Draw multiple paths
draw.paths = (ctx, paths, color = "black") => {
  paths.forEach((path) => {
    draw.path(ctx, path, color);
  });
};

if (typeof module !== "undefined") module.exports = draw;
