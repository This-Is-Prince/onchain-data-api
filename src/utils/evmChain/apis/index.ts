import { ethers } from "ethers";
import { evmChains } from "../../constants";

type TEvmProviderMap = {
	[k in keyof typeof evmChains]: (ethers.WebSocketProvider | ethers.JsonRpcProvider | undefined)[];
};

const evmProviderMap: TEvmProviderMap = {
    moonbeam: [],
    moonriver: []
};

function createProvider(url: string | ethers.FetchRequest | ethers.WebSocketLike | ethers.WebSocketCreator, network: ethers.Networkish) {
	try {
		if (typeof url === 'string' && url.startsWith('wss')) {
			return new ethers.WebSocketProvider(url, network);
		}

		return new ethers.JsonRpcProvider(url as ethers.FetchRequest, network);
	} catch (e) {
		console.info(`Can not construct provider from ${url}, ignore`);
	}
}

async function createProviderForEvmChain(chain: keyof typeof evmChains, chainId: number , endpoints: string[], logger = console) {
    for (const endpoint of endpoints) {
		if (!endpoint) {
			continue;
		}

		try {
			const provider = createProvider(endpoint, {
                chainId: chainId,
                name: chain
            })
            if (provider) {
                console.info(`${ chain }: ${ endpoint } created!`);
                if (!evmProviderMap[chain] || !Array.isArray(evmProviderMap[chain])) {
                    evmProviderMap[chain] = [];
                }
                evmProviderMap[chain].push(provider);
            } else {
                console.info(`${ chain }: ${ endpoint } provider is undefined!`);
            }
		} catch (e) {
			logger.info(
				`Can not connected to ${ endpoint } in x seconds, just disconnect it`
			);
		}
	}
}

function getProvidersForEvmChain(chain: keyof typeof evmChains) {
    return evmProviderMap[chain];
}

export {
    createProviderForEvmChain,
    getProvidersForEvmChain
};