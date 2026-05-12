const DEFAULT_INTERPOLATE_VALUE = "???";

export function interpolate(
  title: string,
  context: Record<string, string>,
): string {
  return title.replaceAll(
    /\{\{\s*(\w+)\s*\}\}/g,
    (_, key) => context[key] ?? DEFAULT_INTERPOLATE_VALUE,
  );
}
