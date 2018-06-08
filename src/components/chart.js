import React from 'react'
import Highcharts from 'highcharts'
import Vote_count from './vote_count'
import Say_count from './say_count'

var vote = new Vote_count();
//console.log("输出vote方法： "+ vote.count());

var chart = null

var countrys = ["俄罗斯","德国","巴西","葡萄牙","阿根廷","比利时","波兰","法国","西班牙","秘鲁","瑞士",
"英格兰","哥伦比亚","墨西哥","乌拉圭","克罗地亚","丹麦","冰岛","哥斯达黎加","瑞典","突尼斯","埃及","塞内加尔",
"伊朗","塞尔维亚","尼日利亚","澳大利亚","日本","摩洛哥","巴拿马","韩国","沙特阿拉伯"];

// if (chart) {
//             chart.series[1].update(
//                 {name: '球队支持数量',
//             data: c_map
//         });
//         }

export default class myChart extends React.Component {
    
    randerChart = () => {
        var v_count = new Vote_count();
        var say_votecount = new Say_count();
        //var new_data = null
        var c_map = v_count.count(function(err, new_data) {
            if (err) {
                console.log(err);
                return;
            }
            //console.log(new_data);
            if (chart) {
                chart.series[1].update(
                    {
                        name: '球队支持数',
                        data: new_data
                    });
            }
        });
        var b_map = say_votecount.count(function(err, new_data1) {
            if (err) {
                console.log(err);
                return;
            }
            //console.log(new_data1);
            if (chart) {
                chart.series[0].update(
                    {
                        name: '球队热度',
                        data: new_data1
                    });
            }
        })
        //console.log("cb:" + c_map);
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column'
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ["俄罗斯","德国","巴西","葡萄牙","阿根廷","比利时","波兰","法国","西班牙","秘鲁","瑞士",
      "英格兰","哥伦比亚","墨西哥","乌拉圭","克罗地亚","丹麦","冰岛","哥斯达黎加","瑞典","突尼斯","埃及","塞内加尔",
    "伊朗","塞尔维亚","尼日利亚","澳大利亚","日本","摩洛哥","巴拿马","韩国","沙特阿拉伯"]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total'
                },
                allowDecimals:false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: '球队热度',
            }, {
                name: '球队支持数',
            }]
        });

        //console.dir(chart);
    }

    componentDidMount() {
        //console.log("vote_counts: " + vote_counts);
        this.randerChart()
    }

    render() {
        return (
            <div id="container" className="chart-box">

            </div>
        )
    }
}