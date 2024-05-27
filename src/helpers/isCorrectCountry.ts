export function isCorrectCountry(country: string): country is 'RU' | 'BY' {
  return country === 'RU' || country === 'BY';
}
