import { PremiumAccess } from './premium-access.enum';

export interface CurrentUser {
  key: string;
  username: string;
  paidMethods: PremiumAccess[];
}
