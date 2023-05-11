import React from "react";
import { useNavigate } from "react-router-dom";

function WatchBrands () {
    const navigate = useNavigate()
    const watchBrandsArr = ["Rolex", "Audemar Piguet", "Richard Mille", "F.P. Journe", "Apple", "Omega", "Jaeger Le-Coultre", "Patek Phillipe", "Grand Seiko"]

    function showBrandWatches (brand) {
        navigate(`${brand}`)
    }

    return (
        <div className="brandArrDiv">
            {watchBrandsArr.map((brand) => {
                return <button className="brandButton" onClick={() => {showBrandWatches(brand)}}>{brand}</button>
            })}
        </div>
    )
}

export default WatchBrands