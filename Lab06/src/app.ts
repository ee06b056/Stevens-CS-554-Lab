import express, {Application} from 'express';
const app: Application = express();
import configRoutes from './routes';

configRoutes(app);

app.listen(3000, (): void => {
    console.log('Server start on port 3000');
});