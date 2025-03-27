const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const webpack = require("webpack");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Remove any wrapping double quotes from the environment variables
  const apiUrl = (
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080"
  ).replace(/^"|"$/g, "");
  const apiKey = (
    process.env.EXPO_PUBLIC_API_KEY || "Your_Open_Ai_Key"
  ).replace(/^"|"$/g, "");

  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.EXPO_PUBLIC_API_URL": JSON.stringify(apiUrl),
      "process.env.EXPO_PUBLIC_API_KEY": JSON.stringify(apiKey),
    })
  );

  return config;
};
