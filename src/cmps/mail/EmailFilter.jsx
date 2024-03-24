import { useEffect } from "react";

export function EmailFilter() {
    useEffect(() => {
        onSetFilter(filter)
    }, [filter])

    return (
        <div className="filter-container">
            <div className="search-box">
                <button>
                </button>
            </div>
        </div>
    )
}