const authors = require('./src/_data/authors.json');

module.exports = async function (config) {
  const { HtmlBasePlugin } = await import('@11ty/eleventy');
  config.addPlugin(HtmlBasePlugin);
  config.setNunjucksEnvironmentOptions({ autoescape: true });
  config.addPassthroughCopy({ 'src/assets': 'assets', 'src/_headers': '_headers' });
  config.addFilter('dateLabel', value => new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC'
  }).format(new Date(value)));
  config.addFilter('isoDate', value => new Date(value).toISOString().slice(0, 10));
  config.addFilter('authorName', id => authors[id]?.name || id);
  config.addFilter('topicUrl', name => '/topics/' + encodeURIComponent(name) + '/');
  config.addCollection('articles', api => api.getFilteredByGlob('src/posts/*.md')
    .filter(item => !item.data.draft)
    .map(item => {
      const d = item.data;
      if (!d.title || !d.description || !authors[d.author]) {
        throw new Error(`${item.inputPath}: title / description / registered author required`);
      }
      if (!Array.isArray(d.topics) || !d.topics.length || d.topics.some(t => typeof t !== 'string' || !/^[\p{L}\p{N}_-]+$/u.test(t))) {
        throw new Error(`${item.inputPath}: topics must be nonempty safe names`);
      }
      return item;
    }).sort((a, b) => b.date - a.date));
  config.addCollection('topics', api => [...new Set(api.getFilteredByGlob('src/posts/*.md')
    .filter(item => !item.data.draft).flatMap(item => item.data.topics || []))].sort());
  return { pathPrefix: process.env.SITE_PATH_PREFIX || '/',
    dir: { input: 'src', output: 'dist', includes: '_includes', data: '_data' },
    markdownTemplateEngine: false, htmlTemplateEngine: 'njk' };
};
