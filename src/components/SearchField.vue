<template>
  <div class="flex min-h-screen flex-col bg-white text-gray-900">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div class="container mx-auto flex h-16 items-center justify-between px-4 py-4">
        <div class="flex items-center gap-2">
          <Crown class="h-6 w-6 text-amber-500" />
          <span class="text-xl font-bold">Lord of Heroes</span>
        </div>
        <nav class="hidden md:flex gap-6">
          <router-link to="/rerun" class="text-sm font-medium hover:text-amber-500">복각/실장</router-link>
          <a href="#" class="text-sm font-medium hover:text-amber-500">문의</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <!-- Search Hero Section -->
      <section class="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
              <span class="text-amber-500">로드</span> 아카이브
            </h1>
            <!-- <p class="text-gray-600 md:text-xl mb-8">
              Find heroes, guides, and community content for the epic mobile RPG.
            </p> -->
            <form @submit.prevent="handleSearch" class="relative w-full">
              <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-amber-500" />
              <input
                type="search"
                placeholder="검색"
                class="w-full rounded-md pl-14 pr-32 py-6 text-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none text-gray-900 shadow-sm"
                v-model="searchQuery"/>
              <button
                type="submit"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium"
              >
                Search
              </button>
            </form>
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

      <!-- Search Results -->
      <section class="w-full py-8 md:py-12">
        <div class="container mx-auto px-4 md:px-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">
                Search Results {{ searchQuery ? `for "${searchQuery}"` : "" }}
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
          <div class="mb-10">

            <!-- 캐릭터 -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4" v-if="characters?.length">
              <div v-for="ch in characters" class="bg-zinc-900 p-4 rounded-xl shadow-lg flex items-center gap-4">
                <img :src="ch.imgUrl" class="w-16 h-16 rounded-full" />
                <div class="flex-1">
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
                @click ="detailSearch(skill.c_id,'S',skill.sid)"
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
          </div>

          <!-- No Results -->
          <div class="text-center py-12" v-if="!characters?.length && !skills?.length && !artifacts?.length">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Search class="h-8 w-8 text-amber-500" />
            </div>
            <h2 class="text-2xl font-bold mb-2">No results found</h2>
            <p class="text-gray-600 max-w-md mx-auto">
               "{{ searchQuery }}"
            </p>
            <button class="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Clear Search
            </button>
          </div>
        <!-- </div> -->
      </section>
    </main>

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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Crown, Sword, Shield, Book, Star, Filter, X } from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import  { enumMap } from "../constants/enumsMap.js";


// State
const searchQuery = ref('')

const artifacts = ref([]); 
const characters = ref([]);
const skills = ref([]);
const characterIdx = ref(0);
const skillIdx = ref(0);
const artifactIdx = ref(0);
const details = ref({});
const isClick = ref(false);



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
    // console.log(artifacts);
    // console.log(characters);
    // console.log(skills);
  })
  .catch((error)=> {
    // 에러
    console.log(error);
  })
  .finally(()=> {
    
  });
}

const detailSearch = (idx, type, id) =>{
  characterIdx.value = idx;
  if(type === 'S') skillIdx.value = id;
  if(type === 'A') artifactIdx.value = id;
  instance.get('detail', {params: {idx}})
  .then((response)=> {
    details.value = response.data;
    isClick.value = !isClick.value;
    console.log(response);
    console.log(isClick.value);
    console.log(skillIdx.value);
    
    
    
  })
  .catch((error)=> {
    console.log(error);
    
  })
  .finally(()=> {

  })
  
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