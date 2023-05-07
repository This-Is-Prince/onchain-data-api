import { ApiPromise } from "@polkadot/api";
import { getBlockApi } from "../../apis/query/block";

async function getBalanceFromOneApi(api: ApiPromise, address: string, blockHashOrHeight: string |  number): Promise<{
    free: any,
    reserved: any,
}> {
    let blockApi = await getBlockApi(api, blockHashOrHeight);
  
    if (blockApi.query.system?.account) {
      const account = await blockApi.query.system.account(address);
      return (account.toJSON() as any)?.data;
    }
  
    if (blockApi.query.balances) {
      const free = await blockApi.query.balances.freeBalance(address);
      const reserved = await blockApi.query.balances.reservedBalance(address);
      return {
        free: free.toJSON(),
        reserved: reserved.toJSON(),
      };
    }
  
    return {
      free: 0,
      reserved: 0,
    };
}

async function getFinalizedBalanceFromApis(apis: ApiPromise[], address: string, blockHashOrHeight: string | number) {
    const promises: Promise<{
        free: any,
        reserved: any,
      }>[] = [];
    for (const api of apis) {
        promises.push(getBalanceFromOneApi(api, address, blockHashOrHeight));
    }
  
    return Promise.any(promises);
}

export {
    getFinalizedBalanceFromApis
}