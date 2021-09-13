import moment from 'moment/min/moment-with-locales';

export const formatTime = (time) => {
  moment.locale('vi');

  const originalTime = new Date(time);
  const formattedOriginalTime = `${originalTime.getDate()}/${
    originalTime.getMonth() + 1
  }/${originalTime.getFullYear()}`;
  const today = new Date();
  const days = moment(today).diff(time, 'days');
  let result;
  if (days >= 1) {
    result = formattedOriginalTime;
  } else {
    result = moment(time).fromNow();
  }
  return result;
};
