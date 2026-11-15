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

## Marketing et prévisions / Marketing and forecasts

Le panneau marketing se met à jour avec la quantité, le prix et le budget publicitaire. Il affiche les ventes, les recettes, le bénéfice, le seuil de rentabilité et une fourchette liée à la variation aléatoire du jeu. Comparez plusieurs budgets, leur coût et le gain net prévu par rapport à une journée sans publicité. Le meilleur scénario indiqué est limité aux budgets affichés et abordables. Les totaux réels apparaissent après chaque journée; ils ne prouvent pas un effet causal de la publicité.

The marketing panel updates with quantity, price and advertising budget. It shows sales, revenue, profit, break-even sales and a range based on the game's random demand variation. Compare advertising budgets and their incremental net profit versus no advertising. The highlighted best option is limited to the displayed affordable scenarios. Actual historical totals do not isolate advertising's causal effect.

## Graphiques dans le temps / Time-series charts

28 indicateurs peuvent être affichés individuellement par jour joué : publicité, prix, production, ventes, recettes, coûts, bénéfices, trésorerie, invendus, taux de vente, marge, seuil de rentabilité, prévisions, gains publicitaires et totaux cumulés. Choisissez courbes ou barres, les 7/14/30 derniers jours joués et les indicateurs à afficher. Les boutons « Graphique » des cartes de prévision ouvrent l’indicateur correspondant. Chaque graphique contient un tableau de valeurs accessible. Les choix d’affichage sont mémorisés. Les prévisions historiques nécessitent l’événement enregistré à partir de cette version; les anciennes journées gardent leurs résultats réels, avec des lacunes pour les prévisions.

Choose individual charts for 28 daily marketing metrics, line or bar display, and the last 7/14/30 completed days. Forecast metric cards have a Chart button. Each chart includes an accessible data table. Display settings are saved. Historical forecasts require the event recorded from this version onward; older days retain actual results but have forecast gaps.
