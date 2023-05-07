import { createProviderForEvmChain } from "../evmChain/apis";
import { getEvmEndpoints } from "../evmChain/utils/evmChainEndpoints";
import { getEndpoints } from "../chain/utils/chainEndpoints";
import { createApiForChain } from "../chain/apis";

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

async function createEvmChainProviders() {
  const evmChainEndpoints = getEvmEndpoints();

  const promises = [];
  for (const { chain, endpoints, chainId } of evmChainEndpoints) {
    if ((endpoints || []).length > 0) {
      promises.push(createProviderForEvmChain(chain, chainId, endpoints));
    }
  }

  return Promise.all(promises);
}

export {
  createChainApis,
  createEvmChainProviders
}