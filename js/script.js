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

dropdown.onclick = function () {
    dropdown.classList.toggle('active')
}

dropdown1.onclick = function () {
    dropdown1.classList.toggle('active')
}

function changeFilter(val) {
    textbox.value = val.toUpperCase()

    filterMode = val

    filterMode === "ascii" ? asciiDiv.style("display", "initial") : asciiDiv.style("display", "none")

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

function changeFilterParam() {
    filterParam = filterParamEl.value
    rangeValue.innerHTML = filterParam

}

function changeCamFilterParam() {
    camFilterParam = filterParamEl1.value
    rangeValue1.innerHTML = camFilterParam

}


