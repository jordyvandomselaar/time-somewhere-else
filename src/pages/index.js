import React from "react";
import {useRouter} from "next/router";
import moment from "moment-timezone";

function Home() {
    const [day, setDay] = useQueryParams("day");
    const [timeFrom, setTimeFrom] = useQueryParams("time_from");
    const [timezoneFrom, setTimezoneFrom] = useQueryParams("timezone_from");
    const [timezoneTo, setTimezoneTo] = useQueryParams("timezone_to");

    const resultMoment = moment.tz(
        `${day}:${timeFrom}`,
        "dddd:HH:mm",
        timezoneFrom,
    );


    return (
        <form>
            <DaySelector onChange={setDay} selected={day}/>
            <TimeSelector onChangeFromTime={setTimeFrom} valueFromTime={timeFrom}/>
            <TimezoneSelector valueTimezoneFrom={timezoneFrom} onChangeTimezoneFrom={setTimezoneFrom}
                              valueTimezoneTo={timezoneTo} onChangeTimezoneTo={setTimezoneTo}/>

            <p>Time in {timezoneTo}: {resultMoment.tz(timezoneTo).toString()}</p>
        </form>
    );
}

export default Home;

function DaySelector({onChange, selected}) {
    const weekdays = moment.weekdays();

    return (
        <fieldset>
            <legend>Pick a day</legend>

            {weekdays.map(weekday => (
                <DayItem checked={selected === weekday} onChange={() => onChange(weekday)}>{weekday}</DayItem>
            ))}
        </fieldset>
    );
}

function DayItem({children, ...inputProps}) {
    return (
        <label>
            {children}
            <input {...inputProps} type="radio" id="day" name="day"/>
        </label>
    );
}


function TimeSelector({onChangeFromTime, valueFromTime}) {
    return <>
        <label>
            From time
            <input type="text" name="time_from" value={valueFromTime}
                   onChange={e => onChangeFromTime(e.currentTarget.value)}/>
        </label>
    </>;
}

function TimezoneSelector({onChangeTimezoneFrom, onChangeTimezoneTo, valueTimezoneFrom, valueTimezoneTo}) {
    const timezones = moment.tz.names();

    return <>
        <label>
            From timezone
            <select value={valueTimezoneFrom} onChange={e => onChangeTimezoneFrom(e.currentTarget.value)} name="timezone_from" id="timezone_from">
                {timezones.map(timezone => <option value={timezone}>{timezone}</option>)}
            </select>
        </label>
        <label>
            To timezone
            <select value={valueTimezoneTo} onChange={e => onChangeTimezoneTo(e.currentTarget.value)} name="timezone_to" id="timezone_to">
                {timezones.map(timezone => <option value={timezone}>{timezone}</option>)}
            </select>
        </label>
    </>;
}

function useQueryParams(key) {
    const router = useRouter();
    const queryParams = router.query;

    return [
        queryParams[key],
        value => router.replace({
            query: {
                ...queryParams,
                [key]: value,
            },
        }),
    ];
}
