import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const { marked } = createRequire(import.meta.url)('marked');
const root = path.resolve('.');
const out = path.join(root, 'docs');
const siteUrl = 'https://gosleeper.github.io';
const email = 'kekun4txzs@163.com';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const xml = value => String(value ?? '').replace(/[<>&"']/g, char => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[char]));
const write = (relative, content) => {
  const file = path.join(out, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
};
const frontmatter = source => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const data = {};
  if (match) for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([\w-]+):\s*(.*)$/);
    if (field) data[field[1]] = field[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return { data, body: match ? source.slice(match[0].length) : source };
};

const posts = fs.readdirSync('_posts').filter(file => file.endsWith('.md')).map(file => {
  const filename = file.match(/^(\d{4})-(\d+)-(\d+)-(.+)\.md$/);
  const { data, body } = frontmatter(fs.readFileSync(path.join('_posts', file), 'utf8'));
  const date = `${filename[1]}-${filename[2].padStart(2,'0')}-${filename[3].padStart(2,'0')}`;
  const slug = filename[4];
  const html = marked.parse(body);
  const text = html.replace(/<pre[\s\S]*?<\/pre>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  return {
    title: data.title || slug, author: data.author || '王耀祖', tag: data.tags || '随笔',
    date, slug, url: `/${date.replaceAll('-','/')}/${slug}.html`, html, excerpt: text.slice(0, 118)
  };
}).sort((a,b) => b.date.localeCompare(a.date));

const projects = [
  { name:'Song Psyche', tech:'AI / SPRING / PRODUCT', desc:'歌曲情绪分析项目，把自然语言处理做成可以真实体验的产品。', url:'https://gosleeper.github.io/song-psyche/' },
  { name:'InfiniteChat', tech:'JAVA / DOCKER', desc:'围绕消息、联系人、动态与实时通信拆分的系统实验。', url:'https://github.com/gosleeper/InfiniteChat-ai' },
  { name:'Traffic Forecast', tech:'AI / TRAFFIC', desc:'交通流预测与事故影响分析，强调可验证的数据流程和工程落地。', url:'https://github.com/gosleeper' },
  { name:'AI Tool Radar', tech:'AI / DISCOVERY', desc:'筛选、评估和收藏 AI 工具的个人发现系统。', url:'https://github.com/gosleeper' }
];

const tickerText = '★★★★★ 欢迎来到王耀祖的主页 ★★★★★ 这里放技术笔记、项目复盘、生活碎片和偶尔想明白的事 ★★★★★ 页面很复古，内容尽量是真的 ★★★★★ 本站无广告、无追踪，访客计数只存在你的浏览器里 ★★★★★';
const head = (title, description, canonicalPath='/') => `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="author" content="王耀祖"><meta name="theme-color" content="#292929"><link rel="canonical" href="${siteUrl}${canonicalPath}"><link rel="icon" href="/assets/img/wang-yaozu-icon.png"><link rel="alternate" type="application/rss+xml" title="王耀祖的主页 RSS" href="/rss.xml"><title>${esc(title)}</title><link rel="stylesheet" href="/assets/css/web1.css"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"王耀祖","alternateName":"gosleeper","url":"${siteUrl}","email":"mailto:${email}","sameAs":["https://github.com/gosleeper"]}</script></head><body><a class="skip" href="#main">跳到正文</a><div class="page">`;
const header = current => `<div class="ticker" role="status"><div class="ticker-track"><span>${tickerText}</span><span aria-hidden="true">${tickerText}</span></div></div><header class="masthead"><span class="sticker">NEW! v18.0</span><h1><span class="name">王耀祖</span><span class="home">的主页</span><span class="mark">◎</span></h1><p class="sub">gosleeper.github.io —— 写代码，也写代码之外的事。</p><p class="sig">站长：<b>王耀祖</b> / gosleeper ｜ 状态：<b>仍在构建</b> ｜ 本站无广告、无追踪、无 Cookie 弹窗</p></header><nav class="nav" aria-label="主导航"><a href="/" ${current==='home'?'aria-current="page"':''}>首页</a><span class="sep">|</span><a href="/#log">日志</a><span class="sep">|</span><a href="/tags.html" ${current==='tags'?'aria-current="page"':''}>索引</a><span class="sep">|</span><a href="/#projects">项目</a><span class="sep">|</span><a href="/#guestbook">留言板</a><span class="sep">|</span><a href="https://github.com/gosleeper">GitHub ↗</a></nav>`;
const sidebar = `<aside class="sidebar" aria-label="站点侧栏"><section class="box pink"><h2 class="btitle">☞ 关于站长</h2><div class="bbody"><img class="avatar" src="/assets/img/wang-yaozu-id.png" alt="王耀祖的个人标识">王耀祖，网上叫 gosleeper。<br>做后端、AI 和交通数据相关项目，也维护一些自己想长期使用的小工具。<br><br>这个网站用来保存真实产出，不负责把人包装成完美履历。<br><br>座右铭：先跑起来，再把它讲明白。<span class="cursor"></span><div style="clear:both"></div></div></section><section class="box dark"><h2 class="btitle">VISITORS COUNTER</h2><div class="bbody"><p>你是本机记录的第 <span data-visitor-number>----</span> 次访问</p><div class="s7host" data-visitors aria-label="本地访问次数"></div><p class="visit-line">计数只保存在你的浏览器，不上传服务器。</p><p class="visit-joke">数字很大不代表人多，可能只是你很喜欢刷新。</p></div></section><section class="box blue"><h2 class="btitle">◎ 当前状态</h2><div class="bbody"><strong>正在维护：个人长期输出平台</strong><p class="small mono">MODE: BUILD / WRITE / REPEAT</p><p>旧文章会保留，新项目会逐步补上说明、截图和复盘。</p></div></section><section class="box yellow"><h2 class="btitle">▶ 公告栏</h2><div class="bbody"><ul class="notice"><li><time>2026-08-14</time> 主页切换为 Web 1.0 风格，拒绝千篇一律。</li><li><time>2026-08-13</time> 博客迁移为原生 HTML 构建。</li><li><time>2022-12-29</time> 最早一批公开笔记留下来了。</li></ul></div></section><section class="box green"><h2 class="btitle">☞ 站长的项目</h2><div class="bbody"><ul class="project-mini">${projects.map(p=>`<li><a href="${p.url}"><strong>${p.name}</strong></a><small>${p.tech}</small></li>`).join('')}</ul></div></section><section class="box yellow"><h2 class="btitle">◎ 固定入口</h2><div class="bbody"><ul class="link-list"><li><a href="https://github.com/gosleeper">GitHub 主页</a></li><li><a href="/tags.html">文章索引</a></li><li><a href="/rss.xml">RSS 订阅</a></li><li><a href="mailto:${email}">给我发邮件</a></li></ul></div></section></aside>`;
const footer = `</div><footer class="footer"><p class="sign">© 2022—2026 王耀祖 / gosleeper</p><p>本站无 bug，只有待更新栏目；文章写得慢，项目尽量真的跑。</p><p class="tiny">版本 v18.0-web1 ｜ 原生 HTML / CSS / JavaScript ｜ <a href="mailto:${email}">${email}</a> ｜ <a href="#">回到顶部</a></p></footer></div><script src="/assets/js/web1.js"></script></body></html>`;
const page = ({ title='王耀祖的主页 · gosleeper', description='王耀祖的个人博客、技术笔记与项目记录', canonical='/', current='home', body }) => head(title,description,canonical)+header(current)+body+footer;

const postList = posts.map((post,index) => `<article class="post"><h2><a href="${post.url}">《${esc(post.title)}》</a>${index<2?'<span class="tag new">NEW</span>':''}<span class="tag">${esc(post.tag)}</span></h2><p class="post-meta">${post.date} ｜ 标签：${esc(post.tag)} ｜ 记录者：${esc(post.author)}</p><p class="excerpt">${esc(post.excerpt)}…… <a class="read-more" href="${post.url}">阅读全文 →</a></p></article>`).join('');
const projectGrid = projects.map(project => `<article class="feature"><h3><a href="${project.url}">${project.name} ↗</a></h3><p>${project.desc}</p><code>${project.tech}</code></article>`).join('');
const guestbook = `<section class="guestbook" id="guestbook"><h2 class="gbhead">留 言 板 ｜ 本机共有 <span data-guestbook-count>0</span> 条留言</h2><div class="gbbody"><form class="gb-form" data-guestbook-form><label>昵称：<input name="name" maxlength="20" placeholder="匿名也可以"></label><label>留言：<textarea name="message" maxlength="500" required placeholder="留言只保存在当前浏览器，不会公开发送。"></textarea></label><button type="submit">保存留言</button><span class="gb-note" data-guestbook-note hidden>已保存在本机。</span></form><p class="small mono">LOCAL GUESTBOOK / 数据不会上传服务器。</p><div data-guestbook-list></div></div></section>`;
const homeBody = `<main id="main"><div class="layout">${sidebar}<div class="content"><div class="ascii" id="log">┌────────────────────────────┐<br>│<span class="hot"> 本 站 日 志 · 全 部 ${String(posts.length).padStart(2,'0')} 篇 </span>│<br>└────────────────────────────┘</div>${postList}<h2 class="section-banner" id="projects">精选项目 / SELECTED BUILDS</h2><div class="feature-projects">${projectGrid}</div><div class="doggerel"><strong>站长乱记 · 开发三句半</strong><br>需求昨天刚确定，<br>今天上线不能等，<br>明天用户来一看——<br>按钮还没反应。</div><p class="under">本页保留了复古网页的粗糙外表，但文章、项目、邮箱和链接都是真的。</p></div></div>${guestbook}</main>`;
const homeHtml = page({ body:homeBody });
write('index.html',homeHtml);
fs.writeFileSync('index.html',homeHtml,'utf8');

posts.forEach((post,index) => {
  const previous=posts[index+1], next=posts[index-1];
  const body=`<main id="main"><div class="layout">${sidebar}<article class="content"><a class="article-back" href="/#log">← 返回日志列表</a><header class="article-head"><p class="article-meta">FILE / ${post.date} / ${esc(post.tag)}</p><h1>《${esc(post.title)}》</h1><p class="article-meta">记录者：${esc(post.author)} ｜ 永久链接：${esc(post.url)}</p></header><div class="prose">${post.html}</div><nav class="post-nav" aria-label="相邻文章">${previous?`<a href="${previous.url}">← ${esc(previous.title)}</a>`:'<span></span>'}${next?`<a href="${next.url}">${esc(next.title)} →</a>`:'<span></span>'}</nav></article></div></main>`;
  write(post.url.slice(1),page({title:`${post.title} · 王耀祖的主页`,description:post.excerpt,canonical:post.url,current:'post',body}));
});

const groups=posts.reduce((result,post)=>{(result[post.tag]??=[]).push(post);return result;},{});
const tagBody=`<main id="main"><div class="layout">${sidebar}<section class="content"><div class="ascii">┌────────────────────────────┐<br>│<span class="hot"> 文 章 索 引 · 按 标 签 </span>│<br>└────────────────────────────┘</div>${Object.entries(groups).map(([tag,list])=>`<section class="archive-group"><h2>${esc(tag)}（${list.length}）</h2>${list.map(post=>`<a href="${post.url}"><time>${post.date}</time><strong>${esc(post.title)}</strong><span>→</span></a>`).join('')}</section>`).join('')}</section></div></main>`;
const tagsHtml=page({title:'文章索引 · 王耀祖的主页',description:'按标签浏览王耀祖的技术笔记和生活记录',canonical:'/tags.html',current:'tags',body:tagBody});
write('tags.html',tagsHtml); fs.writeFileSync('tags.html',tagsHtml,'utf8');

const lostBody=`<main id="main" class="lost"><strong>404</strong><h1>这个链接已经走丢了。</h1><p>可能是旧文章改了地址，也可能是站长又忘了检查。</p><p><a href="/">返回王耀祖的主页 →</a></p></main>`;
const lostHtml=page({title:'404 · 页面走丢了',description:'请求的页面不存在',canonical:'/404.html',body:lostBody});
write('404.html',lostHtml); fs.writeFileSync('404.html',lostHtml,'utf8');

for (const asset of ['assets/css/web1.css','assets/js/web1.js','assets/img/wang-yaozu-icon.png','assets/img/wang-yaozu-id.png','favicon.ico']) {
  const destination=path.join(out,asset); fs.mkdirSync(path.dirname(destination),{recursive:true}); fs.copyFileSync(asset,destination);
}
write('.nojekyll','');
const search=JSON.stringify(posts.map(({title,url,date,tag,excerpt})=>({title,url,date,tag,excerpt})),null,2);
write('search.json',search); fs.writeFileSync('search.json',search,'utf8');
const rss=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>王耀祖的主页</title><link>${siteUrl}</link><description>技术笔记、项目记录与生活碎片</description><language>zh-CN</language>${posts.map(post=>`<item><title>${xml(post.title)}</title><link>${siteUrl}${post.url}</link><guid>${siteUrl}${post.url}</guid><pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate><description>${xml(post.excerpt)}</description></item>`).join('')}</channel></rss>`;
write('rss.xml',rss); fs.writeFileSync('rss.xml',rss,'utf8');
console.log(`Built Web 1.0 personal site with ${posts.length} posts.`);
