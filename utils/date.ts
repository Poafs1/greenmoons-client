import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);

const mapDateToDDMMMBBBB = (date: Date | undefined) => {
  if (!date) return '';

  return dayjs(date).format('DD MMM BBBB');
};

export { mapDateToDDMMMBBBB };
