import { Injectable } from '@nestjs/common';
import { ethers } from "ethers";
import { abi } from "./abi/contract.json"; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Contract {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private operatorPrivate: string;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const providerUrl = this.configService.get<string>('PROVIDER_URL');
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    const operatorPrivate = this.configService.get<string>('OPERATOR_PRIVATE');
    if (!providerUrl || !contractAddress || !operatorPrivate) {
      throw new Error('Missing required environment variables');
    }
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
    this.operatorPrivate = operatorPrivate;
  }

  async getBalanceOf(userAddress: string): Promise<any> {
    return await this.contract.getBalanceOf(userAddress);
  }

  async rewardUser(userAddress: string, actionType: number): Promise<any> {
    const wallet = new ethers.Wallet(this.operatorPrivate, this.provider);
    const signer = this.provider.getSigner(wallet.address);
    const contractWithSigner = this.contract.connect(await signer) as any; 
    return await contractWithSigner.rewardUser(userAddress, actionType);
  }

  async getRewardHistory(userAddress: string): Promise<any> {
    return await this.contract.getRewardHistory(userAddress);
  }
}
