(function(){
  'use strict';
  const header=document.getElementById('site-header');
  const progress=document.getElementById('scroll-progress');
  const toggle=document.getElementById('menu-toggle');
  const menu=document.getElementById('site-menu');
  const shade=menu.querySelector('.menu-shade');
  const menuLinks=Array.from(menu.querySelectorAll('.menu-link'));
  let menuOpen=false, lastFocus=null, scrollScheduled=false;
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setMenu(open){
    menuOpen=open; toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
    document.body.classList.toggle('menu-open',open);
    menu.classList.toggle('is-open',open); menu.setAttribute('aria-hidden',String(!open));
    menu.inert=!open;
    if(open){lastFocus=document.activeElement; setTimeout(()=>menuLinks[0]?.focus(),65);}
    else if(lastFocus && typeof lastFocus.focus==='function'){lastFocus.focus({preventScroll:true});}
  }
  toggle.addEventListener('click',()=>setMenu(!menuOpen));
  shade.addEventListener('click',()=>setMenu(false));
  menuLinks.forEach(a=>a.addEventListener('click',()=>{if(menuOpen)setMenu(false);}));
  menu.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const links=[...menu.querySelectorAll('a:not([tabindex="-1"])')];const first=links[0],last=links[links.length-1];if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}});
  const filters=document.getElementById('filter-list');
  const grid=document.getElementById('academy-grid');
  const categories=['All academies','Governance','Economy','Law & Society','Security & Crisis','Environment'];
  const dlg=document.getElementById('academy-dialog');
  const closeDlg=document.getElementById('dialog-close');
  let currentFilter='All academies', selectedCard=null;
  const el=(tag,cls,content)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(content!==undefined)node.textContent=content;return node;};
  function renderFilters(){
    filters.replaceChildren();
    categories.forEach(cat=>{const btn=el('button','filter-chip',cat);btn.type='button';btn.setAttribute('aria-pressed',String(currentFilter===cat));btn.addEventListener('click',()=>{currentFilter=cat;renderFilters();renderAcademies();});filters.append(btn);});
  }
  function cardFor(item,index){
    const article=el('article','academy-card reveal');
    article.style.setProperty('--reveal-delay',Math.min(index%4,3)*65+'ms');
    const top=el('div','academy-card-top');
    top.append(el('span','academy-no','ACADEMY '+String(item.id).padStart(2,'0')),el('span','academy-category',item.category));
    const symbol=el('div','academy-watermark',String(item.id).padStart(2,'0'));symbol.setAttribute('aria-hidden','true');
    const text=el('div','academy-card-copy');
    text.append(el('span','academy-year',item.year),el('h3','academy-title',item.title),el('p','academy-summary',item.summary));
    const bottom=el('div','academy-card-bottom');
    bottom.append(el('span','academy-detail-label','VIEW AGENDA'));
    const arrow=el('span','academy-arrow','↗');arrow.setAttribute('aria-hidden','true');bottom.append(arrow);
    const btn=el('button','card-hit');btn.type='button';btn.setAttribute('aria-label','Read agenda for '+item.title);
    btn.addEventListener('click',()=>{selectedCard=btn;openAcademy(item);});
    article.append(top,symbol,text,bottom,btn);
    return article;
  }
  function renderAcademies(){
    grid.replaceChildren();
    const list=FORUM_ACADEMIES.filter(a=>currentFilter==='All academies'||a.category===currentFilter);
    list.forEach((item,i)=>grid.append(cardFor(item,i)));
    initReveals(grid);
  }
  function fillRole(label,name){const box=el('div','dialog-role');box.append(el('small','',label),el('strong','',name));return box;}
  function openAcademy(a){
    document.getElementById('dialog-badge').textContent='ACADEMY '+String(a.id).padStart(2,'0')+'  /  '+a.category.toUpperCase();
    document.getElementById('dialog-kicker').textContent=a.headline;
    document.getElementById('dialog-title').textContent=a.title;
    document.getElementById('dialog-agenda').textContent=a.agenda;
    document.getElementById('dialog-description').textContent=a.description;
    const roles=document.getElementById('dialog-roles');roles.replaceChildren(fillRole('USG',a.usg),fillRole('ACAS',a.acas));
    dlg.showModal();document.body.classList.add('dialog-open');
  }
  function closeAcademy(){if(dlg.open)dlg.close();}
  closeDlg.addEventListener('click',closeAcademy);
  dlg.addEventListener('click',e=>{if(e.target===dlg)closeAcademy();});
  dlg.addEventListener('close',()=>{document.body.classList.remove('dialog-open');selectedCard?.focus({preventScroll:true});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){setMenu(false);} });
  let revealObserver;
  function initReveals(root=document){
    const nodes=root.querySelectorAll('.reveal:not(.reveal-ready)');
    if(prefersReduced||!('IntersectionObserver' in window)){nodes.forEach(n=>n.classList.add('reveal-ready','is-visible'));return;}
    if(!revealObserver){revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:0.08,rootMargin:'0px 0px -25px 0px'});}
    nodes.forEach(n=>{n.classList.add('reveal-ready');revealObserver.observe(n);});
  }
  function updateScroll(){const scroll=window.scrollY;header.classList.toggle('is-scrolled',scroll>36);const range=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform='scaleX('+(range>0?Math.min(1,scroll/range):0)+')';scrollScheduled=false;}
  window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  renderFilters();renderAcademies();initReveals();updateScroll();
})();
