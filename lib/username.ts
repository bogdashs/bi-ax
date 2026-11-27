export const USERNAME_MIN = 3;
export const USERNAME_MAX = 20;

/**
 * Адреса, которые заняты самим приложением. Валидация обязательна:
 * страницы живут в корне домена (bi.axven.xyz/<ник>), поэтому любой
 * ник конфликтует с роутом, если не зарезервировать его заранее.
 */
export const RESERVED_USERNAMES = new Set([
  // app routes
  "login", "logout", "register", "signup", "signin", "auth", "oauth", "callback",
  "dashboard", "settings", "account", "admin", "app", "api", "u", "s",
  "new", "edit", "create", "delete", "verify", "reset", "search", "explore",
  // content & legal
  "about", "blog", "docs", "help", "support", "pricing", "terms", "privacy",
  "legal", "press", "careers", "status", "team", "official",
  // infra & assets
  "www", "mail", "static", "assets", "uploads", "media", "img", "cdn",
  "health", "metrics", "_next", "favicon", "robots", "sitemap", "manifest",
  // infra words
  "dev", "staging", "test", "demo", "root", "system", "null", "undefined",
  "anonymous", "bi", "axven",
]);

/**
 * Заглушка до появления базы. Позже заменится запросом в Postgres.
 */
const DEMO_TAKEN = new Set([
  "mila", "kai", "nova", "rio", "juno", "you", "hello", "me",
]);

export type UsernameStatus =
  | "empty"
  | "short"
  | "long"
  | "invalid"
  | "reserved"
  | "checking"
  | "taken"
  | "available";

export type UsernameVerdict = {
  status: UsernameStatus;
  message: string;
};

export const USERNAME_HINT = `lowercase letters, numbers and dashes. ${USERNAME_MIN}–${USERNAME_MAX} characters.`;

/**
 * Обрезает пробелы и приводит к нижнему регистру.
 * Остальное не «исправляем» молча: пользователь должен видеть, что ввёл.
 */
export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

/** Синхронные проверки, не требующие базы. */
export function inspectUsername(raw: string): UsernameVerdict {
  const value = normalizeUsername(raw);

  if (!value) {
    return { status: "empty", message: USERNAME_HINT };
  }

  // Гомографы и любые не-ASCII отсекаем явно, иначе «аdmin» с кириллицей
  // превращается в мусор при нормализации и ведёт себя непредсказуемо.
  if (/[^\x20-\x7E]/.test(raw)) {
    return { status: "invalid", message: "latin letters only." };
  }

  if (!/^[a-z0-9-]+$/.test(value)) {
    return { status: "invalid", message: USERNAME_HINT };
  }

  if (value.length < USERNAME_MIN) {
    return { status: "short", message: `${USERNAME_MIN - value.length} more characters.` };
  }

  if (value.length > USERNAME_MAX) {
    return { status: "long", message: `${USERNAME_MAX} characters max.` };
  }

  if (value.startsWith("-") || value.endsWith("-") || value.includes("--")) {
    return { status: "invalid", message: "no dashes at the edges." };
  }

  if (RESERVED_USERNAMES.has(value)) {
    return { status: "reserved", message: "that one is reserved." };
  }

  return { status: "checking", message: "checking…" };
}

/** Асинхронная проверка занятости. Пока — заглушка, позже — запрос в БД. */
export async function isUsernameTaken(username: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 420));
  return DEMO_TAKEN.has(username);
}

export async function checkUsername(raw: string): Promise<UsernameVerdict> {
  const local = inspectUsername(raw);
  if (local.status !== "checking") return local;

  const taken = await isUsernameTaken(normalizeUsername(raw));
  return taken
    ? { status: "taken", message: "already taken." }
    : { status: "available", message: "it's yours." };
}
