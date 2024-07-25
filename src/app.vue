<script lang="ts" setup>
import { InitApp } from '~/utils/initApp'

InitApp()
const locale = useState<string>('locale.i18n')
</script>

<template>
  <Html :lang="locale">
    <Body
      class="antialiased text-gray-800 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-gray-200"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

