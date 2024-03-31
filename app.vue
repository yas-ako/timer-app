<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <div v-if="isActive" @click="pauseTimer()">pauseTimer</div>
    <div v-else @click="startTimer()">startTimer</div>
    <div>
      {{
        new Date(elapsedTime)
          .toISOString()
          .substring(11, 19)
          .replace(/^00:(\d{2}:\d{2})$/, "$1")
      }}
    </div>
    <div>
      {{ new Date(elapsedTime).toISOString() }}
    </div>
    <div v-for="data in formatMilliseconds(elapsedTime)" key="data">
      <div>{{ data[0] }}</div>
      <div>{{ data[1] }}</div>
    </div>
  </div>
</template>

<script setup>
let startTime = ref();
let elapsedTime = ref(0);
let timerInterval;
const isActive = ref(false);

function startTimer() {
  startTime.value = Date.now() - elapsedTime.value;
  isActive.value = true;
  timerInterval = setInterval(updateTime, 100); // 1秒ごとに経過時間を更新
}

function pauseTimer() {
  clearInterval(timerInterval);
  isActive.value = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime.value = 0;
  startTime.value = null;
}

function updateTime() {
  const now = Date.now();
  elapsedTime.value = now - startTime.value;
  // 経過時間を表示するなどの処理をここで行う
}

// ページが非アクティブになったときのイベントリスナー
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    pauseTimer();
  }
});

function formatMilliseconds(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return [
    [padZero(hours), "h"],
    [padZero(minutes), "m"],
    [padZero(seconds), "s"],
  ];
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}
</script>
