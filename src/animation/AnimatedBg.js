import {animated, easings, useSpring} from "react-spring";
import {useState} from "react";

const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

const cloudAppearProps = {
    from: {transform: "translate(0%,0%)", opacity: 0.5},

    to: async (animate) => {
        await animate({
            to: [
                {
                    transform: `translate(${randomInRange(-5, 5)}%,${randomInRange(-5, 5)}%)`,
                    opacity: 0.5
                },
                {
                    transform: `translate(0%,0%)`,
                    opacity: 0.5
                }
            ]
        });
    },
    config: {duration: 500},
    loop: true
};

const AnimatedBg = () => {
    const animProps = useSpring({
        from: {
            height: 100,
            right: -150,
            top: -50,
            opacity: 0,
        },
        top: 15,
        right: 0,
        opacity: 1,
        height: 200,
        config: {
            duration: 1500,
            tension: 40,
            easing: easings.easeInOutQuad
        },
        onRest: () => {
            setAnimPlane(quaver)
        }
    });

    const quaver = useSpring({
        from: {y: 0},
        to: async (animate) => {
            await animate({
                to: [
                    {y: 15},
                    {y: 0}
                ]
            });
        },
        loop: true,
        config: {
            duration: 2000,
            tension: 40,
            easing: easings.easeInOutQuad
        },
    });

    const cloudsAppearA = useSpring({...cloudAppearProps});
    const cloudsAppearB = useSpring({...cloudAppearProps});
    const cloudsAppearC = useSpring({...cloudAppearProps});

    const [animPlane, setAnimPlane] = useState(animProps);

    return <div className={"result-main-anim-wrapper"}>
        <animated.section className={"result-main-plane"} style={animPlane}/>
        <animated.div className={"result-main-cloud"} style={{top: 100, right: -30, ...cloudsAppearA}}/>
        <animated.div className={"result-main-cloud"} style={{top: -130, right: 400, ...cloudsAppearB}}/>
        <animated.div className={"result-main-cloud"} style={{top: 200, right: 250, ...cloudsAppearC}}/>
    </div>
}

export default AnimatedBg;