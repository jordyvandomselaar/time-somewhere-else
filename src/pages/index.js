import React, {useEffect} from "react";
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

    useEffect(() => {
        setTimezoneFrom(moment.tz.guess())
    }, [])

    return (
        <form>
            <div>
                <DaySelector onChange={setDay} selected={day}/>
            </div>
            <div>
                <TimeSelector onChangeFromTime={setTimeFrom} valueFromTime={timeFrom}/>
            </div>
            <div>
                <TimezoneSelector valueTimezoneFrom={timezoneFrom} onChangeTimezoneFrom={setTimezoneFrom}
                                  valueTimezoneTo={timezoneTo} onChangeTimezoneTo={setTimezoneTo}/>
            </div>

            <p>Time in {timezoneTo}: {resultMoment.tz(timezoneTo)?.toString()}</p>
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
                <div>
                    <DayItem checked={selected === weekday} onChange={() => onChange(weekday)}>{weekday}</DayItem>
                </div>
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
            <input placeholder="23:00" type="text" name="time_from" value={valueFromTime}
                   onChange={e => onChangeFromTime(e.currentTarget.value)}/>
        </label>
    </>;
}

function TimezoneSelector({onChangeTimezoneFrom, onChangeTimezoneTo, valueTimezoneFrom, valueTimezoneTo}) {
    const timezones = moment.tz.names();

    return <>
        <div>
            <label>
                From timezone
                <select value={valueTimezoneFrom} onChange={e => onChangeTimezoneFrom(e.currentTarget.value)} name="timezone_from" id="timezone_from">
                    {timezones.map(timezone => <option value={timezone}>{timezone}</option>)}
                </select>
            </label>
        </div>
        <div>
            <label>
                To timezone
                <select value={valueTimezoneTo} onChange={e => onChangeTimezoneTo(e.currentTarget.value)} name="timezone_to" id="timezone_to">
                    {timezones.map(timezone => <option value={timezone}>{timezone}</option>)}
                </select>
            </label>
        </div>
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
