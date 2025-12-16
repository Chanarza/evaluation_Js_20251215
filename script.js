/*Déclration des variables*/

/* Les variables se déclarent dans l'ordre du plus abstrait au plus concret */



const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "Images/boisson-chaude-tropical-feuille-saine-vert.jpg"},
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "Images/les-grains-de-cafe-se-trouvent-a-cezve-sur-la-toile-de-jute.jpg"},
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "Images/nourriture-asiatique.jpg"},
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "Images/decoration-de-noel-dans-le-style-minimaliste.jpg"}
];

let panier = [];

const produitsContainer = document.getElementById("produits-container");
const panierListe = document.getElementById("panier-liste");
const montantTotal = document.getElementById("montant-total");
const messageFeedBack = document.getElementById("message-feedback");
const emailClient = document.getElementById("email-client");
const btnCommander = document.getElementById("btn-commander");



/* Afficher les produits dans la page */

function renderProduits() {
    
    
    produitsContainer.innerHTML = "";

    for (let produit of produits) {
        const productCard = document.createElement("div");
        productCard.classList.add("produit");
        produitsContainer.appendChild(productCard);
        const img = document.createElement("img");
        img.src = produit.image;
        img.alt = produit.nom;
        productCard.appendChild(img);
        const price = document.createElement("p");
        price.textContent = produit.prix + " €";
        productCard.appendChild(price);
    }
}
renderProduits();









