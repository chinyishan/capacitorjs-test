<template>
  <div class="dashboard-container">
    <div class="dashboard__title">
      <h2>Dashboard</h2>
      <el-button @click="actionDownload">匯出Excel檔</el-button>
    </div>
    <div class="dashboard__content">
      <div class="content__row">
        <div class="content__col content__col-month">
          <div class="monthHeader content__header">
            <h3>總店數</h3>
            <div class="monthHeader__select">
              <ul class="monthHeader__list">
                <li class="monthHeader__item">
                  <span style="background: #badc9f"></span>
                  <p>累積</p>
                </li>
                <li class="monthHeader__item">
                  <span style="background: #fed364"></span>
                  <p>各月新增</p>
                </li>
              </ul>
              <el-date-picker
                v-model="paramsAll.month"
                type="monthrange"
                start-placeholder="選擇開始月份"
                end-placeholder="選擇結束月份"
                format="YYYY/MM"
                value-format="YYYY/MM"
                :disabled-date="pickerDisabled"
                @change="changeMonthly"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="monthTabs__header">
            <ul class="monthTabs__nav">
              <li
                class="monthTabs__item"
                :class="{ active: isMonthActive == 'monthly_add' }"
                @click="fetchResource('monthly_add')"
              >
                含無人店
              </li>
              <li
                class="monthTabs__item"
                :class="{ active: isMonthActive == 'monthly_add_no_unman' }"
                @click="fetchResource('monthly_add_no_unman')"
              >
                不含無人店
              </li>
            </ul>
          </div>
          <div class="monthMain">
            <div id="monthcolumn" ref="monthcolumn"></div>
          </div>
        </div>
        <div class="content__col content__col-part">
          <div class="partHeader content__header">
            <h3>{{ areaShow ? '區域店數' : '縣市店數' }}</h3>
            <div class="partMain__select">
              <el-button
                size="small"
                style="border: transparent"
                v-if="countyShow === true"
                @click="changePartShow('area')"
              >
                <el-icon style="margin-right: 4px"><ArrowLeft /></el-icon>
                區域店數
              </el-button>
              <el-button
                size="small"
                style="border: transparent"
                v-if="areaShow === true"
                @click="changePartShow('county')"
              >
                縣市店數
                <el-icon style="margin-left: 4px"><ArrowRight /></el-icon>
              </el-button>
            </div>
          </div>
          <div class="content__main partMain">
            <div class="partMain__taiwan" ref="taiwanMap"></div>

            <!-- 區域店數 -->
            <transition name="fade">
              <div class="partMain__content" v-if="areaShow === true">
                <div class="partMain__content-area">
                  <div class="partMain__row partMain__row-select"></div>
                  <div class="partMain__row partMain__row-title">
                    <h4>選擇區域總店數</h4>
                  </div>
                  <div class="partMain__row partMain__row-total">
                    <h5>
                      {{ areaStoresData[paramsPart.area]?.total_qty ?? '0' }}
                    </h5>
                  </div>
                  <div class="partMain__row partMain__row-store">
                    <ul class="store__list">
                      <li class="store__item">
                        <div class="store__item-title">
                          <p>{{ '直營門市' }}</p>
                        </div>
                        <div class="store__item-total">
                          <strong>{{
                            areaStoresData[paramsPart.area]?.direct_qty ?? '0'
                          }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                      <li class="store__item">
                        <div class="store__item-title">
                          <p>{{ '加盟門市' }}</p>
                        </div>
                        <div class="store__item-total">
                          <strong>{{
                            areaStoresData[paramsPart.area]?.join_qty ?? '0'
                          }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                      <li class="store__item">
                        <div class="store__item-title">
                          <p>{{ '複合門市' }}</p>
                        </div>
                        <div class="store__item-total">
                          <strong>{{
                            areaStoresData[paramsPart.area]?.other_qty ?? '0'
                          }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="partMain__row partMain__row-county">
                    <ul class="county__list">
                      <li
                        class="county__item"
                        v-for="(item, index) in areaStoresData"
                        :key="index"
                        :class="{ active: paramsPart.area === index }"
                        @click="selectArea(index)"
                      >
                        <div class="county__item-title">
                          <span :style="{ background: item.color }"></span>
                          <strong>{{ item.label }}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </transition>

            <!-- 縣市店數 -->
            <transition name="fade">
              <div class="partMain__content" v-if="countyShow === true">
                <div class="partMain__content-county">
                  <div class="partMain__row partMain__row-select">
                    <el-select
                      class="partMain__select"
                      v-model="paramsPart.county"
                      placeholder="區域"
                      @change="selectCounty(paramsPart.county)"
                    >
                      <el-option
                        v-for="(item, index) in resource.data.county_area"
                        :key="index"
                        :label="item.label"
                        :value="index"
                      />
                    </el-select>
                  </div>
                  <div class="partMain__row partMain__row-title">
                    <h4>選擇區域總店數</h4>
                  </div>
                  <div class="partMain__row partMain__row-total">
                    <h5>{{ countyStoresData?.total_qty ?? '0' }}</h5>
                  </div>
                  <div class="partMain__row partMain__row-store">
                    <ul class="store__list">
                      <li class="store__item">
                        <div class="store__item-title">
                          <p>{{ '直營門市' }}</p>
                        </div>
                        <div class="store__item-total">
                          <strong>{{
                            countyStoresData?.direct_qty ?? '0'
                          }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                      <li class="store__item">
                        <div class="store__item-title">
                          <p>{{ '加盟門市' }}</p>
                        </div>
                        <div class="store__item-total">
                          <strong>{{
                            countyStoresData?.join_qty ?? '0'
                          }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                      <li class="store__item">
                        <div class="store__item-title">
                          <p>{{ '複合門市' }}</p>
                        </div>
                        <div class="store__item-total">
                          <strong>{{
                            countyStoresData?.other_qty ?? '0'
                          }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="partMain__row partMain__row-county">
                    <ul class="county__list">
                      <li
                        class="county__item"
                        v-for="(item, index) in countyStoresData?.area"
                        :key="index"
                        style="cursor: auto"
                      >
                        <div class="county__item-title">
                          <span :style="{ background: item.color }"></span>
                          <strong>{{ item.label }}</strong>
                        </div>
                        <div class="county__item-total">
                          <strong>{{ item.value }}</strong>
                          <p>{{ '間' }}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="content__row">
        <div class="content__col content__col-baseType">
          <div class="content__header baseTypeHeader">
            <h3>營業類型店數</h3>
            <div class="partMain__select">
              <el-button
                size="small"
                style="border: transparent"
                @click="handleShowBaseTypeRow()"
                >收合
                <el-icon style="margin-left: 4px"><ArrowDown /></el-icon>
              </el-button>
            </div>
          </div>
          <transition name="fade">
            <div v-if="showBaseTypeRow">
              <div class="baseTypeMain">
                <div id="baseTypeRow" ref="baseTypeRow"></div>
              </div>
            </div>
          </transition>
        </div>
        <div class="content__col content__col-storeType">
          <div class="storeTypeHeader content__header">
            <h3>店型店數</h3>
            <div class="storeTypeHeader__select">
              <el-pagination
                size="small"
                :current-page="pageInfo.currentPage"
                :page-size="pageInfo.perPage"
                :total="pageInfo.total ?? 0"
                @current-change="clickHandler"
                layout="total, prev, pager, next"
              ></el-pagination>
            </div>
          </div>
          <div class="storeTypeMain">
            <el-tabs
              v-model="activeStoreType"
              class="storeTypeMain__tabs"
              @tab-click="handleTabStoreType"
            >
              <el-tab-pane label="一般店型" name="Hou01">
                <el-table
                  :data="storeTypeData"
                  border
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#F5F7FA',
                  }"
                >
                  <el-table-column
                    prop="label"
                    label="類型"
                    width="auto"
                    align="center"
                    header-align="center"
                  />
                  <el-table-column
                    prop="value"
                    label="目前店數"
                    width="200"
                    align="center"
                    header-align="center"
                  />
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="奶尿店型" name="Hou02">
                <el-table
                  :data="storeTypeData"
                  border
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#F5F7FA',
                  }"
                >
                  <el-table-column
                    prop="label"
                    label="類型"
                    width="auto"
                    align="center"
                    header-align="center"
                  />
                  <el-table-column
                    prop="value"
                    label="目前店數"
                    width="200"
                    align="center"
                    header-align="center"
                  />
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="SUGI" name="Sugi">
                <el-table
                  :data="storeTypeData"
                  border
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#F5F7FA',
                  }"
                >
                  <el-table-column
                    prop="label"
                    label="類型"
                    width="auto"
                    align="center"
                    header-align="center"
                  />
                  <el-table-column
                    prop="value"
                    label="目前店數"
                    width="200"
                    align="center"
                    header-align="center"
                  />
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import * as echarts from 'echarts';
import taiwanJSON from '@/assets/json/county.json';
import { getDashboard, getExport } from '@/api/functions/dashboard/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import dayjs from 'dayjs';

onMounted(async () => {
  await init();
  window.addEventListener('resize', function () {
    monthcolumnChart.resize();
    taiwanChart.resize();
    baseTypeRowChart.resize();
  });
  drawTaiwanChart();
  drawmonthColumnChart();
  drawbaseTypeRowChart();
  actionList();
});

const globalColors = [
  '#6291FC',
  '#61D8D9',
  '#FC8762',
  '#A461D9',
  '#FCDA62',
  '#63D961',
  '#15559A',
  '#FF6F61',
  '#6B5B93',
  '#88B04B',
  '#F7CAC9',
  '#92A8D1',
  '#955251',
  '#B9CBB8',
  '#D5BDAF',
  '#F6B93B',
  '#F8CBA6',
  '#F7B7A3',
  '#A8D8B9',
  '#F2A900',
  '#EAB8A1',
  '#D9BF77',
];

/**資源 */
const resource = reactive({
  data: {
    taiwan_county_code: {},
    county_area: {},
    monthly_add: {},
    monthly_add_no_unman: {},
    base_type: [],
    Hou01: [],
    Hou02: [],
    Sugi: [],
    area_stores: [],
    county_stores: {},
  },
});

const init = async () => {
  try {
    const res = await getDashboard();
    resource.data = res;
  } catch (err) {
    ElMessage.error(err.message);
  }
};

/** 總店數 */
const isMonthActive = ref('monthly_add');
const paramsAll = reactive({
  month: [
    dayjs().subtract(11, 'month').format('YYYY/MM'),
    dayjs().format('YYYY/MM'),
  ],
});
const monthcolumn = ref(null);
let monthcolumnChart = null;

/** 總店數圖表 */
const drawmonthColumnChart = () => {
  monthcolumnChart = echarts.init(monthcolumn.value);
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    // 四周間距
    grid: {
      left: '1%',
      right: '1%',
      bottom: '2%',
      top: '12%',
      containLabel: true,
    },
    // 聲明 X 軸
    xAxis: [
      {
        type: 'category',
        // 刻度標籤
        axisLabel: {
          formatter: '{value}',
          align: 'center',
        },
        data: Object.keys(monthlyAddData.value),
      },
    ],
    // 聲明 Y 軸
    yAxis: [
      {
        type: 'value',
        name: '單位',
        min: 0,
        max: 500,
        position: 'left',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: '累積', // 名稱
        type: 'bar', // 類型
        stack: 'Ad', // 堆疊
        color: ['#BADC9F'],
        barWidth: '40%', // 柱體寬度%
        emphasis: {
          focus: 'series',
        },
        data: Object.values(monthlyAddData.value).map((item) => item.total),
      },
      {
        name: '各月新增',
        type: 'bar',
        stack: 'Ad',
        color: ['#FED364'],
        emphasis: {
          focus: 'series',
        },
        data: Object.values(monthlyAddData.value).map((item) => item.added),
      },
    ],
  };
  monthcolumnChart.setOption(option);
};

/**限制月份 */
const pickerDisabled = (time) => {
  return time.getTime() > Date.now();
};

const fetchResource = (type) => {
  isMonthActive.value = type;
  changeMonthly();
};

/**月份區間資料 */
const monthlyAddData = computed(() => {
  const result =
    isMonthActive.value === 'monthly_add'
      ? resource.data.monthly_add || {}
      : resource.data.monthly_add_no_unman || {};
  const [startMonth, endMonth] = paramsAll.month;
  const monthDiff = dayjs(endMonth, 'YYYY/MM').diff(
    dayjs(startMonth, 'YYYY/MM'),
    'month'
  );

  if (monthDiff !== 11) {
    ElMessage.error('請選擇剛好12個月的範圍');
    return {};
  }

  // filter 區間月份，reduce 返回過濾後的資料
  return Object.keys(result)
    .filter((item) => item >= startMonth && item <= endMonth)
    .reduce((acc, month) => {
      acc[month] = result[month];
      return acc;
    }, {});
});

/**日期區間切換 */
const changeMonthly = () => {
  monthcolumnChart.setOption({
    xAxis: [
      {
        data: Object.keys(monthlyAddData.value),
      },
    ],
    series: [
      {
        data: Object.values(monthlyAddData.value).map((item) => item.total),
      },
      {
        data: Object.values(monthlyAddData.value).map((item) => item.added),
      },
    ],
  });
};

/**縣市區域參數 */
const paramsPart = reactive({
  county: 'north',
  area: 'F3A000',
});
const areaShow = ref(true);
const countyShow = ref(false);

/**縣市資料 */
const countyInfo = reactive({
  A: { name: '臺北市', color: '#5470C6' },
  B: { name: '臺中市', color: '#85C1E9' },
  C: { name: '基隆市', color: '#EE6666' },
  D: { name: '臺南市', color: '#A3E4D7' },
  E: { name: '高雄市', color: '#F5B7B1' },
  F: { name: '新北市', color: '#73C0DE' },
  G: { name: '宜蘭縣', color: '#FAC858' },
  H: { name: '桃園市', color: '#91CC75' },
  I: { name: '嘉義市', color: '#FAD7A0' },
  J: { name: '新竹縣', color: '#CDB7E9' },
  K: { name: '苗栗縣', color: '#82E0AA' },
  M: { name: '南投縣', color: '#F8C471' },
  N: { name: '彰化縣', color: '#F1948A' },
  O: { name: '新竹市', color: '#C8CB29' },
  P: { name: '雲林縣', color: '#73C6B6' },
  Q: { name: '嘉義縣', color: '#E59866' },
  T: { name: '屏東縣', color: '#D7BDE2' },
  U: { name: '花蓮縣', color: '#F9E79F' },
  V: { name: '臺東縣', color: '#AED6F1' },
  W: { name: '金門縣', color: '#F2A900' },
  X: { name: '澎湖縣', color: '#BADC9F' },
  Z: { name: '連江縣', color: '#FF6F61' },
});

/**區域資料 */
const areaStoresData = computed(() => {
  const areaData = resource.data.area_stores || {};
  return Object.keys(areaData).reduce((acc, key, index) => {
    acc[key] = {
      ...areaData[key],
      color: globalColors[index % globalColors.length],
    };
    return acc;
  }, {});
});

/**縣市資料 */
const countyStoresData = computed(() => {
  const countyData = resource.data.county_stores?.[paramsPart.county] || {};

  return {
    ...countyData,
    area: countyData.area.map((item) => ({
      ...item,
      color: countyInfo[item.id].color || '#ffffff',
    })),
  };
});

const taiwanMap = ref(null);
let taiwanChart = null;

/**臺灣地圖 */
const drawTaiwanChart = () => {
  taiwanChart = echarts.init(taiwanMap.value);
  echarts.registerMap('taiwan', taiwanJSON); //注冊地圖

  const option = {
    // 數據系列
    series: [
      {
        type: 'map',
        map: 'taiwan',
        geoIndex: 0,
        aspectScale: 1, // 地圖的宽高比例
        zoom: 1.2, // 地圖的縮放級别
        center: [121, 23.6], //設置中心點
        emphasis: {
          disabled: true, // 禁用高亮效果
        },
        select: {
          disabled: true, // 禁用選中效果
        },
        data: Object.keys(countyInfo).map((code) => ({
          name: countyInfo[code].name,
          value: 0,
          itemStyle: {
            areaColor: '#ffffff',
            borderColor: '#C0C4CC',
            borderWidth: 1,
          },
        })),
      },
    ],
    // hover顯示
    tooltip: {
      trigger: 'item',
      formatter: '{b}',
    },
  };
  taiwanChart.setOption(option);

  setTimeout(() => {
    selectArea('F3A000');
  }, 1000);
};

/**區域-選擇 */
const selectArea = (key) => {
  const regionArea = areaStoresData.value[key];
  paramsPart.area = key;
  if (regionArea) {
    taiwanChart.setOption({
      series: [
        {
          data: Object.keys(countyInfo).map((code) => {
            return {
              name: countyInfo[code].name,
              value: 0,
              itemStyle: {
                areaColor: regionArea.county_codes.includes(code)
                  ? regionArea.color
                  : '#ffffff',
                borderColor: regionArea.county_codes.includes(code)
                  ? '#ffffff'
                  : '#C0C4CC',
                borderWidth: 1,
              },
            };
          }),
        },
      ],
    });
  }
};

/**縣市-選擇 */
const selectCounty = (key) => {
  const regionCounty = resource.data.county_area[key];
  if (regionCounty) {
    taiwanChart.setOption({
      series: [
        {
          data: Object.keys(countyInfo).map((code) => {
            return {
              name: countyInfo[code].name,
              value: 0,
              itemStyle: {
                areaColor: regionCounty.areas.includes(code)
                  ? countyInfo[code].color
                  : '#ffffff',
                borderColor: regionCounty.areas.includes(code)
                  ? '#ffffff'
                  : '#C0C4CC',
                borderWidth: 1,
              },
            };
          }),
        },
      ],
    });
  }
};

/**區域縣市切換 */
const changePartShow = (key) => {
  areaShow.value = key === 'area';
  countyShow.value = key !== 'area';
  key === 'area'
    ? selectArea(paramsPart.area)
    : selectCounty(paramsPart.county);
};

const showBaseTypeRow = ref(true);

const baseTypeData = computed(() => {
  if (!resource.data.base_type) return [];
  return resource.data.base_type.sort((a, b) => a.value - b.value);
});

const baseTypeRow = ref(null);
let baseTypeRowChart = null;

/**營業類型-圖表 */
const drawbaseTypeRowChart = () => {
  baseTypeRowChart = echarts.init(baseTypeRow.value);

  const option = {
    grid: {
      containLabel: true,
      left: '2%',
      right: '4%',
      top: '2%',
      bottom: '2%',
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 500,
    },
    yAxis: {
      type: 'category',
      data: baseTypeData.value.map((item) => item.label),
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        encode: {
          x: 'score',
          y: 'type',
        },
        itemStyle: {
          borderRadius: [0, 10, 10, 0], // 右側圓角
        },
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            // 計算百分比並保留一位小數
            const percentage = ((params.data.value / 500) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
        barWidth: '30%',
        data: baseTypeData.value.map((item, index) => ({
          name: item.label,
          value: item.value,
          itemStyle: {
            color: globalColors[index % globalColors.length],
          },
        })),
      },
    ],
  };
  baseTypeRowChart.setOption(option);
};

/**營業類型-收合 */
const handleShowBaseTypeRow = () => {
  showBaseTypeRow.value = !showBaseTypeRow.value;
  if (showBaseTypeRow.value) {
    setTimeout(() => {
      drawbaseTypeRowChart();
    }, 1000);
  }
};

/**店型店數 */
const activeStoreType = ref('Hou01');
const storeTypeData = ref([]);
const pageInfo = reactive({
  currentPage: 1,
  perPage: 5,
  total: 0,
});

/**取得店型店數 */
const actionList = () => {
  const list = resource.data[activeStoreType.value] ?? [];
  pageInfo.total = resource.data[activeStoreType.value]?.length || 0;

  // slice(起始索引, 結束索引)
  storeTypeData.value = list.slice(
    (pageInfo.currentPage - 1) * pageInfo.perPage,
    pageInfo.currentPage * pageInfo.perPage
  );
};

const clickHandler = (val) => {
  pageInfo.currentPage = val;
  actionList();
};

const handleTabStoreType = (tab) => {
  activeStoreType.value = tab.paneName;
  actionList();
};

/**下載 */
const actionDownload = () => {
  getExport()
    .then((res) => {
      const type = res.headers['content-type'];
      const blob = new Blob([res.data], { type: type });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = href;
      link.setAttribute(
        'download',
        `${dayjs().format('YYYY-MM-DD')}-營業概覽.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); //下載完成移除元素
      URL.revokeObjectURL(href); //釋放掉blob對象

      ElMessage.success('匯出成功');
    })
    .catch((err) => {
      ElMessageBox.confirm(err.message, '匯出錯誤', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'error',
        center: true,
      })
        .then(() => {})
        .catch(() => {});
    });
};
</script>

<style lang="scss" scoped>
::v-deep(.el-pagination) {
  --el-pagination-font-size: 12px;
  --el-pagination-button-width: 24px;
  --el-pagination-button-height: 24px;
  --el-pagination-font-size-small: 12px;
  --el-pagination-button-width-small: 24px;
  --el-pagination-button-height-small: 24px;
  --el-pagination-item-gap: 14px;
  font-size: 12px;
}

::v-deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;

  &.is-active {
    font-weight: 700;
    color: #409eff;
  }
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #d9d9d9;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #aaaaaa;

  &:hover {
    background-color: #666666;
  }
}

h2,
h3,
h4,
h5,
p {
  padding: 0px;
  margin: 0px;
}

h2 {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  padding: 10px 24px;
}

h3 {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

h4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #606266;
}

.dashboard-container {
  .dashboard__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-button {
      margin: 0px 24px;
    }
  }
  .dashboard__content {
    width: 100%;
    min-height: calc(100vh - 40px);
    background: #e9ebed;
  }
}
.content__row {
  padding: 16px 8px 0px;
  display: flex;
}
.content__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
}
.content__col {
  width: 50%;
  height: 100%;
  padding: 20px 20px;
  margin: 0px 8px;
  background: #fff;
  border-radius: 4px;
}
.content__col-month {
  width: 64%;
}
.content__col-part {
  width: 36%;
}
// 總店數
.monthHeader {
  &__select {
    display: flex;
    align-items: center;
  }
  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
  }
  &__item {
    list-style: none;
    color: #1d2129;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    text-align: left;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
}
.monthTabs__header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
  }
}
.monthTabs__nav {
  position: relative;
  display: flex;
  transition: transform 0.3s;
  float: left;
  z-index: 2;
  height: 40px;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}
.monthTabs__item {
  position: relative;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  cursor: pointer;

  &.active {
    font-weight: 700;
    color: #409eff;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0px;
      width: 70px;
      height: 2px;
      background-color: #409eff;
      z-index: 4;
      transform: translateX(-50%);
    }
  }
}
.monthMain {
  #monthcolumn {
    width: 100%;
    height: 307px;
  }
}

// 區域縣市店數
.partHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.partMain {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 369px;

  .partMain__taiwan {
    width: 40%;
    height: 100%;
  }
  .partMain__content {
    width: 50%;
    height: 100%;

    .partMain__content-area {
      .county__list {
        flex-wrap: wrap;

        .county__item {
          width: 50%;
          opacity: 0.2;

          &.active {
            opacity: 1;
          }
        }
      }
    }
  }
  .partMain__row-select {
    width: 100%;
    text-align: right;
    height: 32px;

    .el-select {
      width: 95px;
    }
  }
  .partMain__row-title {
    width: 170px;
    padding-left: 20px;
    margin-bottom: 2px;
  }
  .partMain__row-total {
    width: 170px;
    padding-left: 20px;
    margin-bottom: 2px;

    h5 {
      font-size: 24px;
      font-weight: 400;
      line-height: 36px;
      color: #00a53a;
    }
  }
  .partMain__row-store {
    width: 170px;
    padding-left: 20px;
    margin-bottom: 12px;

    .store__list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;

      p {
        font-size: 12px;
        font-weight: 400;
        line-height: 22px;
        color: #909399;
        margin: 0px;
      }
      strong {
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: #1d2129;
        margin: 0px;
      }
    }
    .store__item {
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .store__item-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      strong {
        margin-right: 4px;
      }
    }
  }
  .partMain__row-county {
    height: 196px;
    overflow-y: auto;

    .county__list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
    }
    .county__item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 8px;
      cursor: pointer;

      strong {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #303133;
        margin: 0;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        text-align: left;
        color: #86909c;
        margin: 0;
      }
    }
    .county__item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        display: block;
        background: #00a53a;
        border-radius: 5px;
        width: 20px;
        height: 4px;
        margin-right: 8px;
      }
    }
    .county__item-total {
      display: flex;
      justify-content: space-between;
      align-items: center;

      strong {
        margin-right: 2px;
      }
    }
  }
  #baseType {
    width: 100%;
    height: 100%;
  }
}

// 營業類型店數
.baseTypeMain {
  #baseTypeRow {
    width: 100%;
    height: 300px;
  }
}
// 營業類型店數
.storeTypeMain {
  width: 100%;
  height: 300px;
}
</style>
