const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

function getLITag(files) {
  let str = '';
  const list = files.map(e => e.split('.txt')[0]);
  for (let i = 0; i < list.length; i++) {
    str += `<li><a href="./?title=${list[i]}">${list[i]}</a></li>`;
  }
  return str;
}

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const pathName = urlObj.pathname;
  if (pathName === '/') {
    if (!urlObj.search) {
      fs.readdir('./data', 'utf8', (err, files) => {
        if (err) throw err;
        const list = getLITag(files);
        res.writeHead(200);
        res.write(`
        <!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to my Page!</title>
  <style>
    @charset "utf-8";

    @font-face {
      font-family: 'MapoFlowerIsland';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      font-family: 'MapoFlowerIsland';
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    #wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      min-height: 100vh;
      background: #192841;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 800px;
      width: 450px;
      border-radius: 35px;
      background: #eee;
      padding: 60px 20px;
    }

    hr {
      border: 1px dashed #000;
      width: 80%;
      color: #000;
    }

    article {
      width: 75%;
      text-align: left;
    }

    article>img {
      display: block;
      max-width: 100%;
      margin: 20px 0;
      transition: all .3s;
    }

    article>img:hover {
      transform: scale(1.1);
    }

    ul {
      margin: 30px 0;
      padding: 0;
      list-style-type: none;
    }

    ul>li {
      font-size: 1.2rem;
      padding: 5px 0;
    }

    a {
      text-decoration: none;
      font-weight: bold;
    }
    a:visited {
      color: #192841;
    }
  </style>
</head>

<body>
  <div id="wrap">
    <div class="card">
      <header>
        <h1>Welcome to my Page!</h1>
      </header>
      <hr>
      <article>
        <img src="https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_960_720.jpg">
        <ul>
          <!-- 목록이 들어갈 자리-->
          ${list}
        </ul>
        <a href="/create">글 작성하기</a>
      </article>
    </div>
  </div>
</body>

</html>
        `);
        res.end();
      });
    } else {
      console.log(urlObj.query);
      fs.readFile(`./data/${urlObj.query.title}.txt`, 'utf8', (err2, data) => {
        if (err2) throw err2;
        const title = urlObj.query.title;
        res.writeHead(200);
        res.end(`
      <!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to my Page!</title>
  <style>
    @charset "utf-8";

    @font-face {
      font-family: 'MapoFlowerIsland';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      font-family: 'MapoFlowerIsland';
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    #wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      min-height: 100vh;
      background: #192841;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 800px;
      width: 450px;
      border-radius: 35px;
      background: #eee;
      padding: 60px 20px;
    }

    hr {
      border: 1px dashed #000;
      width: 80%;
      color: #000;
    }

    article {
      width: 75%;
      text-align: left;
    }

    article>img {
      display: block;
      max-width: 100%;
      margin: 20px 0;
      transition: all .3s;
    }

    article>img:hover {
      transform: scale(1.1);
    }

    ul {
      margin: 30px 0;
      padding: 0;
      list-style-type: none;
    }

    ul>li {
      font-size: 1.2rem;
      padding: 5px 0;
    }
    a {
      text-decoration: none;
      font-weight: bold;
    }
    a:visited {
      color: #192841;
    }
  </style>
</head>

<body>
  <div id="wrap">
    <div class="card">
      <header>
        <h1>Welcome to my Page!</h1>
      </header>
      <hr>
      <article>
        <h2>${title}</h2>
        <p>
          ${data}
        </p>
        <a href="/">홈으로 가기</a>
        <p>
          <a href="/update?title=${title}">수정</a>
          <form action="/delete_post" method="post">
            <input type="hidden" name="title" value=${title}>
            <input type="submit" value="삭제">
          </form>
        </p>
      </article>
    </div>
  </div>
</body>

</html>
      `);
      });
    }
  } else if (pathName === '/create') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
    <!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to my Page!</title>
  <style>
    @charset "utf-8";

    @font-face {
      font-family: 'MapoFlowerIsland';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      font-family: 'MapoFlowerIsland';
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    #wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      min-height: 100vh;
      background: #192841;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 800px;
      width: 450px;
      border-radius: 35px;
      background: #eee;
      padding: 60px 20px;
    }

    hr {
      border: 1px dashed #000;
      width: 80%;
      color: #000;
    }

    article {
      width: 75%;
      text-align: left;
    }

    article>img {
      display: block;
      max-width: 100%;
      margin: 20px 0;
      transition: all .3s;
    }

    article>img:hover {
      transform: scale(1.1);
    }

    ul {
      margin: 30px 0;
      padding: 0;
      list-style-type: none;
    }

    ul>li {
      font-size: 1.2rem;
      padding: 5px 0;
    }

    a {
      text-decoration: none;
      font-weight: bold;
    }
    a:visited {
      color: #192841;
    }
  </style>
</head>

<body>
  <div id="wrap">
    <div class="card">
      <header>
        <h1>Welcome to my Page!</h1>
      </header>
      <hr>
      <article>
        <img src="https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_960_720.jpg">
        <form action="/create_post" method="post">
          <p>
            <label for="title"> 제목 </label>
            <input type="text" id="title" name="title">  
          </p>
          <textarea name="content">
          </textarea>
          <p>
            <input type="submit">
          </p>
        </form>
      </article>
    </div>
  </div>
</body>

</html>
    `);
    res.end();
  } else if (pathName === '/create_post') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const post = qs.parse(body);
      const title = post.title;
      const content = post.content;
      fs.writeFile(`./data/${title}.txt`, content, 'utf8', () => {
        res.writeHead(302, {Location: `/?title=${title}`});
        res.end();
      });
    });
  } else if (pathName === '/update') {
    fs.readFile(`./data/${urlObj.query.title}.txt`, 'utf8', (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
    <!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to my Page!</title>
  <style>
    @charset "utf-8";

    @font-face {
      font-family: 'MapoFlowerIsland';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      font-family: 'MapoFlowerIsland';
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    #wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      min-height: 100vh;
      background: #192841;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 800px;
      width: 450px;
      border-radius: 35px;
      background: #eee;
      padding: 60px 20px;
    }

    hr {
      border: 1px dashed #000;
      width: 80%;
      color: #000;
    }

    article {
      width: 75%;
      text-align: left;
    }

    article>img {
      display: block;
      max-width: 100%;
      margin: 20px 0;
      transition: all .3s;
    }

    article>img:hover {
      transform: scale(1.1);
    }

    ul {
      margin: 30px 0;
      padding: 0;
      list-style-type: none;
    }

    ul>li {
      font-size: 1.2rem;
      padding: 5px 0;
    }

    a {
      text-decoration: none;
      font-weight: bold;
    }
    a:visited {
      color: #192841;
    }
  </style>
</head>

<body>
  <div id="wrap">
    <div class="card">
      <header>
        <h1>Welcome to my Page!</h1>
      </header>
      <hr>
      <article>
        <img src="https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649_960_720.jpg">
        <form action="/update_post" method="post">
          <p>
            <input type="hidden" name="original_title" value=${urlObj.query.title}>
            <label for="title"> 제목 </label>
            <input type="text" id="title" name="title" value=${urlObj.query.title}>  
          </p>
          <textarea name="content">
            ${data}
          </textarea>
          <p>
            <input type="submit">
          </p>
        </form>
      </article>
    </div>
  </div>
</body>

</html>
    `);
      res.end();
    });
  } else if (pathName === '/update_post') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const post = qs.parse(body);
      const title = post.title;
      const original_title = post.original_title;
      if (title !== original_title) {
        fs.unlink(`./data/${original_title}.txt`, () => {
          //code
        });
      }
      const content = post.content;
      fs.writeFile(`./data/${title}.txt`, content, 'utf8', () => {
        res.writeHead(302, {Location: `/?title=${title}`});
        res.end();
      });
    });
  } else if (pathName === '/delete_post') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const post = qs.parse(body);
      console.log(post);
      fs.unlink(`./data/${post.title}.txt`, () => {
        res.writeHead(302, {Location: '/'});
        res.end();
      });
    })
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(3000);