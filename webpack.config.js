import Dotenv from 'dotenv-webpack';
import npmPackage from 'package.json';
 
export default {
  resolve: {
    alias: npmPackage._moduleAliases || {},
  },
  plugins: [
    new Dotenv()
  ]
};
