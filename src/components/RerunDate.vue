<template>
    <div class="min-h-screen bg-gray-950 text-gray-100">
    <header class="bg-gray-900 p-4 border-b border-gray-800">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-center">
            <span class="text-purple-500">복각 / 실장</span> 캘린더
        </h1>
      </div>
    </header>


      <div class="mb-6">
        <h2 class="text-xl font-bold mb-2 flex items-center">
          <Calendar class="mr-2 h-5 w-5 text-purple-500" />
          복각주기캘린더
        </h2>
      </div>

      <div class="space-y-4" v-for="chara in Characters">
          <div class="bg-gray-900 rounded-lg p-4 flex items-center">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-bold">{{chara.cname}}</h3>
                <span class="text-xs px-2 py-0.5 rounded-full bg-gray-800">
                </span>
              </div>

              <div class="text-sm text-gray-400 mt-1"></div>

              <div class="mt-1">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-purple-400">
                    {{chara.rerunData }}
                  </span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-purple-900 text-purple-200">
   
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Crown, Sword, Shield, Book, Star, Filter, X } from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import  { enumMap } from "../constants/enumsMap.js";

//state

const searchQuery = ref('');
const charaList = ref([]);

const characterList = () =>{
    const keywords = searchQuery.value;
    instance.get('list', {params:keywords})
    .then((res) =>{
        console.log(res);
        charaList.value = res.data;
    })
    .catch((error)=>{
        console.log(error);
        
    })
    .finally(() =>{

    })
}

onMounted(()=>{
    characterList();
})
</script>

