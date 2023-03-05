import dotenv from 'dotenv';
import { runMigration } from 'contentful-migration';
import SampleMigration from './migrations/16-typescript-migration.js';

dotenv.config({ path: 'src/.env' });

const options = {
    environmentId: process.env.CONTENTFUL_ENV,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    yes: true,
};

const migrations = async () => {
    await runMigration({ ...options, ...{ migrationFunction: SampleMigration } });
};

migrations();
