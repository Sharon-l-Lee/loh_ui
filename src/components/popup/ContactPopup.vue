<template>

  <teleport to="body">
    <div class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div class="relative bg-white max-w-sm p-6 rounded-lg shadow-lg">
        <button
          @click="$emit('close')"
          class="absolute top-2 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 text-lg"
          aria-label="닫기"
        >
          &times;
        </button>

        <h2 class="text-lg font-bold mb-4 text-center">문의하기</h2>
        <form class="space-y-4">
          <input type="text" placeholder="제목" class="w-full border border-gray-300 rounded px-4 py-2" v-model="form.title" />
          <select class="text-black bg-white border border-gray-300 rounded px-4 py-2" v-model="form.contactType">
            <option disabled value="">문의 종류</option>
            <option value="ER">오류제보</option>
            <option value="FR">기능추가요청</option>
            <option value="ET">기타</option>
          </select>
          <textarea placeholder="내용" class="w-full border border-gray-300 rounded px-4 py-2" rows="4" v-model="form.content"></textarea>
          <button @click="contactFormSubmit" class="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded">
            전송
          </button>
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
import 'vue3-toastify/dist/index.css'

//data

const form = reactive({
    title : '',
    contactType : '',
    content: ''
})

//method

const contactFormSubmit = () => {
  console.log('실행됨');
  
  instance.post('contact',{
    title: form.title,
    type: form.contactType,
    contents: form.content
  }, {
    headers: {
    'Content-Type': 'application/json'
    }
  }
  ).then((res)=>{
    console.log(res);
    toast("문의가 접수되었습니다.",{
      type: "info",
      theme: "auto",
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true

    })
    
  }).catch((err)=>{
    toast("문의 접수 중에 오류가 발생하였습니다. 다시 시도해주십시오.",{
      type: "error",
      theme: "auto",
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true

    })
    
  }).finally(()=>{
    

  })

}
</script>

<style>
  option:disabled{
    color:black;
  }
</style>