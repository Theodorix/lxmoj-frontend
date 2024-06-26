<template>
  <div class="submission-chart">
    <div class="calendar">
      <div class="weeks">
        <div class="week">周二</div>
        <div class="week">周四</div>
        <div class="week">周六</div>
      </div>
      <div
        class="column"
        v-for="(columnData, columnIndex) in allDateData"
        :key="columnIndex"
      >
        <div class="my-title">{{ columnData.title }}</div>
        <div
          class="date-wrapper"
          v-for="(dateItem, dateIndex) in columnData.data"
          :key="dateIndex"
          :style="{ background: getColor(dateItem.number).color }"
          :class="{
            hiddenDate: columnIndex == 0 && dateIndex < prevTodayWeek - 1,
            active: getColor(dateItem.number).level == hoverLevel,
          }"
        >
          <a-tooltip
            class="box-item"
            :content="dateItem.date"
            placement="top"
            background-color="#FFFFFF"
            :arrow-style="{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              background: '#FFFFFF',
            }"
            :content-style="{
              color: '#40585b',
              'border-radius': '5px',
              boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
            }"
          >
            <div class="date"></div>
          </a-tooltip>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="legend">
        <div class="level-desc">少</div>
        <div
          class="level level-1"
          @mouseover="hoverLevel = i"
          @mouseout="hoverLevel = 0"
          v-for="i in 5"
          :key="i"
          :class="['level-' + i]"
        ></div>
        <div class="level-desc">多</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watch, onMounted, defineProps } from "vue";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const allDateData = ref<any>([]);
const submissionRecord = ref<any>({});
const prevTodayWeek = ref();
const hoverLevel = ref(0);
onMounted(() => {
  init();
});
const props = defineProps({
  timeData: {
    type: Object,
    default: () => ({}),
  },
  maxData: {
    type: Number,
    default: 0,
  },
});

const init = () => {
  // 上年今日
  let prevToday = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  // 上年今日的是星期几,dayjs获取的为0-6，0是星期日
  let prevTodayWeekNum: any = dayjs(prevToday).format("d") || 7;
  prevTodayWeek.value = prevTodayWeekNum;
  // 初始日期（上年临近的星期一）
  let firstMondayDate =
    prevTodayWeekNum > 1
      ? dayjs()
          .subtract(1, "year")
          .subtract(prevTodayWeekNum - 1, "days")
          .format("YYYY-MM-DD")
      : prevToday;
  // 初始日期至今日的天数，包括今日
  let days = dayjs().diff(dayjs(firstMondayDate), "days") + 1;
  // 每周天数
  let columns = 7;
  // 最大列数（周数）
  let lineNums = Math.ceil(days / columns);
  // 绘制图表的源数据
  let dateData: any = [];
  let monthCN = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  for (let i = 0; i < lineNums; i++) {
    // 最近一星期不一定满的
    let weekColumn =
      i === lineNums - 1
        ? days % columns
          ? days % columns
          : columns
        : columns;
    // 开始计算title（月份的图例）
    // 思路：第一列直接根据第一天的月份
    // 之后的嘛列数根据上一周的最后一天减去第一天的月份，如果大于1代表月份发生了改变，下一列的title显示最新的月份
    let theWeekStartMonth: any = dayjs(firstMondayDate)
      .add(i * 7, "days")
      .format("M");
    let day: any = dayjs(firstMondayDate)
      .add(i * 7, "days")
      .format("DD");
    //防止开始时月份挤在一起
    if (i == 0 && 30 - day < 15) {
      theWeekStartMonth = theWeekStartMonth + 1;
    }

    let theWeekEndMonth: any = dayjs(firstMondayDate)
      .add(i * 7 + weekColumn, "days")
      .format("M");
    let title = i === 0 ? monthCN[theWeekStartMonth - 1] : "";
    let isSwitchMonth = false;
    if (theWeekEndMonth - theWeekStartMonth) {
      isSwitchMonth = true;
    }
    if (i && dateData[i - 1].isSwitchMonth) {
      title = monthCN[theWeekEndMonth - 1];
    }
    // 图表源数据格式：columns：列数，title：列标题，isSwitchMonth：月份是否发生改变，data：每格数据
    dateData.push({
      columns: weekColumn,
      title: title,
      isSwitchMonth: isSwitchMonth,
      data: [],
    });
    for (let j = 0; j < dateData[i].columns; j++) {
      let date = dayjs(firstMondayDate)
        .add(i * 7 + j, "days")
        .format("YYYY-MM-DD");
      // 提交次数在slider范围内再进行次数赋值
      let number = submissionRecord.value[date];
      // number：提交次数，date：提交日期
      dateData[i].data.push({
        number: number,
        date: date,
      });
    }
  }
  //处理完的数据
  allDateData.value = dateData;
};

const getColor = (number: number) => {
  let num = number / props.maxData;
  let level = 1;
  if (num == 0) {
    num = 0.1;
    level = 1;
  } else if (num > 0 && num < 0.3) {
    num = 0.3;
    level = 2;
  } else if (num > 0.3 && num < 0.6) {
    num = 0.6;
    level = 3;
  } else if (num < 0.9) {
    num = 0.8;
    level = 4;
  } else {
    num = 1;
    level = 5;
  }
  if (props.maxData == 0) {
    num = 0.1;
    level = 1;
  }
  return { color: "rgba(55,126,259," + num + ")", level };
};
watch(
  () => props.timeData,
  (newValue) => {
    submissionRecord.value = newValue;
    init();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.submission-chart {
  width: 1040px;
  height: 185px;
  background-color: #fff;
  margin: 50px auto auto;
  padding: 0 0;
  font-size: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.submission-chart .calendar {
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
}

.submission-chart .calendar .weeks {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30px;
  margin-top: 32px;
}

.submission-chart .calendar .weeks .week {
  white-space: nowrap;
  width: 30px;
  height: 14px;
}

.submission-chart .calendar .column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 2px;
  width: 16px;
}

.submission-chart .calendar .column .hiddenDate {
  background: #fff !important;
}

.submission-chart .calendar .column .active {
  box-shadow: inset 0 0 1px 2px rgba(255, 255, 255, 0.5);
}

.submission-chart .calendar .column .my-title {
  width: 100%;
  height: 14px;
  margin-top: 10px;
  margin-bottom: 3px;
  text-align: left;
  overflow: visible;
  white-space: nowrap;
}

.submission-chart .calendar .column .date-wrapper {
  width: 16px;
  height: 16px;
  background: #ebedf0;
  margin-bottom: 2px;
  border-radius: 3px;
}

.submission-chart .calendar .column .date-wrapper:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.submission-chart .calendar .column .date-wrapper .date {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.submission-chart .calendar .column .date-wrapper .date :hover {
  width: 13px;
  height: 13px;
}

.submission-chart .operation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-right: 30px;
}

.submission-chart .operation .slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}

.submission-chart .operation .slider .slider-desc {
  width: 11px;
  margin: 0 8px;
}

.submission-chart .operation .legend {
  display: flex;
  justify-content: center;
  align-items: center;
}

.submission-chart .operation .legend .level-desc {
  margin-right: 6px;
  margin-left: 3px;
}

.submission-chart .operation .legend .level {
  margin-right: 3px;
  width: 11px;
  height: 11px;
  cursor: pointer;
}

.submission-chart .operation .legend .level-1 {
  background: rgba(55, 126, 259, 0.1);
}

.submission-chart .operation .legend .level-2 {
  background: rgba(55, 126, 259, 0.3);
}

.submission-chart .operation .legend .level-3 {
  background: rgba(55, 126, 259, 0.6);
}

.submission-chart .operation .legend .level-4 {
  background: rgba(55, 126, 259, 0.8);
}

.submission-chart .operation .legend .level-5 {
  background: rgba(55, 126, 259, 1);
}
</style>
