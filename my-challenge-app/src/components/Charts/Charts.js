import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { chartDefault } from '../../constants/chartsInstanci.js';

import './Charts.css';

class Chart extends React.Component {

	constructor(props) {
		super(props);
		this.chartRef = [];
		this.legendRef = [];
	}

	componentDidUpdate(prevProps, prevState) {
		for (let i = 0; i < this.chartRef.length; i++)
			if (this.chartRef[i] && this.legendRef[i])
				this.legendRef[i].innerHTML = this.chartRef[i].chartInstance.generateLegend();
	}

	render() {

		const { eventStreamList } = this.props;

		return (
			<>
				{eventStreamList.getList().map((v, k) => {

					const data = {
						datasets: v.datasets.toChartFormat()
					};

					return (
						<div className="chart-wrapper" key={k}>
							<div className="line-chart-wrapper">
								<Line
									data={data}
									width={600}
									height={265}
									key={k}
									ctx={undefined}
									options={chartDefault}
									ref={ref => this.chartRef[k] = ref} />
							</div>
							<div
								className="legend-wrapper"
								ref={ref => this.legendRef[k] = ref}>
							</div>
						</div>
					);

				})}
			</>
		);
	}
};

Chart.propTypes = {
	eventStreamList: PropTypes.object.isRequired
};

export default Chart;
