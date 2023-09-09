
const canvas = d3.select('.canva')
const svg = canvas.append('svg')
                  .attr('width', window.innerWidth)
                  .attr('height', window.innerHeight)

const margin =
  {
    top: 20,
    right: 60,
    bottom: 20,
    left: 60
  };

const pie = d3.pie()
         .sort(null)
         .value(data => data)   
  

const arcPath = d3.arc()
        .outerRadius(200)
        .innerRadius(100)

const graphWidth = window.innerWidth - margin.left - margin.right;
const graphHeight = window.innerHeight - margin.top - margin.bottom;

const mainCanvas = svg.append('g')
                .attr('height', graphHeight /2)
                .attr('width', graphWidth / 2)
                .attr('transform',`translate(${margin.left + graphWidth/2},${margin.top + graphHeight/2})`);



function getCSVData() {
  d3.csv('/data.csv', function(d){
    return d;
  }).then(drawChart);}

  getCSVData();

const solidPie = {}
function drawChart(data){
  const arrayOfRate = data.map(d => parseFloat(d.IMDB_Rating))
  console.log(arrayOfRate)
  const min = d3.min(arrayOfRate)
  const max = d3.max(arrayOfRate)
  console.log(min ,max)

  const angles = pie();
  
  //create path and pie on screen
  const paths = mainCanvas.selectAll('path')
                          .data(angles)

  paths.enter()
        .append('path')
        .attr('class', 'arc')
        .attr('stroke', '#cde')
        .attr('fill', 'black')
        .attr('d', arcPath)

  

}
