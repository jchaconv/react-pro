import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';

//const MAXIMUN_COUNT = 10;

export const useCounter = ({ maxCount = 10}) => {

    const [counter, setCounter] = useState(5);
    const elementToAnimate = useRef<any>(null);

    const handleClick = () => {
        setCounter(prev => Math.min(prev + 1, maxCount));

    }

    const timelineRef = useRef(gsap.timeline());

    useLayoutEffect(() => {

        if( !elementToAnimate.current ) return;

        timelineRef.current
            .to(elementToAnimate.current, { y: -10, duration: 0.2, ease: 'ease.out' })
            .to(elementToAnimate.current, { y: 0, duration: 1, ease: 'bounce.out' })
            .pause();

    }, []);
    
    useEffect(() => {
        //if(counter<maxCount) return;
        timelineRef.current.play(0);
    
    }, [counter]);
    


    return {
        elementToAnimate,
        counter,
        handleClick
    };

}