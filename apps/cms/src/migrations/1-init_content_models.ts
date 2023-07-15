import Migration, { MigrationFunction } from 'contentful-migration';

export default (function (migration: Migration) {
    /** Create Category */ {
        const category = migration.createContentType('category', {
            name: 'Category',
            description: 'Category for news',
            displayField: 'name',
        });

        category
            .createField('name')
            .name('Name')
            .type('Symbol')
            .required(true)
            .validations([{ unique: true }, { regexp: { pattern: '[a-z]+' } }]);

        category
            .createField('color')
            .name('Color')
            .type('Symbol')
            .required(true)
            .validations([
                { in: ['primary', 'secondary', 'primary.dark', 'primary.light', 'secondary.dark', 'secondary.light'] },
            ]);
    }

    /** Create News model */ {
        const news = migration.createContentType('news', {
            name: 'News',
            description: 'news',
            displayField: 'title',
        });

        news.createField('title').name('Title').type('Symbol').required(true);

        news.createField('slug')
            .name('Slug')
            .type('Symbol')
            .required(true)
            .validations([
                { unique: true },
                {
                    regexp: { pattern: '[a-z0-9]+(?:-[a-z0-9]+)*' },
                    message: 'Slug must be lower case and separated with hyphens',
                },
            ]);

        news.createField('publishedAt').name('Published At').type('Date').required(true);

        news.createField('category')
            .name('Category')
            .type('Link')
            .linkType('Entry')
            .required(true)
            .validations([{ linkContentType: ['category'] }]);

        news.createField('content').name('Content').type('RichText').required(true);
    }

    /** Create Concert model */ {
        const concert = migration.createContentType('concert', {
            name: 'Concert',
            description: 'concert',
            displayField: 'title',
        });

        concert.createField('title').name('Title').type('Symbol').required(true);

        concert
            .createField('flyer')
            .name('Flyer')
            .type('Link')
            .linkType('Asset')
            .required(true)
            .validations([
                {
                    linkMimetypeGroup: ['image'],
                },
            ]);

        concert
            .createField('slug')
            .name('Slug')
            .type('Symbol')
            .required(true)
            .validations([
                { unique: true },
                {
                    regexp: { pattern: '[a-z0-9]+(?:-[a-z0-9]+)*' },
                    message: 'Slug must be lower case and separated with hyphens',
                },
            ]);

        concert.createField('startTime').name('Start Time').type('Date').required(true);

        concert.createField('openTime').name('Open Time').type('Date').required(false);

        concert.createField('conductor').name('Conductor').type('Symbol').required(true);

        concert.createField('place').name('Place').type('Symbol').required(true);

        concert.createField('content').name('Content').type('RichText').required(true);
    }
} satisfies MigrationFunction);
