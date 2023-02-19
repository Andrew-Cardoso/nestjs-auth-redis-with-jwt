import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { PremiumAccess } from '../interfaces/premium-access.enum';

const getPaidMethodsAvailable = (context: ExecutionContext): PremiumAccess[] =>
  context.switchToHttp()?.getRequest()?.user?.paidMethods ?? [];

export const PremiumAccessGuard = (
  ...premiumAccess: PremiumAccess[]
): Type<CanActivate> => {
  class PremiumAccessMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const userPremiumMethods = getPaidMethodsAvailable(context);
      console.log(userPremiumMethods);
      return premiumAccess.some((role) => userPremiumMethods.includes(role));
    }
  }

  const guard = mixin(PremiumAccessMixin);
  return guard;
};
