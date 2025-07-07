  <template>
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div class="container mx-auto flex h-20 items-center justify-between px-4 py-2">
        
      <!-- 로고 -->
      <div class="flex items-center gap-2">
        <ScrollText class="h-6 w-6 text-amber-500" />
        <span class="text-xl font-bold">로드 아카이브</span>
      </div>

      <!-- 가운데 메인 내비게이션 -->
      <nav class="hidden md:flex gap-10 absolute left-1/2 transform -translate-x-1/2">
        <router-link to="/about" class="text-lg font-bold hover:text-amber-500">
          ABOUT
        </router-link>
        <!-- <router-link to="/info" class="text-lg font-bold hover:text-amber-500">
          로드 아카이브 소개
        </router-link> -->
        <router-link to="/" class="text-lg font-bold hover:text-amber-500">
          로드 아카이브
        </router-link>
        <router-link to="/rerun" class="text-lg font-bold hover:text-amber-500">
          복각 언제해?
        </router-link>
      </nav>

      <!-- 다크모드, 문의 -->
      <div class="hidden md:flex items-center gap-4">
        <!-- 다크모드 토글 -->
        <!-- <button
          @click="toggleDark"
          class="relative w-20 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"
          aria-label="Toggle dark mode"
        >
          <div
            class="absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-200 flex items-center justify-center"
            :class="isDark ? 'translate-x-10' : 'translate-x-0'"
          >
            <component
              :is="isDark ? Moon : Sun"
              :class="[
                'w-5 h-5',
                isDark ? 'text-purple-400' : 'text-amber-400'
              ]"
            />
          </div>
        </button> -->

        <!-- 문의 버튼 -->
        <button
          @click="isOpen = true"
          class="text-sm font-medium hover:text-amber-500"
        >
          문의
        </button>

        <!-- 문의 팝업 -->
        <ContactPopup v-if="isOpen" @close="isOpen = false" />
      </div>


    </div>

   

  </header>

</template>



  <script setup>
  import { ref, onMounted } from 'vue'
  import { ScrollText, Moon, Sun } from 'lucide-vue-next'
  
  import  ContactPopup from '../components/popup/ContactPopup.vue'




  const isOpen = ref(false);
  // const isDark = ref(false);
  
//   onMounted(() => {
//   isDark.value = localStorage.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
//   document.documentElement.classList.toggle('dark', isDark.value)
// })

// const toggleDark = () => {
//   isDark.value = !isDark.value
//   document.documentElement.classList.toggle('dark', isDark.value)
//   localStorage.theme = isDark.value ? 'dark' : 'light'
// }

</script>
