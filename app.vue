<template>
  <div>
    <NuxtPwaManifest />
    <div>
      <header>ヘッダー</header>
      <main>
        <div class="my-4 flex justify-center">
          <div
            v-for="data in formatMilliseconds(elapsedTime)"
            :key="data"
            class="flex w-1/4 items-end justify-center"
          >
            <div class="text-5xl">{{ data[0] }}</div>
            <div class="text-lg">{{ data[1] }}</div>
          </div>
        </div>
        <div class="my-4 flex justify-center">
          <div
            v-for="data in formatMilliseconds(currentClockTime)"
            :key="data"
            class="flex w-1/4 items-end justify-center"
          >
            <div class="text-5xl">{{ data[0] }}</div>
            <div class="text-lg">{{ data[1] }}</div>
          </div>
        </div>
        <div
          class="mx-auto my-4 cursor-pointer select-none bg-lime-400 p-3 text-center"
        >
          <div v-if="isActive" @click="pauseTimer()">一時停止</div>
          <div v-else @click="startTimer()">開始</div>
        </div>
      </main>
      <footer>フッター</footer>
    </div>
  </div>
</template>

<script setup>
  const startTime = ref();
  const elapsedTime = ref(0);
  const currentClockTime = ref(0);
  let timerInterval;
  let clockInterval;
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
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
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

  // onMounted(() => {
  clockInterval = setInterval(() => {
    currentClockTime.value = Date.now() - new Date().setHours(0, 0, 0, 0);
  }, 100);
  // });
</script>
