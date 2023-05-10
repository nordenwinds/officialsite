import Migration, { MigrationFunction } from 'contentful-migration';

export default (function (migration: Migration) {
    const dog = migration.createContentType('dog', {
        name: 'Dog',
    });

    const name = dog.createField('name');
    name.name('Name').type('Symbol').required(true);
} satisfies MigrationFunction);
