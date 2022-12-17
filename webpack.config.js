const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/client/javascript/index.js",
    videoplayer: "./src/client/javascript/videoplayer.js",
    recorder: "./src/client/javascript/recorder.js",
    comment: "./src/client/javascript/comment.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "asset"),
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
