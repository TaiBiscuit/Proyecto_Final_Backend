import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program
    .version('2.0.1')
    .option('-p --port <port>', 'Execution port', 3000)
    .option('-m --mode <mode>', 'Execution mode (PRODUCTION / DEVELOPMENT)', 'DEVELOPMENT')
    .option('-d --debug', 'Activate / deactivate debug', false)
    .parse(process.argv);
const cl_options = program.opts();


dotenv.config({ path: cl_options.mode == 'DEVEL' ? '../.env.development': '../.env.production' });

const config = {
    VERSION: process.env.VERSION,
    PAGE_URL: process.env.PAGE_URL,
    PORT: process.env.PORT,
    LIMIT: process.env.LIMIT,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    MODE: process.env.MODE,
}
export default config;