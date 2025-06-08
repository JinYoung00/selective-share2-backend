import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController;
  let appService;

  beforeEach(async () => {

    const mockAppService = {
      getBalanceOf: jest.fn().mockResolvedValue('1000000000000000000'),
      rewardUser: jest.fn().mockResolvedValue({ success: true }),
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = moduleRef.get(AppController);
    appService = moduleRef.get(AppService);
  });

  describe('getBalanceOf', () => {
    it('should return the token balance of a user', async () => {
      const userAddress = '0x1111111111111111111111111111111111111111';
      const result = await appController.getBalanceOf(userAddress);
      expect(result).toBe('1000000000000000000');
      expect(appService.getBalanceOf).toHaveBeenCalledWith(userAddress);
    });
  });

  describe('rewardUser', () => {
    it('should call AppService.rewardUser with correct parameters', async () => {
      const userAddress = '0x2222222222222222222222222222222222222222';
      const body = { type: 1, signature: '0xdeadbeef' };

      const result = await appController.rewardUser(userAddress, body);
      expect(result).toEqual({ success: true });
      expect(appService.rewardUser).toHaveBeenCalledWith(
        userAddress,
        body.type,
        body.signature
      );
    });
  });
});
