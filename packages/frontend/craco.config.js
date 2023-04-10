const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProd = process.env.NODE_ENV === "production";

// We only want to run the bundle analyzer locally when the bundle needs to be analyzed.
// By default it is off.
const enableBundleAnalyzer = false;

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: {
      ignoreWarnings: [
        // Ignore warnings raised by source-map-loader.
        // some third party packages may ship miss-configured sourcemaps, that interrupts the build
        // See: https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
        // Packages should still work fine
        /**
         *
         * @param {import('webpack').WebpackError} warning
         * @returns {boolean}
         */
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes("node_modules") &&
            warning.details &&
            warning.details.includes("source-map-loader")
          );
        },
      ],
      module: {
        rules: [
          {
            exclude: /src/,
            include: /node_modules/,
            test: /\.mjs$/,
            type: "javascript/auto",
            use: [],
          },
        ],
      },
      optimization:
        // Using this messes with yarn start
        isProd
          ? {
              splitChunks: {
                chunks: "all",
              },
            }
          : undefined,
      plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        // packages that use Buffer are likely to be web3 related
        // as Buffer data transfer is common
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
        ...(enableBundleAnalyzer ? [new BundleAnalyzerPlugin()] : []),
      ],
      resolve: {
        fallback: {
          path: false,
        },
      },
    },
  },
};
