const FUEL_Types = {
    DIESEL: "diesel",
    GAS: "gas",
    GASOLINE: "gasoline",
};
export function calculateWithCO2(co2, euro, fuelType) {
   const taxes = calculateFee(co2, euro, fuelType);

    return { taxes }
}

export function calculatewithoutCO2(weigth, kw, euro, fuelType, isManual) {
   const taxes = calculateFee(
        calculateAproxCO2(weigth, kw, fuelType, isManual),
        euro,
        fuelType
    );
    
    const c02size = calculateAproxCO2(weigth, kw, fuelType, isManual);
    return { taxes, c02size };
}

function calculateAproxCO2(weigth, kw, fuelType, isManual) {
    if (isNaN(kw)) kw = 0;
    if (isNaN(weigth)) weigth = 0;
    if (fuelType.isElectric)
        return 0.116 * weigth - 57.147 > 0 ? 0.116 * weigth - 57.147 : 0;

    if (
        (fuelType.fuel === FUEL_Types.GASOLINE ||
            fuelType.fuel === FUEL_Types.GAS) &&
        isManual
    )
        return 0.047 * weigth + 0.561 * kw + 56.621 > 0 ?
            0.047 * weigth + 0.561 * kw + 56.621 :
            0;
    if (
        (fuelType.fuel === FUEL_Types.GASOLINE ||
            fuelType.fuel === FUEL_Types.GAS) &&
        !isManual
    )
        return 0.102 * weigth + 0.328 * kw + 9.481 > 0 ?
            0.102 * weigth + 0.328 * kw + 9.481 :
            0;
    if (fuelType.fuel === FUEL_Types.DIESEL && isManual)
        return 0.108 * weigth - 11.371 > 0 ? 0.108 * weigth - 11.371 : 0;
    if (fuelType.fuel === FUEL_Types.DIESEL && !isManual)
        return 0.116 * weigth - 6.432 > 0 ? 0.116 * weigth - 6.432 : 0;

    return 0;
}

function calculateFee(co2, euro, fuelType) {


         
    return {
        registrationCost: co2 *
            calculateCoeffOfEuroCO2(co2).registrationCoeff *
            calculateCoeffOfEuro(euro, fuelType),
        yearsCost: co2 *
            calculateCoeffOfEuroCO2(co2).yearsCoeff *
            calculateCoeffOfEuro(euro, fuelType),
        y2026registrationCost: co2 *
            calculateCoeffOfEuroCO2(co2).y2026registrationCoeff *
            calculateCoeffOfEuro(euro, fuelType),
        y2026yearsCost: co2 *
            calculateCoeffOfEuroCO2(co2).y2026yearsCoeff *
            calculateCoeffOfEuro(euro, fuelType),
    }
}

function calculateCoeffOfEuroCO2(co2) {
    
    if ( co2 < 111 ) return { registrationCoeff: 0, yearsCoeff: 0, y2026registrationCoeff: 0, y2026yearsCoeff: 0 };
    if ( co2 >=111 && co2 < 131) return { registrationCoeff: 0, yearsCoeff: 0 , y2026registrationCoeff: 1.1, y2026yearsCoeff: 0.28 };
    if (co2 >= 131 && co2 < 161) return { registrationCoeff: 1.1, yearsCoeff: 0.28, y2026registrationCoeff: 1.1, y2026yearsCoeff: 0.28 };
    if (co2 >= 161 && co2 < 201) return { registrationCoeff: 1.5, yearsCoeff: 0.38,y2026registrationCoeff: 1.5, y2026yearsCoeff: 0.38 };
    if (co2 >= 201 && co2 < 251) return { registrationCoeff: 2.2, yearsCoeff: 0.55,y2026registrationCoeff: 2.2, y2026yearsCoeff: 0.55};
    if (co2 >= 251) return { registrationCoeff: 3, yearsCoeff: 0.75,y2026registrationCoeff: 3, y2026yearsCoeff: 0.75 };

    return 0;
}

function calculateCoeffOfEuro(euro, fueltype) {
    if (fueltype.fuel === FUEL_Types.DIESEL) {
        if (euro === 6) return 1.7;
        if (euro === 5) return 2;
        if (euro === 4 || euro === 3) return 2.3;
        if (euro === 2 || euro === 1) return 2.5;
    }
    if (fueltype.fuel === FUEL_Types.GASOLINE) {
        if (euro === 6) return 0.9;
        if (euro === 5) return 1;
        if (euro === 4 || euro === 3) return 1.1;
        if (euro === 2 || euro === 1) return 1.4;
    }
    if (fueltype.fuel === FUEL_Types.GAS) {
        if (euro === 6) return 0.8;
        if (euro === 5) return 0.9;
        if (euro === 4 || euro === 3) return 1;
        if (euro === 2 || euro === 1) return 1.3;
    }

    return 0;
}