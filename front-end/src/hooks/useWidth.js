import { useState, useEffect } from 'react';

function useWidth() {
    const [width, setWidth] = useState(0)

    // as window width changes update the width variable
    // window.innerWidth <- when this changes update the width

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return width;
}

export default useWidth;