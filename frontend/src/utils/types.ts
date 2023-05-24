export interface ICurrencyInfo {
    name: string,
    symbol: string,
    vs_currency: string
}

export interface ICurrencyMarketData {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_percentage_24h: number;
    circulating_supply: number;
    last_updated: string;
    high_24h: number;
    low_24h: number;
    total_supply: number;
    max_supply: number;
}

export interface ICurrencyOHLC {
    name: string,
    time: string,
    price: number
}

export interface ICurrencyDetailed {
    id: string,
    symbol: string,
    name: string,
    description: { en: string, ru: string },
    links: ICurrencyLinks,
    image: {
        thumb: string,
        small: string,
        large: string
    },
    market_cap_rank: number,
    last_updated: string
}

export interface ICurrencyLinks {
    homepage: string[],
    blockchain_site: string[],
    official_forum_url: string[],
    subreddit_url: string,
    repos_url: {
        github: string[],
        bitbucket: string[],
        [key: string]: string[],
    }
}
