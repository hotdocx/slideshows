import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await fsp.realpath(fileURLToPath(new URL('./site/', import.meta.url)));
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.m4a':'audio/mp4', '.mp3':'audio/mpeg', '.vtt':'text/vtt; charset=utf-8', '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.txt':'text/plain; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (name.endsWith('/')) name += 'index.html';
    if (name.split('/').some(p=>p.startsWith('.') && p!=='.nojekyll')) throw Error();
    const file = await fsp.realpath(path.resolve(root, '.'+name));
    if (!file.startsWith(root+path.sep)) throw Error();
    const stat = await fsp.stat(file); if (!stat.isFile()) throw Error();
    const mime = types[path.extname(file)]; if (!mime) throw Error();
    let start = 0, end = stat.size-1, status = 200;
    if (req.headers.range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!m || (!m[1]&&!m[2])) throw Error();
      start = m[1] ? Number(m[1]) : Math.max(0,stat.size-Number(m[2]));
      end = m[1]&&m[2] ? Math.min(Number(m[2]),stat.size-1) : stat.size-1;
      if (start>end || start>=stat.size) { res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return; }
      status=206;
    }
    res.writeHead(status,{'Content-Type':mime,'Content-Length':end-start+1,'Accept-Ranges':'bytes','Access-Control-Allow-Origin':'*','X-Content-Type-Options':'nosniff',...(status===206?{'Content-Range':`bytes ${start}-${end}/${stat.size}`}:{})});
    if (req.method==='HEAD') res.end(); else fs.createReadStream(file,{start,end}).pipe(res);
  } catch { res.writeHead(404);res.end('Not found'); }
});
server.listen(Number(process.env.PORT||3196),process.env.HOST||'127.0.0.1',()=>console.log('Presentation preview is ready.'));
