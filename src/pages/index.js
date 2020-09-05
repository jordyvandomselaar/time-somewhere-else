import React, { useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import Layout from "../components/Layout";
import { DayItemWrapper, Input, Label, Select } from "../components/styles";
import Box from "../components/Box";
import Text from "../components/Text";

function Home() {
  const [day, setDay] = useQueryParams("day");
  const [timeFrom, setTimeFrom] = useQueryParams("time_from");
  const [timezoneFrom, setTimezoneFrom] = useQueryParams("timezone_from");
  const [timezoneTo, setTimezoneTo] = useQueryParams("timezone_to");

  const resultMoment = moment.tz(
    `${day}:${timeFrom}`,
    "dddd:HH:mm",
    timezoneFrom
  );

  useEffect(() => {
    setTimezoneFrom(moment.tz.guess());
  }, []);

  return (
    <Layout>
      <span>Time Somewhere Else</span>
      <Layout.Content>
        <form>
          <Box px={[3]}>
            <Box paddingBottom={4}>
              <DaySelector onChange={setDay} selected={day} />
            </Box>
            <Box display="flex" flexDirection={["column", "row"]}>
              <TimezoneSelector
                value={timezoneFrom}
                onChange={setTimezoneFrom}
              />
              <Box paddingLeft={[, 2]} paddingTop={[2]}>
                <TimeSelector
                  onChangeFromTime={setTimeFrom}
                  valueFromTime={timeFrom}
                />
              </Box>
            </Box>
            <hr />
            <Box
              display="flex"
              margin="0 auto"
              flexDirection={["column", "row"]}
            >
              <TimezoneSelector value={timezoneTo} onChange={setTimezoneTo} />
              <Box paddingLeft={[, 2]} paddingTop={[2]}>
                <Text>
                  {resultMoment.tz(timezoneTo) instanceof moment
                    ? resultMoment.tz(timezoneTo).format("dddd HH:mm:ss")
                    : "Enter a valid time(zone)…"}
                </Text>
              </Box>
            </Box>
          </Box>
        </form>
      </Layout.Content>
    </Layout>
  );
}

function DaySelector({ onChange, selected }) {
  const weekdays = moment.weekdays();

  return (
    <Box
      display="flex"
      flexDirection={["column", "row"]}
      width="100%"
      justifyContent="space-between"
      maxWidth="700px"
      margin="0 auto"
      flexWrap="wrap"
    >
      {weekdays.map((weekday) => (
        <DayItem
          checked={selected === weekday}
          onChange={() => onChange(weekday)}
        >
          {weekday}
        </DayItem>
      ))}
    </Box>
  );
}

function DayItem({ children, checked, ...inputProps }) {
  return (
    <DayItemWrapper checked={checked}>
      <label>
        {children}
        <input
          {...inputProps}
          checked={checked}
          type="radio"
          id="day"
          name="day"
        />
      </label>
    </DayItemWrapper>
  );
}

function TimeSelector({ onChangeFromTime, valueFromTime }) {
  return (
    <>
      <Label>
        <Input
          placeholder="23:00"
          type="text"
          name="time_from"
          value={valueFromTime}
          onChange={(e) => onChangeFromTime(e.currentTarget.value)}
        />
      </Label>
    </>
  );
}

function TimezoneSelector({ onChange, value }) {
  const timezones = moment.tz.names();

  return (
    <>
      <div>
        <Label>
          <Select
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          >
            {timezones.map((timezone) => (
              <option value={timezone}>{timezone}</option>
            ))}
          </Select>
        </Label>
      </div>
    </>
  );
}

function useQueryParams(key) {
  const router = useRouter();
  const queryParams = router.query;

  return [
    queryParams[key],
    (value) =>
      router.replace({
        query: {
          ...queryParams,
          [key]: value,
        },
      }),
  ];
}

export default Home;
