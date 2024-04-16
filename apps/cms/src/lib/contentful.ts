import { strict as assert } from 'node:assert';
import contentful, { type Environment, type Space } from 'contentful-management';

const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
assert(accessToken);

export const contentfulClient = contentful.createClient({
    accessToken: accessToken,
});

export const createEnvironment = async (space: Space, contentfulEnv: 'master' | 'develop'): Promise<Environment> => {
    console.log(`Running on ${contentfulEnv}.`);

    const environmentId = contentfulEnv === 'master' ? `${contentfulEnv}-${new Date().getTime()}` : contentfulEnv;
    console.log('Environment ID', environmentId);

    if (contentfulEnv !== 'master') {
        console.log('Delete current environment.', environmentId);
        await (await space.getEnvironment(environmentId)).delete();
    }

    const environment = await space.createEnvironmentWithId(environmentId, {
        name: environmentId,
    });

    console.log('Waiting for environment is ready...');
    const maxNumberOfTries = 10;
    const interval = 3000;
    for (let tries = 0; tries < maxNumberOfTries; tries++) {
        const status = (await space.getEnvironment(environment.sys.id)).sys.status.sys.id;

        if (status === 'ready') {
            console.log('Successfully created new environment.', environmentId);
            break;
        }
        if (status === 'failed') {
            console.error('Environment creation failed.');
            process.exit(1);
        }

        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    console.log('Update API keys to allow access to new environment.');
    const newEnv = {
        sys: {
            type: 'Link',
            linkType: 'Environment',
            id: environment.sys.id,
        },
    };
    const { items: keys } = await space.getApiKeys();
    await Promise.all(
        keys
            .filter((key) => key.name === contentfulEnv)
            .map((key) => {
                console.log('Updating api key', key.sys.id);
                key.environments.push(newEnv);
                return key.update();
            }),
    );

    return environment;
};
