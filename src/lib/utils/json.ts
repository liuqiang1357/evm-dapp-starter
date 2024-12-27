export function serialize(json: unknown): string {
  if (typeof json === 'string') {
    try {
      JSON.parse(json);
    } catch {
      return json;
    }
  }
  return JSON.stringify(json);
}

export function deserialize(string: string): unknown {
  try {
    return JSON.parse(string);
  } catch {
    return string;
  }
}
