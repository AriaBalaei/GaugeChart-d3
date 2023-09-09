
const canvas = d3.select('.canva')
const svg = canvas.append('svg')
                  .attr('width', window.innerWidth)
                  .attr('height', window.innerHeight)

const margin =
  {
    top: 0,
    right: 60,
    bottom: 20,
    left: 60
  };

const graphWidth = window.innerWidth - margin.left - margin.right;
const graphHeight = window.innerHeight - margin.top - margin.bottom;

const mainCanvas = svg.append('g')
                .attr('height', graphHeight /2)
                .attr('width', graphWidth / 2)
                .attr('transform',`translate(${margin.left + graphWidth/10 },${margin.top + graphHeight/3})`);

const arcAngle = d3.arc()
            .innerRadius( graphWidth/10)
            .outerRadius( graphWidth/10 + graphHeight/20)
            .startAngle(Math.PI/3)     
            .endAngle(-Math.PI/3)   

var Ax = 0 , Ay = 0

function alignTranslation(i) { 
  let Ax = i*graphWidth/5 
  if(i % 2){
    Ax = (i-1)*graphWidth/5
    Ay = graphHeight/2}
  else
    Ay = 0
    
		return 'translate('+ Ax +','+ Ay +')';
	}

var myColor = d3.scaleLinear().domain([1,10])
                .range(["red", "green"])

function getCSVData() {
  d3.csv('/data.csv', function(d){
    return d;
  }).then(drawChart);}

  getCSVData();

function drawChart(data){
  const arrayOfRate = data.map(d => parseFloat(d.IMDB_Rating))
  console.log(arrayOfRate)
  const min = d3.min(arrayOfRate)
  const max = d3.max(arrayOfRate)
  console.log(min ,max)

  
  var alignTx = alignTranslation();


  const pathsgraph = mainCanvas.selectAll('g')
      .data(data)
      .enter()
      .append('g')

// console.log(alignTx)
 
  const paths = pathsgraph
           .append('path')
           .attr('transform', (d, i) => alignTranslation(i))
           .attr('d', arcAngle)
           .attr('stroke', 'gray')
           .attr('fill', (d, i) => myColor());


}
