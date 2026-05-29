module.exports = function (api) {
  // Determine if this is Next.js / Webpack compilation based on process args and env
  const isNext =
    process.env.NEXT_RUNTIME ||
    process.argv.some((arg) => arg.includes("next") || arg.includes("webpack")) ||
    !process.argv.some((arg) => arg.includes("expo") || arg.includes("metro") || arg.includes("react-native"));

  api.cache(true);

  if (isNext) {
    return {
      presets: ["next/babel"]
    };
  }

  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"]
  };
};



