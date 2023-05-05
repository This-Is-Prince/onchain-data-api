// Copyright 2019-2025 @polka-labs/townhall authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { evmChains } from '../../constants';
import { getProviders } from '../providers';
import { WebSocketProvider, JsonRpcProvider } from 'ethers';

async function queryHeightFromOneProvider(provider: WebSocketProvider | JsonRpcProvider) {
	const promises = [];
	for (let i = 0; i < 2; i++) {
		promises.push(provider.getBlockNumber());
	}

	return Promise.any(promises);
}

async function getBlockNumber(network: keyof typeof evmChains) {
	const providers = getProviders(network);

	const promises = [];
	for (const provider of providers) {
		if (provider) {
			promises.push(queryHeightFromOneProvider(provider));
		}
	}

	return Promise.any(promises);
}

export {
	getBlockNumber
};
