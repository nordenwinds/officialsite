import { strict as assert } from 'assert';
import { runMigration } from 'contentful-migration';
import { contentfulClient, createEnvironment } from './lib/contentful';
import InitModels from './migrations/1-init_content_models';
import { Entry, Environment, Space } from 'contentful-management';

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

const getVersionEntry = async (environment: Environment): Promise<Entry> => {
    const { items: versions } = await environment.getEntries({
        content_type: 'versionTracking',
    });

    if (!versions.length || versions.length > 1) {
        throw new Error('There should only be one entry of type "versionTracking".');
    }

    return versions[0];
};

const updateVersion = async (currentVersionEntry: Entry, targetVersion: number): Promise<void> => {
    currentVersionEntry.fields.version = targetVersion;
    currentVersionEntry = await currentVersionEntry.update();
    currentVersionEntry = await currentVersionEntry.publish();

    console.info(`Update version entry to ${targetVersion}`);
};

const main = async () => {
    const contentfulEnv = process.env.CONTENTFUL_ENV;
    assert(contentfulEnv === 'develop' || contentfulEnv === 'master');
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    assert(spaceId);

    const space = await contentfulClient.getSpace(spaceId);
    const environment = await createEnvironment(space, contentfulEnv);

    const TARGET_VERSION = 1;
    const targetVersion = TARGET_VERSION;

    const currentVersionEntry = await getVersionEntry(environment);
    const shouldRunMigration = currentVersionEntry.fields.version < targetVersion;

    if (shouldRunMigration) {
        await migrate(space, environment);
        await updateVersion(currentVersionEntry, targetVersion);
    } else {
        console.info('There is nothing to need to migrate.');
    }

    if (contentfulEnv === 'master') {
        await switchAlias(space, environment, 'master');
    }
};

main();
