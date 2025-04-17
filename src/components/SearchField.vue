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
              <span class="text-amber-500">Search</span> Lord of Heroes
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
                v-model="searchQuery"
              />
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
                {{ filteredResults.heroes.length + filteredResults.guides.length + filteredResults.news.length }} results found
              </p>
            </div>
            <div class="flex items-center gap-2">
              <!-- <form @submit.prevent="handleSearch" class="relative">
                <Search class="absolute left-3 top-2.5 h-4 w-4 text-amber-500" />
                <input
                  type="search"
                  placeholder="Refine your search..."
                  class="w-[400px] rounded-md pl-9 py-1.5 bg-white border border-gray-300 focus:border-amber-500 focus:outline-none text-gray-900"
                  v-model="searchQuery"
                />
              </form> -->
              <button class="rounded-md p-2 hover:bg-gray-100" @click="clearSearch">
                <X class="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
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
          </div>

          <!-- Heroes Results -->
          <div  class="mb-10">
            <h2 class="text-xl font-bold mb-4 flex items-center">
              <Sword class="mr-2 h-5 w-5 text-amber-500" />
              영웅
            </h2>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div class="flex flex-row overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div class="w-1/3">
                  <img
                    :src="`https://via.placeholder.com/120x120?text=${hero.name}`"
                    :alt="hero.name"
                    class="h-full object-cover"
                  />
                </div>
                <div class="w-2/3 p-4">
                  <h3 class="font-bold flex items-center">
                    <div class="ml-1 flex">
                      <Star v-for="i in hero.rarity" :key="i" class="h-3 w-3 text-amber-500" />
                    </div>
                  </h3>
                  <div class="text-xs text-gray-600 mt-1 flex items-center">
                    <Shield class="mr-1 h-3 w-3" />
                  </div>
                  <button class="text-amber-600 hover:text-amber-700 text-sm mt-2">View Details</button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div class="text-center py-12">
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
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white">
      <div class="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4">
        <div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Crown class="h-6 w-6 text-amber-500" />
          <p class="text-center text-sm leading-loose md:text-left text-gray-600">
            &copy; {{ new Date().getFullYear() }} Copyright CLOVERGAMES.INC All rights reserved
          </p>
        </div>
        <div class="flex gap-4">
          <a href="#" class="text-sm font-medium text-gray-600 hover:underline underline-offset-4">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Crown, Sword, Shield, Book, Star, Filter, X } from 'lucide-vue-next'
import { axios } from '../api/axiosInstance.js';  


// State
const searchQuery = ref('')


// Methods
const handleSearch = () => {
  const query = searchQuery.value;
  console.log(query);
  axios.get('/search')
  .then(()=> {
    // 성공 
    console.log(response);
  })
  .catch((error)=> {
    // 에러
    console.log(error);
  })
  .finally(()=> {
    
  });

  
  
}


// Initialize with a default search on mount
onMounted(() => {
  // Start with all results showing
  handleSearch()
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