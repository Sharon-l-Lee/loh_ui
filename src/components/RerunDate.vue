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
              <div class="mt-4 border-t border-gray-800 pt-4">
                <button
                  @click="toggleHistory(chara.id)"
                  class="flex items-center justify-between w-full text-left hover:text-purple-400 transition-colors"
                >
                  <span class="text-sm font-medium flex items-center">
                    <History class="h-4 w-4 mr-2 text-purple-500" />
                    <!-- Rerun History ({{ character.rerunHistory.length }} appearances) -->
                  </span>
                  <!-- <ChevronDown v-if="!expandedHistory.has(character.id)" class="h-4 w-4" />
                  <ChevronUp v-else class="h-4 w-4" /> -->
                </button>
                <!-- v-if="expandedHistory.has(chara.id) -->
                <div class="mt-3 space-y-3">
                  <!-- <div
                   v-for="(rerun, index) in character.rerunHistory" 
                    :key="index"
                    class="bg-gray-800 rounded-lg p-3"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Version {{ rerun.version }}</span>
                        <span
                          :class="rerun.type === 'Release' ? 'bg-green-900 text-green-200' : 'bg-blue-900 text-blue-200'"
                          class="px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {{ rerun.type }}
                        </span>
                      </div>
                      <span class="text-xs text-gray-400">{{ rerun.duration }}</span>
                    </div>

                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-300">{{ formatDate(rerun.date) }}</span>
                      <span class="text-gray-500">
                        {{ rerun.type === 'Release' ? 'Initial release' : `${getDaysSince(rerun.date)} days ago` }}
                      </span>
                    </div>

                    <div
                      v-if="index === character.rerunHistory.length - 1 && !character.isAlwaysAvailable"
                      class="mt-2 pt-2 border-t border-gray-700"
                    >
                      <div class="text-xs text-purple-400">
                        Gap since last appearance: {{ getDaysSince(rerun.date) }} days
                      </div>
                    </div>
                  </div> -->
                  <!-- v-if="!character.isAlwaysAvailable" -->
                  <!-- Predicted Next Appearance -->
                  <div
                    
                    class="bg-gray-800/50 rounded-lg p-3 border-2 border-dashed border-gray-700"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-yellow-400">Predicted Next</span>
                        <span class="px-2 py-0.5 rounded text-xs font-medium bg-yellow-900 text-yellow-200">
                          Prediction
                        </span>
                      </div>
                      <span class="text-xs text-gray-400">~14 days</span>
                    </div>

                    <div class="flex items-center justify-between text-sm">
                      <!-- <span class="text-yellow-400">{{ formatDate(character.predictedRerun) }}</span> -->
                      <span class="text-gray-500">
                        <!-- {{
                          getDaysUntil(character.predictedRerun) > 0
                            ? `In ${getDaysUntil(character.predictedRerun)} days`
                            : `${Math.abs(getDaysUntil(character.predictedRerun))} days overdue`
                        }} -->
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

