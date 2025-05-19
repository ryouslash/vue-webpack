const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: ["./src/js/main.js", "./src/scss/style.scss"],
    "vue-main": "./src/vue-main.js",
  },
  output: {
    //出力先
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/,
      },
      {
        // JS用のローダー
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // SASS 用のローダー
        // 対象となる拡張子を指定
        test: /\.scss$/i,
        oneOf: [
          {
            // Vue コンポーネントの SCSS は `vue-style-loader` で `head` に埋め込む
            resourceQuery: /vue/,
            // どのローダーを噛ませるのかを指定（下から実行されていく。）
            use: [
              // `head` 内に埋め込む
              "vue-style-loader",
              // CSSファイルをJavaScriptでimportできるようにするローダー
              "css-loader",
              // ベンダープレフィックスが必要なものに自動的に付与
              "postcss-loader",
              // SASSからCSSへのコンパイルに使用
              // "sass-loader",
              // 以下の書き方だとソースマップのファイル名は壊れる
              {
                loader: "sass-loader",
                options: {
                  api: "modern-compiler",
                  implementation: require("sass"),
                },
              },
            ],
          },
          {
            // どのローダーを噛ませるのかを指定（下から実行されていく。）
            use: [
              // CSSを別ファイルに分けられるプラグイン
              MiniCssExtractPlugin.loader,
              // CSSファイルをJavaScriptでimportできるようにするローダー
              "css-loader",
              // ベンダープレフィックスが必要なものに自動的に付与
              "postcss-loader",
              // SASSからCSSへのコンパイルに使用
              // "sass-loader",
              // 以下の書き方だとソースマップのファイル名は壊れる
              {
                loader: "sass-loader",
                options: {
                  api: "modern-compiler",
                  implementation: require("sass"),
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      //Asset Modules
      {
        //対象とするアセットファイルの拡張子を正規表現で指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        //いずれかの type を指定
        type: "asset/resource",
      },
    ],
  },
  //プラグインの設定（plugins プロパティの配列に追加）
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        // エントリーポイント名に応じて異なるファイル名を出力する
        return pathData.chunk.name === "main"
          ? "css/style.css"
          : "css/[name].css";
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main", "vue-main"],
    }),
  ],
  //圧縮（minify）の設定
  optimization: {
    //minimize: true,  //モードに関わらず常に圧縮を有効にする場合は指定
    minimizer: [
      `...`, //JavaScript の圧縮を有効に（デフォルトの圧縮の設定を適用）
      new CssMinimizerPlugin({
        parallel: true, //ビルド速度を向上
      }),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 2,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: "vendors", // vendor.js として出力
        },
        utility: {
          test: /[\\/]src[\\/]js[\\/]/,
          priority: -5,
          reuseExistingChunk: true,
          name: "utility",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@js": path.resolve(__dirname, "src/js"),
      "@scss": path.resolve(__dirname, "src/scss"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
};
