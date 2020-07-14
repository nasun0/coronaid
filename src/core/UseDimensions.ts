import { useEffect, useRef, MutableRefObject } from 'react';


function useDimensions(ref: MutableRefObject<any>) {
    const dimensions = useRef({ width: 0, height: 0 });
    useEffect(() => {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
    }, [ref]);
    return dimensions.current;
}

export default useDimensions;