const filters = document.getElementById("filters")

const filterParamEl = document.getElementById("filterParam")
const filterParamEl1 = document.getElementById("filterParam1")

const rangeSlider = document.getElementById('rangeSlider')
const rangeSlider1 = document.getElementById('rangeSlider1')

const rangeValue = document.getElementById('rangeValue')
const rangeValue1 = document.getElementById('rangeValue1')

const textbox = document.getElementById('textBox');
const textbox1 = document.getElementById('textBox1');

const dropdown = document.getElementById('dropdown')
const dropdown1 = document.getElementById('dropdown1')

const copyTextBtn = document.getElementById("copyText")

const copyAlert = document.querySelector(".copyAlert")

const body = document.querySelector("body")


dropdown.onclick = function (e) {
    e.stopPropagation()
    dropdown.classList.toggle('active')
}


dropdown1.onclick = function (e) {
    e.stopPropagation();
    dropdown1.classList.toggle('active')
}

body.onclick = function () {
    dropdown1.classList.remove('active')
    dropdown.classList.remove('active')

}

function changeFilter(val) {
    textbox.value = val.toUpperCase()

    filterMode = val


    if (filterMode === "ascii") {
        asciiDiv.style("display", "initial")
        copyTextBtn.style.display = "block"

    } else {
        asciiDiv.style("display", "none")
        copyTextBtn.style.display = "none"

    }

    if (filterMode === "posterize") {
        rangeSlider.style.visibility = "visible"
    } else {
        rangeSlider.style.visibility = "hidden"
        filterParamEl.value = 2
        filterParam = 2
        rangeValue.innerHTML = filterParam

    }

}

function changeDefaultCamFilter(val) {
    textbox1.value = val.toUpperCase()
    camFilter = val

    if (camFilter === "posterize") {
        rangeSlider1.style.visibility = "visible"
    } else {
        rangeSlider1.style.visibility = "hidden"
        camFilterParam.value = 2
        camFilterParam = 2
        rangeValue1.innerHTML = camFilterParam

    }

}

function changeCamFilterParam() {
    camFilterParam = filterParamEl1.value
    rangeValue1.innerHTML = camFilterParam

}

function copyArt() {
    navigator.clipboard.writeText(asciiDiv.elt.innerText);


    copyAlert.style.display = "initial"
    copyAlert.innerText = "Copied!"


    var counter = 0

    var i = setInterval(function () {
        if (counter % 2 == 0) {
            copyAlert.style.opacity = 0
        } else {
            copyAlert.style.opacity = 1

        }

        if (counter === 3) {
            clearInterval(i)
        }

        counter++
    }, 100)

}