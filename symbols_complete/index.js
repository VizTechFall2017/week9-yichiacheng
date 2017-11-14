var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//set up scales to position circles using the data
var scaleX = d3.scalePoint().domain(["16-19", "20-24", "25-34", "35-44", "45-54", "55-64","65+"]).range([0, 600]);
var scaleY = d3.scaleLinear().domain([0,1200]).range([400, 0]);  //remember that 0,0 is at the top of the screen! 300 is the lowest value on the y axis

var nestedData = [];

// Add the x Axis
svg.append("g")
    .attr('transform','translate(0,400)')  //move the x axis from the top of the y axis to the bottom
    .call(d3.axisBottom(scaleX));

svg.append("g")
    .call(d3.axisLeft(scaleY));


var symbolPoints = [
    {angle: 0, r0: 30, r1: 80},
    {angle: Math.PI * 0.25, r0: 30, r1: 70},
    {angle: Math.PI * 0.5, r0: 30, r1: 80},
    {angle: Math.PI * 0.75, r0: 30, r1: 70},
    {angle: Math.PI, r0: 30, r1: 80},
    {angle: Math.PI * 1.25, r0: 30, r1: 70},
    {angle: Math.PI * 1.5, r0: 30, r1: 80},
    {angle: Math.PI * 1.75, r0: 30, r1: 70},
    {angle: Math.PI * 2, r0: 30, r1: 80}
];

var makeSymbol = d3.radialArea()//改變圓的形狀
    .angle(function(d) {//開始畫裡面的東西
        return d.angle;
    })
    .innerRadius(function(d) {
        return d.r0;
    })
    .outerRadius(function(d) {
        return d.r1;
    });

var symbolData = makeSymbol(symbolPoints);//定義形狀跟資料數據定應為點點

//import the data from the .csv file
d3.csv('./incomeData.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);

    var loadData = dataIn;

    svg.append('text')
        .text('Weekly income by age and gender')
        .attr('transform','translate(300, -20)')
        .style('text-anchor','middle');

    svg.append('text')
        .text('age group')
        .attr('transform','translate(260, 440)');

    svg.append('text')
        .text('weekly income')
        .attr('transform', 'translate(-50,250)rotate(270)');

    // Add a group for each symbol to live in
    var symbol = svg.selectAll('.symbolGroups')
        .data(loadData)
        .enter()
        .append("g")
        .attr('class','symbolGroups')
        .attr('transform', function(d){
            return 'translate('+ scaleX(d.age) +','+ scaleY(d.women) +')'
        });//將形狀對應資料的數據，對應x,y軸

    symbol.append('path')//形狀對應什麼？多大？什麼顏色？
        .attr('d',symbolData)
        .attr('fill', "gray")
        .attr('transform','scale(.1)');//大小
});



