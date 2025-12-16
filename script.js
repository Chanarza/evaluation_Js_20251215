/*Déclration des variables*/

/* Les variables se déclarent dans l'ordre du plus abstrait au plus concret */



const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 5.99, image: "Images/boisson-chaude-tropical-feuille-saine-vert.jpg" },
    { id: 2, nom: "Café Arabica", prix: 4.50, image: "Images/les-grains-de-cafe-se-trouvent-a-cezve-sur-la-toile-de-jute.jpg" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "Images/nourriture-asiatique.jpg" },
    { id: 4, nom: "Chocolat Chaud", prix: 4.99, image: "Images/decoration-de-noel-dans-le-style-minimaliste.jpg" }
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
        const img = document.createElement("img");
        const price = document.createElement("p");
        const title = document.createElement("h3");
        const btnAjouter = document.createElement("button");
        productCard.classList.add("produit");
        produitsContainer.appendChild(productCard);
        img.src = produit.image;
        img.alt = produit.nom;
        productCard.appendChild(img);
        price.textContent = produit.prix + " $";
        productCard.appendChild(price);
        title.textContent = produit.nom;
        productCard.appendChild(title);
        btnAjouter.textContent = "Ajouter";
        productCard.appendChild(btnAjouter);
        btnAjouter.addEventListener("click", () => {
            ajouterAuPanier(produit);

        })
    }
}
renderProduits();

function ajouterAuPanier(produit) {
    // Cette fonction est appelée quand on clique sur "Ajouter"
    const produitExistant = panier.find(item => item.id === produit.id);
    // On cherche dans le tableau panier s'il existe déjà un produit
    // qui a le même id que le produit cliqué
    // Si trouvé → produitExistant contient l'objet
    // Sinon → produitExistant vaut undefined

    if (produitExistant) {
        // Si le produit existe déjà dans le panier

        produitExistant.quantite++;
        // On augmente simplement la quantité de ce produit

    } else {
        // Si le produit n'existe PAS encore dans le panier
        panier.push({
            // On ajoute un nouvel objet dans le tableau panier

            id: produit.id,
            // stock l'identifiant du produit

            nom: produit.nom,
            // stock le nom du produit

            prix: produit.prix,
            // stock le prix du produit

            quantite: 1
            //la quantité est initialisée à 1
        });
    }
    renderPanier();
}

function renderPanier() {
    // Affiche le contenu du panier dans la page


    let totalGeneral = 0;
    //initialise le total du panier à zéro

    panierListe.innerHTML = "";
    // vide pour éviter les doublons visuels

    if (panier.length === 0) {
        panierListe.textContent = "Votre pannier est vide.";
        montantTotal.textContent = 0;
        return;
    }



    for (let item of panier) {
        const ligne = document.createElement("div");
        // conteneur de ligne

        const texte = document.createElement("span");
        // texte de la ligne

        const sousTotal = item.prix * item.quantite;
        // calcul

        texte.textContent = item.nom + " x" + item.quantite + " - " + sousTotal + " €";
        // affichage

        const btnSupprimer = document.createElement("button");
        // bouton pour CET item

        const imgTrash = document.createElement("img");
        // image poubelle

        imgTrash.src = "images/trash.png";
        // chemin (attention à la casse)

        imgTrash.alt = "Supprimer";
        // alt

        btnSupprimer.appendChild(imgTrash);
        // image dans le bouton

        btnSupprimer.addEventListener("click", () => {
            panier = panier.filter(p => p.id !== item.id);
            renderPanier();
        });
        // suppression + refresh

        ligne.appendChild(texte);
        // on met le texte

        ligne.appendChild(btnSupprimer);
        // on met la poubelle

        panierListe.appendChild(ligne);
        // on affiche la ligne

        totalGeneral = totalGeneral + sousTotal;
        // total
    }

    montantTotal.textContent = totalGeneral;
}

function emailValide(email) {
    // Vérifie que c’est un texte non vide
    if (email === "") return false;

    // Vérifie la présence de @
    if (!email.includes("@")) return false;

    // Vérifie la présence d’un point
    if (!email.includes(".")) return false;

    // Si tout est OK, on considère l’email valide (version simple)
    return true;
}

btnCommander.addEventListener("click", () => {
    // On récupère le texte de l’input email et on enlève les espaces
    const email = emailClient.value.trim();

    // On efface l’ancien message
    messageFeedBack.textContent = "";

    // 1) Panier vide ?
    if (panier.length === 0) {
        messageFeedBack.textContent = "Votre panier est vide. Ajoutez au moins un produit.";
        return;
    }

    // 2) Email valide ?
    if (!emailValide(email)) {
        messageFeedBack.textContent = "Email invalide. Exemple : jean@mail.com";
        return;
    }

    // 3) Succès : commande validée
    messageFeedBack.textContent = "Merci de votre commande";

    // On vide le panier
    panier = [];

    // On met à jour l’affichage panier + total
    renderPanier();

    // On vide le champ email
    emailClient.value = "";
});












