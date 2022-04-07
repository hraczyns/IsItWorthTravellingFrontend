import {animated, useSprings} from "react-spring";
import {useState} from "react";
import '../css/places.css';

const Places = ({places = []}) => {
    const [index, setIndex] = useState(null);
    const [isDelayed, setIsDelayed] = useState(true);
    const springs = useSprings(
        places.length,
        places.map((item, i) => ({
            delay: isDelayed ? 250 * i : 0,
            opacity: 1,
            transform: "translateY(0px)",
            overlayOpacity: i === index ? 0 : 1,
            textOpacity: i === index ? 1 : 0,
            textHeight: i === index ? "100%" : "0%",
            from: {
                opacity: 0,
                transform: "translateY(100px)",
                overlayOpacity: 1,
                textOpacity: 0,
                textHeight: "0%"
            }
        }))
    );
    return <>
        {springs.map(
            (
                {opacity, transform, overlayOpacity, textOpacity, textHeight},
                i
            ) => (
                <animated.div
                    className={"place-item place-item-main"}
                    onClick={() => {
                        setIndex(i);
                        setIsDelayed(false);
                    }}
                    key={i}
                >
                    <animated.div
                        className={"place-item"}
                        style={{opacity, transform, backgroundImage: `url("${places[i].url}")`}}
                    >
                        <animated.div className={"place-title-wrapper"} style={{opacity: overlayOpacity}}>
                            {places[i].title || "Title"}
                        </animated.div>
                    </animated.div>
                    <animated.div className={"place-text-wrapper"} style={{height: textHeight}}>
                        <animated.div style={{opacity: textOpacity}}>
                            <animated.div className={"place-title-inside"}>
                                {places[i].title || "Title"}
                            </animated.div>
                            <div className={"places-text-inside"}>
                                {places[i].shortDescription}
                            </div>
                        </animated.div>
                    </animated.div>
                </animated.div>
            )
        )}</>
}
export default Places;