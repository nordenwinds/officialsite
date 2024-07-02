import { resolve } from 'node:path';
import app from '../src/v1';

const main = async () => {
  const dest = Bun.argv[2] ? resolve(Bun.argv[2]) : Bun.stdout;

  // OpenAPI JSON
  const docs = app.getOpenAPIDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: '',
    },
  });

  await Bun.write(dest, JSON.stringify(docs));
};

main();
