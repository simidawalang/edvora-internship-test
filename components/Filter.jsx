import { forwardRef } from "react";

const Filter = forwardRef(({children}, ref) => {
    return (
        <div className="filter" ref={ref}>
            {children}
        </div>
    );
});

export default Filter;