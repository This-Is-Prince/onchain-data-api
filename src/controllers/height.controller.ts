import { RequestHandler } from "express";
import { chains, evmChains } from "../utils/constants";
import { getEvmHeight } from "../utils/evmChain";
import { getHeight } from "../utils/chain";


const height: RequestHandler<{
    chain: string;
}> = async (req, res) => {
    const { chain } = req.params;
    const { time } = req.query;
    console.log(chain, time);
    let heightTime = {
        height: 0,
        time: 0
    };
    if (Object.keys(chains).includes(chain) === false && Object.keys(evmChains).includes(chain) === false) {
        res.json(heightTime);
        return;
    }
    try {
        if (Object.keys(evmChains).includes(chain)) {
            heightTime = await getEvmHeight(chain as keyof typeof evmChains, Number(time));
        } else {
            heightTime = await getHeight(chain as keyof typeof chains, Number(time));
        }
        res.json(heightTime)
    } catch (error) {
        res.json(error);
    }
};

export {
    height
}