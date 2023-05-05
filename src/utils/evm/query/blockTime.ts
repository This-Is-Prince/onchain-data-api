// Copyright 2019-2025 @polka-labs/townhall authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { evmChains } from '../../constants';
import { getProviders } from '../providers';
import { WebSocketProvider, JsonRpcProvider } from 'ethers';

async function getBlockTimeByHeightFromProvider(provider: WebSocketProvider | JsonRpcProvider | undefined, expectedHeight?: any) {
	const block = await provider?.getBlock(expectedHeight, false);
	return block? block.timestamp * 1000: 0;
}

async function getBlockTimeByHeight(network: keyof typeof evmChains, expectedHeight?: any) {
	const providers = getProviders(network);
	return Promise.any(
		providers.map((provider) =>
			getBlockTimeByHeightFromProvider(provider, expectedHeight)
		)
	);
}

export {
	getBlockTimeByHeight
};
