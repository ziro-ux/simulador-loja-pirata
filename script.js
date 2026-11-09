const $=i=>document.getElementById(i),B=137500,F=n=>Math.round(n).toLocaleString('pt-BR'),D=(n,d=1)=>n.toFixed(d).replace('.',','),
P=t=>(t?2:1)/B,C=(p,n)=>1-Math.exp(n*Math.log1p(-p)),pc=(x,d=1)=>D(x*100,d)+'%',
T=s=>s<60?F(s)+' s':s<3600?D(s/60)+' min':s<86400?D(s/3600)+' h':D(s/86400,2)+' dias';
let H=[];try{H=JSON.parse(localStorage.getItem('ph')||'[]')}catch(e){}
function sv(){try{localStorage.setItem('ph',JSON.stringify(H.slice(0,30)))}catch(e){}}
function rh(){const u=$('hist');u.textContent='';if(!H.length){const l=document.createElement('li');l.className='mut';l.textContent='Ainda sem resultados. Rode uma simulação e ela aparecerá aqui.';u.append(l);return}
H.slice(0,10).forEach(x=>{const l=document.createElement('li');l.textContent=x;u.append(l)})}
function add(t){H.unshift(t);sv();rh()}
$('clr').onclick=()=>{H=[];sv();rh()};
$('theme').onclick=()=>{const r=document.documentElement,l=r.dataset.theme==='light';r.dataset.theme=l?'dark':'light';$('theme').textContent=l?'☀ MODO CLARO':'☾ MODO ESCURO'};
const MODE=th=>th?'Hora do Tesouro':'chance normal';
function stats(){const th=$('th').checked,p=P(th),m=1/p;
$('odds').textContent='1 / '+F(m);$('mean').textContent=F(m);$('med').textContent=F(Math.log(.5)/Math.log1p(-p));
$('single').textContent=D(p*100,6)+'%';$('lp').textContent=D(p*100,6)+'%';$('five').textContent='≈'+F(5e6*p);
$('cur').innerHTML='Chance atual: <b>1 em '+F(m)+'</b> · Sem sistema de pity';
$('times').innerHTML=[1,5,10].map(s=>{const t=m*s;return '<div class="st"><div class="lb">A cada '+s+' s</div><div class="n">'+D(t/3600)+' horas</div><div>'+D(t/86400,2)+' dias</div><div class="mut">'+F(t)+' segundos</div></div>'}).join('');
$('cum').innerHTML=[[C(p,1e4),'Ganho até 10 mil baús'],[.5,'Ganho até a mediana'],[C(p,m),'Ganho até a média'],[C(p,5e5),'Ganho até 500 mil baús']].map(a=>'<div class="st"><div class="n" style="color:var(--cy)">'+pc(a[0])+'</div><div class="mut">'+a[1]+'</div></div>').join('')}
$('spd').onchange=$('pace').onchange=()=>{$('spdl').textContent=F(+$('spd').value)+' baús/s de reprodução visual';lr()};
$('th').onchange=stats;
const L={r:0,o:0,k:0,p:0,raf:0,last:0,done:1};
function st(s,m){$('stat').textContent=s;$('msg').textContent=m}
function lr(){const n=Math.floor(L.o),c=L.p?C(L.p,n):0;$('cnt').textContent=F(n);$('simt').textContent=T(n*+$('pace').value)+' de jogo simulado';$('lc').textContent=pc(c,3);$('bar').style.width=c*100+'%'}
function tick(t){if(!L.r)return;L.o=Math.min(L.k,L.o+ +$('spd').value*(t-L.last)/1000);L.last=t;lr();if(L.o>=L.k){fin();return}L.raf=requestAnimationFrame(tick)}
function fin(){L.r=0;L.done=1;const sg=$('stage').classList;sg.remove('run');sg.add('win');st('TOKEN OBTIDO','ACESSO À LOJA PIRATA!');
$('go').disabled=false;$('go').textContent='▶ Nova abertura';$('pause').disabled=true;$('th').disabled=false;
add('Ao vivo · '+F(L.k)+' baús · '+T(L.k*+$('pace').value)+' de jogo · '+MODE(L.p>1/B))}
$('go').onclick=()=>{if(L.r)return;if(L.done){L.p=P($('th').checked);L.k=Math.max(1,Math.ceil(Math.log(1-Math.random())/Math.log1p(-L.p)));L.o=0;L.done=0;$('stage').classList.remove('win')}
L.r=1;L.last=performance.now();$('stage').classList.add('run');st('ABRINDO','ABRINDO BAÚS…');$('go').disabled=true;$('pause').disabled=false;$('th').disabled=true;L.raf=requestAnimationFrame(tick)};
$('pause').onclick=()=>{if(!L.r)return;L.r=0;cancelAnimationFrame(L.raf);$('stage').classList.remove('run');st('PAUSADO','PAUSADO');$('go').disabled=false;$('go').textContent='▶ Retomar';$('pause').disabled=true};
$('reset').onclick=()=>{cancelAnimationFrame(L.raf);Object.assign(L,{r:0,o:0,k:0,p:0,done:1});$('stage').className='stage';st('PRONTO','PRONTO PARA ABRIR');$('go').disabled=false;$('go').textContent='▶ Começar a abrir';$('pause').disabled=true;$('th').disabled=false;lr()};
const R={r:0,N:0,d:0,w:0,q:0,per:0,raf:0};
function proj(){const N=+$('N').value,c=+$('Cc').value,s=+$('pp').value,p=P($('pm').value==='1'),q=C(p,c);
$('eW').textContent=F(N*q);$('qp').textContent=pc(q,2);$('tp').textContent=T(c*s);$('tot').textContent=F(N*c);
$('w1').textContent=F(5e6*C(p,3600/s));$('w24').textContent=F(5e6*C(p,86400/s))}
['N','Cc','pp','pm'].forEach(i=>$(i).onchange=()=>{proj();if(!R.r)pclear()});
function pclear(){R.N=0;$('pd').textContent='0 / '+F(+$('N').value);['pw','pn','pr','pe','bs','bt'].forEach(i=>$(i).textContent='—');$('bsb').style.width=$('btb').style.width='0';$('pst').textContent='PRONTO'}
function pr(){const rate=R.d?R.w/R.d:0,sc=Math.max(R.q,rate,1e-9)*1.15;
$('pd').textContent=F(R.d)+' / '+F(R.N);$('pw').textContent=F(R.w);$('pn').textContent=F(R.d-R.w);$('pr').textContent=pc(rate,3);$('pe').textContent=F(R.d*R.q);
$('bs').textContent=pc(rate,3);$('bt').textContent=pc(R.q,3);$('bsb').style.width=rate/sc*100+'%';$('btb').style.width=R.q/sc*100+'%'}
function step(){if(!R.r)return;const m=Math.min(R.per,R.N-R.d),q=R.q;let w=0;for(let i=0;i<m;i++)if(Math.random()<q)w++;R.w+=w;R.d+=m;pr();
if(R.d>=R.N){R.r=0;$('pst').textContent='CONCLUÍDO';$('prun').disabled=false;$('ppause').disabled=true;
add('População · '+F(R.N)+' jogadores × '+F(+$('Cc').value)+' baús · '+F(R.w)+' com token ('+pc(R.w/R.N,3)+') · '+MODE($('pm').value==='1'));return}
R.raf=requestAnimationFrame(step)}
$('prun').onclick=()=>{if(R.r)return;if(!R.N||R.d>=R.N){const v=$('pv').value;R.N=+$('N').value;R.d=R.w=0;R.q=C(P($('pm').value==='1'),+$('Cc').value);R.per=Math.ceil(R.N/(v==='0'?1:v==='1'?90:240))}
R.r=1;$('pst').textContent='RODANDO';$('prun').disabled=true;$('ppause').disabled=false;R.raf=requestAnimationFrame(step)};
$('ppause').onclick=()=>{R.r=0;cancelAnimationFrame(R.raf);$('pst').textContent='PAUSADO';$('prun').disabled=false;$('ppause').disabled=true};
$('pstop').onclick=()=>{R.r=0;cancelAnimationFrame(R.raf);pclear();$('prun').disabled=false;$('ppause').disabled=true};
stats();proj();pclear();rh();$('spd').onchange();
