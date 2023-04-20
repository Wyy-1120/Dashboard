<template>
  <div>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateProcess",
  data() {
    return {
      activities: [],
      count: 1,
    };
  },
  computed: {
    nums() {
      return this.$store.state.nums;
    },
  },
  mounted() {
    const ws = new WebSocket("ws://localhost:8089/websocket");
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = (event) => {
      const obj = JSON.parse(event.data);
      const step = obj.step;
      if (step === 1) {
        this.activities.push({
          content: obj.user + " 创建了任务 " + obj.task,
          timestamp: obj.time,
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        });
      } else if (step === 2) {
        this.activities.push({
          icon: "el-icon-edit",
          type: "primary",
          color: "green",
          size: "large",
          timestamp: obj.timeStamp,
          content:
            "任务将被放置到节点 " +
            obj.node +
            " , 分配的资源为cpu" +
            obj.cpuSize +
            "m, 内存" +
            obj.memorySize +
            "Mi.",
        });

      } else if (step === 3) {
        this.activities.push({
          icon: "el-icon-view",
          type: "primary",
          color: "green",
          size: "large",
          timestamp: obj.timeStamp,
          content: "放置成功, 应用地址为 https://" + obj.url,
        });
        this.nums.tasks.push({ id:this.count++ })
      } else if (step === 4) {
        this.activities.push({
          type: "primary",
          size: "large",
          color: "red",
          content: "----------------------------------------------------------",
        });

      }
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
  },
};
</script>

<style scoped>
.block {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}
/* .el-timeline-item {
  line-height:  0vh;
} */
</style>
