import React from 'react'

class MarketTrendArrow extends React.Component {

    getArrow = () => {
        if (this.props.current_trend === 'up') {
            return <span className='text-success'>&#8679;</span>
        }
        else if (this.props.current_trend === 'down') {
            return <span className='text-danger'>&#8681;</span>
        }
        else {
            return '-';
        }
    }

    render() {
        return (
            <span title='Market trend' className={"icon market-trend"}>
                {this.getArrow()}
            </span>
        );
    }
}

export default MarketTrendArrow;