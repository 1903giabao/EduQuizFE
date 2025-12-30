export function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function useGenerateTimes(
  startTime: string,
  endTime: string,
  stepMinute = 30
) {
  const result: string[] = [];
  let cur = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  while (cur <= end) {
    const h = String(Math.floor(cur / 60)).padStart(2, "0");
    const m = String(cur % 60).padStart(2, "0");
    result.push(`${h}:${m}`);
    cur += stepMinute;
  }

  return result;
}
