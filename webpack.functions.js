module.exports = {
    optimization: { minimize: false },
    module: {
      rules: [
        { test: /\.ejs$/i, use: 'raw-loader' }
      ]
    },
    target: 'node',
    node: {
      __dirname: true,
    }
  };