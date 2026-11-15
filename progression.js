'use strict';
const SHOP_UPGRADES=[
 {id:'sign',icon:'✨',fr:'Enseigne lumineuse',en:'Glowing sign',cost:4000,day:3,boost:.10},
 {id:'terrace',icon:'☕',fr:'Coin dégustation',en:'Tasting corner',cost:10000,day:7,boost:.15},
 {id:'mascot',icon:'🍪',fr:'Mascotte de la boutique',en:'Shop mascot',cost:20000,day:12,boost:.25}
];
const SHOP_MILESTONES=[
 {id:'hundred',goal:100,reward:1000,fr:'100 biscuits vendus',en:'100 cookies sold'},
 {id:'fivehundred',goal:500,reward:2500,fr:'500 biscuits vendus',en:'500 cookies sold'},
 {id:'empire',goal:1500,reward:5000,fr:'1 500 biscuits vendus',en:'1,500 cookies sold'}
];
function shopBoost(){return 1+SHOP_UPGRADES.filter(u=>state.upgrades.includes(u.id)).reduce((sum,u)=>sum+u.boost,0);}
function dailyChallenge(day){
 const type=(day-1)%3;
 return [
 {fr:'Servir au moins 40 clients',en:'Serve at least 40 customers',reward:500,test:r=>r.sold>=40},
 {fr:'Faire au moins 30 $ de bénéfice',en:'Earn at least $30 in profit',reward:800,test:r=>r.profit>=3000},
 {fr:'Vendre au moins 90 % de la fournée',en:'Sell at least 90% of the batch',reward:600,test:r=>r.baked>0&&r.sold/r.baked>=.9}
 ][type];
}
function awardShopRewards(row){
 let bonus=0;const rewards=[];
 const challenge=dailyChallenge(row.day);
 if(challenge.test(row)){bonus+=challenge.reward;rewards.push({fr:'Défi du jour réussi',en:'Daily challenge completed',amount:challenge.reward});}
 const sold=state.history.reduce((sum,r)=>sum+r.sold,0);
 for(const m of SHOP_MILESTONES){if(sold>=m.goal&&!state.achievements.includes(m.id)){state.achievements.push(m.id);bonus+=m.reward;rewards.push({fr:m.fr,en:m.en,amount:m.reward});}}
 row.bonus=bonus;row.rewards=rewards;state.cash+=bonus;row.cash=state.cash;
}
function buyShopUpgrade(id){
 const u=SHOP_UPGRADES.find(u=>u.id===id);
 if(!u||finished()||state.upgrades.includes(id)||state.history.length+1<u.day||state.cash<u.cost+50)return false;
 state.cash-=u.cost;state.investments+=u.cost;state.upgrades.push(id);save();render();return true;
}
function renderProgression(){
 const t=(fr,en)=>language==='fr'?fr:en;
 const sold=state.history.reduce((sum,r)=>sum+r.sold,0),day=state.history.length+1;
 const rank=sold>=1500?t('Légende du biscuit','Cookie legend'):sold>=500?t('Star du quartier','Neighborhood star'):sold>=100?t('Artisan du bonheur','Happiness baker'):t('Apprenti gourmand','Cookie apprentice');
 const last=state.history[state.history.length-1];
 const bonus=state.history.reduce((sum,r)=>sum+(r.bonus||0),0);
 const challenge=dailyChallenge(Math.min(day,30));
 document.getElementById('shop-adventure').innerHTML=`
 <div class="adventure-heading"><div><div class="eyebrow">${t('VOTRE AVENTURE','YOUR ADVENTURE')}</div><h2>🏅 ${rank}</h2></div><span class="boost-badge">${t('Clientèle','Customer demand')} +${Math.round((shopBoost()-1)*100)} %</span></div>
 ${last?.rewards?.length?`<div class="reward-banner" role="status">🎉 ${last.rewards.map(r=>`${t(r.fr,r.en)} : +${money(r.amount)}`).join(' · ')}</div>`:''}
 <div class="adventure-grid"><div class="daily-quest"><h3>🎯 ${t('Défi du jour','Daily challenge')}</h3><p>${finished()?t('L’aventure est terminée. Rejouez pour essayer une nouvelle stratégie !','Your adventure is complete. Play again to try a new strategy!'):t(challenge.fr,challenge.en)}</p><strong>${finished()?t('Bravo pour votre parcours !','Well done on your adventure!'):`${t('Récompense','Reward')} : +${money(challenge.reward)}`}</strong><p>${t('Les récompenses sont versées après la journée et s’ajoutent au bénéfice commercial.','Rewards are paid after the day and added on top of trading profit.')}</p></div>
 <div class="milestones"><h3>🏆 ${t('Objectifs de la boutique','Shop milestones')}</h3>${SHOP_MILESTONES.map(m=>`<div class="milestone"><span>${state.achievements.includes(m.id)?'✅':'🍪'} ${t(m.fr,m.en)} <b>+${money(m.reward)}</b></span><progress max="${m.goal}" value="${Math.min(sold,m.goal)}" aria-label="${t(m.fr,m.en)}"></progress></div>`).join('')}</div></div>
 <h3>🛍️ ${t('Faites grandir votre boutique','Grow your shop')}</h3><p>${t('Achats uniques : les bonus de clientèle s’additionnent. Gardez au moins 0,50 $ pour préparer un biscuit.','One-time purchases: demand bonuses add up. Keep at least $0.50 to bake a cookie.')}</p>
 <div class="upgrade-grid">${SHOP_UPGRADES.map(u=>{const owned=state.upgrades.includes(u.id),locked=day<u.day;return `<article class="upgrade-card ${owned?'upgrade-owned':''}"><span class="upgrade-icon">${u.icon}</span><h3>${t(u.fr,u.en)}</h3><p>+${Math.round(u.boost*100)} % ${t('de clientèle potentielle','potential customer demand')}</p><strong>${money(u.cost)}</strong><button type="button" class="subtle" data-upgrade="${u.id}" ${owned||locked||finished()||state.cash<u.cost+50?'disabled':''}>${owned?t('Installée ✓','Installed ✓'):locked?t(`Disponible au jour ${u.day}`,`Unlocks on day ${u.day}`):t('Acheter','Buy')}</button></article>`;}).join('')}</div>
 <p class="adventure-finances">${t('Récompenses cumulées','Total rewards')} : ${money(bonus)} · ${t('Investissements','Investments')} : ${money(state.investments)} · ${t('Gain net en caisse','Net cash gain')} : ${money(state.cash-10000)}</p>`;
}
document.getElementById('shop-adventure').addEventListener('click',event=>{const id=event.target.dataset.upgrade;if(id)buyShopUpgrade(id);});
