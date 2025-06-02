<template>
    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-black">
      <div class="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4">
        <div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Crown class="h-6 w-6 text-amber-500" />
          <p class="text-center text-sm leading-loose md:text-left text-white">
            &copy; {{ new Date().getFullYear() }} Copyright CLOVERGAMES.INC All rights reserved.
          </p>
        </div>
        <div class="flex gap-4">
          <a href="#" class="text-sm font-medium text-white hover:underline underline-offset-4">Contact</a>
        </div>
      </div>
    </footer>

</template>
<script setup>
import { Crown } from 'lucide-vue-next';
</script>