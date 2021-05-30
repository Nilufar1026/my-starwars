
let pages = 1


let getData = async requestedData => {
    let request = await fetch(requestedData)
    let data = await request.json()
    return data.results
}


showDetailsList = () => {
    const details = document.querySelectorAll(".clear")
    for (let currentInfo of details) {
        currentInfo.classList.remove("hidden")
    }
}

hideDetailsList = () => {
    const details = document.querySelectorAll(".clear")
    for (let currentInfo of details) {
        currentInfo.classList.add("hidden")
    }
}

hideCharInList = (boolean) => {
    const hideCharList = document.querySelectorAll("li")
    for (let currentInfo of hideCharList) {
        if (boolean == true) {
            currentInfo.classList.add("hidden")
        } else if (boolean == false) {
            currentInfo.classList.remove("hidden")
        }
    }
}

let charactersList = async () => {
    const response = await fetch("https://swapi.dev/api/people/?page=" + pages)
    const data = await response.json()
    return data.results
}

let renderCharactersList = async () => {
    const characters = await charactersList()
    for (let i = 0; i < characters.length; i++) {
        document.querySelector(".char-" + i).innerHTML = characters[i].name
    }

    const elementList = document.querySelectorAll("li")
    for (let currentCharacter of elementList) {
        const loading_details = document.querySelector("#loader_details")
        const loadingPlanet = document.querySelector("#loader_planet")
        currentCharacter.addEventListener("click", function (event) {
            loading_details.classList.add("loader")
            loadingPlanet.classList.add("loader_planet")
            showDetailsList()
            setTimeout(function () {
                for (let j = 0; j < elementList.length; j++) {
                    if (currentCharacter == elementList[j]) {
                        document.querySelector(".name").innerText = characters[j].name
                        document.querySelector(".height").innerText = "Height: " + characters[j].height
                        document.querySelector(".mass").innerText = "Mass: " + characters[j].mass
                        document.querySelector(".hair_color").innerText = "Hair color: " + characters[j].hair_color
                        document.querySelector(".skin_color").innerText = "Skin color: " + characters[j].skin_color
                        document.querySelector(".eye_color").innerText = "Eye color: " + characters[j].eye_color
                        document.querySelector(".birth_year").innerText = "Birth year: " + characters[j].birth_year
                        document.querySelector(".gender").innerText = "Gender: " + characters[j].gender

                        fetch(characters[j].homeworld)
                            .then((resp) => resp.json())
                            .then(function (data) {
                                loading_details.classList.remove("loader")
                                loadingPlanet.classList.remove("loader_planet")
                                document.querySelector(".name_planet").innerText = data.name
                                document.querySelector(".rotation_period").innerText = "Rotation period: " + data.rotation_period
                                document.querySelector(".orbital_period").innerText = "Orbital period: " + data.orbital_period
                                document.querySelector(".diameter").innerText = "Diameter: " + data.diameter
                                document.querySelector(".climate").innerText = "Climate: " + data.climate
                                document.querySelector(".gravity").innerText = "Gravity: " + data.gravity
                                document.querySelector(".terrain").innerText = "Terrain: " + data.terrain
                            })
                    }
                }
            }, 1500);

        })
    }
}
renderCharactersList()

let setPages = async () => {
    await charactersList()
    const prev = document.querySelector(".prev")
    const previousChar = document.querySelector("#char_lists")
    const currentPage = document.querySelector(".pages")
    currentPage.innerText = "1" + " / " + "9"
    prev.addEventListener("click", (event) => {
        hideDetailsList()
        hideCharInList(true)
        previousChar.classList.add("loader")
        if (pages > 1) {
            pages--;
            currentPage.innerText = pages + " / " + "9"
            renderCharactersList()
        }
        setTimeout(function () {
            previousChar.classList.remove("loader")
            hideCharInList(false)
        }, 1500);
    })

    const next = document.querySelector(".next")
    const loading_char = document.querySelector("#char_lists")
    const nextPage = document.querySelector(".pages")
    next.addEventListener("click", function (event) {
        hideCharInList(true)
        loading_char.classList.add("loader")
        if (pages < 9) {
            pages++;
        }
        nextPage.innerText = pages + " / " + "9"
        hideDetailsList()
        renderCharactersList()
        setTimeout(function () {
            hideCharInList(false)
            loading_char.classList.remove("loader")
        }, 1500);
    })
}

setPages()



let charSearch = async () => {
    document.querySelector("#searchChar").addEventListener("click", () => {

        let searchValue = document.querySelector("input.inputField").value.toLowerCase()
        searchValue = searchValue.replace(/\s/g, '_')

        let apiUrl = `https://swapi.dev/api/people/?search=${searchValue}`;
        console.log(apiUrl);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw Error('This charactor is not exist');
                }
                return response.json();
            })
            .then(data => {
                const allResults = data.results
                const filterResult = allResults.map(charName => {
                    return `<li class="listItem">${charName.name}</li>`
                })
                    .join("")
                const inputList = document.querySelector("#input_lists")
                inputList.classList.remove("hidden")
                inputList.innerHTML = filterResult

                console.log(allResults);
                const eachItem = document.querySelectorAll("li.listItem")
                for (let i = 0; i < eachItem.length; i++) {
                    eachItem[i].addEventListener("click", () => {
                        
                        document.querySelector(".name").innerText = allResults[i].name
                        document.querySelector(".height").innerText = "Height: " + allResults[i].height
                        document.querySelector(".mass").innerText = "Mass: " + allResults[i].mass
                        document.querySelector(".hair_color").innerText = "Hair color: " + allResults[i].hair_color
                        document.querySelector(".skin_color").innerText = "Skin color: " + allResults[i].skin_color
                        document.querySelector(".eye_color").innerText = "Eye color: " + allResults[i].eye_color
                        document.querySelector(".birth_year").innerText = "Birth year: " + allResults[i].birth_year
                        document.querySelector(".gender").innerText = "Gender: " + allResults[i].gender
                        
                        fetch(allResults[i].homeworld)
                        .then((resp) => resp.json())
                        .then(function (data) {

                            document.querySelector(".name_planet").innerText = data.name
                            document.querySelector(".rotation_period").innerText = "Rotation period: " + data.rotation_period
                            document.querySelector(".orbital_period").innerText = "Orbital period: " + data.orbital_period
                            document.querySelector(".diameter").innerText = "Diameter: " + data.diameter
                            document.querySelector(".climate").innerText = "Climate: " + data.climate
                            document.querySelector(".gravity").innerText = "Gravity: " + data.gravity
                            document.querySelector(".terrain").innerText = "Terrain: " + data.terrain
                        })
                        
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    })
}
charSearch()




