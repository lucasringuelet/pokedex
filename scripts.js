var poke = new Object();
poke.count = 0;

function contenidoPokemon(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let infoPokemon = document.getElementById("description")

            let description = `Altura: ${data.height} Id: ${data.id} Hp: ${data.stats[0].base_stat} Attack: ${data.stats[1].base_stat}`

            infoPokemon.textContent = description

        });
}

function pedido(value) {

    if ((poke.count == 0 && value == -1) || (poke.count == 1118 && value == 1)) {
        alert("no hay mas pokemons")
    } else {
        value = parseInt(value)
        poke.count = poke.count + value

        var primeraInfo = document.getElementById("nameImag")
        while (primeraInfo.hasChildNodes()) {
            primeraInfo.removeChild(primeraInfo.lastChild);
        }

        var infoPokemon = document.getElementById("description")
        while (infoPokemon.hasChildNodes()) {
            infoPokemon.removeChild(infoPokemon.lastChild);
        }
        var url = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${poke.count}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {


                var nameH2 = document.createElement("h2");
                nameH2.textContent = data.results[0].name;
                primeraInfo.appendChild(nameH2);
                document.getElementById("select").value = data.results[0].url;
                var img = document.createElement("img");
                fetch(data.results[0].url)
                    .then((response) => response.json())
                    .then((data) => {

                        img.src = data.sprites.front_default;
                        primeraInfo.appendChild(img);

                    });

            });

    }

}