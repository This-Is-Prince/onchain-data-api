import { ApiPromise, WsProvider } from '@polkadot/api';
import { rejectInTime } from '../utils/rejectInTime';

const nodeTimeoutSeconds = 20;

interface IChainApis {
  [key: string]: INodeInfo[]
}
interface INodeInfo {
  api: ApiPromise;
  endpoint: string;
}
/**
 *
 * @type {
 *   network: [
 *     {
 *       endpoint,
 *       api
 *     },
 *   ]
 * }
 */
const chainApis: IChainApis = {};

async function reConnect(network: string, endpoint: string, logger = console) {
	const nowApis = chainApis[network] || [];

	const index = nowApis.findIndex(({ endpoint: url }) => url === endpoint);
	if (index >= 0) {
		const [targetApi] = nowApis.splice(index, 1);
		if (targetApi && targetApi.api) {
			await targetApi.api.disconnect();
		}
	}

	console.log(`re-connect network: ${ network } with endpoint: ${ endpoint }`);
	await createApi(network, endpoint);
	logger.info(`Reconnect to ${ network } ${ endpoint }`);
}

async function createApi(network: string, endpoint: string, logger = console) {
	const provider = new WsProvider(endpoint, 100);

	let api;
	try {
		api = await ApiPromise.create({ provider });
	} catch (e) {
		logger.error(`Can not connect to ${ network } ${ endpoint }`);
		throw e;
	}

	api.on('error', () => {
		reConnect(network, endpoint, logger);
	});
	api.on('disconnected', () => {
		reConnect(network, endpoint, logger);
	});

	const nowApis = chainApis[network] || [];
	if (nowApis.findIndex((api) => api.endpoint === endpoint) >= 0) {
		logger.info(`${ network } ${ endpoint } existed, ignore`);
		return;
	}

	const nodeInfo: INodeInfo = {
		api: await api.isReady,
		endpoint
	};
	chainApis[network] = [...nowApis, nodeInfo];
}

async function createApiInLimitTime(network: string, endpoint: string, logger = console) {
	return Promise.race([
		createApi(network, endpoint, logger),
		rejectInTime(nodeTimeoutSeconds)
	]);
}

async function createApiForChain(chain: string, endpoints: string[], logger = console) {
	for (const endpoint of endpoints) {
		if (!endpoint) {
			continue;
		}

		try {
			await createApiInLimitTime(chain, endpoint);
			console.log(`${ chain }: ${ endpoint } created!`);
		} catch (e) {
			logger.info(
				`Can not connected to ${ endpoint } in ${ nodeTimeoutSeconds } seconds, just disconnect it`
			);
		}
	}
}

function getApis(chain: string) {
	return (chainApis[chain] || []).map(({ api }) => api);
}

function logApiStatus(logger = console) {
	Object.entries(chainApis).map(([chain, apis]) => {
		logger.info(`chain: ${ chain }`);
		for (const { endpoint, api } of apis) {
			logger.info(`\t ${ endpoint } connected: ${ api.isConnected }`);
		}
	});
}

export {
	createApi,
	createApiForChain,
	createApiInLimitTime,
	getApis,
	logApiStatus
};
