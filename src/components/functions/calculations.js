const FUEL_Types = {
    DIESEL: "diesel",
    GAS: "gas",
    GASOLINE: "gasoline",
};

export function calculateWithCO2(co2, euro, fuelType) {
    return checkFuelType(co2, euro, fuelType);
}

export function calculatewithoutCO2(weigth, kw, euro, fuelType, isManual) {
    const taxes = checkFuelType(
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

function checkFuelType(co2, euro, fuelType) {
    return co2 *
        calculateCoeffOfEuroCO2(co2) *
        calculateCoeffOfEuro(euro, fuelType) >
        2258 ?
        2258 :
        co2 * calculateCoeffOfEuroCO2(co2) * calculateCoeffOfEuro(euro, fuelType);
}

function calculateCoeffOfEuroCO2(co2) {
    if (co2 < 131) return 0;
    if (co2 >= 131 && co2 <= 160) return 1.1;
    if (co2 >= 161 && co2 <= 200) return 1.5;
    if (co2 >= 201 && co2 <= 250) return 2.2;
    if (co2 >= 251) return 3;

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