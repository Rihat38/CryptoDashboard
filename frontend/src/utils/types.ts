export interface ICurrencyInfo {
    name: string,
    symbol: string,
    vs_currency: string
    marketCap: number,
    volume: number,
    time: Date,
    price: number,
    open: number,
    low: number,
    high: number,
    close: number
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

