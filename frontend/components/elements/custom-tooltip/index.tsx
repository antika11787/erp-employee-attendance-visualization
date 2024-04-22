import React, { useMemo } from 'react';
import { AgChartOptions } from 'ag-charts-community';
import HighLow from '@/data/highLow';

interface CustomTooltipProps {
    options: AgChartOptions
    color?: string
}

const CustomTooltip = (props: CustomTooltipProps) => {

    return (
        <div
            className="custom-tooltip"
            style={{ backgroundColor: props.color || '#999' }}
        >
            <p>
                <span>{HighLow[0].label}</span>
            </p>
            <p>
                <span>Early: </span> {HighLow[0].early}
            </p>
            <p>
                <span>On time: </span> {HighLow[0].ontime}
            </p>
            <p>
                <span>late: </span> {HighLow[0].late}
            </p>
        </div>
    );
};

export default CustomTooltip;
