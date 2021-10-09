window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  const _VIDEO = document.querySelector("#video-element"),
    _CANVAS = document.querySelector("#canvas-element"),
    _DUR = document.querySelector("#set-video-seconds"),
    _CANVAS_CTX = _CANVAS.getContext("2d");

  let totalDuration = 0;

  //     change src of video
  document
    .querySelector("#file-input")
    .addEventListener("change", function (event) {
      // Set object URL as the video <source>
      document
        .querySelector("#video-element source")
        .setAttribute("src", URL.createObjectURL(event.target.files[0]));
      _VIDEO.load();
    });

  const addDur = (total) => {
    _DUR.innerHTML = "";
    for (let index = 0; index < total; index = index + 2) {
      let option = document.createElement("option");
      option.innerText = index;
      let att = document.createAttribute("selected");
      att.value = "true";
      if (index == 0) {
        option.setAttributeNode(att);
      }
      _DUR.appendChild(option);
    }
  };

  // Video metadata is loaded
  _VIDEO.addEventListener("loadedmetadata", function () {
    // Set canvas dimensions same as video dimensions
    _CANVAS.width = _VIDEO.videoWidth;
    _CANVAS.height = _VIDEO.videoHeight;
    totalDuration = _VIDEO.duration;
    addDur(totalDuration);
  });

  //update video on slecting time
  _DUR.addEventListener("change", (event) => {
    _VIDEO.currentTime = event.target[event.target.selectedIndex].innerText;
  });

  // Video playback position is changed
  document
    .querySelector("#video-element")
    .addEventListener("timeupdate", function () {
      console.log("time update");
      _CANVAS_CTX.drawImage(
        _VIDEO,
        0,
        0,
        _VIDEO.videoWidth,
        _VIDEO.videoHeight
      );

      // Setting parameters of the download link
      document
        .querySelector("#download-link")
        .setAttribute("src", _CANVAS.toDataURL());
      // You are now ready to grab the thumbnail from the <canvas> element
    });

  // dom load ended
});
