const filters = document.getElementById("filters")
const filterParamEl = document.getElementById("filterParam")
const rangeSlider = document.querySelector('.rangeSlider')
const rangeValue = document.getElementById('rangeValue')
const textbox = document.querySelector('.textBox');
const dropdown = document.querySelector('.dropdown')

dropdown.onclick = function () {
    dropdown.classList.toggle('active')
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

function changeFilterParam() {
    filterParam = filterParamEl.value
    rangeValue.innerHTML = filterParam

}


