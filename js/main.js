let sliders = document.querySelectorAll(".slider-container");
// let image = document.querySelector(".image-container .img");
let blur = document.getElementById("blur");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let saturate = document.getElementById("saturate");
let hue = document.getElementById("hue");
let resetBtn = document.querySelector(".reset");
let uploadBtn = document.querySelector("#files");

let blurValue = 0;
let contrastValue = 7;
let brightnessValue = 2;
let sepiaValue = 0;
let grayscaleValue = 0;
let saturateValue = 10;
let hueValue = 900;

blur.addEventListener("input", (e) => {
  blurValue = e.target.value;
  applyFilter();
});

contrast.addEventListener("input", (e) => {
  contrastValue = e.target.value;
  applyFilter();
});

brightness.addEventListener("input", (e) => {
  brightnessValue = e.target.value;
  applyFilter();
});

sepia.addEventListener("input", (e) => {
  sepiaValue = e.target.value;
  applyFilter();
});

grayscale.addEventListener("input", (e) => {
  grayscaleValue = e.target.value;
  applyFilter();
});

saturate.addEventListener("input", (e) => {
  saturateValue = e.target.value;
  applyFilter();
});

hue.addEventListener("input", (e) => {
  hueValue = e.target.value;
  applyFilter();
});



function applyFilter() {
  image.style.filter = `blur(${blurValue}px)
    contrast(${contrastValue * 20 + 20}%)
    brightness(${brightnessValue * 20 + 20}%) 
    sepia(${sepiaValue * 20 + 20}%) 
    grayscale(${grayscaleValue * 20 + 20}%)
    saturate(${saturateValue * 20 + 20}%)
    hue-rotate(${hueValue * 300}deg)`;
}

resetBtn.addEventListener("click", () => {
  blurValue = 0;
  contrastValue = 4;
  brightnessValue = 3.9;
  sepiaValue = 0;
  grayscaleValue = 0;
  saturateValue = 10;
  hueValue = 900;
  applyFilter();
});

let fileInput = document.getElementById("myFile");
let imageContainer = document.querySelector(".image-container");
let label = document.getElementById("files");
let newImageLabel = document.getElementById("new-image");

let downloadBtn = document.querySelector(".download");

let image = document.createElement("img");

imageContainer.appendChild(image);

function loadImage() {
  fileInput.addEventListener("change", () => {
    for (i of fileInput.files) {
      let reader = new FileReader();
      let container = document.createElement("div");

      container.appendChild(image);
      imageContainer.appendChild(container);

      reader.onload = (e) => {
        image.src = e.target.result;

        image.onload = () => {
          downloadBtn.addEventListener("click", () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;

            //draw the modified image into the canvas
            context.filter = image.style.filter
            context.drawImage(image, 0, 0);

            //get the image data from the canvas as a base64-encoded string
            const imageDataURL = canvas.toDataURL("image/png");

            //create a download link for the image
            const downloadLink = document.createElement("a");
            downloadLink.href = imageDataURL;
            downloadLink.download = "modified_image.png";
            downloadLink.style.display = "none"
            document.body.appendChild(downloadLink)
            downloadLink.click();
            document.body.removeChild(downloadLink)
          });
        };
      };
      reader.readAsDataURL(i)
    }
  });
}

loadImage();

newImageLabel.addEventListener("click", () => {
  window.location.reload();
  image.remove();
});

function downloadImage(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// downloadBtn.addEventListener("click", (e) => {

// })

//!create image then append to container
//!check if there is image display something


