import { useEffect, useState } from "react"
import './Countdown.css';

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export function Countdown({ comingDate, isDark = false }) {

    const futureDate = new Date(comingDate);
    const futureDay = futureDate.getDay();
    const futureMonth = MONTHS[futureDate.getMonth()];
    const futureYear = futureDate.getFullYear();

    const calculateTimeLeft = (comingDate) => {
        let difference = +new Date(comingDate) - +new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(comingDate));

    useEffect(() => {

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(comingDate));
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    }

    return (
        <div className={`countdown ${isDark ? 'dark' : ''}`}>
            <h3>Coming <span>{`${futureDay} ${futureMonth} ${futureYear}`}</span></h3>
            <div className='time'>
                <div className="item">
                    <p className="number">{formatTime(timeLeft.days)}</p>
                    <p>Days</p>
                </div>
                <div className="item">
                    <p className="number">{formatTime(timeLeft.hours)}</p>
                    <p>Hours</p>
                </div>
                <div className="item">
                    <p className="number">{formatTime(timeLeft.minutes)}</p>
                    <p>Minutes</p>
                </div>
                <div className="item">
                    <p className="number">{formatTime(timeLeft.seconds)}</p>
                    <p>Seconds</p>
                </div>
            </div>
        </div>
    )
}