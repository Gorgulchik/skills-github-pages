// src/core/utils/webpack.config.ts
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import CompressionPlugin from 'compression-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from 'webpackbar';

const prodConfig: Configuration = {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          format: {
            comments: false,
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 200 * 1024, // 200KB
      minSize: 20 * 1024, // 20KB
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    usedExports: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|json)$/,
      threshold: 10240, // 10KB
      minRatio: 0.8
    }),
    new BundleAnalyzerPlugin(),
    new WebpackBar()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};

export default merge(common, prodConfig);