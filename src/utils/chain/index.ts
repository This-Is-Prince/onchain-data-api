import { chains } from "../constants";
import { getApis } from "./apis";
import { getFinalizedHeightFromApis } from "./query/finalized";
import { getHeightByTime } from "./query/queryHeight";


async function getHeight(chain: keyof typeof chains, time: number) {

	const apis = getApis(chain);
	if (apis.every((api) => !api.isConnected)) {
		throw new Error('No apis connected');
	}

	const finalizedHeightTime = await getFinalizedHeightFromApis(apis);
	if (!(time)) {
		return finalizedHeightTime;
	}

	return await getHeightByTime(chain, apis, time, finalizedHeightTime);
}

export {
	getHeight
};