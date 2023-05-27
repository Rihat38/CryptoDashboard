import {RootState} from "../store";
import {ICurrencyMarketData} from "../../utils/types";

export const getBestCurrencies = (state: RootState) => [...state.currencies.currencies!].sort((a,b)=>b.market_cap-a.market_cap).slice(0,3)
export const getCurrencyById = (state: RootState, id: string): ICurrencyMarketData | undefined => [...state.currencies.currencies!].find(el=>el.id === id) || undefined
export const getCurrenciesWithKey = (state: RootState): any => state.currencies.currencies!.map(el=>({...el,key: el.id}))