const { randomBytes } = require('crypto');
const { EOL } = require('os');
const path =  require('path');
const fs =  require('fs');
const dotenv =  require('dotenv');
const yargs =  require('yargs');
const { hideBin } =  require('yargs/helpers');

function readConfig() {
  try {
    const data = fs.readFileSync(path.resolve('.env'));
    const config = dotenv.parse(data);
    return config;
  } catch (error) {
    if (code === 'ENOENT') {
      return {};
    }
    console.log('Could not read/generate file', error);
  }
}

function writeToFile(config) {
  let configToWrite = '';
  for (const key in config) {
    configToWrite += `${key}=${config[key]}${EOL}`;
  }

  fs.writeFileSync('.env', configToWrite);
}

function generateToken() {
  var randomToken = randomBytes(64).toString('hex');
  return randomToken;
}

function bootstrap() {
  const config = readConfig();
  const argv = yargs(hideBin(process.argv));

  const args = argv
    .options({
      key: {
        alias: 'k',
        describe: 'Generate token with provided --key flag',
        default: ['APP_TOKEN'],
      },
    })
    .array('key').argv;

  args.key.forEach((key) => {
    config[key] = generateToken();
  });

  writeToFile(config);
}

bootstrap();
