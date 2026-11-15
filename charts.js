'use strict';
const MARKETING_METRICS=[
 ['bonus','Récompenses','Rewards','money'],
 ['ad','Publicité','Advertising','money'],['price','Prix par biscuit','Price per cookie','money'],
 ['baked','Biscuits préparés','Cookies baked','count'],['sold','Ventes réelles','Actual sales','count'],
 ['revenue','Recettes réelles','Actual revenue','money'],['baking','Coût de fabrication','Baking cost','money'],
 ['expenses','Dépenses totales','Total expenses','money'],['profit','Bénéfice réel','Actual profit','money'],
 ['cash','Solde en caisse','Cash balance','money'],['unsold','Biscuits invendus','Unsold cookies','count'],
 ['sellThrough','Taux de vente du stock','Stock sell-through','percent'],['margin','Marge bénéficiaire','Profit margin','percent'],
 ['breakEven','Seuil de rentabilité','Break-even sales','count'],
 ['forecastSold','Ventes prévues','Forecast sales','count'],['forecastLow','Ventes prévues — minimum','Forecast sales — low','count'],['forecastHigh','Ventes prévues — maximum','Forecast sales — high','count'],
 ['forecastRevenue','Recettes prévues','Forecast revenue','money'],['forecastProfit','Bénéfice prévu','Forecast profit','money'],
 ['lowProfit','Bénéfice prévu — minimum','Forecast profit — low','money'],['highProfit','Bénéfice prévu — maximum','Forecast profit — high','money'],
 ['noAdSold','Ventes prévues sans publicité','Forecast sales without ads','count'],['extraSales','Ventes supplémentaires prévues','Forecast additional sales','count'],
 ['extraRevenue','Recettes supplémentaires prévues','Forecast additional revenue','money'],['netGain','Gain net prévu de la publicité','Forecast net advertising gain','money'],
 ['roi','Rendement publicitaire net prévu','Forecast net advertising return','percent'],
 ['totalAd','Publicité cumulée','Cumulative advertising','money'],['totalRevenue','Recettes cumulées','Cumulative revenue','money'],['totalProfit','Bénéfice cumulé','Cumulative profit','money']
];
let chartSelection=new Set(['ad','sold','revenue','profit']),chartStyle='line',chartPeriod=30;
try{const saved=JSON.parse(localStorage.getItem('eric-cookie-charts'));if(saved){if(Array.isArray(saved.metrics))chartSelection=new Set(saved.metrics.filter(k=>MARKETING_METRICS.some(m=>m[0]===k)));if(['line','bar'].includes(saved.style))chartStyle=saved.style;if([7,14,30].includes(saved.period))chartPeriod=saved.period;}}catch{}
function saveChartSettings(){try{localStorage.setItem('eric-cookie-charts',JSON.stringify({metrics:[...chartSelection],style:chartStyle,period:chartPeriod}));}catch{}}
function marketingTimeline(history){
 let totalAd=0,totalRevenue=0,totalProfit=0;
 return history.map(r=>{
  totalAd+=r.ad;totalRevenue+=r.revenue;totalProfit+=r.profit;
  // Older saves have actual results, but no record of the day's event.
  const known=Number.isInteger(r.event)&&Boolean(EVENTS[r.event]);
  const f=known?forecastSales(r.baked,r.price,r.ad,r.event,r.boost||1):null;
  const base=known?forecastSales(r.baked,r.price,0,r.event,r.boost||1):null;
  return {...r,bonus:r.bonus||0,baking:r.baked*50,unsold:r.baked-r.sold,sellThrough:r.baked?r.sold/r.baked:null,margin:r.revenue?r.profit/r.revenue:null,breakEven:Math.ceil(r.expenses/r.price),
   forecastSold:f?.sold??null,forecastLow:f?.low??null,forecastHigh:f?.high??null,forecastRevenue:f?.revenue??null,forecastProfit:f?.profit??null,lowProfit:f?.lowProfit??null,highProfit:f?.highProfit??null,
   noAdSold:base?.sold??null,extraSales:f?f.sold-base.sold:null,extraRevenue:f?f.revenue-base.revenue:null,netGain:f?f.profit-base.profit:null,roi:f&&r.ad?(f.profit-base.profit)/r.ad:null,totalAd,totalRevenue,totalProfit};
 });
}
function chartNumber(value,unit){
 if(!Number.isFinite(value))return '—';
 if(unit==='money')return money(value);
 return new Intl.NumberFormat(language==='fr'?'fr-CA':'en-US',unit==='percent'?{style:'percent',maximumFractionDigits:1}:{maximumFractionDigits:0}).format(value);
}
function marketingChart(metric,rows){
 const [key,fr,en,unit]=metric,t=(a,b)=>language==='fr'?a:b,label=t(fr,en);
 const finite=rows.filter(r=>Number.isFinite(r[key]));
 const heading=`<h3 id="chart-title-${key}">${label}</h3>`;
 if(!finite.length)return `<article class="trend-card" id="chart-${key}">${heading}<p>${t('Aucune donnée disponible pour cet indicateur.','No data available for this metric.')}</p></article>`;
 const width=660,height=240,left=110,right=22,top=20,bottom=40;
 let min=Math.min(0,...finite.map(r=>r[key])),max=Math.max(0,...finite.map(r=>r[key]));
 if(min===max)max=min+1;
 const x=i=>rows.length===1?(left+width-right)/2:left+i*(width-left-right)/(rows.length-1);
 const y=v=>top+(max-v)/(max-min)*(height-top-bottom);
 const day=t('Jour','Day');
 let marks='',path='';
 rows.forEach((r,i)=>{
  if(!Number.isFinite(r[key])){path='';return;}
  const cx=x(i),cy=y(r[key]),title=`${day} ${r.day} : ${chartNumber(r[key],unit)}`;
  if(chartStyle==='bar'){
   const barWidth=Math.min(28,(width-left-right)/Math.max(1,rows.length)*.65);
   marks+=`<rect x="${cx-barWidth/2}" y="${Math.min(cy,y(0))}" width="${barWidth}" height="${Math.max(1,Math.abs(cy-y(0)))}" rx="2"><title>${title}</title></rect>`;
  }else{
   if(path)marks+=`<path d="M${path} L${cx},${cy}" fill="none" stroke-width="2.5"/>`;
   marks+=`<circle cx="${cx}" cy="${cy}" r="4"><title>${title}</title></circle>`;path=`${cx},${cy}`;
  }
 });
 const ticks=Array.from({length:4},(_,i)=>{const value=min+(max-min)*i/3;return `<line x1="${left}" x2="${width-right}" y1="${y(value)}" y2="${y(value)}" class="chart-grid"/><text x="${left-10}" y="${y(value)+4}" text-anchor="end">${chartNumber(value,unit)}</text>`;}).join('');
 const labels=[...new Set([0,Math.floor((rows.length-1)/2),rows.length-1])].map(i=>`<text x="${x(i)}" y="${height-12}" text-anchor="middle">${day} ${rows[i].day}</text>`).join('');
 return `<article class="trend-card" id="chart-${key}">${heading}<p class="chart-latest">${t('Dernière valeur disponible','Latest available value')} : <strong>${chartNumber(finite[finite.length-1][key],unit)}</strong></p>
 <svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title-${key} chart-desc-${key}"><desc id="chart-desc-${key}">${label}. ${day} ${rows[0].day}–${rows[rows.length-1].day}. ${t('Valeurs détaillées dans le tableau sous le graphique.','Detailed values in the table below the chart.')}</desc>${ticks}<line x1="${left}" x2="${width-right}" y1="${y(0)}" y2="${y(0)}" class="chart-zero"/><g class="chart-marks">${marks}</g>${labels}</svg>
 <details><summary>${t('Voir les valeurs par jour','View daily values')}</summary><div class="table-scroll"><table><caption>${label}</caption><thead><tr><th>${day}</th><th>${label}</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.day}</td><td>${chartNumber(r[key],unit)}</td></tr>`).join('')}</tbody></table></div></details></article>`;
}
function renderMarketingCharts(){
 const target=$('marketing-charts');if(!target)return;
 const t=(a,b)=>language==='fr'?a:b;
 const rows=marketingTimeline(state.history).slice(-chartPeriod);
 target.innerHTML=`<h3>${t('Évolution marketing dans le temps','Marketing trends over time')}</h3><p>${t('Choisissez un graphique pour chaque valeur. Chaque graphique conserve sa propre unité et son échelle.','Choose a chart for each value. Each chart keeps its own unit and scale.')}</p>
 <div class="chart-toolbar"><label for="chart-style">${t('Affichage','Display')}</label><select id="chart-style"><option value="line" ${chartStyle==='line'?'selected':''}>${t('Courbes','Lines')}</option><option value="bar" ${chartStyle==='bar'?'selected':''}>${t('Barres','Bars')}</option></select><label for="chart-period">${t('Période','Period')}</label><select id="chart-period">${[7,14,30].map(n=>`<option value="${n}" ${chartPeriod===n?'selected':''}>${t(`Les ${n} derniers jours joués`,`Last ${n} completed days`)}</option>`).join('')}</select><button type="button" class="subtle" data-charts-action="all">${t('Tout afficher','Show all')}</button><button type="button" class="subtle" data-charts-action="none">${t('Tout masquer','Hide all')}</button></div>
 <fieldset class="chart-options"><legend>${t('Indicateurs à afficher','Metrics to display')}</legend>${MARKETING_METRICS.map(([key,fr,en])=>`<label><input type="checkbox" data-chart-metric="${key}" ${chartSelection.has(key)?'checked':''}>${t(fr,en)}</label>`).join('')}</fieldset>
 <p class="analysis-method">${t('Les jours correspondent aux journées jouées. Les prévisions sont recalculées avec les réglages et l’événement enregistrés pour chaque jour; elles ne sont pas des résultats réels. Pour les anciennes journées sans événement enregistré, ces courbes restent vides. Les ratios sans dénominateur sont indiqués par —.','Days represent completed game days. Forecasts are recalculated using each day’s recorded settings and event; they are not actual results. Older days without a recorded event have gaps in these curves. Ratios with a zero denominator are shown as —.')}</p>
 ${!rows.length?`<p class="chart-empty">${t('Jouez votre première journée pour commencer les graphiques.','Play your first day to start the charts.')}</p>`:!chartSelection.size?`<p class="chart-empty">${t('Sélectionnez au moins un indicateur.','Select at least one metric.')}</p>`:`<div class="trend-grid">${MARKETING_METRICS.filter(m=>chartSelection.has(m[0])).map(m=>marketingChart(m,rows)).join('')}</div>`}`;
}
function selectMarketingChart(key){
 if(!MARKETING_METRICS.some(m=>m[0]===key))return;
 chartSelection.add(key);saveChartSettings();renderMarketingCharts();
 const chart=$(`chart-${key}`);if(chart?.scrollIntoView)chart.scrollIntoView({block:'nearest'});
}
document.getElementById('marketing-charts').addEventListener('change',event=>{
 const key=event.target.dataset.chartMetric;
 if(key){if(event.target.checked)chartSelection.add(key);else chartSelection.delete(key);}
 else if(event.target.id==='chart-style')chartStyle=event.target.value==='bar'?'bar':'line';
 else if(event.target.id==='chart-period')chartPeriod=Number(event.target.value);
 saveChartSettings();renderMarketingCharts();
});
document.getElementById('marketing-charts').addEventListener('click',event=>{
 const action=event.target.dataset.chartsAction;if(!action)return;
 chartSelection=action==='all'?new Set(MARKETING_METRICS.map(m=>m[0])):new Set();saveChartSettings();renderMarketingCharts();
});
document.getElementById('analytics-content').addEventListener('click',event=>{const button=event.target.closest('button[data-chart]');if(button)selectMarketingChart(button.dataset.chart);});
