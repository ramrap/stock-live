import React from 'react'
import StockRow from './StockRow'
import MarketTrendArrow from './MarketTrendArrow'

const StocksList = (props) => {
    return (
        <div>
            <div>
                <button className='btn btn-info' onClick={props.resetData}>Clear history</button>
                {props.areStocksLoaded() ? <p className='text-center p-2 pt-4'>Click on a stock to select/unselect</p> : null}
                <table className='table table-bordered m-2'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>
                                Value
                                <MarketTrendArrow current_trend={props.market_trend} />
                            </th>
                            <th>History</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(props.stocks).map((stock_name, index) => {
                            let current_stock = props.stocks[stock_name];
                            return (
                                <StockRow
                                    key={index} stock_name={stock_name}
                                    stock_data={current_stock}
                                    toggleStockSelection={props.toggleStockSelection}
                                />
                            )
                        }
                        )}
                        {props.areStocksLoaded() ? null : <tr><td colSpan='4'>No stocks loaded yet!</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StocksList;