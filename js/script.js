const filters = document.getElementById("filters")
const filterParamEl = document.getElementById("filterParam")


function changeFilter(val) {
    filterMode = val

    filterMode === "ascii" ? asciiDiv.style("display", "initial") : asciiDiv.style("display", "none")

    if (filterMode === "posterize") {
        filterParamEl.style.display = "initial"
    } else {
        filterParamEl.style.display = "none"
        filterParamEl.value = 2
    }


}

function changeFilterParam() {
    filterParam = filterParamEl.value

}


