import '../css/costs.css';
import '../css/collapse.css';
import {animated, easings, useSpring, useSprings} from 'react-spring';
import {useMemo, useState} from "react";
import {Waypoint} from "react-waypoint";
import {Collapse} from "react-collapse/lib/Collapse";

const MONTH = 30;
const ARROWS_DOWN = ["⬇️", "⬇️", "⬇️"];

const getValueToInterpolate = (estimatedCost, numberOfDaysToCalc) => {
    if (numberOfDaysToCalc === MONTH) {
        return estimatedCost;
    }
    return estimatedCost * numberOfDaysToCalc / MONTH;
}

const getDetails = (data) => {
    return <ul className={"costs-details-list"}>
        {data?.costsPerGroup?.map(group => {
            return <li key={group?.categoryName + Math.random()}>{group?.categoryName}
                <ul className={"costs-per-group-list"}>
                    {group?.costsPerGroupItemList?.map(item => {
                        return <li className={"costs-per-group-list-item"} key={item.name}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                        </li>
                    })}
                </ul>
            </li>;
        })}
    </ul>
};

const Costs = ({data}) => {
    const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(true);
    const [numberOfDaysToCalc, setNumberOfDaysToCalc] = useState("" + MONTH);
    const [isEstimatedCostSeen, setEstimatedCostSeen] = useState(false);
    const estimatedCosts = parseFloat(parseFloat(data?.estimatedCost?.slice(0, -1) || 0).toPrecision(4));
    const valueToInterpolate = useMemo(() => getValueToInterpolate(estimatedCosts, numberOfDaysToCalc), [numberOfDaysToCalc, estimatedCosts])
    const details = useMemo(() => getDetails(data), [data]);
    const {val} = useSpring({
            val: isEstimatedCostSeen ? valueToInterpolate : valueToInterpolate * 0.8,
            from: {val: 0.0},
            config: {
                duration: 2000,
                easing: easings.easeInOutQuad
            }
        }
    );

    const springs = useSprings(ARROWS_DOWN.length, ARROWS_DOWN.map(() => ({
        transform: isDetailsCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'
    })));

    const onDaysChange = ({target: {value}}) => {
        if (!value) {
            setNumberOfDaysToCalc("");
        } else if (value <= MONTH) {
            setNumberOfDaysToCalc(value);
        }
    }

    const getGroups = () => {
        return data?.costsPerGroup?.map(group => {
            return <li key={group?.categoryName}>
                {group?.categoryName} - about <span
                className={"costs-data-avg"}>{group?.median}</span> median {group?.note || ""}
            </li>
        }) || "No data here 😔"
    }

    return <>
        <main className={"costs-wrapper"}>
            <article className={"costs-data-container"}>
                <section className={"costs-data-general"}>
                    <header className={"costs-data-header"}>Costs in {data?.countryName}</header>
                    <div className={"costs-data-median-avg"}>
                        &#128181;
                        <Waypoint onEnter={() => setEstimatedCostSeen(true)}
                                  onLeave={() => setEstimatedCostSeen(false)}>
                            <animated.span
                                className={"costs-data-avg"}>{val.to(val => Math.floor(val))}</animated.span>
                        </Waypoint>
                        <span className={"costs-data-avg"}> $ </span>
                        per
                        <input className={"costs-data-avg-input"} value={numberOfDaysToCalc}
                               onChange={onDaysChange}/>
                        days for a typical &#128100;
                    </div>
                    <div className={"costs-data-median-avg-groups"}>
                        Including:
                        <ul>
                            {getGroups()}
                        </ul>
                    </div>
                </section>
                <section className={"costs-data-image"}/>
            </article>
        </main>
        <section className={"costs-wrapper-details"}>
            <button onClick={() => {
                setIsDetailsCollapsed(prev => !prev);
            }}>
                <div>{isDetailsCollapsed ? "Show" : "Hide"} costs details</div>
                <div style={{display: "flex"}}>
                    {springs.map((styles, index) => <animated.span key={index}
                                                                   style={{display: "block", ...styles}}>⬇️</animated.span>)}
                </div>
            </button>
            <Collapse isOpened={!isDetailsCollapsed}>
                <article className={"costs-details"}>
                    {details}
                </article>
            </Collapse>
        </section>
    </>
}

export default Costs;