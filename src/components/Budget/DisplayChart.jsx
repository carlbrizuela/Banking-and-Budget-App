import { PieChart, pieArcLabelClasses} from "@mui/x-charts";
import "bootstrap/dist/css/bootstrap.min.css"

function DisplayChart(props) {

   const { data, setShowChart} = props

	function onClick(){
		setShowChart(false)
	}

	const sizing = {
		margin: { right: 5 },
      width: 800,
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
		<div className="modal" style={{ display: "block" }} >
         <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content h-50">
            <div className='modal-header d-flex flex-row justify-content-between w-100'>
               <h3>Chart</h3>
               <span className="closeButton fs-2" onClick={onClick}>&times;</span> 
            </div>
            
			<PieChart 
				series={[
					{
						outerRadius: 200,
						data,
						arcLabelMinAngle: 35,
						arcLabel: getArcLabel,
						highlightScope: { fade: 'global', highlight: 'item' },
      				faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
					},
		      ]}
          	sx={{
            	[`& .${pieArcLabelClasses.root}`]: {
              		fill: 'white',
              		fontSize: 20,
             	},
            }}
          	{...sizing}
         />
			</div>
			</div>
		</div>
   )
}

export default DisplayChart;