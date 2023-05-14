export interface ICurrencyInfo {
    name: string,
    symbol: string,
    vs_currency: string
}

export interface ICurrency {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_24h: number;
    market_cap_change_24h: number;
    circulating_supply: number;
    last_updated: string;
}

export  interface ICurrencyOHLC {
    name: string,
    time: string,
    price: number
}
