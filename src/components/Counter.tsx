import React, { useState } from "react";

export default function Counter(): React.ReactNode{
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count => count = count + 1);
    }

    return (
        <div>
            <button onClick={ handleClick }>{ count }</button>
        </div>
    )    
}