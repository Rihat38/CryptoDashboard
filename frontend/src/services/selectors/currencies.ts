import {RootState} from "../store";

export const getBestCurrencies = (state: RootState) => [...state.currencies.currencies!].sort((a,b)=>b.market_cap-a.market_cap).slice(0,3)