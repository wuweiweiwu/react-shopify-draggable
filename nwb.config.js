module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactShopifyDraggable',
      externals: {
        react: 'React'
      }
    }
  }
};
