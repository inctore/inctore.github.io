const path = require("path");

module.exports = {
  entry: {
    index: ["./src/index.ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "inctore"),
    clean: true,
    library: {
      name: "myIndex",
      type: "var",
    },
  },
  optimization: {
    splitChunks: { chunks: "all" },
    minimize: false,
  },
};
