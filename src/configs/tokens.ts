import { Address } from 'viem';
import { ChainId } from './chains';

export const wethAddresses: Record<ChainId, Address> = {
  [ChainId.Mainnet]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [ChainId.Arbitrum]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [ChainId.Sepolia]: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
  [ChainId.ArbitrumSepolia]: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
};
