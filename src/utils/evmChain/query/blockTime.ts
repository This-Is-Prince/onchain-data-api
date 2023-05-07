import { evmChains } from '../../constants';
import { WebSocketProvider, JsonRpcProvider } from 'ethers';
import { getProvidersForEvmChain } from '../apis';

async function getBlockTimeByHeightFromProvider(provider: WebSocketProvider | JsonRpcProvider, expectedHeight?: any) {
	const block = await provider.getBlock(expectedHeight, false);
	return block? block.timestamp * 1000: 0;
}

async function getBlockTimeByHeight(network: keyof typeof evmChains, expectedHeight?: any) {
	const providers = getProvidersForEvmChain(network);

	const promises = [];
	for (const provider of providers) {
		if (provider) {
			promises.push(getBlockTimeByHeightFromProvider(provider, expectedHeight));
		}
	}

	return Promise.any(promises);
}

export {
	getBlockTimeByHeight
};
