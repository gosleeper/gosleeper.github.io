(() => {
  'use strict';
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  const counter = document.querySelector('[data-visitors]');
  if (counter) {
    const key = 'gosleeper_visitors_v2';
    let value = Number.parseInt(localStorage.getItem(key), 10);
    value = Number.isFinite(value) ? value + 1 : 2026;
    try { localStorage.setItem(key, String(value)); } catch (_) {}
    const digits = String(value).padStart(6, '0');
    const segments = {0:'abcdef',1:'bc',2:'abged',3:'abgcd',4:'fbgc',5:'afgcd',6:'afgecd',7:'abc',8:'abcdefg',9:'abcdfg'};
    counter.innerHTML = '';
    digits.split('').forEach(digit => {
      const cell = document.createElement('span'); cell.className = 's7';
      'abcdefg'.split('').forEach(name => { const bar=document.createElement('i'); bar.className=`${name} ${segments[digit].includes(name)?'on':''}`; cell.appendChild(bar); });
      counter.appendChild(cell);
    });
    const number = document.querySelector('[data-visitor-number]'); if (number) number.textContent = value;
  }

  const form = document.querySelector('[data-guestbook-form]');
  if (form) {
    const key = 'gosleeper_guestbook_v2';
    const list = document.querySelector('[data-guestbook-list]');
    const count = document.querySelector('[data-guestbook-count]');
    const note = document.querySelector('[data-guestbook-note]');
    let entries=[];
    try { entries=JSON.parse(localStorage.getItem(key)||'[]'); } catch (_) { entries=[]; }
    if (!Array.isArray(entries)) entries=[];
    const render = () => {
      count.textContent=String(entries.length); list.innerHTML='';
      [...entries].reverse().forEach(entry => {
        const item=document.createElement('div'); item.className='gb-item';
        item.innerHTML=`<div><span class="gb-name">${escapeHtml(entry.name)}</span><span class="gb-time">${escapeHtml(entry.date)}</span></div><p>${escapeHtml(entry.message)}</p>`;
        list.appendChild(item);
      });
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data=new FormData(form), message=String(data.get('message')||'').trim();
      if (!message) return;
      entries.push({name:String(data.get('name')||'匿名').trim()||'匿名',message:message.slice(0,500),date:new Date().toLocaleDateString('zh-CN')});
      entries=entries.slice(-50); try { localStorage.setItem(key,JSON.stringify(entries)); } catch (_) {}
      form.reset(); note.hidden=false; setTimeout(()=>{note.hidden=true;},3500); render();
    });
    render();
  }
})();
