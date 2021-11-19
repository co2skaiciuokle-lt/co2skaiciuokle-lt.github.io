const FUEL_Types = {
  DIESEL: "diesel",
  GAS: "gas",
  GASOLINE: "gasoline",
};
export function calculateWithCO2(co2, euro, fuelType) {
  const taxes = calculateFee(co2, euro, fuelType);

  return { taxes };
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
    return 0.047 * weigth + 0.561 * kw + 56.621 > 0
      ? 0.047 * weigth + 0.561 * kw + 56.621
      : 0;
  if (
    (fuelType.fuel === FUEL_Types.GASOLINE ||
      fuelType.fuel === FUEL_Types.GAS) &&
    !isManual
  )
    return 0.102 * weigth + 0.328 * kw + 9.481 > 0
      ? 0.102 * weigth + 0.328 * kw + 9.481
      : 0;
  if (fuelType.fuel === FUEL_Types.DIESEL && isManual)
    return 0.108 * weigth - 11.371 > 0 ? 0.108 * weigth - 11.371 : 0;
  if (fuelType.fuel === FUEL_Types.DIESEL && !isManual)
    return 0.116 * weigth - 6.432 > 0 ? 0.116 * weigth - 6.432 : 0;

  return 0;
}

function calculateFee(co2, euro, fuelType) {
  return {
    y2023yearsCoeff:
      co2 *
      calculateCoeffOfEuroCO2(co2).y2023yearsCoeff *
      calculateCoeffOfEuro(euro, fuelType),
    y2024yearsCoeff:
      co2 *
      calculateCoeffOfEuroCO2(co2).y2024yearsCoeff *
      calculateCoeffOfEuro(euro, fuelType),
    y2025yearsCoeff:
      co2 *
      calculateCoeffOfEuroCO2(co2).y2025yearsCoeff *
      calculateCoeffOfEuro(euro, fuelType),
    y2026yearsCost:
      co2 *
      calculateCoeffOfEuroCO2(co2).y2026yearsCoeff *
      calculateCoeffOfEuro(euro, fuelType),
  };
}

function calculateCoeffOfEuroCO2(co2) {
  if (co2 < 100)
    return {
      y2023yearsCoeff: 0,
      y2024yearsCoeff: 0,
      y2025yearsCoeff: 0,
      y2026yearsCoeff: 0.0,
    };
  if (co2 >= 101 && co2 < 111)
    return {
      y2023yearsCoeff: 0,
      y2024yearsCoeff: 0,
      y2025yearsCoeff: 0,
      y2026yearsCoeff: 0.56,
    };
  if (co2 >= 111 && co2 < 121)
    return {
      y2023yearsCoeff: 0,
      y2024yearsCoeff: 0,
      y2025yearsCoeff: 0.56,
      y2026yearsCoeff: 0.56,
    };
  if (co2 >= 121 && co2 < 131)
    return {
      y2023yearsCoeff: 0,
      y2024yearsCoeff: 0.56,
      y2025yearsCoeff: 0.56,
      y2026yearsCoeff: 0.56,
    };
  if (co2 >= 131 && co2 < 161)
    return {
      y2023yearsCoeff: 0.56,
      y2024yearsCoeff: 0.56,
      y2025yearsCoeff: 0.56,
      y2026yearsCoeff: 0.56,
    };
  if (co2 >= 161 && co2 < 201)
    return {
      y2023yearsCoeff: 0.76,
      y2024yearsCoeff: 0.76,
      y2025yearsCoeff: 0.76,
      y2026yearsCoeff: 0.76,
    };
  if (co2 >= 201 && co2 < 251)
    return {
      y2023yearsCoeff: 1.1,
      y2024yearsCoeff: 1.1,
      y2025yearsCoeff: 1.1,
      y2026yearsCoeff: 1.1,
    };
  if (co2 >= 251)
    return {
      y2023yearsCoeff: 1.5,
      y2024yearsCoeff: 1.5,
      y2025yearsCoeff: 1.5,
      y2026yearsCoeff: 1.5,
    };

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
