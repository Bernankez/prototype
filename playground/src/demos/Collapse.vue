<script setup lang="ts">
import { Collapse } from "@bernankez/prototype";
</script>

<template>
  <div class="flex flex-col gap-3">
    <Collapse title="Collapse Title" desc="short description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus aliquam sodales. Donec vitae malesuada nibh. Duis congue nibh at dolor efficitur, id euismod elit condimentum. Maecenas commodo odio at velit auctor vehicula. Nam lorem tellus, ornare eget luctus ac, scelerisque a nibh. Aliquam erat volutpat. Proin egestas turpis orci, eget aliquet leo scelerisque in. Vestibulum a sagittis ipsum. Nullam sit amet sollicitudin ex. Nulla egestas leo in ligula tincidunt egestas. Nam ac leo urna. Nunc venenatis pellentesque ipsum in convallis. Quisque dignissim nibh a elit consequat, quis porta sem efficitur. Duis finibus velit sit amet urna blandit venenatis. Aliquam eget rutrum lorem.
    </Collapse>
    <Collapse class="bg-lightblue-50! dark:bg-lightblue-900!" :duration="0.5">
      <template #summary="{ collapsed }">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center gap-1">
            Another Style
            <div class="i-lucide:chevron-right transition" :class="[!collapsed ? 'rotate-90' : '']"></div>
          </div>
          <div>Suffix</div>
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus aliquam sodales. Donec vitae malesuada nibh. Duis congue nibh at dolor efficitur, id euismod elit condimentum. Maecenas commodo odio at velit auctor vehicula. Nam lorem tellus, ornare eget luctus ac, scelerisque a nibh. Aliquam erat volutpat. Proin egestas turpis orci, eget aliquet leo scelerisque in. Vestibulum a sagittis ipsum. Nullam sit amet sollicitudin ex. Nulla egestas leo in ligula tincidunt egestas. Nam ac leo urna. Nunc venenatis pellentesque ipsum in convallis. Quisque dignissim nibh a elit consequat, quis porta sem efficitur. Duis finibus velit sit amet urna blandit venenatis. Aliquam eget rutrum lorem.
    </Collapse>
  </div>
</template>
