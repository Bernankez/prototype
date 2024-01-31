// @ts-expect-error no type definition
import { createTransformerFactory, rendererRich } from "https://esm.sh/@shikijs/twoslash@1.0.0-beta.1/core";
// @ts-expect-error no type definition
import { codeToHtml as _codeToHtml } from "https://esm.sh/shiki@1.0.0-beta.1";
// @ts-expect-error no type definition
import { createStorage } from "https://esm.sh/unstorage@1.10.1";
// @ts-expect-error no type definition
import indexedDbDriver from "https://esm.sh/unstorage@1.10.1/drivers/indexedb";
// @ts-expect-error no type definition
import { createTwoslashFromCDN } from "https://esm.sh/twoslash-cdn@0.1.0";
import "@shikijs/twoslash/style-rich.css";
import { type MaybeRefOrGetter, ref, shallowRef, toValue, watch } from "vue";
import { isDark } from "@/shared/isDark";

const twoslash = shallowRef();
const transformerTwoslash = shallowRef();

export function useTwoslash() {
  function init() {
    if (twoslash.value) {
      return;
    }
    // An example using unstorage with IndexedDB to cache the virtual file system
    const storage = createStorage({
      driver: indexedDbDriver({ base: "twoslash-cdn" }),
    });
    twoslash.value = createTwoslashFromCDN({
      storage,
      compilerOptions: {
        lib: ["esnext", "dom"],
      },
    });
    transformerTwoslash.value = createTransformerFactory(twoslash.value.runSync)({
      renderer: rendererRich(),
    });
  }

  init();

  function codeToHtml(code: MaybeRefOrGetter<string | undefined>, lang: MaybeRefOrGetter<string | undefined>) {
    const html = ref(toValue(code) || "");
    watch([() => toValue(code), isDark], async ([code, isDark]) => {
      if (!code) {
        html.value = "";
        return;
      }
      // Before rendering, we need to prepare the types, so that the rendering can happen synchronously
      await twoslash.value.prepareTypes(code);

      // Then we can render the code
      html.value = await _codeToHtml(code, {
        lang: toValue(lang) || "",
        theme: isDark ? "vitesse-dark" : "vitesse-light",
        transformers: [transformerTwoslash.value],
      });
    }, { immediate: true });
    return html;
  }

  return {
    twoslash,
    codeToHtml,
  };
}
