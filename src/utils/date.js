const months = [
  'Jan',
  'feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formmateDate = (timestamp) => {
  const date = new Date(timestamp);

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// 댓글 날짜 포맷팅
export const commentFormatDate = (data) => {
  const now = new Date();
  const inputDate = new Date(data);

  const diffMs = now - inputDate; // 현재 시간과 댓글 시간의 ms 차이
  const diffSc = diffMs / 1000; // second 차이
  const diffMinute = diffMs / (1000 * 60); // minutes 차이
  const diffHours = diffMs / (1000 * 60 * 60); // hours 차이
  const diffDays = diffMs / (1000 * 60 * 60 * 24); // days 차이

  if (diffMinute < 1) {
    return `${Math.round(diffSc)}초 전`;
  }
  if (diffHours < 1) {
    return `${Math.round(diffMinute)}분 전`;
  }
  if (diffHours < 24) {
    return `${Math.round(diffHours)}시간 전`;
  } else {
    return `${Math.round(diffDays)}일 전`;
  }
};

