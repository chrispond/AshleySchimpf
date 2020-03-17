module.exports = {
    optimization: { minimize: false },
    module: {
      rules: [
        { test: /\.ejs$/, use: 'raw-loader' }
      ]
    }
  };