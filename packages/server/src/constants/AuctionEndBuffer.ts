import dayjs from "src/utils/dates/dayjsex";

const AUCTION_END_BUFFER = dayjs.duration({ seconds: 90 });
export default AUCTION_END_BUFFER;
