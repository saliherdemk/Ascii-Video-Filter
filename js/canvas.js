const videoDiv = document.getElementById("video-div")
const controls = document.querySelector(".controls")
const warning = document.querySelector("h1")
const filteredCanvasSlider = document.getElementById("filteredCanvasSlider") //.setAttribute("max", 42);
const videosContainer = document.getElementById("videos-container")

const density = " .,-+:;i1tfLCGO08#@";

// const density = ' .,░▒▓█';


var videoDivWidth = videoDiv.offsetWidth
var videoDivHeight = videoDiv.offsetHeight

var cnv;
var video;
var asciiDiv;
var shownVideo;
var asciiWidth;
var dragging = false;


var filterMode = "ascii";
var filterParam = 2;

var camFilter = "none"
var camFilterParam = 2;

var filteredCanvas;
var camControl;

var filteredCanvasSliderValue;

var isFilteredCanvas = 0

var filteredCanvasForAscii;
var filteredAsciiCam

var asciiTheme = ["black","white"] 

function setup() {


    video = createCapture(VIDEO);

    let h = videoDivHeight - videoDivHeight / 5

    cnv = createCanvas(videoDivWidth, h)
    video.size(videoDivWidth / 4.5, videoDivHeight / 12.5)
    filteredCanvas = createGraphics(videoDivWidth / 2, h)

    filteredCanvasSlider.setAttribute("max", videoDivWidth)
    filteredCanvasSlider.setAttribute("value", videoDivWidth / 2)

    asciiDiv = createDiv();
    asciiDiv.parent('videos-container')
    asciiDiv.style("position", "absolute")
    asciiDiv.style("background-color", asciiTheme[0])
    asciiDiv.style("color", asciiTheme[1])
    asciiDiv.style("z-index", "2")
    asciiDiv.style("height", h + "px")

    shownVideo = createCapture(VIDEO);
    shownVideo.size(width, height)


    filteredCanvasForAscii = createGraphics(videoDivWidth / 4.5, videoDivHeight / 12.5)

    video.hide()
    shownVideo.hide()
    cnv.parent('videos-container')

    asciiWidth = video.width / 2

}

function draw() {
    background(242)

    if (video.get(1, 1) <= 0) {
        videoDiv.style.visibility = "hidden"
        warning.style.display = "block"
    } else {
        videoDiv.style.visibility = "visible"
        warning.style.display = "none"

    }

    image(shownVideo, 0, 0, width, height);

    filteredCanvasForAscii.image(video, 0, 0, video.width, video.height)


    if (filterMode != "ascii") {
        if (!isFilteredCanvas) {
            drawFilteredCanvas()
        }
        applyFilter(0)

    } else {
        applyFilter(1)

        let asciiImage = "";

        for (let i = 0; i < video.height; i++) {
            for (let j = 0; j < asciiWidth; j++) {
                let a = filteredCanvasForAscii.get(j, i)

                const r = a[0];
                const g = a[1];
                const b = a[2];

                const avg = Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                const len = density.length;
                const charIndex = floor(map(avg, 0, 255, 0, len));
                const c = density.charAt(charIndex);
                c === " " ? asciiImage += "&nbsp" : asciiImage += c
            }
            asciiImage += '<br/>';
        }
        asciiDiv.html(asciiImage);

    }

}

function applyFilter(changeAsciiSourceFilter) {
    if (camFilter != "none") {
        switch (camFilter) {
            case "threshold":
                filter(THRESHOLD)
                changeAsciiSourceFilter ? filteredCanvasForAscii.filter(THRESHOLD) : null
                break;
            case "gray":
                filter(GRAY)
                changeAsciiSourceFilter ? filteredCanvasForAscii.filter(GRAY) : null
                break;
            case "invert":
                filter(INVERT)
                changeAsciiSourceFilter ? filteredCanvasForAscii.filter(INVERT) : null
                break
            case "posterize":
                filter(POSTERIZE, camFilterParam)
                changeAsciiSourceFilter ? filteredCanvasForAscii.filter(POSTERIZE, camFilterParam) : null
                break;
            default:
                break;
        }
    }

}

function drawFilteredCanvas() {

    filteredCanvas.image(shownVideo, 0, 0, width, height)

    if (filterMode != "ascii") {
        switch (filterMode) {
            case "threshold":
                filteredCanvas.filter(THRESHOLD)
                break;
            case "gray":
                filteredCanvas.filter(GRAY)
                break;
            case "invert":
                filteredCanvas.filter(INVERT)
                break
            case "posterize":
                filteredCanvas.filter(POSTERIZE, filterParam)
                break;
            default:
                break;
        }

    }
    image(filteredCanvas, 0, 0)


}

function dist(x1, y1, x2, y2) {
    return ((x2 - x1) ** 2) + ((y2 - y1) ** 2)

}

function mousePressed() {

    dragging = true

}

function mouseReleased() {
    dragging = false
}


function handleCanvasWValue(type = "natural") {
    if (dragging || type == "force") {
        let val;
        if (mouseX >= videosContainer.offsetWidth) {
            val = videosContainer.offsetWidth + 8
        } else {
            val = mouseX
        }
        let newWidth = floor(map(val, 0, videoDivWidth, 0, video.width))

        if (newWidth <= 0) {
            asciiWidth = 0
            isFilteredCanvas = 1
            return

        }
        if (newWidth > videoDivWidth) {
            asciiWidth = videoDivWidth
            return

        }

        asciiWidth = newWidth

        isFilteredCanvas = 0

        //https://stackoverflow.com/questions/47363844/how-do-i-resize-a-p5-graphic-object#:~:text=If%20you%20want%20to%20resize,one%20to%20the%20new%20one.&text=after%20inspecting%20elements%2C%20createGraphics(),just%20set%20to%20be%20invisible.
        var newPG = createGraphics(asciiWidth * 4.5, videoDivHeight - videoDivHeight / 5);
        newPG.image(filteredCanvas, 0, 0, newPG.width, newPG.height);
        filteredCanvas.canvas.remove()
        filteredCanvas = newPG;
    }

}