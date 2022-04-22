import https from "https";

export const doGetRequest = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

