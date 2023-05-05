// Copyright 2019-2025 @polka-labs/townhall authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ethers } from 'ethers';
import { evmChains } from '../constants';

type TEvmProviderMap = {
	[k in keyof typeof evmChains]: (ethers.WebSocketProvider | ethers.JsonRpcProvider | undefined)[];
};

let evmProviderMap: TEvmProviderMap = {
	moonbeam: [],
	moonriver: []
};

const movrUrls = [
	'https://rpc.api.moonriver.moonbeam.network',
	'https://moonriver-alpha.api.onfinality.io/public',
	'wss://wss.api.moonriver.moonbeam.network'
];

const glmrUrls = [
	'https://rpc.api.moonbase.moonbeam.network',
	'https://moonbeam-alpha.api.onfinality.io/public',
	'wss://wss.api.moonbase.moonbeam.network',
	'wss://moonbeam-alpha.api.onfinality.io/public-ws'
];

function createProvider(url: string | ethers.FetchRequest | ethers.WebSocketLike | ethers.WebSocketCreator, network?: ethers.Networkish | undefined) {
	try {
		if (typeof url === 'string' && url.startsWith('wss')) {
			return new ethers.WebSocketProvider(url, network);
		}

		return new ethers.JsonRpcProvider(url as ethers.FetchRequest, network);
	} catch (e) {
		console.error(`Can not construct provider from ${url}, ignore`);
	}
}

const movrChainId = 1285;
const glmrChainId = 1284;
const movrNetwork = {
	chainId: movrChainId,
	name: evmChains.moonriver
};
const glmrNetwork = {
	chainId: glmrChainId,
	name: evmChains.moonbeam
};

function initProviders() {
	const movrProviders = movrUrls.map((url) => createProvider(url, movrNetwork));
	const glmrProviders = glmrUrls.map((url) => createProvider(url, glmrNetwork));
	evmProviderMap = {
		moonbeam: glmrProviders,
		moonriver: movrProviders
	};
}

function getProviders(network: keyof typeof evmChains) {
	if (!evmProviderMap) {
		initProviders();
	}

	return evmProviderMap[network] || [];
}

export {
	getProviders
};
