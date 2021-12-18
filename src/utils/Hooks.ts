import {useEffect, useRef} from "react";

export function useDidMount() {
    const mountRef = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            mountRef.current = true
        }, 150);
    }, []);

    return () => mountRef.current;
}