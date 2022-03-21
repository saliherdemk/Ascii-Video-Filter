const videoDiv = document.getElementById("video-div")
const controls = document.querySelector(".controls")
const warning = document.querySelector("h1")
const filteredCanvasSlider =  document.getElementById("filteredCanvasSlider") //.setAttribute("max", 42);


const density = " .,-+:;i1tfLCGO08#@";

// const density = '       .:-i|=+%O#@'

// const density = ' ░▒▓█';

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

function setup() {

    
    video = createCapture(VIDEO);

    cnv = createCanvas(videoDivWidth,videoDivHeight - videoDivHeight / 5) //windowWidth / 2.665, windowHeight / 1.62 + 30
    video.size(videoDivWidth / 4.5, videoDivHeight / 12.5); // windowWidth / x 
    filteredCanvas = createGraphics(videoDivWidth / 2, videoDivHeight - videoDivHeight / 5)

    filteredCanvasSlider.setAttribute("max",videoDivWidth)
    filteredCanvasSlider.setAttribute("value",videoDivWidth / 2)



    //video.size(width / 4.5, height / 10.34)

    asciiDiv = createDiv();
    asciiDiv.parent('videos-container')
    asciiDiv.style("position", "absolute")
    asciiDiv.style("background-color", "black") //transparent
    asciiDiv.style("z-index","2")


    shownVideo = createCapture(VIDEO);
    shownVideo.size(width, height)

    video.hide()
    shownVideo.hide()
    cnv.parent('videos-container')

    asciiWidth = video.width / 2


    // video.elt.setAttribute('playsinline', '');
    // shownVideo.elt.setAttribute('playsinline', '');


}

function draw() {
    background(242)
    filteredCanvas.background(242)

    video.loadPixels();

    if (video.pixels[1] <= 0) {
        videoDiv.style.visibility = "hidden"
        warning.style.display = "block"
    } else {
        videoDiv.style.visibility = "visible"
        warning.style.display = "none"

    }



    image(shownVideo, 0, 0, width, height);

    if (filterMode != "ascii") {
        if(!isFilteredCanvas){
            drawFilteredCanvas()
            image(filteredCanvas, 0, 0)

        }

    } else {
        let asciiImage = "";
        for (let j = 0; j < video.height; j++) {
            for (let i = 0; i < asciiWidth; i++) {
                const pixelIndex = (i + j * video.width) * 4;
                const r = video.pixels[pixelIndex + 0];
                const g = video.pixels[pixelIndex + 1];
                const b = video.pixels[pixelIndex + 2];
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


    if (camFilter != "none") {
        switch (camFilter) {
            case "threshold":
                filter(THRESHOLD)
                break;
            case "gray":
                filter(GRAY)
                break;
            case "invert":
                filter(INVERT)
                break
            case "posterize":
                filter(POSTERIZE, camFilterParam)
                break;
            default:
                break;
        }
    }

}

function windowResize(){
    videoDivHeight = videoDiv.offsetHeight
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


function handleCanvasWValue(type="natural"){
    if(dragging || type == "force"){
        let newWidth = floor(map(mouseX, 0, videoDivWidth, 0, video.width))

        if(newWidth <= 0){
            asciiWidth = 0

            isFilteredCanvas = 1
            // remove filteredCanvas
            return
        }
        if(newWidth > videoDivWidth){
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