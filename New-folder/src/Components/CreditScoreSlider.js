import React from 'react';
import { Slider } from 'antd';

const CreditScoreSlider = ({ creditScore }) => {
    const sliderStyle = creditScore >= 60
        ? {
            trackStyle: { backgroundColor: 'green', height: 20 },
            railStyle: { backgroundColor: 'red', height: 20 }
        }
        : {
            trackStyle: { backgroundColor: 'red', height: 20 }, // Increase height here
            railStyle: { backgroundColor: 'green', height: 20 }
        };

    return (
        <>
            {creditScore > 60 && <h2>You are eligible for a loan</h2>}
            <Slider
                min={0}
                max={100}
                value={creditScore}
                {...sliderStyle}
                tooltipVisible={false}
            />
        </>
    );
};

export default CreditScoreSlider;
