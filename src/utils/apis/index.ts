import { createApiForChain } from "../polkadot-api";
import { getEndpoints } from "../polkadot-api/utils/chains";

async function createChainApis() {
    const chainEndpoints = getEndpoints();
  
    const promises = [];
    for (const { chain, endpoints } of chainEndpoints) {
      if ((endpoints || []).length > 0) {
        promises.push(createApiForChain(chain, endpoints));
      }
    }

    return Promise.all(promises);
}

export {
    createChainApis
}