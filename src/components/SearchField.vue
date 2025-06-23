<template>
  <div class="flex min-h-screen flex-col bg-white text-gray-900">
    
    <!-- Main Content -->
    <main class="flex-1">
      <!-- Search Hero Section -->
      <section class="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-6xl` mx-auto text-center">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
              <span class="text-amber-500">로드</span> 아카이브
            </h1>
          
            <form @submit.prevent="handleSearch" class="flex items-center justify-center w-full max-w-6xl mx-auto gap-3">
              <!-- 리셋 버튼 -->
              <button
                type="button"
                @click="resetSearch"
                class="h-14 w-14 flex-shrink-0 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-300 text-gray-500 rounded-md transition-colors"
                title="초기화"
              >
                <ListRestart class="text-gray-700 w-6 h-6" />
              </button>

              <!-- 검색 입력창 -->
              <div class="relative flex-1">
                <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                <input
                  type="search"
                  placeholder="검색"
                  class="w-full h-14 pl-12 pr-4 text-base bg-white border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-900 shadow-sm rounded-md"
                  v-model="searchQuery"
                />
              </div>

              <!-- 검색 버튼 -->
              <button
                type="submit"
                class="h-14 px-6 flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium text-base flex items-center justify-center whitespace-nowrap"
              >
                검색
              </button>
            </form>


            <!-- 태그 -->
            <!-- <div class="flex flex-wrap justify-center gap-2 mt-4">
              <span class="text-sm text-gray-600">Popular searches:</span>
              <span
                v-for="tag in popularSearches"
                :key="tag"
                class="cursor-pointer text-xs px-2.5 py-0.5 rounded-full border border-gray-300 hover:bg-gray-100 hover:text-amber-600"
                @click="quickSearch(tag)"
              >
                {{ tag }}
              </span>
            </div> -->
          </div>
        </div>
      </section>

      <!-- 검색 결과 -->
      <section class="w-full py-8 md:py-12">
        <div class="container mx-auto px-4 md:px-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">
                 {{ searchQuery ? `"${searchQuery}"에 대한 결과` : "" }}
              </h2>
              <p class="text-gray-600 mt-1">
                
              </p>
            </div>
            <!-- <div class="flex items-center gap-2">
               <form @submit.prevent="handleSearch" class="relative">
                <Search class="absolute left-3 top-2.5 h-4 w-4 text-amber-500" />
                <input
                  type="search"
                  placeholder="Refine your search..."
                  class="w-[400px] rounded-md pl-9 py-1.5 bg-white border border-gray-300 focus:border-amber-500 focus:outline-none text-gray-900"
                  v-model="searchQuery"
                />
              </form>
              <button class="rounded-md p-2 hover:bg-gray-100" @click="clearSearch">
                <X class="h-4 w-4 text-gray-600" />
              </button>
            </div> -->
          </div>

          <!-- <div class="flex flex-wrap gap-2 mb-6">
            <button>
              
            </button>
            <div class="relative ml-auto">
              <button
                class="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-gray-100" >
                <Filter class="h-4 w-4 mr-2" />
                Filter
              </button>
              <div class="absolute right-0 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-10">
                <div class="py-1">
                  <button>
                  </button>
                </div>
              </div>
            </div>
          </div> -->

          <!-- 검색 결과 -->
          <div class="w-full py-8 md:py-12">

            <!-- 캐릭터 -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4" v-if="characters?.length">
              <div v-for="ch in characters" class="bg-zinc-900 p-4 rounded-xl shadow-lg flex items-center gap-4">
                <img :src="ch.imgUrl" class="w-16 h-16 rounded-full" />
                <div class="flex-1" @click ="detailOpen(ch.id)">
                  <h2 class="text-lg text-white font-semibold">{{ ch.cname }} ({{ ch.cname_en }})</h2>
                  <div class="flex items-center gap-2 mt-1">
                    <img :src="getJobIcon(ch.job_id)" class="w-8 h-8" :alt="ch.job_name" title="직업" />
                    <img :src="getElement(ch.element_id)" class="w-8 h-8" :alt="ch.element_name" title="속성" />
                  </div>
                </div>
              </div>
            </div>



            <!-- 스킬 -->

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4" v-if="skills?.length" >
              <template v-for="skill in skills"
              :key="skill.id">
              <!-- <div class="flex flex-col space-y-2"> -->
                <div
                class="flex gap-4 bg-zinc-900 p-4 rounded-xl shadow-md hover:ring-2 hover:ring-amber-400 transition cursor-pointer"
                @click ="detailOpen(skill.c_id)"
                >
                <!-- 스킬 이미지 -->
                  <img
                    :src="`http://localhost:5173/icons/element/fire.webp`" 
                    class="w-16 h-16 rounded-lg object-cover"
                    alt="스킬 이미지"
                  />

                <!-- 오른쪽 텍스트 영역 -->
                <div class="flex flex-col flex-1">
                  <!-- 스킬 이름 + 타입 -->
                  <div class="flex items-center gap-2">
                    <h2 class="text-base font-semibold truncate text-white">
                      {{ skill.sname }}
                    </h2>
                    <span class="text-xs px-2 py-0.5 rounded bg-blue-500 text-white">
                      {{ enumMap.skill[skill.stype] }}
                    </span>
                    
                  </div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-base font-semibold truncate text-gray-400">
                      {{ skill.cname.split(" ")[0] }}
                    </h2>
                  </div>
         
                  <!-- 스킬 설명 -->
                  <p class="mt-2 text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                    {{ skill.s_desc }}
                  </p>
                </div>
              </div>

              <!-- <transition name="expand">
                <div
                  v-if="skillIdx === skill.sid"
                  class="p-4 bg-white rounded-xl shadow-inner border border-gray-200 text-gray-900"
                >
                  <p class="text-sm">{{ skill.s_desc }}</p>
                </div>
              </transition>
            </div>            -->

              <!-- <div v-if="isClick && skillIdx === skill.sid" class="w-full col-span-3 mt-2 p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex-col"> -->
                <!-- 관련 캐릭터 (선택사항) -->
                  <!-- <div class="mt-4 flex items-center gap-3"> -->
                    <!-- <img
                      :src="details.img_url"
                      class="w-12 h-12 rounded-full object-cover"
                      alt="캐릭터 이미지"
                    /> -->
                    <!-- <div class="flex flex-col">
                      <span class="font-semibold text-black">{{ details.cname }}</span>
                      <span class="font-semibold text-black">{{ skillIdx }}</span>
                      <span class="text-xs text-black">{{ details.job_name }}</span>
                    </div>
                  </div>
               </div> -->

              </template>
              
            </div>

      
            <!-- 아티팩트 -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4" v-if="artifacts?.length">
              <div
                v-for="af in artifacts"
                @click ="detailOpen(af.c_id)"
                :key="af.id"
                class="flex gap-4 bg-zinc-900 p-4 rounded-xl shadow-md hover:ring-2 hover:ring-amber-400 transition cursor-pointer overflow-hidden"
              >
                <!-- 아티팩트 이미지 -->
                <img
                  :src="`http://localhost:5173/icons/artifact/라플라스_495.webp`" 
                  class="w-16 h-16 rounded-lg object-cover shrink-0"
                  alt="아티팩트 이미지"
                />

                <!-- 오른쪽 텍스트 영역 -->
                <div class="flex flex-col flex-1 overflow-hidden">
                  <!-- 아티팩트 이름 + 타입 -->
                  <div class="flex items-center gap-2 overflow-hidden">
                    <h2 class="text-base font-semibold truncate text-white max-w-full">
                      {{ af.aname }}
                    </h2>
                    <span class="text-xs px-2 py-0.5 rounded bg-blue-500 text-white truncate">
                      {{ enumMap.artifact[af.atype] }}
                    </span>
                  </div>

                  <!-- 아티팩트 설명 -->
                  <p class="mt-2 text-sm text-zinc-300 leading-relaxed break-words whitespace-pre-line overflow-hidden">
                    {{ af.a_desc }}
                  </p>
                </div>
              </div>
            </div>
            <!-- </div> -->
            </div>

            <CharaDetailPopup v-if="isClick===true" @close="isClick=false" :cid="selectedId"></CharaDetailPopup>
          </div>

          <!-- No Results -->
          <div class="text-center py-12" v-if="!characters?.length && !skills?.length && !artifacts?.length">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Search class="h-8 w-8 text-amber-500" />
            </div>
            <h2 class="text-2xl font-bold mb-2">결과 없음</h2>
            <p class="text-gray-600 max-w-md mx-auto">
               "{{ searchQuery }}"
            </p>
          </div>
        <!-- </div> -->
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, ListRestart } from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import  { enumMap } from "../constants/enumsMap.js";
import CharaDetailPopup from "./popup/CharacterDetailPopup.vue";


// State
const searchQuery = ref('')

const artifacts = ref([]); 
const characters = ref([]);
const skills = ref([]);
const selectedId = ref(null);
const isClick = ref(false);
const props = defineProps(['cid']);



// Methods
const handleSearch = () => {
  const keywords = searchQuery.value;
  console.log(keywords);
  instance.get('search', {params: {keywords}})
  .then((response)=> {
    // 성공 
    artifacts.value = response.data.artifacts;  
    characters.value = response.data.characters;  
    skills.value = response.data.skills;
  })
  .catch((error)=> {
    // 에러
    console.log(error);
  })
  .finally(()=> {
    
  });
}

const resetSearch = () => {
  searchQuery.value = ''
}

const detailOpen = (idx) =>{
  selectedId.value = idx
  isClick.value = true;
  
  
}

const getJobIcon = (jobId) => {
  const imgUrl = 'http://localhost:5173/icons/jobs/'
  switch (jobId) {
    case 1:
      return imgUrl + "guardian.webp";
      break;

    case 2: 
      return imgUrl + "warrior.webp";
      break;

    case 3:
      return imgUrl + "striker.webp";
      break;

    case 4:
      return imgUrl + "shooter.webp";
      break;

    case 5:
      return imgUrl + "priest.webp";
      break;

    case 6:
      return imgUrl + "commander.webp";
      break;
  }
}

const getElement = (elementId) => {
  const imgUrl = 'http://localhost:5173/icons/element/'
  switch (elementId) {
    case 1:
      return imgUrl + "water.webp";
      break;

    case 2: 
      return imgUrl + "fire.webp";
      break;

    case 3:
      return imgUrl + "earth.webp";
      break;

    case 4:
      return imgUrl + "light.webp";
      break;

    case 5:
      return imgUrl + "night.webp";
      break;
  }
}

// Initialize with a default search on mount
onMounted(() => {
  // Start with all results showing
  // handleSearch()
})
</script>

<style>
/* Additional custom styles */
:root {
  /* Gold color palette */
  --color-amber-50: #fffbeb;
  --color-amber-100: #fef3c7;
  --color-amber-200: #fde68a;
  --color-amber-300: #fcd34d;
  --color-amber-400: #fbbf24;
  --color-amber-500: #f59e0b; /* Main gold accent color */
  --color-amber-600: #d97706;
  --color-amber-700: #b45309;
  --color-amber-800: #92400e;
  --color-amber-900: #78350f;
  
  /* Gray color palette for text */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
}

body {
  background-color: white;
  color: var(--color-gray-900);
}

/* Focus styles for better accessibility */
input:focus {
  box-shadow: 0 0 0 2px var(--color-amber-500);
}

/* Ensure smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>