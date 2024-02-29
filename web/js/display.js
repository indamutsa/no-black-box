function createRow(container, studentName, samples) {
  // CREATE ROW DIV
  const row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);

  // CREATE ROW LABEL
  const rowLabel = document.createElement("div");
  rowLabel.innerHTML = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  // CREATE SAMPLE IMAGE

  // console.log(samples);
  for (let i = 0; i < samples.length; i++) {
    const { id, label, student_id } = samples[i];

    const sampleContainer = document.createElement("div");
    sampleContainer.id = "sample_" + id;

    // Adding handleClick to each sample
    sampleContainer.onclick = () => handleClick(samples[i], false);
    sampleContainer.classList.add("sampleContainer");

    const sampleLabel = document.createElement("div");
    sampleLabel.innerHTML = label;
    sampleContainer.appendChild(sampleLabel);

    const img = document.createElement("img");
    img.src = constants.IMG_DIR + "/" + id + ".png";
    img.alt = label;
    img.classList.add("thumb");

    if (utils.flaggedUsers.includes(student_id)) {
      img.classList.add("blur");
    }
    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
}

function handleClick(sample, doScroll = true) {
  // if (sample == null)
  // We remove the "emphasize" class from all elements
  [...document.querySelectorAll(".emphasize")].forEach((el) => {
    el.classList.remove("emphasize");
  });

  const el = document.getElementById("sample_" + sample.id);

  if (el.classList.contains("emphasize")) {
    el.classList.remove("emphasize");
    chart.selectSample(null);
    return;
  }

  el.classList.add("emphasize");
  if (doScroll)
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  chart.selectSample(sample);
}

function toggleInput() {
  const inputContainer = document.getElementById("inputContainer");
  if (inputContainer.style.display == "none"){
    inputContainer.style.display = "block";
    sketchpad.triggerUpdate();
  }
  else {
    inputContainer.style.display = "none";
    chart.hideDynamicPoint();
  }
}
