// Roda na Vercel antes de qualquer página.
// Acessos do Brasil recebem uma página 404 comum; o resto vê o site normalmente.
export const config = { matcher: '/:path*' };

const PAGINA_404 = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404: NOT_FOUND</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fff;color:#000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}h1{font-size:24px;font-weight:500;margin:0 20px 0 0;padding:0 23px 0 0;border-right:1px solid rgba(0,0,0,.3);line-height:49px}h2{font-size:14px;font-weight:400;margin:0;line-height:49px}.e{display:flex;align-items:center}</style></head><body><div class="e"><h1>404</h1><h2>This page could not be found.</h2></div></body></html>`;

export default function middleware(request) {
  const pais = request.headers.get('x-vercel-ip-country');
  if (pais === 'BR') {
    return new Response(PAGINA_404, {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  // outros países: segue para a página normal
}
