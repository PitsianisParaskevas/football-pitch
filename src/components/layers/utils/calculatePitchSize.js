export default function calculatePitchSize(
  width,
  height,
  orientation,
  fullPitch,
  formationParts
) {
  // const orientWidth = orientation === "horizontal" ? width : height;
  // const orientHeight = orientation === "horizontal" ? height : width;

  const orientWidth = width;
  const orientHeight = height;

  const axisX = fullPitch ? orientWidth : orientWidth / 2;
  const axisY = orientHeight;
  const zoneX = axisX / formationParts.length;

  return {
    axisX,
    axisY,
    zoneX,
  };
}
