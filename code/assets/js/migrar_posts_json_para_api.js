const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const postsPath = path.join(__dirname, 'posts.json'); // Ajuste o caminho se necessário
const apiUrl = 'http://localhost:3000/posts';

async function migrate() {
  let enviados = 0, erros = 0;
  let posts;
  try {
    posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  } catch (e) {
    console.error('Erro ao ler posts.json:', e.message);
    process.exit(1);
  }

  for (const post of posts) {
    delete post.id;
    try {
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (resp.ok) {
        enviados++;
      } else {
        erros++;
        console.error('Erro ao enviar post:', post, await resp.text());
      }
    } catch (e) {
      erros++;
      console.error('Erro ao enviar post:', post, e);
    }
  }
  console.log(`Migração concluída! Enviados: ${enviados} | Erros: ${erros}`);
}

migrate(); 