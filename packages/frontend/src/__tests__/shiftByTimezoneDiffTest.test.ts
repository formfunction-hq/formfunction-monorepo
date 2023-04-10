import dayjs from "utils/dates/dayjsex";
import shiftByTimezoneDiff from "utils/dates/shiftByTimezoneDiff";

describe("shiftByTimezoneDiff tests", () => {
  it("PST -> EST", () => {
    const westTime = dayjs.tz("2020-06-01 22:00", "America/Los_Angeles");
    const converted = shiftByTimezoneDiff(
      westTime,
      "America/Los_Angeles",
      "America/New_York"
    );

    expect(westTime.date()).toEqual(1);
    expect(converted.date()).toEqual(2);

    expect(westTime.utc().format()).toEqual("2020-06-02T05:00:00Z");
    // Time shifted forward 3 hours
    expect(converted.utc().format()).toEqual("2020-06-02T08:00:00Z");
  });

  it("EST -> PST", () => {
    const eastTime = dayjs.tz("2020-06-02 01:00", "America/New_York");
    const converted = shiftByTimezoneDiff(
      eastTime,
      "America/New_York",
      "America/Los_Angeles"
    );

    expect(eastTime.date()).toEqual(2);
    expect(converted.date()).toEqual(1);

    expect(eastTime.utc().format()).toEqual("2020-06-02T05:00:00Z");
    // Time shifted backward 3 hours
    expect(converted.utc().format()).toEqual("2020-06-02T02:00:00Z");
  });
});
