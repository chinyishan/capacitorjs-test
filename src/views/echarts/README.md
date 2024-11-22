const drawTaiwan = async () => {
myChart.value = echarts.init(taiwanMap.value);
echarts.registerMap('taiwan', taiwanJSON); //注册可用的地图

const option = {
// geo: {
// map: 'taiwan',
// roam: true, //是否允許縮放，拖曳
// zoom: 1, //初始化大小
// //缩放大小限制
// scaleLimit: {
// min: 1, //最小
// max: 2, //最大
// },
// //设置中心点
// center: [121, 24],
// //省份地图添加背景
// // regions: regions,
// itemStyle: {
// areaColor: '#ffffff',
// borderColor: '#aaaa',
// borderWidth: 1,
// },
// //高亮状态
// emphasis: {
// itemStyle: {
// areaColor: '#ccc',
// },
// },
// },

    // 數據系列配置属性
    // series: {
    //   type: 'effectScatter',
    //   coordinateSystem: 'geo',
    //   // 特並座標
    //   data: scatter,
    //   showEffectOn: 'render',
    //   rippleEffect: {
    //     //涟漪特效相关配置
    //     brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
    //   },
    //   hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
    //   label: {
    //     //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
    //     normal: {
    //       formatter: '{b}',
    //       position: 'right',
    //       show: true,
    //     },
    //   },
    //   itemStyle: {
    //     //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
    //     normal: {
    //       color: '#ffffff', //散点的颜色
    //       shadowBlur: 10,
    //       shadowColor: 20,
    //       fontSize: '12px',
    //     },
    //   },
    //   zlevel: 1,
    // },

    // 拖拽顯示
    tooltip: {
      trigger: 'item',
      formatter: '{b} 000',
    },

};
myChart.value.setOption(option);
};
