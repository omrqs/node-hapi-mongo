import Dotenv from 'dotenv-webpack';
import npmPackage from 'package.json';
 
export default = {
  resolve: {
    root: __dirname,
    alias: npmPackage._moduleAliases || {},
  },
  plugins: [
    new Dotenv()
  ]
};
