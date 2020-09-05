import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import Layout from "../components/Layout";
import {
  DayItemWrapper,
  Input,
  SearchSelectWrapper,
  Text,
} from "../components/styles";
import Box from "../components/Box";
import SelectSearch from "react-select-search/dist/cjs";

export async function getServerSideProps(context) {
  return {
    props: {}, // Use server side rendering until https://github.com/vercel/next.js/issues/8259 is fixed
  }
}

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

  const router = useRouter()

  useEffect(() => {
    if (!timezoneFrom) {
      setTimezoneFrom(moment.tz.guess());
    }
  }, [router.query]);

  return (
    <Layout>
      <Box paddingLeft={2} paddingTop={2}>
        <Text variant="app" as="span">
          Time Somewhere Else
        </Text>
      </Box>
      <Layout.Content>
        <form>
          <Box px={[3]}>
            <Box paddingBottom={2}>
              <DaySelector onChange={setDay} selected={day} />
            </Box>
            <Box display="flex" flexDirection={["column", "row"]}>
              <TimezoneSelector
                value={timezoneFrom}
                onChange={setTimezoneFrom}
              />
              <Box paddingLeft={[, 2]} paddingTop={[2, 0]}>
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
              <Box paddingLeft={[, 2]} paddingTop={[2, 0]}>
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
      flexWrap="wrap"
    >
      {weekdays.map((weekday) => (
        <Box paddingRight={1}>
          <DayItem
              checked={selected === weekday}
              onChange={() => onChange(weekday)}
          >
            <Text as="span">{weekday}</Text>
          </DayItem>
        </Box>
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
    <Input
      placeholder="23:00"
      type="text"
      name="time_from"
      value={valueFromTime}
      onChange={(e) => onChangeFromTime(e.currentTarget.value)}
    />
  );
}

function TimezoneSelector({ onChange, value }) {
  const timezones = moment.tz.names();

  return (
    <>
      <SearchSelectWrapper>
        <SelectSearch
          value={value}
          search
          placeholder="Select a timezone"
          onChange={(value) => onChange(value)}
          options={timezones.map((timezone) => ({
            name: timezone,
            value: timezone,
          }))}
        />
      </SearchSelectWrapper>
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
