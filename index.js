
const canvas = d3.select('.canva')
const svg = canvas.append('svg')
                  .attr('width', window.innerWidth)
                  .attr('height', window.innerHeight)
//Margin
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

// Set Arcs              
const redArcAngle = d3.arc()
            .innerRadius( graphWidth/10)
            .outerRadius( graphWidth/10 + graphHeight/20)
            .startAngle(-Math.PI/8)     
            .endAngle(-Math.PI/3)   

const yellowArcAngle = d3.arc()
            .innerRadius( graphWidth/10)
            .outerRadius( graphWidth/10 + graphHeight/20)
            .startAngle(Math.PI/8)     
            .endAngle(-Math.PI/8) 

const greenArcAngle = d3.arc()
            .innerRadius( graphWidth/10)
            .outerRadius( graphWidth/10 + graphHeight/20)
            .startAngle(Math.PI/3)     
            .endAngle(Math.PI/8) 


//Placement of Gauges            
var Ax = 0 , Ay = 0
function alignTranslation(i) { 
  let Ax = i*graphWidth/5 
  if(i % 2 != 0){
    Ax = (i-1)*graphWidth/5
    Ay = graphHeight/2}
  else
    Ay = 0
    
		return 'translate('+ Ax +','+ Ay +')';
	}

//CSV Data                
function getCSVData() {
  d3.csv('/data.csv', function(d){
    return d;
  }).then(drawChart);}

  getCSVData();

function drawChart(data){
  //Data
  const arrayOfRate = data.map(d => parseFloat(d.IMDB_Rating))
  console.log(arrayOfRate)
  const min = d3.min(arrayOfRate)
  const max = d3.max(arrayOfRate)
  console.log(min ,max)

  //Paths Graph
  const pathsgraph = mainCanvas.selectAll('g')
      .data(data)
      .enter()
      .append('g')

  //The Gauges
  const redPaths = pathsgraph
           .append('path')
           .attr('transform', (d, i) => alignTranslation(i))
           .attr('d', redArcAngle)
           .attr('stroke', 'gray')
           .attr('fill', 'red');

  const yellowPaths = pathsgraph
           .append('path')
           .attr('transform', (d, i) => alignTranslation(i))
           .attr('d', yellowArcAngle)
           .attr('stroke', 'gray')
           .attr('fill', 'yellow');

  const greenPaths = pathsgraph
           .append('path')
           .attr('transform', (d, i) => alignTranslation(i))
           .attr('d', greenArcAngle)
           .attr('stroke', 'gray')
           .attr('fill', 'green');

  //The Arows

  //Text-title
  var titleText = pathsgraph
    .append('text') 
    .html(d => d.Tv_Series)
    .attr('text-anchor','middle')
    .attr('fill','gray')
    .attr('font-size','2.5vh')
    .attr('x',function (d, i) {
      if(i % 2){
        return (i-1)*graphWidth/5
      }
      return i*graphWidth/5 
    })
    .attr('y',function (d, i)  {
    if(i % 2 != 0){
        return  graphHeight/2 + graphWidth/16}
    else return 0 + graphWidth/16
          })
  //Text-amount
}
