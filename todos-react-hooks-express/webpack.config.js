const path = require('path');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/, /\.test\.tsx?$/],
        options: {
          configFile: 'tsconfig.main.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(projectPath, 'dist', 'client'),
  },
  ...overrides,
};
