import type Migration from 'contentful-migration';
import type { MigrationFunction } from 'contentful-migration';

export default ((migration: Migration) => {
    /** Create Version */ {
        const version = migration.createContentType('versionTracking', {
            name: 'VersionTracking',
            description: 'Versions of migrations',
            displayField: 'version',
        });

        version.createField('version').name('Version').type('Number').required(true);
    }
}) satisfies MigrationFunction;
