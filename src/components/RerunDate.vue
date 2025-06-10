<template>
    <div class="min-h-screen bg-white text-gray-100">
    <main class="flex-1">
      <section class="w-full py-8 md:py-16 bg-gradient-to-b border-b border-gray-200">
        <div class=" text-right container mx-auto px-4 md:px-6">
       
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                <span class="text-amber-500">실장 캘린더</span> 
            </h1>
          </div>



          <!-- <div class="container mx-auto px-4 md:px-6">
            <h2 class="text-xl font-bold mb-2 flex items-center">
              <Calendar class="mr-2 h-5 w-5 text-purple-500" />
              복각주기캘린더
            </h2>
          </div> -->
          <form
            class="flex items-center justify-end space-x-2 mb-8"
            @submit.prevent="characterList"
          >
            <!-- 리셋 버튼 -->
            <button
              type="button"
              @click="resetSearch"
              class="h-12 w-12 flex items-center justify-center bg-gray-300 border border-gray-300 rounded-md"
            >
              <ListRestart class="text-gray-700 w-6 h-6" />
            </button>

            <!-- 검색 인풋 -->
            <input
              type="search"
              placeholder="이름 검색"
              class="w-64 h-12 rounded-md px-4 text-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none text-gray-900 shadow-sm"
              v-model="searchName"
            />

            <!-- 검색 버튼 -->
            <button
              type="submit"
              class="h-12 bg-amber-500 hover:bg-amber-600 text-white px-4 rounded-md font-medium text-lg"
            >
              검색
            </button>
          </form>

          <div class="space-y-4 bg-white" v-for="chara in charaList">
              <div class="bg-gray-100 mb-3 rounded-lg p-4 flex items-center">
                <img :src="`http://localhost:5173/icons/element/water.webp`"
                class="mr-4 border-1 border-gray-200 w-16 h-16 rounded-lg"/>
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <h3 class="font-bold text-gray-800">{{chara.cname}}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-gray-800">
                      {{ chara.element_name }} * {{ chara.job_name }}
                    </span>
                  </div>

                  <div class="text-sm text-gray-400 mt-1"></div>

                  <div class="mt-1">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-medium text-purple-400">
                        최근 출현일 : {{chara.release_date}}
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

