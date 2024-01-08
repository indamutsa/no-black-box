class SketchPad {
  constructor(container, onUpdate = null, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
            background-color: #fff;
            box-shadow: 0 0 10px 2px #000;
        `;

    // Append canvas to container
    container.appendChild(this.canvas);

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    // Create the clear button
    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "UNDO";
    container.appendChild(this.undoBtn);

    // Get the 2D context of the canvas
    this.ctx = this.canvas.getContext("2d");

    this.onUpdate = onUpdate;

    // Set Default drawing properties
    this.reset();

    // Add event listeners
    this.#addEventListeners();
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  // Private method to add event listeners
  #addEventListeners() {
    // On mouse down event
    this.canvas.onmousedown = (e) => {
      const mouse = this.#getMouse(e);

      // Start drawing
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    // On mouse move event
    this.canvas.onmousemove = (e) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(e);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    };

    // On mouse up event
    document.onmouseup = (e) => {
      this.isDrawing = false;
    };

    this.canvas.ontouchstart = (e) => {
      const location = e.touches[0];
      this.canvas.onmousedown(location);
    };

    this.canvas.ontouchmove = (e) => {
      const location = e.touches[0];
      this.canvas.onmousemove(location);
    };

    document.ontouchend = (e) => {
      this.canvas.onmouseup(e);
    };

    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
  }

  #redraw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the path
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }

    if (this.onUpdate) {
      this.onUpdate(this.paths);
    }
  }

  #getMouse = (e) => {
    const rect = this.canvas.getBoundingClientRect();

    // Get the mouse position relative to the canvas
    return [
      Math.round(e.clientX - rect.left),
      Math.round(e.clientY - rect.top),
    ];
  };
}
