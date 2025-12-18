/*Déclration des variables*/

/* Les variables se déclarent dans l'ordre du plus abstrait au plus concret */


/*Travail perso*/
const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 5.99, image: "images/boisson-chaude-tropical-feuille-saine-vert.jpg" },
    { id: 2, nom: "Café Arabica", prix: 4.50, image: "images/les-grains-de-cafe-se-trouvent-a-cezve-sur-la-toile-de-jute.jpg" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "images/nourriture-asiatique.jpg" },
    { id: 4, nom: "Chocolat Chaud", prix: 4.99, image: "images/decoration-de-noel-dans-le-style-minimaliste.jpg" }
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

/*Fin Travail perso*/

function ajouterAuPanier(produit) {
    // Cette fonction est appelée quand on clique sur "Ajouter"
    const produitExistant = panier.find(item => item.id === produit.id);
    //permet de vérifier si le produit est déjà dans le panier
    // Si trouvé → produitExistant contient l'objet
    // Sinon → produitExistant vaut undefined

    if (produitExistant) {
        // Si le produit existe déjà dans le panier

        produitExistant.quantite++;
        // augmente la quantité du produit

    } else {
        // Si le produit n'existe pas encore dans le panier
        panier.push({
            // On ajoute un nouvel objet dans le tableau panier

            id: produit.id,
            

            nom: produit.nom,
            

            prix: produit.prix,


            quantite: 1
            // passage très mal compris.
        });
    }
    renderPanier();
}

function renderPanier() {
    // Affiche le contenu du panier


    let totalGeneral = 0;
    //initialise le total du panier à zéro

    panierListe.innerHTML = "";
    // évite les doublons

    if (panier.length === 0) {
        panierListe.textContent = "Votre pannier est vide.";
        montantTotal.textContent = 0;
        return;
    }

    

    for (let item of panier) {
        const ligne = document.createElement("div");
        

        const texte = document.createElement("span");
        

        const sousTotal = item.prix * item.quantite;
        /* .toFixed permet de fixer les prix à deux chiffres après virgule. ChatGpt */
        texte.textContent = item.nom + " x" + item.quantite + " - " + sousTotal.toFixed(2) + " €";


        const btnSupprimer = document.createElement("button");
    
        const imgTrash = document.createElement("img");
        /*Fin Travail perso*/

        imgTrash.src = "images/trash.png";
        // note à moi même casse sensible**

        imgTrash.alt = "Supprimer";
        

        btnSupprimer.appendChild(imgTrash);
        



        btnSupprimer.addEventListener("click", () => {
            panier = panier.filter(p => p.id !== item.id);
            renderPanier();
        });
        
        //Travail perso
        ligne.appendChild(texte);
    

        ligne.appendChild(btnSupprimer);
        

        panierListe.appendChild(ligne);
        

        totalGeneral = totalGeneral + sousTotal;
    
    }

    montantTotal.textContent = totalGeneral.toFixed(2);
}

/*Partie reprise sur le tp des formulaires*/
function emailValide(email) {
    // suppr les espaces avant et après
    const emailValue = email.trim();

    // Si email vide = invalide
    if (emailValue === "") return false;

    // Regex pour un email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;/*regex fait par chatGpt*/

    // vrai si format valide, sinon faux.
    return emailRegex.test(emailValue);
}




btnCommander.addEventListener("click", () => {
    // écupère le texte de l’input email et suppr les espaces
    const email = emailClient.value.trim();

    // efface l’ancien message
    messageFeedBack.textContent = "";

    // Panier vide ?
    if (panier.length === 0) {
        messageFeedBack.textContent = "Votre panier est vide. Ajoutez au moins un produit.";
        return;
    }

    // Email valide ?
    if (!emailValide(email)) {
        messageFeedBack.textContent = "Email invalide. Exemple : jean@mail.com";
        return;
    }

    // commande validée
    messageFeedBack.textContent = "Merci de votre commande";

    // vide le panier
    panier = [];

    // met à jour l’affichage
    renderPanier();

    // vide le champ email
    emailClient.value = "";
});












