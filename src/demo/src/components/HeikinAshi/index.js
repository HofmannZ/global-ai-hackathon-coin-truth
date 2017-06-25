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
  orange,
  teal,
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

class HeikinAshi extends React.Component {
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

		const smaVolume50 = sma()
			.id(3)
			.windowSize(50)
			.sourcePath("volume")
			.merge((d, c) => {d.smaVolume50 = c})
			.accessor(d => d.smaVolume50);

		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
					margin={{left: 80, right: 80, top:10, bottom: 30}} type={type}
					seriesName="MSFT"
					data={data} calculator={[ha, ema20, ema50, smaVolume50]}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[new Date(2017, 4, 1), new Date(2017, 5, 1)]}>
				<Chart id={1}
						yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor()]}
						padding={{ top: 10, bottom: 20 }}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".1f")} />

					<CandlestickSeries fill={d => d.close > d.open ? green[500] : red[500]} />
					<LineSeries yAccessor={ema20.accessor()} stroke={blue[600]}/>
					<LineSeries yAccessor={ema50.accessor()} stroke={orange[600]}/>

					<CurrentCoordinate yAccessor={ema20.accessor()} fill={blue[400]} />
					<CurrentCoordinate yAccessor={ema50.accessor()} fill={orange[400]} />

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={ema20.accessor()} fill={blue[500]}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={ema50.accessor()} fill={orange[500]}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? green[500] : red[500]}/>
					<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={ema20.accessor()} fill={blue[500]}/>
					<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={ema50.accessor()} fill={orange[500]}/>
					<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={d => d.close} fill={d => d.close > d.open ? green[500] : red[500]}/>

					<OHLCTooltip origin={[-40, 0]}/>
					<MovingAverageTooltip onClick={(e) => console.log(e)} origin={[-38, 15]}
						calculators={[ema20, ema50]}/>

				</Chart>
				<Chart id={2}
						yExtents={[d => d.volume, smaVolume50.accessor()]}
						height={150} origin={(w, h) => [0, h - 150]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? green[500] : red[500]} stoke={black} />
					<AreaSeries yAccessor={smaVolume50.accessor()} stroke={teal[600]} fill={teal[500]}/>

					<CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={teal[400]} />
					<CurrentCoordinate yAccessor={d => d.volume} fill={black} />

					<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={d => d.volume} displayFormat={format(".4s")} fill={black}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.volume} displayFormat={format(".4s")} fill={black}/>
					<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={smaVolume50.accessor()} displayFormat={format(".4s")} fill={teal[500]}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={smaVolume50.accessor()} displayFormat={format(".4s")} fill={teal[500]}/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

HeikinAshi.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

HeikinAshi.defaultProps = {
	type: "svg",
};

HeikinAshi = fitWidth(HeikinAshi);

export default HeikinAshi;
