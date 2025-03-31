import 'express-session';

declare module 'express-session' {
  interface SessionData {
    isAuthenticated?: boolean;
    user?: {
      name: string;
      surname: string;
    };
  }
}