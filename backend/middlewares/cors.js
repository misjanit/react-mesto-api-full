const allowedUrls = [
  'http://praktikum.tk',
  'https://praktikum.tk',
  'http://imdone.nomoredomains.xyz',
  'https://imdone.nomoredomains.xyz',
  'http://localhost:3000',
];

const allowedMethods = 'GET, PUT, POST, PATCH, DELETE, HEAD';

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedUrls.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', allowedMethods);
    return res.end();
  }

  return next();
};
