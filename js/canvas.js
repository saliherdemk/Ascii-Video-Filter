const density = " .,-+:;i1tfLCGO08#@";

// const density = '       .:-i|=+%O#@'

// const density = ' ░▒▓█';

let video;
let asciiDiv;
let shownVideo;
let asciiWidth;
let dragging = false;


let filterMode = "ascii";
let filterParam = 2;

let filteredCanvas;


function setup() {
    let cnv = createCanvas(windowWidth / 2.665, windowHeight / 1.62 + 25)

    video = createCapture(VIDEO);
    video.size(windowWidth / 12, windowHeight / 16); // windowWidth / x

    asciiDiv = createDiv();
    asciiDiv.parent('video-div')
    asciiDiv.style("display", "flex")
    asciiDiv.style("position", "absolute")
    asciiDiv.style("left", "12.5%")
    asciiDiv.style("background-color", "black") //transparent

    shownVideo = createCapture(VIDEO);
    shownVideo.size(asciiDiv.width, asciiDiv.height)

    video.hide()
    shownVideo.hide()
    cnv.parent('video-div')

    asciiWidth = video.width / 2

    filteredCanvas = createGraphics(windowWidth / 2.665 / 2, windowHeight / 1.62)

}

function draw() {

    video.loadPixels();
    background(242)
    circle(asciiWidth * 4.5, height - 12, 20)
    image(shownVideo, 0, 0, width, height - 25);

    if (filterMode != "ascii") {
        drawFilteredCanvas()
        image(filteredCanvas, 0, 0)

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

    changeCanvasWidth()
}

function changeCanvasWidth() {

    if (dragging) {
        let newWidth = floor(map(mouseX, 0, width, 0, video.width))
        if (newWidth > width / 4.5) {
            asciiWidth = width / 4.5 - 1;
            return
        }
        if (newWidth <= 0) {
            asciiWidth = 0;
            return
        }
        asciiWidth = newWidth

        //https://stackoverflow.com/questions/47363844/how-do-i-resize-a-p5-graphic-object#:~:text=If%20you%20want%20to%20resize,one%20to%20the%20new%20one.&text=after%20inspecting%20elements%2C%20createGraphics(),just%20set%20to%20be%20invisible.
        var newPG = createGraphics(asciiWidth * 4.5, windowHeight / 1.62);
        newPG.image(filteredCanvas, 0, 0, newPG.width, newPG.height);
        filteredCanvas.canvas.remove()
        filteredCanvas = newPG;

    }

}



function drawFilteredCanvas() {
    filteredCanvas.background(255)
    filteredCanvas.image(shownVideo, 0, 0, width, height - 25)

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
    let d = dist(mouseX, mouseY, asciiWidth * 4.5, height - 10);

    if (d < 10) {
        dragging = true
    }

}

function mouseReleased() {
    dragging = false
}
