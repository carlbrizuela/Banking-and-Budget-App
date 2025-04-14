import { PieChart, pieArcLabelClasses} from "@mui/x-charts";
import "bootstrap/dist/css/bootstrap.min.css"

function DisplayChart(props) {

   const { data, setShowChart} = props

	function onClick(){
		setShowChart(false)
	}

	const sizing = {
      width: 750,
      height: 500,
      legend: { direction: 'column',
			position: { vertical: 'middle', horizontal: 'right' },
			padding: 0, 
			itemMaxWidth: 500,
			itemWrap: true},
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
         <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content h-50">
            <div className='modal-header d-flex flex-row justify-content-center w-100 pb-1'>
               <h3>Expenses Distribution</h3>
               <span className="closeButton fs-2" onClick={onClick}>&times;</span> 
            </div>
				<h4 style={{position: "absolute", top:"70px", left:"17px"}}>Total: Php {TOTAL}</h4>
				
			<PieChart
				series={[
					{
						outerRadius: 200,
						data,
						arcLabelMinAngle: 35,
						cx: 260,
						arcLabel: getArcLabel,
						highlightScope: { fade: 'global', highlight: 'item' },
      				faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
					},
		      ]}
          	sx={{
            	[`& .${pieArcLabelClasses.root}`]: {
              		fill: 'white',
              		fontSize: 16,
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