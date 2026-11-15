'use strict';

const translations = {
  "Marketing & forecasts": "Marketing et prévisions",
  "Explore advertising costs, sales and profit before opening.": "Explorez les coûts publicitaires, les ventes et le bénéfice avant d’ouvrir.",
  "Eric's Cookie Shop Tycoon": "La biscuiterie d’Eric",
  "ERIC'S": "ERIC",
  "COOKIE SHOP": "BISCUITERIE",
  "↻ New game": "↻ Nouvelle partie",
  "SMALL BATCHES. BIG DREAMS.": "PETITES FOURNÉES. GRANDS RÊVES.",
  "A little dough.": "Un peu de pâte.",
  "A lot of possibility.": "Un monde de possibilités.",
  "You, a cookie shop, and 30 days to make it sweet.": "Vous, une biscuiterie et 30 jours pour la faire prospérer.",
  "FRESHLY BAKED": "TOUT JUSTE CUITS",
  "OPEN": "OUVERT",
  "THE COOKIE CROWD": "LES AMATEURS DE BISCUITS",
  "Little cookies. Happy customers.": "Petits biscuits. Clients ravis.",
  "Waiting for opening day": "En attendant l’ouverture",
  "COOKIE PICKUP": "COMPTOIR",
  "Your first customers are just a batch away.": "Une première fournée et les clients arrivent.",
  "Open the shop to see your customers arrive.": "Ouvrez la boutique pour voir arriver vos clients.",
  "Shop overview": "Vue d’ensemble de la boutique",
  "CASH REGISTER": "EN CAISSE",
  "Make every dollar count": "Chaque dollar compte",
  "YOUR JOURNEY": "VOTRE PARCOURS",
  "TOTAL PROFIT": "BÉNÉFICE TOTAL",
  "Since opening day": "Depuis l’ouverture",
  "COOKIES SOLD": "BISCUITS VENDUS",
  "Little moments of happiness": "Petits moments de bonheur",
  "Let's open the shop": "Ouvrons la boutique",
  "Your recipe for a successful day.": "Votre recette pour une journée réussie.",
  "Cookies to bake": "Biscuits à préparer",
  "$0.50 each": "0,50 $ l’unité",
  "cookies": "biscuits",
  "Price per cookie": "Prix par biscuit",
  "Sweet spot: around $2": "Prix conseillé : environ 2 $",
  "/ cookie": "/ biscuit",
  "Advertising budget": "Budget publicitaire",
  "Bring in more cookie lovers": "Attirez les gourmands",
  "/ day": "/ jour",
  "Today's upfront cost": "Dépenses à avancer aujourd’hui",
  "Fresh every day. Unsold cookies don't carry over.": "Des biscuits frais chaque jour. Les invendus ne sont pas conservés.",
  "The daily digest": "Le bilan du jour",
  "A fresh look at your shop's performance.": "Les résultats de votre boutique en un coup d’œil.",
  "Your first batch awaits.": "Votre première fournée vous attend.",
  "Set your recipe for the day, open the doors,": "Préparez votre fournée, ouvrez les portes,",
  "and see how the cookie crumbles.": "et découvrez les résultats.",
  "BAKED WITH A LITTLE AMBITION": "UNE FOURNÉE D’AMBITION",
  "From the cookie ledger": "Le registre de la biscuiterie",
  "Every batch is part of the story.": "Chaque fournée écrit votre histoire.",
  "0 days in the books": "0 jour au registre",
  "DAY": "JOUR",
  "BAKED / SOLD": "CUITS / VENDUS",
  "REVENUE": "RECETTES",
  "EXPENSES": "DÉPENSES",
  "PROFIT": "BÉNÉFICE",
  "CASH": "CAISSE",
  "Your shop's story starts with day one.": "L’histoire de votre boutique commence au premier jour.",
  "30 days. One sweet adventure.": "30 jours. Une aventure gourmande.",
  "Progress saved on this browser.": "Progression sauvegardée dans ce navigateur.",
  "A fresh start?": "Un nouveau départ ?",
  "This will reset your shop to day 1 with $100.": "La boutique reviendra au jour 1 avec 100 $.",
  "Keep playing": "Continuer à jouer",
  "Start over": "Recommencer",
  "A lovely day for cookies": "Une belle journée pour des biscuits",
  "Clear skies and steady foot traffic. A classic shop day.": "Ciel dégagé et clientèle régulière. Une journée classique.",
  "Rain on the window": "La pluie au carreau",
  "A quieter street today. Expect about 25% fewer customers.": "La rue est plus calme. Prévoyez environ 25 % de clients en moins.",
  "Neighborhood market day": "Jour de marché dans le quartier",
  "The street is buzzing! Expect about 30% more customers.": "La rue s’anime ! Prévoyez environ 30 % de clients en plus.",
  "An afternoon cookie craving": "Une envie de biscuits cet après-midi",
  "Word is spreading. Expect about 15% more customers.": "Le bouche-à-oreille fonctionne. Prévoyez environ 15 % de clients en plus.",
  "A slow day on the block": "Une journée tranquille dans le quartier",
  "A little less foot traffic. Expect about 10% fewer customers.": "Moins de passage. Prévoyez environ 10 % de clients en moins.",
  "Saving unavailable. Keep this tab open.": "Sauvegarde indisponible. Gardez cet onglet ouvert.",
  "That batch is over budget. Bake fewer cookies or lower your ad spend.": "Cette fournée dépasse votre budget. Réduisez la quantité ou la publicité.",
  "A quiet day. Try a new price or a little advertising.": "Une journée calme. Essayez un autre prix ou un peu de publicité.",
  "No cookies sold today. Your next batch could bring a crowd.": "Aucun biscuit vendu aujourd’hui. La prochaine fournée attirera peut-être la foule.",
  "The shop is closed": "La boutique est fermée",
  "A fresh batch of possibilities": "Une nouvelle fournée de possibilités",
  "Your adventure is complete": "Votre aventure est terminée",
  "Start a new game and try a different recipe for success.": "Commencez une nouvelle partie et essayez une autre recette du succès.",
  "Adventure complete": "Aventure terminée",
  "Your shop, by the numbers": "Votre boutique en chiffres",
  "30 days. Made from scratch.": "30 jours. Tout fait maison.",
  "Time for a fresh start.": "Place à un nouveau départ.",
  "A sweet day at the shop.": "Une belle journée à la boutique.",
  "A perfectly balanced batch.": "Une fournée à l’équilibre.",
  "A little room to rise.": "Encore une marge de progression.",
  "FINAL RESULTS": "RÉSULTATS FINAUX",
  "DOORS CLOSED · OVENS OFF": "PORTES FERMÉES · FOURS ÉTEINTS",
  "Cookies sold": "Biscuits vendus",
  "Revenue": "Recettes",
  "Baking expenses": "Coût de fabrication",
  "Advertising expenses": "Dépenses publicitaires",
  "Total expenses": "Dépenses totales",
  "Daily profit": "Bénéfice du jour",
  "Remaining cash": "Solde en caisse",
  "Your next cookie empire is just a fresh start away.": "Votre prochain empire du biscuit commence par une nouvelle partie.",
  "Sold out! A bigger batch could bring in more tomorrow.": "Tout est vendu ! Une plus grosse fournée pourrait rapporter davantage demain.",
  "The oven took a break. Bake a batch tomorrow to bring in revenue.": "Le four s’est reposé. Préparez une fournée demain pour faire des recettes.",
  "Try adjusting your batch size, price, or advertising tomorrow.": "Essayez d’ajuster la quantité, le prix ou la publicité demain."
};
let language='fr';
try { language=localStorage.getItem('eric-cookie-language')==='en'?'en':'fr'; } catch {}
const translatedNodes=new WeakMap();
function translateText(text){
  if(language==='en')return text;
  const trimmed=text.trim();
  if(translations[trimmed])return text.replace(trimmed,translations[trimmed]);
  return text
    .replace("🍪 Eric's Cookie Shop Tycoon",'🍪 La biscuiterie d’Eric')
    .replace(/Day (\d+)/g,'Jour $1')
    .replace(/Bake & open for day (\d+)/g,'Préparer et ouvrir pour le jour $1')
    .replace(/(\d+) days? in the books/g,(_,n)=>`${n} jour${n==='1'?'':'s'} au registre`)
    .replace(/([\d,\s]+) customers · Jour (\d+)/g,'$1 clients · Jour $2')
    .replace(/Jour (\d+) · The daily digest/g,'Jour $1 · Le bilan du jour')
    .replace(/Each cookie-headed friend represents up to (\d+) customers\. ([\d,\s]+) cookies sold today!/, 'Chaque bonhomme à tête de biscuit représente jusqu’à $1 clients. $2 biscuits vendus aujourd’hui !')
    .replace(/(\d+) happy customers\. (\d+) cookies left on the tray\./,'$1 clients ravis. $2 biscuits invendus.')
    .replace(/You sold (\d+) cookies and finished with (.+?)\.( You have less than the \$0\.50 needed to bake another cookie\.)?$/,(_,n,cash,poor)=>`Vous avez vendu ${n} biscuits et terminé avec ${cash}.${poor?' Il vous reste moins de 0,50 $, le minimum pour préparer un biscuit.':''}`);
}
function localize(){
  document.documentElement.lang=language;
  document.title=language==='fr'?'La biscuiterie d’Eric':"Eric's Cookie Shop Tycoon";
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    if(['SCRIPT','STYLE','OPTION'].includes(node.parentElement.tagName))continue;
    const previous=translatedNodes.get(node);
    const source=previous&&node.nodeValue===previous.last?previous.source:node.nodeValue;
    const last=translateText(source);
    node.nodeValue=last;translatedNodes.set(node,{source,last});
  }
  const overview=document.querySelector('.stats');
  if(overview)overview.setAttribute('aria-label',language==='fr'?'Vue d’ensemble de la boutique':'Shop overview');
  document.getElementById('language').value=language;
}
