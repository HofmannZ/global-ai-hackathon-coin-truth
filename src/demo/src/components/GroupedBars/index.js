import React from 'react';
import PropTypes from 'prop-types';

// Data
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

// Material UI
import {
  black,
  red,
  green,
  blue,
  pink,
} from 'material-ui/styles/colors';

import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from 'react-stockcharts';

const { CandlestickSeries, BarSeries, LineSeries, AreaSeries } = series;
const { discontinuousTimeScaleProvider } = scale;

const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;
const { EdgeIndicator } = coordinates;

const { OHLCTooltip, MovingAverageTooltip } = tooltip;
const { XAxis, YAxis } = axes;
const { ema, sma, heikinAshi } = indicator;
const { fitWidth } = helper;

class GroupedBars extends React.Component {
	render() {
		const { data, type, width, ratio } = this.props;

		const ha = heikinAshi();
		const ema20 = ema()
			.id(0)
			.windowSize(20)
			.merge((d, c) => { d.ema20 = c; })
			.accessor(d => d.ema20);

		const ema50 = ema()
			.id(2)
			.windowSize(50)
			.merge((d, c) => {d.ema50 = c})
			.accessor(d => d.ema50);

		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
					margin={{left: 80, right: 80, top:10, bottom: 30}} type={type}
					seriesName="MSFT"
					data={data} calculator={[ha, ema20, ema50]}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[new Date(2017, 4, 1), new Date(2017, 5, 1)]}>
				<Chart id={1} yExtents={[d => d.impact_count]}>
          <XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.impact_count} fill={blue[500]} />

					<CurrentCoordinate yAccessor={d => d.impact_count} fill={blue[500]} />

					<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={d => d.impact_count} displayFormat={format(".4s")} fill={blue[500]}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.impact_count} displayFormat={format(".4s")} fill={blue[500]}/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

GroupedBars.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

GroupedBars.defaultProps = {
	type: "svg",
};

GroupedBars = fitWidth(GroupedBars);

export default GroupedBars;
