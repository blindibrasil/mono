export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // substitui caracteres não alfanuméricos por hífen
    .replace(/^-+|-+$/g, '') // remove hífens extras do início e do fim
    .replace(/-+/g, '-') // substitui múltiplos hífens por apenas um
}
