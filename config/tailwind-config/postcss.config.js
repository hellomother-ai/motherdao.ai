module.exports = {
  plugins: {
    /**
      Our code doesn't use nested CSS, but Storybook itself does, which seems to require this line.
      File: node_modules/@storybook/core-common/templates/base-preview-head.html
    */
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
