'use strict';
const EVENTS = [
  {title:'A lovely day for cookies', description:'Clear skies and steady foot traffic. A classic shop day.', icon:'☀️', demand:1},
  {title:'Rain on the window', description:'A quieter street today. Expect about 25% fewer customers.', icon:'🌧️', demand:.75},
  {title:'Neighborhood market day', description:'The street is buzzing! Expect about 30% more customers.', icon:'🛍️', demand:1.3},
  {title:'An afternoon cookie craving', description:'Word is spreading. Expect about 15% more customers.', icon:'✨', demand:1.15},
  {title:'A slow day on the block', description:'A little less foot traffic. Expect about 10% fewer customers.', icon:'🍃', demand:.9}
];
const KEY='kevins-cookie-shop-v1';
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat(language==='fr'?'fr-CA':'en-US',{style:'currency',currency:'USD'}).format(n/100);
function fresh(){return {cash:10000,history:[],event:0};}
function readSave(){try {const s=JSON.parse(localStorage.getItem(KEY));if(s&&Number.isInteger(s.cash)&&s.cash>=0&&Array.isArray(s.history)&&s.history.length<=30&&Number.isInteger(s.event)&&EVENTS[s.event]&&s.history.every(r=>['day','baked','sold','price','ad','revenue','expenses','profit','cash'].every(k=>Number.isFinite(r[k]))))return s;}catch{}return fresh();}
let state=readSave();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{$('save-status').textContent='Saving unavailable. Keep this tab open.';localize();}}
function values(){return {baked:Number($('quantity').value),price:Math.round(Number($('price').value)*100),ad:Math.round(Number($('advertising').value)*100)};}
function finished(){return state.history.length>=30||state.cash<50;}
function updateCost(){const v=values(),cost=v.baked*50+v.ad;const valid=$('day-form').checkValidity()&&Number.isFinite(cost);$('cost').textContent=Number.isFinite(cost)?money(cost):'—';$('error').textContent=valid&&cost>state.cash?'That batch is over budget. Bake fewer cookies or lower your ad spend.':'';$('bake').disabled=finished()||!valid||cost>state.cash;localize();}
function renderCustomers(){
  const last=state.history[state.history.length-1];
  const sold=last?last.sold:0;
  // Keep the street readable even when a very large batch sells out.
  const count=Math.min(20,Math.ceil(sold/10));
  const perPerson=count?Math.ceil(sold/count):10;
  $('customer-count').textContent=last?`${sold.toLocaleString(language==='fr'?'fr-CA':'en-US')} customers · Day ${last.day}`:'Waiting for opening day';
  $('customer-empty').hidden=sold>0;
  $('customer-empty').textContent=last?'A quiet day. Try a new price or a little advertising.':'Your first customers are just a batch away.';
  $('customer-legend').textContent=sold?`Each cookie-headed friend represents up to ${perPerson} customers. ${sold.toLocaleString(language==='fr'?'fr-CA':'en-US')} cookies sold today!`:(last?'No cookies sold today. Your next batch could bring a crowd.':'Open the shop to see your customers arrive.');
  $('customer-crowd').innerHTML=Array.from({length:count},(_,i)=>`<div class="cookie-customer" style="--i:${i};--shirt:${['#4f795e','#c98153','#8e8aaf','#c3a04e'][i%4]}"><div class="customer-walk"><div class="cookie-head"><i></i><b></b><span></span></div><div class="customer-body"><i class="customer-arm"></i><i class="customer-bag">🍪</i></div><div class="customer-legs"><i></i><i></i></div></div></div>`).join('');
}
function renderBase(){renderCustomers();const n=state.history.length;const done=finished();$('cash').textContent=money(state.cash);$('day').innerHTML=`Day ${Math.min(n+1,30)} <em>/ 30</em>`;$('progress').style.width=`${n/30*100}%`;$('total-profit').textContent=money(state.cash-10000);$('total-sold').textContent=state.history.reduce((s,r)=>s+r.sold,0).toLocaleString(language==='fr'?'fr-CA':'en-US');$('plan-title').textContent=done?'The shop is closed':n?'A fresh batch of possibilities':"Let's open the shop";const e=EVENTS[state.event];$('event-icon').textContent=e.icon;$('event-title').textContent=done?'Your adventure is complete':e.title;$('event-description').textContent=done?'Start a new game and try a different recipe for success.':e.description;$('bake').innerHTML=done?'Adventure complete':`Bake & open for day ${n+1} <span>→</span>`;for(const id of ['quantity','price','advertising'])$(id).disabled=done;$('history-count').textContent=`${n} day${n===1?'':'s'} in the books`;
if(n){$('empty').hidden=true;$('report').hidden=false;const r=state.history[n-1];$('results-title').textContent=done?'Your shop, by the numbers':`Day ${r.day} · The daily digest`;const title=done?(n===30?'30 days. Made from scratch.':'Time for a fresh start.'):(r.profit>0?'A sweet day at the shop.':r.profit===0?'A perfectly balanced batch.':'A little room to rise.');$('report').innerHTML=`<div class="report-banner"><small>${done?'FINAL RESULTS':'DOORS CLOSED · OVENS OFF'}</small><h3>${title}</h3><p>${done?`You sold ${state.history.reduce((s,x)=>s+x.sold,0)} cookies and finished with ${money(state.cash)}.${n<30?' You have less than the $0.50 needed to bake another cookie.':''}`:`${r.sold} happy customers. ${r.baked-r.sold} cookies left on the tray.`}</p></div><div class="report-row"><span>Cookies sold</span><b>${r.sold} / ${r.baked}</b></div><div class="report-row"><span>Revenue</span><b>${money(r.revenue)}</b></div><div class="report-row"><span>Baking expenses</span><b>${money(r.baked*50)}</b></div><div class="report-row"><span>Advertising expenses</span><b>${money(r.ad)}</b></div><div class="report-row"><span>Total expenses</span><b>${money(r.expenses)}</b></div><div class="report-row"><span>Daily profit</span><b class="${r.profit>=0?'positive':'negative'}">${money(r.profit)}</b></div><div class="report-row total"><span>Remaining cash</span><b>${money(r.cash)}</b></div><p class="report-note">${done?'Your next cookie empire is just a fresh start away.':r.sold===r.baked&&r.baked>0?'Sold out! A bigger batch could bring in more tomorrow.':r.baked===0?'The oven took a break. Bake a batch tomorrow to bring in revenue.':'Try adjusting your batch size, price, or advertising tomorrow.'}</p>`;
$('ledger').innerHTML=[...state.history].reverse().map(r=>`<tr><td>${String(r.day).padStart(2,'0')}</td><td>${r.baked} / ${r.sold}</td><td>${money(r.revenue)}</td><td>${money(r.expenses)}</td><td class="${r.profit>=0?'positive':'negative'}">${money(r.profit)}</td><td>${money(r.cash)}</td></tr>`).join('');
}else{$('empty').hidden=false;$('report').hidden=true;$('results-title').textContent='The daily digest';$('ledger').innerHTML='<tr><td colspan="6" class="no-history">Your shop\'s story starts with day one.</td></tr>';}
updateCost();}
function render(){renderBase();localize();}
$('language').addEventListener('change',()=>{
  language=$('language').value==='en'?'en':'fr';
  try{localStorage.setItem('eric-cookie-language',language);}catch{}
  render();
});
$('day-form').addEventListener('input' ,updateCost);
$('day-form').addEventListener('submit',e=>{e.preventDefault();if(finished()||!$('day-form').checkValidity())return;const {baked,price,ad}=values();const expenses=baked*50+ad;if(expenses>state.cash)return;const demand=Math.max(0,Math.round((42+18*Math.sqrt(ad/100))*Math.pow(200/price,1.45)*EVENTS[state.event].demand*(.85+Math.random()*.3)));const sold=Math.min(baked,demand),revenue=sold*price,profit=revenue-expenses;state.cash+=profit;state.history.push({day:state.history.length+1,baked,sold,price,ad,revenue,expenses,profit,cash:state.cash});state.event=Math.floor(Math.random()*EVENTS.length);save();render();});
$('restart').addEventListener('click',()=>$('restart-dialog').showModal());$('cancel-restart').addEventListener('click',()=>$('restart-dialog').close());$('confirm-restart').addEventListener('click',()=>{state=fresh();$('quantity').value=60;$('price').value=2;$('advertising').value=5;save();$('restart-dialog').close();render();});
render();
