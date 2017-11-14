var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 100;
var marginTop = 100;

var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');


//these are the size that the axes will be on the screen; set the domain values after the data loads.
var scaleX = d3.scaleTime().range([0, width-2*marginLeft]);
var scaleY = d3.scaleLinear().range([(height-2*marginTop), 0]).domain([0,200]);

// Add the x Axis
svg.append("g")
    .attr('class','x-axis')
    .attr('transform','translate(0,' + (height-2*marginTop) + ')')  //move the axis to the bottom of the screen
    .call(d3.axisBottom(scaleX)); //定義x軸>設在下面


var parser = d3.timeParse("%m/%d/%Y");//跟電腦說要怎麼讀日期：日/月/年

//import the data from the .csv file
d3.csv('./daca_timeline.csv', function(dataIn){

    dataIn.forEach(function(d){
        d.date = parser(d.start_date);//從最早的日期開始讀
    });

    scaleX.domain([d3.min(dataIn.map(function(d){return d.date})), d3.max(dataIn.map(function(d){return d.date}))]);

    d3.select('.x-axis')
        .call(d3.axisBottom(scaleX).ticks(d3.timeYear.every(2)));//設時間軸的間隔

    var lines = svg.selectAll('.date-lines')
        .data(dataIn)
        .enter();

    lines //為時間分隔畫線
        .append('line')
        .attr('class', 'date-lines')
        .attr('x1',function(d){
            return scaleX (d.date);//設定x軸為時間，起始於x軸
        })
        .attr('x2', function(d){
            return scaleX (d.date);
        })
        .attr('y1', scaleY(0))
        .attr('y2', scaleY(200))//設定兩個軸的範圍
        .attr('stroke-width',1)
        .attr('stroke','gray');

    lines.append('text')
        .attr('x', function(d){
            return scaleX (d.date);
        })
        .attr('y', scaleY(200))
        .text(function(d){return d.text});

});
