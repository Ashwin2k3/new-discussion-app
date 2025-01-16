import authRoutes from './auth.js';
import messageRoutes from './messages.js';
import queryRoutes from './queries.js';
import eventRoutes from './events.js';

const routes = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/queries', queryRoutes);
  app.use('/api/events', eventRoutes);
};

export default routes;