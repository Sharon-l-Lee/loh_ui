<template>

  <teleport to="body">
    <div class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div class="relative bg-white max-w-lg p-8 rounded-xl shadow-xl w-full">
        <button
          @click="$emit('close')"
          class="absolute top-2 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 text-lg"
          aria-label="닫기"
        >
          &times;
        </button>

        <h2 class="text-lg font-bold mb-4 text-center">문의하기</h2>
        <form class="space-y-4">
          <!-- <input type="text" placeholder="제목" class="w-full border border-gray-300 rounded px-4 py-2" v-model="form.title" /> -->
          <!-- <select class="text-black bg-white border border-gray-300 rounded px-4 py-2" v-model="form.contactType">
            <option disabled value="">문의 종류</option>
            <option value="ER">오류제보</option>
            <option value="FR">기능추가요청</option>
            <option value="ET">기타</option>
          </select> -->
         
          <div class="flex gap-2">
            <button
              v-for="type in types"
              :key="type.value"
              type="button"
              :class="[
                'px-3 py-2 rounded-full border text-sm transition',
                selectedType === type.value
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              ]"
              @click="selectType(type.value)"
            >
              {{ type.label }}
            </button>
          </div>
          <textarea placeholder="내용" class="w-full border border-gray-300 rounded px-4 py-2" rows="4" v-model="form.content"></textarea>
          <!-- class="px-4 py-2 rounded border text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-100" -->
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="$emit('close')"
              :disabled="isLoading"
               :class="['px-4 py-2 rounded text-sm text-white border', isLoading ? 'bg-gray-500 border-gray-400 cursor-not-allowed opacity-60' :'bg-amber-500 hover:bg-amber-600 border-amber-500' ]"
              
            >
              취소
            </button>
            <button
              type="button"
              @click="contactFormSubmit"
              :disabled="isLoading"
              :class="['px-4 py-2 rounded text-sm text-white border', isLoading ? 'bg-gray-500 border-gray-400 cursor-not-allowed opacity-60' :'bg-amber-500 hover:bg-amber-600 border-amber-500' ]">
              <div v-if="isLoading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span v-else>전송</span>
            
            </button>
          </div>
        </form>
        <!-- <button @click="$emit('close')" class="mt-4 text-sm text-gray-500 hover:text-gray-800">닫기</button> -->
      </div>
    </div>
  </teleport>




</template>
<script setup>

import { X, MessageSquare } from 'lucide-vue-next';
import { ref, reactive } from 'vue';
import instance from '@/api/axiosInstance.js'
import  { enumMap } from "../../constants/enumsMap.js";
import { toast } from 'vue3-toastify'
import { defineEmits } from 'vue';


//states
const selectedType = ref('DA'); 
const isLoading = ref(false);


const emit = defineEmits(['close']);


//data
const form = reactive({
    contactType : '',
    content: ''
})
const types =[
  { value: 'DA', label: '데이터 수정' },
  { value: 'ER', label: '오류 제보' },
  { value: 'FR', label: '피드백' }
]

//method

const selectType = (type) =>{
  selectedType.value = type;
}
const contactFormSubmit = async () => {
  isLoading.value = true;
  try{
    await instance.post('contact',{
      type: selectedType.value,
      contents: form.content
    }, {
      headers: {
      'Content-Type': 'application/json'
      }
    })
    toast.info("문의가 접수되었습니다.");
    emit('close')
  } catch(err){
    toast.error("문의 접수 중에 오류가 발생하였습니다. 다시 시도해주십시오.");
  } finally{
    isLoading.value = false;
  }

}
</script>

<style>
  option:disabled{
    color:black;
  }

  textarea {
    width: 100%;
    resize: none;
  }
</style>