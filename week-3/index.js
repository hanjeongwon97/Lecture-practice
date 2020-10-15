const http = require('http');
const url = require('url');
const fs = require('fs');

function getLITag(files) {
  let str = '';
  const list = files.map(e => e.split('.txt')[0]);
  for (let i = 0; i < list.length; i++) {
    str += `<li><a href="./?title=${list[i]}">${list[i]}</a></li>`;
  }
  return str;
}
 
