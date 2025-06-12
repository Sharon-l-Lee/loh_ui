<template>
    <teleport to="body">
        <!-- <div class="flex min-h-screen flex-col items-center justify-center p-24"> -->
            <!-- Modal Overlay -->
            <!-- <div
                v-if="open"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                @click="open = false"
            > -->
                <!-- Modal Content -->
            <div class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                <div
                    @click.stop
                    class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl px-4"
                >

                <!-- Header -->
                <div class="border-b border-gray-200 px-6 py-4">
                    <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-gray-900">상세정보</h2>
                    <button
                        @click="$emit('close')"
                        class="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <X class="w-6 h-6" />
                    </button>
                    </div>
                </div>
        
                <!-- Tabs -->
                <div class="px-6 py-4">
                    <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8">
                        <button
                        v-for="tab in tabs"
                        :key="tab.id"
                        @click="activeTab = tab.id"
                        :class="[
                            'flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm',
                            activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                        >
                        <component :is="tab.icon" class="w-4 h-4" />
                        {{ tab.name }}
                        </button>
                    </nav>
                    </div>
        
                    <!-- Tab Content -->
                    <div class="mt-6">
                    <!-- Character Tab -->
                    <div v-if="activeTab === 'character'" class="space-y-6">
                        <div class="flex flex-col lg:flex-row gap-6">
                        <!-- Character Portrait and Basic Info -->
                        <div class="flex flex-col items-center space-y-4 lg:w-1/3">
                            <div class="relative">
                            <img
                                :src="characterDetail.imgUrl"
                                :alt="characterDetail.cname"
                                class="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                            />
                            <!-- <span class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                Lv. {{ characterData.level }}
                            </span> -->
                            </div>
                            <div class="text-center">
                            <h3 class="text-xl font-bold">{{ characterDetail.cname }}</h3>
                            <p class="text-gray-600">{{ characterDetail.cname_en }}</p>
                            </div>
        
                            <!-- Experience Bar -->
                            <!-- <div class="w-full bg-white border border-gray-200 rounded-lg p-4">
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                <span>Experience</span>
                                <span>{{ characterData.experience.current }}/{{ characterData.experience.required }}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    :style="{ width: (characterData.experience.current / characterData.experience.required) * 100 + '%' }"
                                ></div>
                                </div>
                            </div>
                            </div> -->
                        </div>
        
                        <!-- Character Information -->
                        <div class="flex-1 space-y-4">
                            <!-- Personal Information -->
                            <div class="bg-white border border-gray-200 rounded-lg">
                                <div class="border-b border-gray-200 px-4 py-3">
                                    <h4 class="flex items-center gap-2 font-semibold">
                                    <User class="w-5 h-5 text-blue-500" />
                                    Personal Information
                                    </h4>
                                </div>
                            <div class="p-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">나이:</span>
                                            <span class="font-medium">{{ characterDetail.age }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">신장:</span>
                                            <span class="font-medium">{{ characterDetail.height }}cm</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">캐릭터 보이스(KR):</span>
                                            <span class="font-medium">{{ characterDetail.voice }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">실장일:</span>
                                            <span class="font-medium">{{ characterDetail.release_date }}</span>
                                        </div>
                                    </div>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">생일:</span>
                                        <span class="font-medium">{{ characterDetail.birth }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">별자리:</span>
                                        <span class="font-medium">{{ characterDetail.zodiac }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">캐릭터 보이스(JP):</span>
                                        <span class="font-medium">{{ characterDetail.voice_jp }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">MBTI:</span>
                                        <span class="font-medium">{{ characterDetail.mbti }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                            <!-- Character Attributes -->
                            <!-- <div class="bg-white border border-gray-200 rounded-lg">
                            <div class="border-b border-gray-200 px-4 py-3">
                                <h4 class="flex items-center gap-2 font-semibold">
                                <Star class="w-5 h-5 text-yellow-500" />
                                Character Attributes
                                </h4>
                            </div>
                            <div class="p-4">
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div
                                    v-for="(value, attr) in characterData.attributes"
                                    :key="attr"
                                    class="space-y-2"
                                >
                                    <div class="flex justify-between items-center">
                                    <span class="text-sm font-medium capitalize">{{ attr }}:</span>
                                    <span class="text-sm font-bold">{{ value }}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        :style="{ width: value + '%' }"
                                    ></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div> -->
        
                            <!-- Combat Stats -->
                            <!-- <div class="bg-white border border-gray-200 rounded-lg">
                            <div class="border-b border-gray-200 px-4 py-3">
                                <h4 class="flex items-center gap-2 font-semibold">
                                <Shield class="w-5 h-5 text-red-500" />
                                Combat Statistics
                                </h4>
                            </div>
                            <div class="p-4 space-y-4">
                                <div class="space-y-3">
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                    <span>Health</span>
                                    <span>{{ characterData.combatStats.health }}/{{ characterData.combatStats.maxHealth }}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        class="bg-red-500 h-2 rounded-full transition-all duration-300"
                                        :style="{ width: (characterData.combatStats.health / characterData.combatStats.maxHealth) * 100 + '%' }"
                                    ></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                    <span>Mana</span>
                                    <span>{{ characterData.combatStats.mana }}/{{ characterData.combatStats.maxMana }}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        :style="{ width: (characterData.combatStats.mana / characterData.combatStats.maxMana) * 100 + '%' }"
                                    ></div>
                                    </div>
                                </div>
                                </div>
                                <hr class="border-gray-200" />
                                <div class="grid grid-cols-2 gap-4">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Attack:</span>
                                    <span class="font-semibold">{{ characterData.combatStats.attack }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Defense:</span>
                                    <span class="font-semibold">{{ characterData.combatStats.defense }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Speed:</span>
                                    <span class="font-semibold">{{ characterData.combatStats.speed }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Crit Rate:</span>
                                    <span class="font-semibold">{{ characterData.combatStats.critRate }}%</span>
                                </div>
                                </div>
                            </div>
                            </div> -->
        
                            <!-- Character Background -->
                            <div class="bg-white border border-gray-200 rounded-lg">
                            <div class="border-b border-gray-200 px-4 py-3">
                                <h4 class="flex items-center gap-2 font-semibold">
                                <Heart class="w-5 h-5 text-pink-500" />
                                Character Profile
                                </h4>
                            </div>
                            <div class="p-4 space-y-4">

                                 <!-- Position Information -->
                            <div>
                                <h5 class="font-semibold mb-2">Position</h5>
                                <div class="flex items-center gap-2 mb-2">
                                    <span
                                        :class="[
                                        'px-3 py-1 rounded-full text-sm font-medium',
                                        getElementColor(characterDetail.element_id)
                                        ]"
                                    >
                                        {{ characterDetail.element_name }} {{ characterDetail.job_name }}
                                    </span>
                                </div>
                            </div>

                            <!-- 습득방법 -->
                            <div>
                                <h5 class="font-semibold mb-2">획득방법</h5>
                                <ul class="text-sm space-y-2">
                                    <li
                                        class="flex items-start gap-2"
                                    >
                                        <div class="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <span class="font-medium">{{enumMap.summon[characterDetail.summonType]}}</span>
                                            <span class="text-gray-600">{{enumMap.acqusition[characterDetail.acquisitionMethodType]}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                                <!-- <div>
                                    <h5 class="font-semibold mb-2">포지션</h5>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm"
                                        >
                                        {{ characterDetail.element_name }} {{ characterDetail.job_name }}
                                        </span>
                                    </div>
                                </div> -->
                                <!-- <div>
                                    <h5 class="font-semibold mb-2">획득처</h5>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm"
                                        >
                                        {{ characterDetail.element_name }} {{ characterDetail.job_name }}
                                        </span>
                                    </div>
                                </div> -->
        
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 class="font-semibold mb-2 text-green-600">좋아하는 음식</h5>
                                        <ul class="text-sm space-y-1">
                                            <li
                                                v-for="favoriteFood in characterDetail.favorite_food"
                                                :key="favoriteFood"
                                                class="flex items-center gap-2"
                                            >
                                                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                {{ favoriteFood }}
                                            </li>
                                        </ul>
                                    </div>
                                <div>
                                    <h5 class="font-semibold mb-2 text-blue-600">중요하게 생각하는 것</h5>
                                    <ul class="text-sm space-y-1">
                                        <li
                                            v-for="imVal in characterDetail.important_value"
                                            :key="imVal"
                                            class="flex items-center gap-2"
                                        >
                                            <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            {{ imVal }}
                                        </li>
                                    </ul>
                                </div>
                                </div>
        
                                <div>
                                    <h5 class="font-semibold mb-2">Background Story</h5>
                                    <p class="text-sm text-gray-600 leading-relaxed">
                                        {{ characterDetail.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
                    <!-- Skills Tab -->
                    <!-- Skills Tab -->
                        <div v-if="activeTab === 'skills'" class="space-y-4">
                            <div
                                v-for="skill in skillList"
                                :key="skill.id"
                                class="bg-white border border-gray-200 rounded-lg"
                            >
                                <div class="border-b border-gray-200 px-4 py-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <img
                                                :src="skill.image || '/placeholder.svg?height=48&width=48&text=⚡'"
                                                :alt="skill.name"
                                                class="w-12 h-12 rounded-lg border-2 border-gray-300 object-cover"
                                            />
                                            <div class="flex items-center gap-2">
                                                <h4 class="font-semibold">{{ skill.name }}</h4>
                                                <span
                                                :class="[
                                                    'px-2 py-1 rounded-md text-xs font-medium',
                                                    skill.type === 'AC'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                ]"
                                                >
                                                {{ enumMap.skill[skill.type] }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm text-gray-600">
                                                <!-- 쿨타임 :{{ skill.cooldown }}/{{ skill.slot }} -->
                                            </span>
                                        <!-- <div class="flex">
                                            <Star
                                                v-for="i in skill.maxLevel"
                                                :key="i"
                                                :class="[
                                                'w-4 h-4',
                                                i <= skill.level
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                ]"
                                            /> 
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                                <div class="p-4">
                                    <p class="text-gray-600 mb-3">{{ skill.s_desc }}</p>
                                    <div class="flex gap-4 text-sm">
                                        <div v-if="skill.cooldown" class="flex items-center gap-1">
                                            <span class="text-gray-600">Cooldown:</span>
                                            <span>{{ skill.cooldown }}</span>
                                        </div>
                                        <div v-if="skill.slot" class="flex items-center gap-1">
                                            <span class="text-gray-600">Mana Cost:</span>
                                            <span>{{ skill.slot }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Artifacts Tab -->
                        <div v-if="activeTab === 'artifacts'" class="space-y-4">
                            <div
                                v-for="artifact in artifactList"
                                :key="artifact.id"
                                :class="[
                                'bg-white rounded-lg border-2',
                                getRarityColor(artifact.type)
                                ]"
                            >
                                <div class="border-b border-gray-200 px-4 py-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <img
                                                :src="artifact.image || '/placeholder.svg?height=64&width=64&text=🎯'"
                                                :alt="artifact.name"
                                                :class="[
                                                'w-16 h-16 rounded-lg border-2 object-cover',
                                                getRarityColor(artifact.type).replace('text-', 'border-')
                                                ]"
                                            />
                                            <div>
                                                <div class="flex items-center gap-2">
                                                    <h4 class="font-semibold">{{ artifact.name }}</h4>
                                                    <span
                                                        :class="[
                                                        'px-2 py-1 rounded-md text-xs font-medium border',
                                                        getRarityColor(artifact.type)
                                                        ]"
                                                    >
                                                        {{ enumMap.artifact[artifact.type] }}
                                                    </span>
                                                </div>
                                                <p class="text-gray-600 text-sm">
                                                {{ enumMap.artifact[artifact.type] }}
                                                <!-- • Level {{ artifact.level }} -->
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-4">
                                    <p class="text-sm text-gray-600 mb-3">{{ artifact.a_desc }}</p>
                                    <!-- <hr class="border-gray-200 my-3" /> -->
                                    <div class="grid grid-cols-2 gap-2">
                                        <div
                                        v-for="(value, stat) in artifact.stats"
                                        :key="stat"
                                        class="flex justify-between"
                                        >
                                            <span class="text-gray-600 capitalize">
                                                {{ stat.replace(/([A-Z])/g, ' $1').trim() }}:
                                            </span>
                                            <span class="font-semibold text-green-600">{{ value }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <!-- </div> -->

    </teleport>
   
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { User, Star, Zap, Heart, Sword, X } from 'lucide-vue-next'
  import instance from '../../api/axiosInstance.js'
  import dayjs from 'dayjs';
  import  { enumMap } from "../../constants/enumsMap.js";
  
//   const open = ref(false)
  const activeTab = ref('character')

  const emit = defineEmits(['close']);
  const props = defineProps(['cid']);
  const characterDetail = ref({});
  const skillList = ref({});
  const artifactList = ref({});
  
  const tabs = [
    { id: 'character', name: '캐릭터', icon: User },
    { id: 'skills', name: '스킬', icon: Zap },
    { id: 'artifacts', name: '아티팩트', icon: Sword }
  ]

  const characterDetails = (idx) =>{
    instance.get('detail', {params: {idx}})
    .then((response)=> {
        /**
         * 캐릭터 정보(포맷팅)
         */
        const cdata = response.data.characterInfo;
        cdata.release_date = dayjs(cdata.release_date).format("YYYY년 MM월 DD일")
        cdata.birth = dayjs(cdata.birth).format("MM월 DD일")
        cdata.favorite_food = cdata.favorite_food.split(',');
        cdata.important_value = cdata.important_value.split(',');
        characterDetail.value = cdata;

        skillList.value = response.data.skillList;
        console.log(skillList.value);
        
        artifactList.value = response.data.artifactList;

        // console.log(characterDetail.value);
        
    })
    .catch((error)=> {
      console.log(error);
        
    })
    .finally(()=> {

    })
  }

  onMounted(()=>{
    characterDetails(props.cid);
    
    
  })
  
  const getElementColor =(elementId) =>{
    switch(elementId) {
        case 1 :
            return "border-blue-600 bg-blue-300"
        case 2 :
            return "border-red-600 bg-red-300"
        case 3 :
            return "border-green-600 bg-green-300"
        case 4 :
            return "border-yellow-600 bg-yellow-300"
        case 5 :
            return "border-purple-600 bg-purple-300"
        default :
            return "border-gray-600 bg-gray-300"
    }
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "RL":
        return "border-yellow-500 text-yellow-600"
      case "NB":
        return "border-purple-500 text-purple-600"
      case "NM":
        return "border-blue-500 text-blue-600"
      default:
        return "border-gray-500 text-gray-600"
    }
  }
    
  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  .fill-current {
    fill: currentColor;
  }
  </style>