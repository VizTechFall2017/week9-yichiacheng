
var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var donutWidth = 75;

var marginLeft = 100;
var marginTop = 100;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');//圓的位置

var pieX = width/2 - marginLeft; //圓的位置
var pieY = height/2 - marginTop;//還是圓的位置

var pieGroup = svg.append('g')
    .attr('transform', 'translate(' + pieX + ',' + pieY + ')');

//set up scales to position circles using the data
var scaleColor = d3.scaleOrdinal().domain(["walk or bike", "public transportation", "car, truck or van",'others']).range(["#eaa158","#d46b00","#984500",'#FF8C00']);
//var scaleY = d3.scaleLinear().domain([0,1200]).range([400, 0]);  //remember that 0,0 is at the top of the screen! 300 is the lowest value on the y axis




var pieRadius = 200;//圓的大小是兩百

var makeArc = d3.arc()//arc是圓切出來的那部分
    .outerRadius(pieRadius)//radius圓周部分，分內外
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(pieRadius - 150)//字離中心的位置
    .innerRadius(pieRadius);

var makePie = d3.pie()
    .sort(null)//could do sort function to order, ex: from big value to small value
    .value(function(d) { return d.total; });

//import the data from the .csv file
d3.csv('./commuteways.csv', function(dataIn){



    var loadData = dataIn;

    svg.append('text')//標題的位置
        .text('Commute Ways')
        .attr('transform','translate(300, -20)')
        .style('text-anchor','middle');


    // make a group for each arc, which will contain the path for the arc
    var g = pieGroup.selectAll('.arc')
        .data(makePie(loadData))   //makePie makes sure that one arc gets added for each data object in the array
        .enter()
        .append('g')//one value fill in each arc as a group
        .attr('class','arc');

    g.append('path')              //grab each group in the variable above, and add a path to it (this will be the pie wedge)
        .attr('d',makeArc)        //call the makeArc generator function to draw the actual wedges
        .attr('fill', function(d){ return scaleColor(d.data.total)});   //give the wedges a color, based on their d.age values


    g.append("text")//text的內容位置等細節
        .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })//找出每塊餅的中心，以中心為基礎放字
        .attr("dy", ".55em")//字離圓周的距離
        .attr('text-anchor','middle')//確認字在每塊餅的中間
        .text(function(d) { return d.data.ways; });//給資料庫中的年紀範圍為每塊餅的文字
});





