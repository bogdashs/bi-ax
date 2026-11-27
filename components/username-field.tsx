"use client";

import { useEffect, useId, useRef, useState } from "react";
import { checkUsername, inspectUsername, type UsernameStatus } from "@/lib/username";

const BORDER: Record<UsernameStatus, string> = {
  empty: "border-white/10",
  short: "border-err/50",
  long: "border-err/50",
  invalid: "border-err/50",
  reserved: "border-err/50",
  checking: "border-white/10",
  taken: "border-err/50",
  available: "border-ok/60",
};

const TEXT: Record<UsernameStatus, string> = {
  empty: "text-white/45",
  short: "text-err",
  long: "text-err",
  invalid: "text-err",
  reserved: "text-err",
  checking: "text-white/45",
  taken: "text-err",
  available: "text-ok",
};

export function UsernameField({ id }: { id?: string }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<UsernameStatus>("empty");
  const [message, setMessage] = useState("");
  const requestId = useRef(0);

  useEffect(() => {
    const ticket = ++requestId.current;

    if (!value.trim()) {
      setStatus("empty");
      setMessage("");
      return;
    }

    const local = inspectUsername(value);
    if (local.status !== "checking") {
      setStatus(local.status);
      setMessage(local.message);
      return;
    }

    setStatus("checking");
    setMessage(local.message);

    const timer = setTimeout(async () => {
      const verdict = await checkUsername(value);
      if (ticket !== requestId.current) return;
      setStatus(verdict.status);
      setMessage(verdict.message);
    }, 220);

    return () => clearTimeout(timer);
  }, [value]);

  const available = status === "available";

  return (
    <form action="/register" method="get" className="w-full max-w-[440px]">
      <label htmlFor={inputId} className="sr-only">
        Your name
      </label>

      <div
        className={`flex items-center gap-2 rounded-full border bg-white/6 p-1.5 pl-4 backdrop-blur-md transition-colors duration-200 ${BORDER[status]}`}
      >
        <span className="select-none font-mono text-[13px] text-white/40">
          bi.ax/
        </span>
        <input
          id={inputId}
          name="u"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="your name"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={24}
          aria-describedby={`${inputId}-status`}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] text-white caret-cyan outline-none placeholder:text-white/35"
        />
        <button
          type="submit"
          disabled={!available}
          className="shine grad-brand rounded-full px-4 py-2.5 text-[13px] font-semibold text-white transition-[transform,opacity] duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          claim
        </button>
      </div>

      {status !== "empty" && (
        <p
          id={`${inputId}-status`}
          aria-live="polite"
          className={`mt-2 pl-4 text-[12.5px] ${TEXT[status]}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
