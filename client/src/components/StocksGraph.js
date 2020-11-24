import React from 'react'
import { Line } from 'react-chartjs-2';
import { chartJsConfig, chartColors, chartDataset } from '../chartConfig.js'

class StocksGraph extends React.Component {

    // too big a function?
    updateChart = () => {
        let chart = this.refs.chart.chartInstance;

        if (Object.keys(this.props.stocks).length === 0) {
            chart.data.datasets = [];
            return chart.update();
        }

        Object.keys(this.props.stocks).map((stock_name, index) => {
            let current_stock = this.props.stocks[stock_name];
            let chart_dataset = chart.data.datasets.find((dataset) => {
                return dataset.label === stock_name.toUpperCase()
            });

            if (current_stock.is_selected) {
                let current_stock = this.props.stocks[stock_name];
                if (chart_dataset) {
                    // only update the data, don't create a new dataset for the graph
                    chart_dataset.data = this.getStockValues(current_stock);
                }
                else {
                    // create a new dataset for graph
                    if (current_stock) {
                        chart.data.datasets = chart.data.datasets.concat(
                            [
                                chartDataset(stock_name, chartColors[index], this.getStockValues(current_stock))
                            ]
                        )
                    }
                }
            }
            else {
                if (chart_dataset) {
                    // remove the dataset from graph
                    chart.data.datasets.splice(chart.data.datasets.indexOf(chart_dataset), 1);
                }
            }
            chart.update();
        })
    }

    componentDidUpdate = () => {
        this.updateChart();
    }

    // returns an array of objects, {t: timestamp, y: value}
    getStockValues = (stock) => {
        return stock.history.map((history) => {
            return { t: new Date(history.time), y: history.value };
        })
    }

    render() {
        return (
            <div>
                <div>
                    <p>
                        {
                            this.refs.chart && this.refs.chart.chartInstance.data.datasets.length === 0 && 'Click on any stocks on your left to see graphs.'
                        }
                    </p>
                    
                    <Line
                        data={{ datasets: [] }}
                        options={chartJsConfig}
                        ref='chart'
                    />
                </div>
            </div>
        );
    }
}

export default StocksGraph;