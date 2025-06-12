  <template>
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div class="container mx-auto flex h-16 items-center justify-between px-4 py-4">
        
      <!-- 로고 -->
      <div class="flex items-center gap-2">
        <ScrollText class="h-6 w-6 text-amber-500" />
        <span class="text-xl font-bold">로드 아카이브</span>
      </div>

      <!-- 가운데 메인 내비게이션 -->
      <nav class="hidden md:flex gap-10">
        <router-link to="/" class="text-lg font-bold hover:text-amber-500">
          로드 아카이브
        </router-link>
        <router-link to="/rerun" class="text-lg font-bold hover:text-amber-500">
          복각 캘린더
        </router-link>
      </nav>

      <!-- 우측 문의 링크 -->
      <div class="hidden md:block">
        <button @click ="isOpen =true" 
          class="text-sm font-medium hover:text-amber-500">
          문의
        </button>
        <ContactPopup v-if="isOpen" @close="isOpen = false"></ContactPopup>         
        <!-- @close="isOpen = false" -->

      </div>

    </div>
</header>

  </template>
  <script setup>
  import { ref } from 'vue'
  import { ScrollText } from 'lucide-vue-next'
  import  ContactPopup from '../components/popup/ContactPopup.vue'


  const isOpen = ref(false);
  

  </script>
    
   