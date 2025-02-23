import config from 'config';
import app from './app';
import logger from './api/utils/logger';

const HOST = config.get('environment.host') as string;
const PORT = config.get('environment.port') as number;
app.listen(PORT, () => logger.info(`🚀 Server running at ${HOST}:${PORT}`));
