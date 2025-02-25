import type { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki/bundle/web";
import type { MaybeRefOrGetter } from "vue";
import { isDark } from "@/shared/isDark";
import { bundledLanguages, createHighlighter } from "shiki/bundle/web";
import { computed, shallowRef, toValue } from "vue";

const highlighter = shallowRef<HighlighterGeneric<BundledLanguage, BundledTheme>>();
export function useHighlighter() {
  async function init() {
    if (highlighter.value) {
      return;
    }
    highlighter.value = await createHighlighter({
      langs: Object.keys(bundledLanguages),
      themes: ["vitesse-dark", "vitesse-light"],
    });
  }

  init();

  function codeToHtml(code: MaybeRefOrGetter<string | undefined>, lang: MaybeRefOrGetter<string | undefined>) {
    return computed(() => {
      if (!toValue(code)) {
        return "";
      }
      if (!highlighter.value) {
        return `<pre>${toValue(code)}</pre>`;
      }
      return highlighter.value.codeToHtml(toValue(code)!, {
        lang: toValue(lang) || "",
        theme: isDark.value ? "vitesse-dark" : "vitesse-light",
      });
    });
  }

  return {
    highlighter,
    codeToHtml,
  };
}
