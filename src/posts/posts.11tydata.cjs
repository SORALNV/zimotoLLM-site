module.exports = {
  layout: 'post.njk',
  eleventyComputed: {
    permalink: data => data.draft ? false : `/articles/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: data => !!data.draft
  }
};
