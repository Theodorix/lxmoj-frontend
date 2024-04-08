<template>
  <div>
    <a-row class="grid-demo">
      <a-col :span="8">
        <div>12 - 50%</div>
      </a-col>
      <a-col :span="16">
        <div style="width: 1050px; padding: 0 0 0 16px">
          <div style="display: flex">
            <div
              style="
                width: 510px;
                height: 186px;
                box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
              "
            >
              <div
                style="
                  font-size: 12px;
                  color: #3c3c4399;
                  padding: 0 13px;
                  margin-bottom: -10px;
                "
              >
                解决数量
              </div>
            </div>
            <div
              style="
                width: 510px;
                height: 186px;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                margin-left: 25px;
              "
            >
              <div
                style="
                  font-size: 12px;
                  color: #3c3c4399;
                  padding: 0 13px;
                  margin-bottom: -10px;
                "
              >
                解决数量
              </div>
            </div>
          </div>
          <Calendar_Map :timeData="timeData" :maxData="maxData" />
          <div
            style="
              width: 836px;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              height: 200px;
            "
          ></div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import Calendar_Map from "@/components/Calendar_Map.vue";
import { ref } from "vue";
import dayjs from "dayjs";

const maxData = ref(5);
const timeData = ref<any>({});
let tempDate: any = {};
for (let i = 0; i < 366; i++) {
  let date = dayjs().subtract(1, "year").add(i, "days").format("YYYY-MM-DD");
  tempDate[date] = (Math.random() * 2).toFixed(0);
}
timeData.value = tempDate;
</script>

<style scoped></style>
