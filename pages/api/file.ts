// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IncomingMessage, OutgoingMessage } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'
import http from 'http';


export default function handler(
  client_req: NextApiRequest,
  client_res: NextApiResponse
) {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  const proxy = http.request(options, function (res: IncomingMessage) {
    client_res.writeHead(res.statusCode as number, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
  // res.redirect(`http://localhost:3000/file?path=${req.query.path}`)
}
