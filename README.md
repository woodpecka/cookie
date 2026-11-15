# La biscuiterie d’Eric / Eric’s Cookie Shop Tycoon

Ouvrez `index.html` dans un navigateur moderne. Aucune installation ni compilation nécessaire.

Vous pouvez aussi lancer `python3 -m http.server 8000` dans ce dossier, puis ouvrir http://localhost:8000.

Le jeu démarre en français. Le sélecteur **Français / English** permet de changer de langue à tout moment et mémorise votre choix lorsque le stockage du navigateur est disponible. Les parties existantes sont conservées.

Vous disposez de 100 $ et de 30 jours pour gérer votre biscuiterie. Chaque biscuit coûte 0,50 $ à préparer. Réglez la quantité, le prix et la publicité, puis ouvrez la boutique. Les dépenses sont payées à l’avance et les invendus ne sont pas conservés. La clientèle dépend du prix, de la publicité, des événements et d’une petite variation aléatoire. La partie se termine après 30 jours ou lorsque vous n’avez plus de quoi préparer un biscuit.

Les bonshommes à tête de biscuit représentent les ventes du jour, avec une légende et un maximum de 20 personnages. Les animations respectent la préférence de réduction des mouvements.

La progression est sauvegardée dans le navigateur si le stockage est disponible. Un serveur local assure un comportement plus prévisible qu’une ouverture directe du fichier. Une confirmation précède toute nouvelle partie.

## English

Open `index.html` in a modern browser, or run `python3 -m http.server 8000` and visit http://localhost:8000. Choose **English** in the language selector; your choice is saved when browser storage is available.

Start with $100 and manage Eric’s cookie shop for 30 days. Each cookie costs $0.50 to bake. Set quantity, price and advertising, then open for the day. Expenses are paid upfront; unsold cookies expire. The game ends after day 30 or when you cannot afford another cookie. Progress saves automatically in the browser. Starting a new game asks for confirmation.
