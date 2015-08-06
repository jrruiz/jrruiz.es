var Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  templates = require('metalsmith-templates'),
  collections = require('metalsmith-collections'),
  permalinks = require('metalsmith-permalinks'),
  tags = require('metalsmith-tags'),
  drafts = require('metalsmith-drafts');

Metalsmith(__dirname)
  .use(drafts())
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
      pattern: 'content/posts/*.md',
      shortBy: 'date',
      reverse: true
    }
  })) // this plugin must be executed before convert the files to html
  .use(tags({
    handle: 'tags', // yaml front matter key
    path: 'tags/:tag/index.html',
    template: 'tag.html',
    shortBy: 'date',
    reverse: true,
    skipMetadata: true
  })) // this plugin must be executed before convert the files to html
  .use(markdown())
  .use(permalinks({ pattern: ':collection/:title' })) // this plugin must be executed after the files are converted to html
  .use(function(files, metalsmith, done) {
    metalsmith.metadata().currentDate = new Date();
    done();
  })
  .use(function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    metadata.formatDate = function() {
      return function(text, render) {
        var date = render(text),
          result = '';
        
        date = new Date(date);
        result = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

        return result;
      };
    };

    metadata.sitemapDate = function() {
      return function(text, render) {
        var date = render(text);
        var day;
        var month;
        var year;
        
        date = new Date(date);
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        year = date.getFullYear();

        return [year, month, day].join('-');
      };
    };

    done();
  })
  .use(templates({
    engine: 'mustache',
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  }))
  .build(function(error, files) {
    if (error) {
      console.log(error);
    }
  });
