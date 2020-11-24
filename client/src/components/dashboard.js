import React, { useState } from 'react';
import io from "socket.io-client"
import { Link } from "react-router-dom";

import StocksList from "./StocksList";
import StocksGraph from "./StocksGraph";

let socket;
const ENDPOINT = 'https://stock-live-app.herokuapp.com/';

export default function DashBoard() {
    const [ stocks, setStocks ] = React.useState({})
    const [ marketTrend, setMarketTrend ] = React.useState({})

    const processMarketTrend = (up_count, down_count) => {
        if (up_count === down_count) return undefined;
        return up_count > down_count ? 'up' : 'down'
    }

    const processData = (data) => {
        let result = JSON.parse(data.data);
        let [ up_values_count, down_values_count ] = [ 0, 0 ];

        // time stored in histories should be consisitent across stocks(better for graphs)
        let current_time = Date.now();
        let new_stocks = stocks
        result.map((stock) => {
            // stock = ['name', 'value']
            if (stocks[stock[0]]) {
                new_stocks[stock[0]].current_value > Number(stock[1]) ? up_values_count++ : down_values_count++;
                new_stocks[stock[0]].current_value = Number(stock[1])
                new_stocks[stock[0]].history.push({ time: current_time, value: Number(stock[1]) })
            }
            else {
                new_stocks[stock[0]] = { current_value: stock[1], history: [{ time: Date.now(), value: Number(stock[1]) }], is_selected: false }
            }
        });
        setStocks(new_stocks)
        setMarketTrend(processMarketTrend(up_values_count, down_values_count))
    }
    const toggleStockSelection = (stock_name) => {
        let new_stocks = stocks;
        new_stocks[stock_name].is_selected = !new_stocks[stock_name].is_selected
        setStocks(new_stocks)
    }

    const resetData = () => {
        let new_stocks = stocks;
        Object.keys(stocks).map((stock_name, index) => {
            new_stocks[stock_name].history = [new_stocks[stock_name].history.pop()];
        });
        setStocks(new_stocks)
    }

    const areStocksLoaded = () => {
        console.log("stocks: ", stocks)
        return Object.keys(stocks).length > 0;
    }
    React.useEffect(() => {
        socket = io(ENDPOINT)
        socket.on('newData', data => {
            data = JSON.parse(data)
            //data.data = JSON.parse(data.data)
            console.log("new data arrived: ", data)
            processData(data)
        })
    }, [])
    return (
        <div className=''>
            <div className='row no-gutters align-items-center'>
                <div className="col-12 col-md-4 p-3">
                    <StocksList
                        stocks={stocks}
                        toggleStockSelection={toggleStockSelection}
                        resetData={resetData}
                        market_trend={marketTrend}
                        areStocksLoaded={areStocksLoaded}
                    />
                </div>
                <div className="col-12 col-md-8 p-3">
                    <StocksGraph stocks={stocks} />
                </div>
            </div>
        </div>
    );
}
