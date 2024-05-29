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

  return `${date.getDate()} ${months[date.getMonth()]}`;
};
