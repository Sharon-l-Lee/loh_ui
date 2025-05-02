<template>
    <div class="min-h-screen bg-gray-950 text-gray-100">

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
 
    
  
    <main class="flex-1">
      <section class="w-full py-8 md:py-16 bg-gradient-to-b border-b border-gray-200">
        <div class=" text-right container mx-auto px-4 md:px-6">
       
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                <span class="text-purple-500">복각 / 실장</span> 캘린더
            </h1>
          </div>
          <form class="flex w-1/4 mb-8 ml-auto" @submit.prevent="characterList">
            <button
              type="button"
              @click="resetSearch" 
              class="flex items-center justify-center w-12 h-12 bg-gray-300 border border-gray-300 rounded-md mr-2">
              <ListRestart size="28" class="text-gray-700" />
            </button>

            
            <input
              type="search"
              placeholder="이름 검색"
              class="flex-grow rounded-md pl-4 pr-4 py-2 text-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none text-gray-900 shadow-sm"
              v-model="searchName"
            />
            
            <button
              type="submit"
              class="ml-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium"
            >
              검색
            </button>
          </form>

          <!-- <div class="container mx-auto px-4 md:px-6">
            <h2 class="text-xl font-bold mb-2 flex items-center">
              <Calendar class="mr-2 h-5 w-5 text-purple-500" />
              복각주기캘린더
            </h2>
          </div> -->

          <div class="space-y-4" v-for="chara in charaList">
              <div class="bg-gray-900 rounded-lg p-4 flex items-center">
                <img :src="`http://localhost:5173/icons/element/water.webp`"
                class="mr-4 border-2 border-gray-800 w-16 h-16 rounded-lg"/>
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <h3 class="font-bold">{{chara.cname}}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-gray-800">
                      {{ chara.element_name }} * {{ chara.job_name }}
                    </span>
                  </div>

                  <div class="text-sm text-gray-400 mt-1"></div>

                  <div class="mt-1">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-medium text-purple-400">
                        첫 실장일 : {{chara.release_date}}
                      </span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-purple-900 text-purple-200">
      
                      </span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Crown, ListRestart } from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import dayjs from 'dayjs';
import  { enumMap } from "../constants/enumsMap.js";

//state

const searchQuery = ref('')
const charaList = ref([])
const searchName = ref('')

const characterList = () =>{
    const keyword = searchName.value;
    instance.get('rerunlist', {params: {keyword}})
    .then((res) =>{

        charaList.value = res.data.map((item) =>({
          ...item,
          release_date : dayjs(item.release_date).format("YYYY년 MM월 DD일"),
          rerun_date: dayjs(item.rerun_date).format("YYYY년 MM월 DD일"),
          rerun_date_2: dayjs(item.rerun_date_2).format("YYYY년 MM월 DD일"),
          rerun_date_3 : dayjs(item.rerun_date_3).format("YYYY년 MM월 DD일")
        }))

        console.log(charaList.value);
        
    })
    .catch((error)=>{
        console.log(error);
        
    })
    .finally(() =>{

    })
}

const resetSearch = () =>{
  searchName.value = '';
  characterList();
  
}

onMounted(()=>{
    characterList();
})
</script>

