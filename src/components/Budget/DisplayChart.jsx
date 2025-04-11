import { PieChart, pieArcLabelClasses} from "@mui/x-charts";

function DisplayChart(props) {

   const { data } = props

	const sizing = {
		margin: { right: 5 },
      width: 1000,
      height: 500,
      legend: { direction: 'column',
			position: { vertical: 'middle', horizontal: 'right' },
			padding: 0, },
   };

   const TOTAL = data.map((item) => item.value).reduce((sum, amount) => sum + amount);
   const getArcLabel = (params) => {
		if(params.value !== 0){
			const percent = params.value / TOTAL;
			return `${(percent * 100).toFixed(1)}%`;
		}
   };
	
   return(
		<div className="modal">
			<PieChart 
				series={[
					{
						outerRadius: 200,
						data,
						arcLabel: getArcLabel
					},
		      ]}
          	sx={{
            	[`& .${pieArcLabelClasses.root}`]: {
              		fill: 'white',
              		fontSize: 14,
             	},
            }}
          	{...sizing}
         />
		</div>
   )
}

export default DisplayChart;