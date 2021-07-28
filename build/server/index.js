const webpack = require("webpack");
const chalk = require("chalk");
const net = require("net");
const ip = require("ip");
const WebpackDevServer = require("webpack-dev-server");
const Config = require("../config/webpack.dev");

const { HOST, PORT } = require("../env");
const ServerConfig = { ...Config.devServer };
const Compiler = webpack(Config);
const server = new WebpackDevServer(Compiler, ServerConfig);

const portIsUse = (port) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port);
    server.on("listening", () => {
      server.close();
      resolve(port);
    });
    server.on("error", (err) => {
      if (err.code == "EADDRINUSE") {
        reject(err);
      }
    });
  });
};
const log = `
${chalk.green("App  running at")}
---------------------------------------
-local: ${chalk.blue(`http://${HOST}:${PORT}`)}
-local: ${chalk.blue(`http://${ip.address()}:${PORT}`)}
---------------------------------------
Press ${chalk.green("Ctrl+c")} to exit
`;
const startServer = async () => {
  try {
    const result = await portIsUse(PORT);
    if (result === PORT) {
      server.listen(PORT, HOST, (err) => {
        if (err) {
          throw new Error(err);
        }
        console.log(log);
      });
    }
  } catch (error) {
    console.log(111);
    console.log(error);
  }
};

startServer();
