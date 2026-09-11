const modules = import.meta.glob("/src/assets/products/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const productImages: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split("/").pop() as string, url]),
);

export const imageKeys = Object.keys(productImages).sort();

export function resolveImage(key: string | null | undefined): string {
  if (!key) return "";
  if (/^https?:\/\//.test(key)) return key;
  return productImages[key] ?? "";
}
