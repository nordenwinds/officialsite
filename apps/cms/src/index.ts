import { strict as assert } from 'assert';
import { runMigration } from 'contentful-migration';
import { contentfulClient, createEnvironment } from './lib/contentful';
import InitModels from './migrations/1-init_content_models.js';
import { Environment, Space } from 'contentful-management';

const migrate = async (space: Space, environment: Environment) => {
    const options = {
        environmentId: environment.sys.id,
        spaceId: space.sys.id,
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
        yes: true,
    };

    await runMigration({ ...options, ...{ migrationFunction: InitModels } });
};

const switchAlias = async (space: Space, environment: Environment, contentfulEnv: string) => {
    const alias = await space.getEnvironmentAlias(contentfulEnv);
    const currentEnvironmentId = alias.environment.sys.id;

    console.log(`Switch ${contentfulEnv}: ${currentEnvironmentId} to ${environment.sys.id}`);
    alias.environment.sys.id = environment.sys.id;
    await alias.update();

    console.log('Delete old environment', currentEnvironmentId);
    (await space.getEnvironment(currentEnvironmentId)).delete();
};

const main = async () => {
    const contentfulEnv = process.env.APP_ENV;
    assert(contentfulEnv === 'develop' || contentfulEnv === 'production');
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    assert(spaceId);

    const space = await contentfulClient.getSpace(spaceId);
    const environment = await createEnvironment(space, contentfulEnv);

    await migrate(space, environment);

    if (contentfulEnv === 'production') {
        await switchAlias(space, environment, contentfulEnv);
    }
};

main();
