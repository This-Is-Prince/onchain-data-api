import { RequestHandler } from "express";
import { chains, evmChains } from "../utils/constants";
import { getBalance } from "../utils/chain";
import { getEvmBalance } from "../utils/evmChain";


const balance: RequestHandler<{
    chain: string;
}> = async (req, res) => {
    const { chain } = req.params;
    const { address, height } = req.query;
    let balance = {
        free: 0,
        reserved: 0
    };
    if (Object.keys(chains).includes(chain) === false && Object.keys(evmChains).includes(chain) === false) {
        res.send(balance);
        return;
    }
    try {
        if (Object.keys(evmChains).includes(chain)) {
            const evmBalance = await getEvmBalance(chain as keyof typeof evmChains, String(address), Number(height));
            balance.free = evmBalance as any;
        } else {
            balance = await getBalance(chain as keyof typeof chains, String(address), Number(height));
        }
        res.send(balance)
    } catch (error) {
        res.send(error);
    }
};

export {
    balance
}