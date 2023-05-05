import { RequestHandler } from "express";
import { chains, evmChains } from "../utils/constants";
import * as evm from "../utils/evm";
import { getHeight } from "../utils/chain";

const height: RequestHandler<{
    time: string;
    chain: string;
}> = async (req, res) => {
    const { chain, time } = req.params;
    let heightTime = {
        height: 0,
        time: 0
    };
    if (Object.keys(evmChains).includes(chain)) {
        heightTime = await evm.getHeight(chain as keyof typeof evmChains, Number(time));
    } else {
        heightTime = await getHeight(chain as keyof typeof chains, Number(time));
    }
    res.send(heightTime)
};

export {
    height
}