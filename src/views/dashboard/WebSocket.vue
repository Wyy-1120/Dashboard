<template>
<div>
  <h1>WebSocket Demo</h1>
  <div>
    <ul>
      <li v-for="message in messages" :key="message">
        {{ message }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "WebSocket",
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    const ws = new WebSocket("ws://localhost:8089/websocket");
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = event => {
      const tmp = JSON.parse(event.data);
      this.messages.push(event.data);
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
  },
}
</script>

<style scoped>

</style>
