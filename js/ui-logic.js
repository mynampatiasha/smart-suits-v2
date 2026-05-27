// ═══════════════════════════════════════════════════
//  SMART SUITS — CANVAS COLORIZATION ENGINE
// ═══════════════════════════════════════════════════

// ─── 55 FABRIC COLOURS ──────────────────────────────
const FABRICS = [
  {id:'Navy Blue',        hex:'#1a2a40'},{id:'Charcoal Grey',    hex:'#3a3a3a'},
  {id:'Jet Black',        hex:'#111111'},{id:'Ivory Cream',      hex:'#f5f0e8'},
  {id:'Warm Beige',       hex:'#c2b280'},{id:'Burgundy Red',     hex:'#601A24'},
  {id:'Olive Green',      hex:'#3A4B35'},{id:'Emerald Green',    hex:'#1a5c3a'},
  {id:'Royal Blue',       hex:'#0b3482'},{id:'Light Grey',       hex:'#b0b0b0'},
  {id:'Dark Brown',       hex:'#4a3728'},{id:'Rust Orange',      hex:'#8b4513'},
  {id:'Deep Teal',        hex:'#005f5f'},{id:'Plum Purple',      hex:'#4a0e4e'},
  {id:'Mustard Yellow',   hex:'#c9a22b'},{id:'Crimson Red',      hex:'#a31020'},
  {id:'Slate Blue',       hex:'#4a5a8a'},{id:'Deep Indigo',      hex:'#3b006a'},
  {id:'Dark Maroon',      hex:'#6a0010'},{id:'Camel Brown',      hex:'#c19a6b'},
  {id:'Ice Blue',         hex:'#a8c8e8'},{id:'Forest Green',     hex:'#228B22'},
  {id:'Chocolate Brown',  hex:'#3D1C02'},{id:'Midnight Blue',    hex:'#191970'},
  {id:'Stone Grey',       hex:'#928e85'},{id:'Taupe',            hex:'#8B7355'},
  {id:'Dusty Rose',       hex:'#c17f7f'},{id:'Cobalt Blue',      hex:'#0047AB'},
  {id:'Bottle Green',     hex:'#006A4E'},{id:'Ash Grey',         hex:'#B2BEB5'},
  {id:'Burnt Sienna',     hex:'#8B4726'},{id:'Steel Blue',       hex:'#4682B4'},
  {id:'Wine Red',         hex:'#722F37'},{id:'Sage Green',       hex:'#87A878'},
  {id:'Cognac Brown',     hex:'#9A4522'},{id:'Dark Olive',       hex:'#556B2F'},
  {id:'Champagne',        hex:'#f7e7ce'},{id:'Violet',           hex:'#7F00FF'},
  {id:'Hunter Green',     hex:'#355E3B'},{id:'Mahogany',         hex:'#C04000'},
  {id:'Prussian Blue',    hex:'#003153'},{id:'Pearl Grey',       hex:'#C5C6C7'},
  {id:'Amber',            hex:'#FFBF00'},{id:'Copper',           hex:'#B87333'},
  {id:'Terracotta',       hex:'#CC4E2A'},{id:'Lagoon Blue',      hex:'#007BA7'},
  {id:'Pine Green',       hex:'#01796F'},{id:'Ruby Red',         hex:'#9B111E'},
  {id:'Sand',             hex:'#C2B280'},{id:'Graphite',         hex:'#464646'},
  {id:'Military Green',   hex:'#4A5240'},{id:'Cinnamon',         hex:'#7B3F00'},
  {id:'Blush Pink',       hex:'#DE8C9D'},{id:'Turquoise',        hex:'#30D5C8'}
];

// Helper to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {r: 0, g: 0, b: 0};
}

// ─── STYLE DATA ──────────────────────────────────────
const JACKET_STYLES = [
  {id:'Notch 2-Button',     img:'assets/j1_notch_2btn.png', sub:'Single Breasted'},
  {id:'Peak 2-Button',      img:'assets/j2_peak_2btn.png',  sub:'Formal Sharp'},
  {id:'Shawl 1-Button',     img:'assets/j3_shawl_1btn.png', sub:'Tuxedo'},
  {id:'Double Breasted 4',  img:'assets/j4_dbl_4btn.png',   sub:'4 Buttons'},
  {id:'Double Breasted 6',  img:'assets/j5_dbl_6btn.png',   sub:'6 Buttons'},
  {id:'Notch 3-Button',     img:'assets/j6_notch_3btn.png', sub:'Traditional'},
  {id:'Peak 1-Button Slim', img:'assets/j7_peak_1btn.png',  sub:'Modern Slim'}
];
const PANT_STYLES = [
  {id:'Slim Flat Front', img:'assets/p1_slim_flat.png',     sub:'Modern Tapered'},
  {id:'Regular Pleat',   img:'assets/p2_regular_pleat.png', sub:'Double Pleat'},
  {id:'Wide Leg Cuffed', img:'assets/p3_wide_cuff.png',     sub:'Turned Cuffs'}
];
const VEST_STYLES = [
  {id:'V-Neck 5 Btn', img:'assets/v1_vneck_5btn.png', sub:'Standard'},
  {id:'V-Neck 4 Btn', img:'assets/v1_vneck_5btn.png', sub:'Shorter Length'},
  {id:'V-Neck 6 Btn', img:'assets/v1_vneck_5btn.png', sub:'Full Length'}
];

const LINING_OPTIONS = [
  {val:'Matching Fabric',       icon:'🟤', desc:'Same as outer fabric'},
  {val:'Classic Red Silk',      icon:'🔴', desc:'Bold red interior'},
  {val:'Royal Gold Silk',       icon:'🟡', desc:'Luxury gold shimmer'},
  {val:'Royal Blue Silk',       icon:'🔵', desc:'Classic contrast'},
  {val:'Black Silk',            icon:'⬛', desc:'Sleek and elegant'},
  {val:'White Silk',            icon:'⬜', desc:'Clean & bright'},
  {val:'Paisley Print',         icon:'🎨', desc:'Traditional Indian print'},
  {val:'Houndstooth',           icon:'◼◻', desc:'Classic check pattern'},
  {val:'Silver Grey Silk',      icon:'🪨', desc:'Modern minimalist'},
  {val:'Emerald Silk',          icon:'💚', desc:'Vibrant emerald'},
  {val:'Burgundy Silk',         icon:'🍷', desc:'Rich wine tone'},
  {val:'Navy Stripe',           icon:'🔷', desc:'Pinstripe navy'},
  {val:'Champagne Satin',       icon:'🥂', desc:'Elegant off-white'},
  {val:'Purple Silk',           icon:'🟣', desc:'Regal purple'}
];

// ─── STATE ───────────────────────────────────────────
const S = {
  garment:'3-Piece Suit', fabric:'Navy Blue', hex:'#1a2a40',
  pantFabric:'Same as Jacket', pantHex:'',
  vestFabric:'Same as Jacket', vestHex:'',
  jacketStyle:'Notch 2-Button', jacketLapel:'Notch Lapel',
  jacketPocket:'Flap Pockets',  jacketVent:'Side Vents',
  pantFit:'Slim Flat Front',    pantPleat:'Flat Front', pantHem:'Standard Hem',
  vestNeck:'V-Neck 5 Btn',      vestButtons:'5 Buttons',
  lining:'Matching Fabric',     monogram:'',
  name:'', email:'', customerPhone:'', height:'', weight:'', chest:'', waist:'', shoulder:'', sleeve:'', inseam:'', deliveryDays:''
};

let previewMode = 'all';
let curIdx = 0;

// ─── CANVAS COLORIZATION ENGINE ─────────────────────
const imgCache = {};

function getAssetSrc(srcPath) {
  const filename = srcPath.split('/').pop();
  return typeof ASSETS !== 'undefined' && ASSETS[filename] ? ASSETS[filename] : srcPath;
}

function loadImg(src, cb) {
  const realSrc = getAssetSrc(src);
  if (imgCache[realSrc]) {
    cb(imgCache[realSrc]);
    return;
  }
  const img = new Image();
  img.onload = () => {
    imgCache[realSrc] = img;
    cb(img);
  };
  img.src = realSrc;
}

function colorizeCanvas(canvasEl, imgSrc, targetHex) {
  if (!canvasEl) return;
  loadImg(imgSrc, (img) => {
    const w = img.naturalWidth || img.width || 800;
    const h = img.naturalHeight || img.height || 800;
    canvasEl.width = w;
    canvasEl.height = h;
    
    const ctx = canvasEl.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const targetColor = hexToRgb(targetHex);
    
    // 1. Flood fill from edges to find "outside" background
    // We assume pixels close to white (e.g. > 240) are background.
    const isBgColor = (i) => data[i]>240 && data[i+1]>240 && data[i+2]>240;
    const visited = new Uint8Array(w * h);
    const stack = [];
    
    // Seed edges
    for(let x=0; x<w; x++){
      if(isBgColor((x)*4)){ stack.push(x); visited[x] = 1; }
      if(isBgColor(((h-1)*w + x)*4)){ stack.push((h-1)*w + x); visited[(h-1)*w + x] = 1; }
    }
    for(let y=0; y<h; y++){
      if(isBgColor((y*w)*4)){ stack.push(y*w); visited[y*w] = 1; }
      if(isBgColor((y*w + w-1)*4)){ stack.push(y*w + w-1); visited[y*w + w-1] = 1; }
    }
    
    // Flood fill
    while(stack.length > 0) {
      const p = stack.pop();
      const x = p % w;
      const y = Math.floor(p / w);
      
      const neighbors = [
        p - w, // up
        p + w, // down
        (x > 0) ? p - 1 : -1, // left
        (x < w - 1) ? p + 1 : -1 // right
      ];
      
      for(let n of neighbors) {
        if(n >= 0 && n < w*h && visited[n] === 0) {
          if(isBgColor(n*4)) {
            visited[n] = 1;
            stack.push(n);
          } else {
            visited[n] = 2; // Not background
          }
        }
      }
    }
    
    // 2. Apply color
    for (let i = 0; i < w * h; i++) {
      const p = i * 4;
      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];
      const a = data[p + 3];
      
      if (a === 0) continue;
      
      if (visited[i] === 1) {
        // Outside background -> transparent
        data[p + 3] = 0;
      } else {
        // Inside garment -> colorize
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Multiply effect for the fabric
        // For white areas (fill), luminance is ~1 -> full target color
        // For black lines, luminance is ~0 -> preserve dark lines
        
        let newR = targetColor.r * luminance;
        let newG = targetColor.g * luminance;
        let newB = targetColor.b * luminance;
        
        // Preserve dark line contrast
        if (luminance < 0.3) {
          // Dark lines: mix with original dark grey
          const factor = luminance / 0.3;
          newR = newR * factor + r * (1 - factor);
          newG = newG * factor + g * (1 - factor);
          newB = newB * factor + b * (1 - factor);
        }
        
        data[p]     = newR;
        data[p + 1] = newG;
        data[p + 2] = newB;
      }
    }
    
    ctx.putImageData(imgData, 0, 0);
  });
}


// ─── STEPS ───────────────────────────────────────────
const ALL_STEPS = [
  'garment','fabric',
  'jacket-style','jacket-lapel','jacket-pocket','jacket-vent',
  'pant-fabric','pant-fit','pant-pleat','pant-hem',
  'vest-fabric','vest-neck','vest-buttons',
  'lining','monogram','measurements'
];
function activeSteps(){
  return ALL_STEPS.filter(id => {
    if(id.startsWith('jacket') && S.garment==='Pants Only')  return false;
    if(id.startsWith('vest')   && S.garment!=='3-Piece Suit')return false;
    if(id.startsWith('pant')   && S.garment==='Jacket Only') return false;
    if(id==='pant-fabric'      && S.garment==='Pants Only') return false; // Main fabric handles pants only
    if((id==='lining'||id==='monogram') && S.garment==='Pants Only') return false;
    return true;
  });
}

// ─── NAVIGATION ──────────────────────────────────────
function goStep(id){
  const steps = activeSteps();
  const idx = steps.indexOf(id);
  if(idx !== -1) curIdx = idx;
  renderStep(id);
  highlightNav(id);
  updateFooter();
}
function stepNext(){ const s=activeSteps(); if(curIdx<s.length-1){curIdx++;goStep(s[curIdx]);} }
function stepBack(){ if(curIdx>0){curIdx--;goStep(activeSteps()[curIdx]);} }

function highlightNav(id){
  document.querySelectorAll('.snav-item,.snav-leaf').forEach(el=>el.classList.remove('active'));
  const el = document.getElementById('snav-'+id);
  if(el) el.classList.add('active');
}
function toggleGrp(subId,btn){
  const sub=document.getElementById(subId); if(!sub)return;
  const open=sub.classList.toggle('open');
  btn.classList.toggle('open',open);
}
function updateGroups(){
  const t=S.garment;
  function show(id,v){const el=document.getElementById(id);if(el)el.style.display=v?'':'none';}
  show('grp-jacket',  t!=='Pants Only');
  show('grp-pant',    t!=='Jacket Only');
  show('grp-vest',    t==='3-Piece Suit');
  show('grp-contrast',t!=='Pants Only');
}
function updateFooter(){
  const steps=activeSteps();
  const pct=((curIdx+1)/steps.length*100).toFixed(0);
  document.getElementById('ftr-bar').style.width=pct+'%';
  document.getElementById('ftr-counter').textContent=`Step ${curIdx+1} of ${steps.length}`;
  
  const nextBtn = document.querySelector('.next-btn');
  if(curIdx === steps.length - 1) {
    nextBtn.textContent = '✔ SEND ORDER';
    nextBtn.onclick = sendOrder;
    nextBtn.style.background = '#111';
    nextBtn.style.color = 'var(--gold)';
    nextBtn.style.border = '1px solid var(--gold)';
  } else {
    nextBtn.textContent = 'NEXT ►';
    nextBtn.onclick = stepNext;
    nextBtn.style.background = '#1565c0';
    nextBtn.style.color = '#fff';
    nextBtn.style.border = 'none';
  }
}

// ─── PREVIEW ─────────────────────────────────────────
function setView(mode,btn){
  previewMode=mode;
  document.querySelectorAll('.vbtn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  updatePreview();
}
function syncView(mode){
  previewMode=mode;
  document.querySelectorAll('.vbtn').forEach(b=>b.classList.remove('active'));
  const b=document.getElementById('vbtn-'+mode);
  if(b)b.classList.add('active');
}
function updatePreview(forceSrc){
  const stage = document.getElementById('prev-stage');
  if(stage) stage.style.background = `radial-gradient(ellipse at center, #f8f8f8 30%, #e0e0e0 100%)`;

  if(document.getElementById('prev-fabric-name')) document.getElementById('prev-fabric-name').textContent = S.fabric;
  if(document.getElementById('prev-color-dot')) document.getElementById('prev-color-dot').style.background = S.hex;

  const cJ = document.getElementById('prev-canvas-jacket');
  const cP = document.getElementById('prev-canvas-pant');
  const cV = document.getElementById('prev-canvas-vest');
  
  cJ.style.display = 'none'; cP.style.display = 'none'; cV.style.display = 'none';

  const pJ = JACKET_STYLES.find(x=>x.id===S.jacketStyle)?.img || 'assets/base_jacket.png';
  const pP = PANT_STYLES.find(x=>x.id===S.pantFit)?.img || 'assets/base_pant.png';
  const pV = VEST_STYLES.find(x=>x.id===S.vestNeck)?.img || 'assets/base_vest.png';

  if (previewMode === 'all') {
    let parts = 1;
    if (S.garment === '3-Piece Suit') {
      cJ.style.display = 'block'; cP.style.display = 'block'; cV.style.display = 'block';
      parts = 3;
    } else if (S.garment === '2-Piece Suit') {
      cJ.style.display = 'block'; cP.style.display = 'block';
      parts = 2;
    } else if (S.garment === 'Jacket Only') {
      cJ.style.display = 'block'; parts = 1;
    } else if (S.garment === 'Pants Only') {
      cP.style.display = 'block'; parts = 1;
    }
    
    // Adjust sizes to fit
    const sz = parts === 3 ? '45%' : parts === 2 ? '55%' : '92%';
    [cJ, cP, cV].forEach(c => { c.style.maxWidth = sz; c.style.maxHeight = sz; });
    
    const pHex = (S.pantFabric === 'Same as Jacket' || !S.pantHex) ? S.hex : S.pantHex;
    const vHex = (S.vestFabric === 'Same as Jacket' || !S.vestHex) ? S.hex : S.vestHex;
    
    if(cJ.style.display === 'block') colorizeCanvas(cJ, pJ, S.hex);
    if(cP.style.display === 'block') colorizeCanvas(cP, pP, pHex);
    if(cV.style.display === 'block') colorizeCanvas(cV, pV, vHex);
    
  } else {
    // Single mode
    [cJ, cP, cV].forEach(c => { c.style.maxWidth = '92%'; c.style.maxHeight = '92%'; });
    
    const pHex = (S.pantFabric === 'Same as Jacket' || !S.pantHex) ? S.hex : S.pantHex;
    const vHex = (S.vestFabric === 'Same as Jacket' || !S.vestHex) ? S.hex : S.vestHex;
    
    if(previewMode==='pant'){ 
      cP.style.display='block'; colorizeCanvas(cP, forceSrc||pP, pHex); 
    }
    else if(previewMode==='vest'){ 
      cV.style.display='block'; colorizeCanvas(cV, forceSrc||pV, vHex); 
    }
    else { 
      cJ.style.display='block'; colorizeCanvas(cJ, forceSrc||pJ, S.hex); 
    }
  }
}
function updateSummary(){
  document.getElementById('s-garment').textContent = S.garment;
  document.getElementById('s-fabric').textContent  = S.fabric;
  document.getElementById('s-jacket').textContent  = S.jacketStyle;
  document.getElementById('s-pant').textContent    = S.pantFit;
  document.getElementById('s-vest').textContent    = S.vestNeck;
}

// ─── STEP META ───────────────────────────────────────
const META = {
  'garment':       {badge:'STEP 1', title:'WHAT ARE YOU DESIGNING?',   desc:'Select the garment pieces you want to customise.'},
  'fabric':        {badge:'STEP 2', title:'CHOOSE MAIN FABRIC',        desc:'This fabric applies to your jacket (and the full suit by default).'},
  'jacket-style':  {badge:'JACKET', title:'CHOOSE JACKET STYLE',       desc:'Select button layout and silhouette.'},
  'jacket-lapel':  {badge:'JACKET', title:'LAPEL STYLE',               desc:'The lapel defines the character of your jacket.'},
  'jacket-pocket': {badge:'JACKET', title:'POCKET STYLE',              desc:'Pocket style adds subtle detail to the jacket.'},
  'jacket-vent':   {badge:'JACKET', title:'BACK VENT',                 desc:'The vent affects movement and drape.'},
  'pant-fabric':   {badge:'PANT',   title:'PANT FABRIC (MIX & MATCH)', desc:'Choose a matching or contrasting colour for your trousers.'},
  'pant-fit':      {badge:'PANT',   title:'CHOOSE PANT FIT',           desc:'Select the silhouette and fit of your trousers.'},
  'pant-pleat':    {badge:'PANT',   title:'PLEAT STYLE',               desc:'Front pleats affect comfort and drape.'},
  'pant-hem':      {badge:'PANT',   title:'BOTTOM HEM / CUFFS',        desc:'The hem finish at the trouser bottom.'},
  'vest-fabric':   {badge:'VEST',   title:'VEST FABRIC (MIX & MATCH)', desc:'Choose a matching or contrasting colour for your waistcoat.'},
  'vest-neck':     {badge:'VEST',   title:'VEST NECKLINE',             desc:'Choose the neckline shape of your waistcoat.'},
  'vest-buttons':  {badge:'VEST',   title:'VEST BUTTONS',              desc:'Number of buttons on the vest front.'},
  'lining':        {badge:'EXTRAS', title:'INNER LINING',              desc:'Choose the lining colour inside the jacket.'},
  'monogram':      {badge:'EXTRAS', title:'CUSTOM MONOGRAM',           desc:'Personalised initials stitched inside.'},
  'measurements':  {badge:'FINAL',  title:'YOUR MEASUREMENTS',         desc:'Provide your exact measurements for a perfect fit.'}
};

// ─── RENDER ──────────────────────────────────────────
function renderStep(id){
  const m = META[id]||{badge:'',title:id,desc:''};
  document.getElementById('step-badge').textContent = m.badge;
  document.getElementById('step-title').textContent = m.title;
  document.getElementById('step-desc').textContent  = m.desc;
  const body = document.getElementById('content-body');
  body.innerHTML='';

  if(id==='garment')       renderGarment(body);
  else if(id==='fabric')   renderFabric(body, 'fabric', 'hex', 'jacket');
  else if(id==='pant-fabric') renderFabric(body, 'pantFabric', 'pantHex', 'pant');
  else if(id==='vest-fabric') renderFabric(body, 'vestFabric', 'vestHex', 'vest');
  else if(id==='jacket-style') renderStyleGrid(body,JACKET_STYLES,'jacketStyle','jacket');
  else if(id==='pant-fit')     renderStyleGrid(body,PANT_STYLES,'pantFit','pant');
  else if(id==='vest-neck')    renderStyleGrid(body,VEST_STYLES,'vestNeck','vest');
  else if(id==='jacket-lapel') renderTextGrid(body,'jacketLapel',[
    {val:'Notch Lapel',icon:'👔',desc:'Classic / Standard'},
    {val:'Peak Lapel', icon:'🕴️',desc:'Formal / Sharp Points'},
    {val:'Shawl Lapel',icon:'🤵',desc:'Tuxedo / Elegant'}]);
  else if(id==='jacket-pocket') renderTextGrid(body,'jacketPocket',[
    {val:'Flap Pockets',   icon:'🟫',desc:'Classic with cover flap'},
    {val:'Jetted / Welt',  icon:'➖',desc:'Formal, clean look'},
    {val:'Patch Pockets',  icon:'⬜',desc:'Casual style'},
    {val:'Ticket Pocket',  icon:'➕',desc:'Extra small ticket pocket'},
    {val:'Hacking Pocket', icon:'◇',desc:'Angled flap pocket'}]);
  else if(id==='jacket-vent') renderTextGrid(body,'jacketVent',[
    {val:'No Vent',     icon:'🚫',desc:'European / Italian style'},
    {val:'Center Vent', icon:'|', desc:'American classic'},
    {val:'Side Vents',  icon:'||',desc:'British style'}]);
  else if(id==='pant-pleat') renderTextGrid(body,'pantPleat',[
    {val:'Flat Front',   icon:'━',desc:'Clean & modern'},
    {val:'Single Pleat', icon:'|',desc:'Extra room at front'},
    {val:'Double Pleat', icon:'||',desc:'Classic formal style'}]);
  else if(id==='pant-hem') renderTextGrid(body,'pantHem',[
    {val:'Standard Hem', icon:'📏',desc:'Clean finished edge'},
    {val:'Turned Cuffs', icon:'🔄',desc:'Folded cuffs at bottom'},
    {val:'Raw Hem',      icon:'✂️',desc:'Deconstructed / casual'}]);
  else if(id==='vest-buttons') renderTextGrid(body,'vestButtons',[
    {val:'4 Buttons',icon:'⬤⬤⬤⬤',desc:'Shorter vest'},
    {val:'5 Buttons',icon:'⬤⬤⬤⬤⬤',desc:'Standard length'},
    {val:'6 Buttons',icon:'⬤⬤⬤⬤⬤⬤',desc:'Full length'}]);
  else if(id==='lining') renderTextGrid(body,'lining',LINING_OPTIONS);
  else if(id==='monogram') body.innerHTML=`<div class="form-wrap"><div class="form-section"><h3>Custom Monogram</h3>
    <div class="form-group" style="max-width:260px;"><label>Your Initials (e.g. J.D.S)</label>
    <input type="text" maxlength="5" placeholder="e.g. J.D." value="${S.monogram}" oninput="S.monogram=this.value"></div>
    <p style="font-size:11px;color:#888;margin-top:8px;">Leave blank if not required.</p></div></div>`;
  else if(id==='measurements') {
    renderMeasurements(body);
    syncView('all');
  }

  updatePreview();
  updateSummary();
}

function renderGarment(body){
  const opts=[
    {val:'3-Piece Suit',icon:'🕴️',label:'3-Piece Suit', sub:'Jacket + Pant + Vest'},
    {val:'2-Piece Suit',icon:'👔',label:'2-Piece Suit', sub:'Jacket + Pant'},
    {val:'Jacket Only', icon:'🧥',label:'Jacket Only',  sub:'Blazer / Sport Coat'},
    {val:'Pants Only',  icon:'👖',label:'Pants Only',   sub:'Trousers Only'}
  ];
  const grid=document.createElement('div'); grid.className='garment-grid';
  opts.forEach(o=>{
    const c=document.createElement('div');
    c.className='g-card'+(S.garment===o.val?' sel':'');
    c.innerHTML=`<div class="g-icon">${o.icon}</div><div class="g-label">${o.label}</div><div class="g-sub">${o.sub}</div>`;
    c.onclick=()=>{
      S.garment=o.val;
      document.querySelectorAll('.g-card').forEach(el=>el.classList.remove('sel'));
      c.classList.add('sel');
      updateGroups();
      syncView(S.garment === 'Pants Only' ? 'pant' : 'all');
      updatePreview();
      updateSummary();
      updateFooter();
    };
    grid.appendChild(c);
  });
  body.appendChild(grid);
}

function renderFabric(body, idKey='fabric', hexKey='hex', mode='jacket'){
  const sw=document.createElement('div'); sw.className='search-wrap';
  sw.innerHTML=`<input type="text" placeholder="Search colour (e.g. Navy, Burgundy, Teal, Black)..." oninput="filterFabrics(this.value)">`;
  body.appendChild(sw);
  const grid=document.createElement('div'); grid.className='fabric-grid'; grid.id='fabric-grid';
  
  if(idKey !== 'fabric') {
    const c=document.createElement('div');
    c.className='f-card'+(S[idKey]==='Same as Jacket'?' sel':'');
    c.setAttribute('data-name','same as jacket default match');
    c.innerHTML=`<div class="f-swatch" style="background:linear-gradient(45deg, #eee, #ccc)"></div><div class="f-name">Same as Jacket</div>`;
    c.onclick=()=>{
      S[idKey]='Same as Jacket'; S[hexKey]='';
      document.querySelectorAll('.f-card').forEach(el=>el.classList.remove('sel'));
      c.classList.add('sel');
      updatePreview();
      updateSummary();
    };
    grid.appendChild(c);
  }

  FABRICS.forEach(f=>{
    const c=document.createElement('div');
    c.className='f-card'+(S[idKey]===f.id?' sel':'');
    c.setAttribute('data-name',f.id.toLowerCase());
    c.innerHTML=`<div class="f-swatch" style="background:${f.hex}"></div><div class="f-name">${f.id}</div>`;
    c.onclick=()=>{
      S[idKey]=f.id; S[hexKey]=f.hex;
      document.querySelectorAll('.f-card').forEach(el=>el.classList.remove('sel'));
      c.classList.add('sel');
      
      if(idKey === 'fabric') {
        if(document.getElementById('prev-fabric-name')) document.getElementById('prev-fabric-name').textContent=S.fabric;
        if(document.getElementById('prev-color-dot')) document.getElementById('prev-color-dot').style.background=S.hex;
        
        document.querySelectorAll('.s-card canvas').forEach(canvas => {
          const src = canvas.getAttribute('data-src');
          if(src) colorizeCanvas(canvas, src, S.hex);
        });
      }
      
      updatePreview();
      updateSummary();
    };
    grid.appendChild(c);
  });
  body.appendChild(grid);
}
function filterFabrics(q){
  document.querySelectorAll('#fabric-grid .f-card').forEach(c=>{
    c.style.display=c.getAttribute('data-name').includes(q.toLowerCase())?'':'none';
  });
}

function renderStyleGrid(body,list,stateKey,viewMode){
  syncView(viewMode);
  const grid=document.createElement('div'); grid.className='style-grid';
  list.forEach(item=>{
    const c=document.createElement('div');
    c.className='s-card'+(S[stateKey]===item.id?' sel':'');
    
    const canvas = document.createElement('canvas');
    canvas.setAttribute('data-src', item.img); // Save src for recoloring later
    colorizeCanvas(canvas, item.img, S.hex); // Initial colorization
    
    const check=document.createElement('span'); check.className='sc-check'; check.textContent='✔';
    const name=document.createElement('div'); name.className='sc-name';
    name.innerHTML=`${item.id}<br><span>${item.sub}</span>`;
    
    c.appendChild(check); c.appendChild(canvas); c.appendChild(name);
    c.onclick=()=>{
      S[stateKey]=item.id;
      document.querySelectorAll('.s-card').forEach(el=>el.classList.remove('sel'));
      c.classList.add('sel');
      previewMode=viewMode;
      updatePreview(item.img);
      updateSummary();
    };
    grid.appendChild(c);
  });
  body.appendChild(grid);
}

function renderTextGrid(body,stateKey,opts){
  const grid=document.createElement('div'); grid.className='text-grid';
  opts.forEach(o=>{
    const c=document.createElement('div');
    c.className='t-card'+(S[stateKey]===o.val?' sel':'');
    c.innerHTML=`<div class="t-icon">${o.icon}</div><div class="t-label">${o.val}</div><div class="t-desc">${o.desc}</div>`;
    c.onclick=()=>{
      S[stateKey]=o.val;
      document.querySelectorAll('.t-card').forEach(el=>el.classList.remove('sel'));
      c.classList.add('sel');
    };
    grid.appendChild(c);
  });
  body.appendChild(grid);
}

function renderMeasurements(body){
  const w=document.createElement('div'); w.className='form-wrap';
  w.innerHTML=`
  <div class="form-section"><h3>Contact Details</h3>
    <div class="form-row">
      <div class="form-group"><label>Full Name *</label><input type="text" placeholder="John Smith" value="${S.name}" oninput="S.name=this.value"></div>
      <div class="form-group"><label>Email Address *</label><input type="email" placeholder="john@example.com" value="${S.email}" oninput="S.email=this.value"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Phone Number *</label><input type="tel" placeholder="+1 234 567 8900" value="${S.customerPhone}" oninput="S.customerPhone=this.value"></div>
    </div>
  </div>
  <div class="form-section"><h3>Body Measurements (cm)</h3>
    <div class="form-row">
      <div class="form-group"><label>Height *</label><input type="number" placeholder="175" value="${S.height}" oninput="S.height=this.value"></div>
      <div class="form-group"><label>Weight (kg)</label><input type="number" placeholder="70" value="${S.weight}" oninput="S.weight=this.value"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Chest *</label><input type="number" placeholder="100" value="${S.chest}" oninput="S.chest=this.value"></div>
      <div class="form-group"><label>Waist *</label><input type="number" placeholder="85" value="${S.waist}" oninput="S.waist=this.value"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Shoulder *</label><input type="number" placeholder="45" value="${S.shoulder}" oninput="S.shoulder=this.value"></div>
      <div class="form-group"><label>Sleeve *</label><input type="number" placeholder="62" value="${S.sleeve}" oninput="S.sleeve=this.value"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Pant Inseam *</label><input type="number" placeholder="80" value="${S.inseam}" oninput="S.inseam=this.value"></div>
      <div class="form-group"><label>Delivery In (Days) *</label><input type="number" placeholder="e.g. 14" value="${S.deliveryDays}" oninput="S.deliveryDays=this.value"></div>
    </div>
  </div>`;
  body.appendChild(w);
}

// ─── INIT ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  updateGroups();
  goStep('garment');
});
