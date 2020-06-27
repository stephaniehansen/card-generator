const randomCard = () => {
    fetch("https://sppd.feinwaru.com/api/v1/cards/list")
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            const nameSection = document.querySelector(".card-name");
            let random = Math.floor(Math.random() * jsonResponse.data.length-1);

            let cardName = jsonResponse.data[random].name;
            nameSection.innerHTML = `<h2>${cardName}</h2>`;
            return fetch(`https://sppd.feinwaru.com/api/v1/cards?name=${cardName}`)
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            const detailsSection = document.querySelector(".card-details");
            const card = jsonResponse.data.cards[0];
            const rarity = getRarity(card.rarity);
            console.log(rarity);

            detailsSection.innerHTML = `<h3>${rarity} | ${card.theme}</h3><ul><li><span>Mana Cost:</span> ${card.mana_cost}</li><li><span>Damage:</span> ${card.damage}</li><li><span>Health:</span> ${card.health}</li></ul>`;
        })
        .catch(error => {
            console.log(error);
        })
}

const getRarity = (card) => {
    switch(card){
        case 0: return "Common";
        case 1: return "Rare";
        case 2: return "Epic";
        case 3: return "Legendary";
    }
}

document.querySelector("button").onclick = randomCard;