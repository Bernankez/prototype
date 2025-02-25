import type { MaybeRefOrGetter } from "vue";
import Shikiji from "@shikijs/markdown-it";
import markdownit from "markdown-it";
// @ts-expect-error no type def
import markdownKatex from "markdown-it-katex";
import { computed, ref, shallowRef, toValue } from "vue";

const markdownIt = shallowRef<markdownit>();
const loaded = ref(false);
export function useMarkdownIt() {
  function init() {
    if (markdownIt.value) {
      return;
    }
    const md = markdownit({
      html: true,
      xhtmlOut: false,
      breaks: true,
      linkify: true,
      typographer: true,
    });
    md.use(markdownKatex);
    markdownIt.value = md;
  }

  async function loadAsyncPlugins() {
    if (!markdownIt.value) {
      return;
    }
    markdownIt.value.use(await Shikiji({
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    }));
    loaded.value = true;
  }

  init();
  loadAsyncPlugins();

  function codeToHtml(code: MaybeRefOrGetter<string | undefined>) {
    return computed(() => {
      // trigger when loaded
      // eslint-disable-next-line ts/no-unused-expressions
      loaded.value;
      if (!toValue(code)) {
        return "";
      }
      if (!markdownIt.value) {
        return toValue(code);
      }
      return markdownIt.value.render(toValue(code)!);
    });
  }

  return {
    markdownIt,
    codeToHtml,
  };
}
