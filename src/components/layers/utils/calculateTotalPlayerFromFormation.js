export default function calculateTotalPlayerFromFormation(formation) {
  const formationParts = formation.split("-").map(Number);
  formationParts.unshift(1); // Add GK at the beginning
  return formationParts;
}
