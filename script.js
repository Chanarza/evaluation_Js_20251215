/*Déclration des variables*/

/* Les variables se déclarent dans l'ordre du plus abstrait au plus concret */



const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "https://placehold.co/150" },
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "https://placehold.co/150" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "https://placehold.co/150" },
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "https://placehold.co/150" }
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
        console.log(produit.nom);
        
    }
}
console.log(renderProduits());








