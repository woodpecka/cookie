'use strict';
// The same demand model drives both the forecast and actual trading days.
function customerDemand(price,ad,event,factor=1){
  return Math.max(0,Math.round((42+18*Math.sqrt(ad/100))*Math.pow(200/price,1.45)*EVENTS[event].demand*factor));
}
function forecastSales(baked,price,ad,event){
  const expenses=baked*50+ad;
  const sold=Math.min(baked,customerDemand(price,ad,event));
  const low=Math.min(baked,customerDemand(price,ad,event,.85));
  const high=Math.min(baked,customerDemand(price,ad,event,1.15));
  return {sold,low,high,revenue:sold*price,expenses,profit:sold*price-expenses,lowProfit:low*price-expenses,highProfit:high*price-expenses};
}
function renderAnalytics(){
  const target=$('analytics-content');
  if(!target)return;
  const t=(fr,en)=>language==='fr'?fr:en;
  if(finished()){
    target.innerHTML=`<p>${t('La partie est terminée. Commencez une nouvelle partie pour préparer vos prochaines ventes.','The game is over. Start a new game to plan your next sales.')}</p>`;
    renderMarketingHistory();return;
  }
  const {baked,price,ad}=values();
  if(!$('day-form').checkValidity()||![baked,price,ad].every(Number.isFinite)){
    target.innerHTML=`<p role="status">${t('Saisissez une quantité, un prix et un budget valides pour afficher les prévisions.','Enter a valid quantity, price and budget to see forecasts.')}</p>`;
    renderMarketingHistory();return;
  }
  const f=forecastSales(baked,price,ad,state.event),base=forecastSales(baked,price,0,state.event);
  const extraSales=f.sold-base.sold,extraRevenue=f.revenue-base.revenue,netGain=f.profit-base.profit;
  const percent=n=>new Intl.NumberFormat(language==='fr'?'fr-CA':'en-US',{style:'percent',maximumFractionDigits:0}).format(n);
  let metricIndex=0;
  const metricKeys=['forecastSold','forecastRevenue','forecastProfit','breakEven','ad','extraSales','netGain','roi'];
  const metric=(label,value,note)=>`<div><span>${label}</span><strong>${value}</strong><small>${note}</small><button type="button" class="metric-chart-button" data-chart="${metricKeys[metricIndex++]}">${t('Graphique','Chart')}</button></div>`;
  const budgets=[...new Set([0,100,200,500,1000,2000,5000,Math.floor(ad/200)*100,ad,Math.min(10000000,ad*2)])].sort((a,b)=>a-b);
  const scenarios=budgets.map(budget=>({budget,...forecastSales(baked,price,budget,state.event)}));
  const feasible=scenarios.filter(s=>s.expenses<=state.cash);
  const best=feasible.reduce((a,b)=>!a||b.profit>a.profit?b:a,null);
  const signed=n=>`${n>0?'+':''}${money(n)}`;
  target.innerHTML=`
    <p class="analysis-context">${t('Prévisions pour les réglages actuels et l’événement du jour.','Forecasts for your current settings and today’s event.')}</p>
    ${f.expenses>state.cash?`<p class="analysis-warning" role="status">${t('Plan au-dessus du budget : réduisez la quantité ou la publicité avant de jouer.','This plan is over budget: reduce quantity or advertising before playing.')}</p>`:''}
    <div class="analysis-metrics">
      ${metric(t('Ventes prévues','Forecast sales'),`${f.sold} / ${baked}`,`${t('Fourchette','Range')} : ${f.low}–${f.high}`)}
      ${metric(t('Recettes prévues','Forecast revenue'),money(f.revenue),`${t('Dépenses totales','Total expenses')} : ${money(f.expenses)}`)}
      ${metric(t('Bénéfice prévu','Forecast profit'),money(f.profit),`${money(f.lowProfit)} – ${money(f.highProfit)}`)}
      ${metric(t('Seuil de rentabilité','Break-even sales'),`${Math.ceil(f.expenses/price)} ${t('biscuits','cookies')}`,f.expenses>baked*price?t('Impossible avec cette quantité et ce prix','Unreachable with this quantity and price'):t('Ventes nécessaires pour couvrir les dépenses','Sales needed to cover expenses'))}
    </div>
    <div class="marketing-comparison"><h3>${t('Ce que rapporte la publicité','What advertising brings in')}</h3>
      <p>${t('Comparaison avec 0 $ de publicité, à quantité, prix et événement identiques.','Compared with $0 advertising, with the same quantity, price and event.')}</p>
      <div class="analysis-metrics">
        ${metric(t('Budget publicitaire','Advertising budget'),money(ad),t('Inclus dans les dépenses','Included in expenses'))}
        ${metric(t('Ventes supplémentaires','Additional sales'),`+${extraSales}`,`${t('Recettes supplémentaires','Additional revenue')} : ${money(extraRevenue)}`)}
        ${metric(t('Gain net de la publicité','Net advertising gain'),signed(netGain),t('Recettes supplémentaires moins publicité','Additional revenue minus advertising'))}
        ${metric(t('Rendement publicitaire net','Net advertising return'),ad?percent(netGain/ad):'—',ad?t('Gain net ÷ budget publicitaire','Net gain ÷ advertising spend'):t('Aucun budget publicitaire','No advertising spend'))}
      </div>
      ${f.sold===baked&&baked>0?`<p class="analysis-warning">${t('Quantité entièrement vendue dans la prévision centrale : plus de publicité ne peut pas vendre plus que votre stock.','The central forecast sells your whole batch: more advertising cannot sell beyond your stock.')}</p>`:''}
    </div>
    <h3>${t('Comparer les budgets publicitaires','Compare advertising budgets')}</h3>
    <p>${t('Même quantité et même prix. La ligne surlignée correspond au budget choisi.','Same quantity and price. The highlighted row is your selected budget.')}</p>
    <div class="table-scroll"><table class="analysis-table"><caption>${t('Scénarios de publicité — prévisions centrales','Advertising scenarios — central forecasts')}</caption><thead><tr>
      <th>${t('PUBLICITÉ','AD SPEND')}</th><th>${t('VENTES','SALES')}</th><th>${t('RECETTES','REVENUE')}</th><th>${t('COÛTS TOTAUX','TOTAL COSTS')}</th><th>${t('BÉNÉFICE','PROFIT')}</th><th>${t('GAIN VS SANS PUB','GAIN VS NO ADS')}</th><th>${t('BUDGET','BUDGET')}</th>
    </tr></thead><tbody>${scenarios.map(s=>`<tr class="${s.budget===ad?'selected-scenario':''}"><td>${money(s.budget)}</td><td>${s.sold}</td><td>${money(s.revenue)}</td><td>${money(s.expenses)}</td><td class="${s.profit>=0?'positive':'negative'}">${money(s.profit)}</td><td>${signed(s.profit-base.profit)}</td><td>${s.expenses<=state.cash?t('Disponible','Available'):t('Insuffisant','Over budget')}</td></tr>`).join('')}</tbody></table></div>
    <p class="analysis-tip">${best?t('Meilleur bénéfice central parmi les scénarios abordables affichés :','Best central profit among the affordable scenarios shown:')+' '+money(best.budget)+' '+t('de publicité, pour un bénéfice de','in advertising, for a profit of')+' '+money(best.profit)+'.':t('Aucun scénario affiché n’est abordable avec cette quantité.','None of the shown scenarios is affordable with this batch size.')}</p>
    <p class="analysis-method">${t('Méthode : prévision centrale sans variation aléatoire; fourchette avec la variation de demande du jeu (−15 % à +15 %), arrondie et limitée par le stock. Ce sont des scénarios, pas une garantie ni une moyenne statistique. La publicité a un rendement décroissant.','Method: central forecast without random variation; range uses the game’s demand variation (−15% to +15%), rounded and capped by stock. These are scenarios, not a guarantee or a statistical mean. Advertising has diminishing returns.')}</p>`;
  renderMarketingHistory();
}
function renderMarketingHistory(){
  renderMarketingCharts();
  const t=(fr,en)=>language==='fr'?fr:en;
  const h=state.history;
  $('marketing-history').innerHTML=h.length?`<h3>${t('Résultats réels depuis l’ouverture','Actual results since opening')}</h3><div class="analysis-metrics">
    <div><span>${t('Publicité dépensée','Advertising spent')}</span><strong>${money(h.reduce((s,r)=>s+r.ad,0))}</strong></div>
    <div><span>${t('Recettes réalisées','Actual revenue')}</span><strong>${money(h.reduce((s,r)=>s+r.revenue,0))}</strong></div>
    <div><span>${t('Bénéfice réalisé','Actual profit')}</span><strong>${money(h.reduce((s,r)=>s+r.profit,0))}</strong></div>
    </div><p>${t('Ces totaux décrivent vos journées jouées. Ils ne mesurent pas à eux seuls l’effet de la publicité : prix, événements et stocks changent aussi les ventes.','These totals describe your completed days. They do not isolate advertising’s effect: prices, events and stock also affect sales.')}</p>`:`<p>${t('Vos résultats réels apparaîtront ici après la première journée.','Your actual results will appear here after your first day.')}</p>`;
}
