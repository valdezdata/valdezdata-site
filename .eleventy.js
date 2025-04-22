// .eleventy.js
module.exports = function (eleventyConfig) {
  // Copiar carpetas estáticas al output ('docs')
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js"); // <-- Nueva línea

  // Observar cambios para recarga en vivo
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/"); // <-- Nueva línea

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "docs",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
