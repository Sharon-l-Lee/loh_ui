<template>
    <div class="min-h-screen bg-white text-gray-900">
      <main class="flex-1">
    
        <div class="container mx-auto px-4 md:px-6">
          <section class="w-full py-8 md:py-16 bg-gradient-to-b border-b border-gray-200">
            <!-- Header -->
            <div class="max-w-4xl mx-auto text-center mb-8">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                <span class="text-amber-500">복각</span> 언제해?
              </h1>
            </div>
            <div class="w-full py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg mb-6">
              <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm">✨</span>
                    </div>
                    <h2 class="text-lg font-bold text-amber-800">픽업중</h2>
                  </div>
                </div>
                
                <!-- 간소화된 픽업 캐릭터 목록 -->
                <!-- @click="detailOpen(character.cname)"
                    @mouseenter="showPreview(character, $event)"
                    @mouseleave="hidePreview" -->
                <div class="flex gap-3 overflow-x-auto pb-2">
                  <div 
                    v-for="character in featuredCharacters"
                    class="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-amber-200 hover:border-amber-300 min-w-[200px]">
                    <div class="flex items-center gap-3">
                      <!-- 캐릭터 아바타 -->
                      <div class="relative">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-lg">
                          {{ character.job_name }}
                        </div>
                        <!-- NEW 배지 -->
                        <div v-if="!!character.isNew" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span class="text-white text-xs font-bold">N</span>
                        </div>
                      </div>
                      
                      <!-- 캐릭터 정보 -->
                      <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-bold text-gray-800 truncate">{{ character.cname }}</h3>
                        <div class="flex items-center gap-1 mt-1">
                          <span class="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                            {{ character.job_name }}
                          </span>
                          <span class="text-xs text-gray-500"> ~ {{ character.rerun_end_date.format('YYYY년 MM월 DD일') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form
              class="flex items-center gap-3 w-full max-w-6xl mx-auto mb-4"
              @submit.prevent="characterList"
            >
              <!-- 초기화 버튼 -->
              <!-- <button
                type="button"
                @click="resetSearch"
                class="h-14 w-14 flex-shrink-0 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-300 text-gray-500 rounded-md transition-colors"
                title="초기화"
              >
                <ListRestart class="w-6 h-6" />
              </button> -->

              <!-- 검색창 -->
              <div class="relative flex-1">
                <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                <input
                  type="search"
                  placeholder="캐릭터 이름으로 검색"
                  class="w-full h-14 pl-12 pr-4 text-base bg-white border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-900 shadow-sm rounded-md"
                  v-model="searchName"
                />
              </div>

              <!-- 검색버튼 -->
              <button
                type="submit"
                :disabled="isLoading"
                class="h-14 px-6 flex-shrink-0 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-md font-medium text-base transition-colors flex items-center justify-center whitespace-nowrap"
              >
                <div v-if="isLoading" class="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {{ isLoading ? '검색중...' : '검색' }}
              </button>
            </form>

            <!-- Filter  -->
            <div class="max-w-6xl mx-auto space-y-3">
              <!-- 메인 필터 -->
              <div class="flex flex-wrap justify-center gap-2">
                <!-- 속성 필터 -->
                <div class="relative" ref="elementDropdown">
                  <button
                    type="button"
                    @click="toggleDropdown('element')"
                    class="h-9 px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    속성
                    <span v-if="selectedElements.length > 0" class="bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded text-xs">
                      {{ selectedElements.length }}
                    </span>
                  </button>
                  <div
                    v-if="activeDropdown === 'element'"
                    class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <div class="p-2 border-b border-gray-100 text-sm font-medium text-gray-700">속성 선택</div>
                    <div class="p-1">
                      <label 
                        v-for="element in elements" 
                        :key="element.id"
                        class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          :value="element.id"
                          v-model="selectedElements"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">{{ element.value }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 직업 필터 -->
                <div class="relative" ref="jobDropdown">
                  <button
                    type="button"
                    @click="toggleDropdown('job')"
                    class="h-9 px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    직업
                    <span v-if="selectedJobs.length > 0" class="bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded text-xs">
                      {{ selectedJobs.length }}
                    </span>
                  </button>
                  <div
                    v-if="activeDropdown === 'job'"
                    class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <div class="p-2 border-b border-gray-100 text-sm font-medium text-gray-700">직업 선택</div>
                    <div class="p-1">
                      <label 
                        v-for="job in jobs" 
                        :key="job.id"
                        class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          :value="job.id"
                          v-model="selectedJobs"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">{{ job.value }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- 획득 경로 -->
                <div class="relative" ref="routeDropdown">
                  <button
                    type="button"
                    @click="toggleDropdown('route')"
                    class="h-9 px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    획득 경로
                    <span v-if="selectedRoutes.length > 0" class="bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded text-xs">
                      {{ selectedRoutes.length }}
                    </span>
                  </button>
                  <div
                    v-if="activeDropdown === 'route'"
                    class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <div class="p-2 border-b border-gray-100 text-sm font-medium text-gray-700">속성 선택</div>
                    <div class="p-1">
                      <label 
                        v-for="route in routes" 
                        :key="route.id"
                        class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          :value="route.label"
                          v-model="selectedRoutes"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">{{ route.value }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 초기화 버튼 -->
                <button
                  type="button"
                  @click="resetFilters"
                  class="h-9 px-3 py-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <X class="w-4 h-4" />
                  필터 초기화
                </button>
                
                <!-- filter count -->
                <div v-if="getActiveFilterCount > 0" class="flex items-center text-sm text-gray-500">
                  <span>{{ getActiveFilterCount }}개 필터 적용됨</span>
                </div>
              </div>
            </div>

            <!-- info문구 -->
            <div class="mt-5 text-center">
              <p class="text-sm text-gray-500">
                * 상시 출현 중인 캐릭터는 등장하지 않습니다.
              </p>
              <p class="text-sm text-gray-500">
                * 복각 일정은 공식 발표를 기준으로 하며, 예측 정보는 참고용입니다
              </p>
            </div>
          </section> 
          <!-- 결과 list -->
          <section>
            <div class="w-full space-y-4 mx-auto mt-10 mb-20">
              <div v-if="isLoading" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                <p class="mt-2 text-gray-600">캐릭터 정보를 불러오는 중...</p>
              </div>
  
              <div v-else-if="charaList.length === 0 && !isLoading" class="text-center py-8">
                <div class="text-gray-400 mb-2">검색 결과가 없습니다</div>
                <p class="text-sm text-gray-500">다른 이름으로 검색해보세요</p>
              </div>
  
              <div v-else v-for="chara in charaList" :key="chara.id" class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <!-- 메인 캐릭터 정보 -->
                <div class="p-4 flex items-center">
                  <img 
                    :src="chara.img_url"
                    :alt="chara.cname"
                    class="mr-4 border border-gray-200 w-16 h-16 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="font-bold text-gray-800 text-lg">{{ chara.cname }}</h3>
                      <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">
                        {{ chara.element_name }} • {{ chara.job_name }}
                      </span>
                    </div>
  
                    <div class="space-y-1">
                      <div class="flex items-center text-sm">
                        <span class="text-gray-500 w-16">실장일:</span>
                        <span class="font-medium text-gray-800">{{ chara.release_date.format('YYYY년 MM월 DD일') }}</span>
                      </div>
                      
                      <div v-if="!isSameDay(chara.release_date, chara.rerun_start_date)" class="flex items-center text-sm">
                        <span class="text-gray-500 w-20">최근 복각일:</span>
                        <span class="font-medium text-amber-600">{{ chara.rerun_start_date.format('YYYY년 MM월 DD일') }}</span>
                        <span v-if="chara.rerun_end_date" class="text-gray-400 ml-2">
                          ~ {{ chara.rerun_end_date.format('YYYY년 MM월 DD일') }}
                        </span>
                      </div>
  
                      <div v-if="chara.is_always_available" class="flex items-center text-sm">
                        <span class="text-gray-500 w-16">상태:</span>
                        <span class="font-medium text-green-600">상시 획득 가능</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- Expand Button -->
                  <button
                    @click="toggleHistoryTab(chara.id)"
                    class="ml-4 p-2 text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <ChevronDown 
                      :class="{ 'rotate-180': hasExpanded.has(chara.id) }" 
                      class="h-5 w-5 transition-transform" 
                    />
                  </button>
                </div>
                
                <!-- Expandable History Section -->
                <div v-if="hasExpanded.has(chara.id)" class="border-t border-gray-100 p-4 bg-gray-50">
                  <div class="flex items-center mb-4">
                    <History class="h-4 w-4 mr-2 text-amber-500" />
                    <span class="text-sm font-medium text-gray-700">실장 히스토리</span>
                  </div>
  
                  <div class="space-y-3">
                    <!-- Release History -->
                    <div class="bg-white rounded-lg p-3 border border-gray-200">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-gray-800">실장</span>
                          <span class="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Release
                          </span>
                        </div>
                        <span class="text-xs text-gray-500">{{ chara.release_date }}일 전</span>
                      </div>
  
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">{{ chara.release_date.format('YYYY년 MM월 DD일') }}</span>
                        <span v-if="chara.rerun_end_date" class="text-gray-500">최초 출시</span>
                      </div>
                    </div>
  
                    <!-- Rerun History -->
                    <div v-if="!isSameDay(chara.release_date, chara.rerun_start_date)" class="bg-white rounded-lg p-3 border border-gray-200">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-gray-800">복각</span>
                          <span class="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Rerun
                          </span>
                        </div>
                        <span class="text-xs text-gray-500">{{ chara.rerun_start_date }}일 전</span>
                      </div>
  
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">{{ chara.rerun_start_date.format('YYYY년 MM월 DD일') }}</span>
                        <span class="text-gray-500">복각 시작</span>
                      </div>
  
                      <div v-if="chara.rerun_end_date" class="mt-2 pt-2 border-t border-gray-100">
                        <div class="flex items-center justify-between text-sm">
                          <span class="text-gray-600">{{ chara.rerun_end_date.format('YYYY년 MM월 DD일') }}</span>
                          <span class="text-gray-500">복각 종료</span>
                        </div>
                      </div>
                    </div>
  
                    <!-- Next Prediction (placeholder) -->
                    <div v-if="!chara.is_always_available" class="bg-amber-50 rounded-lg p-3 border-2 border-dashed border-amber-200">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-amber-700">다음 복각 예상</span>
                          <span class="px-2 py-0.5 rounded text-xs font-medium bg-amber-200 text-amber-800">
                            예측
                          </span>
                        </div>
                        <span class="text-xs text-amber-600">약 3-6개월</span>
                      </div>
  
                      <div class="text-sm text-amber-600">
                        복각 패턴을 분석하여 예상 시기를 계산 중입니다
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>   
      </main>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search, ListRestart, History, ChevronDown, CheckCircle, X , ChevronLeft, ChevronRight} from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import dayjs from 'dayjs'


// Data states
const charaList = ref([])
const rerunList = ref([])
const searchName = ref('')
const hasExpanded = ref(new Set())
const isLoading = ref(false)
const activeDropdown = ref(null)

// Filter states
const selectedElements = ref([])
const selectedJobs = ref([])
const selectedRoutes = ref([])
const acquisitonAlways = ref([])
const acquisitonLimited = ref([])

// Pickup states
const featuredCharacters = ref([])
const currentPickupIndex = ref(0)
const pickupItemsPerPage = 3


// Filter options
const elements = [{id: 1, value : '물'}, {id: 2, value : '불'}, {id: 3, value : '대지'},  {id: 4, value : '빛'},  {id: 5, value : '어둠'}]
const jobs = [{id: 1, value : '가디언'}, {id: 2, value : '워리어'}, {id: 3, value : '스트라이커'}, {id: 4, value : '슈터'}, {id: 5, value : '프리스트'}, {id: 5, value : '커맨더'}]
const routes = [{id: 1, value : '소환', label:'SUMM'}, {id: 2, value : '이벤트', label:'EVET'}, {id: 3, value : '패키지', label:'PACK'}]

// Methods
const getActiveFilterCount = computed(() => {
  return selectedElements.value.length + selectedJobs.value.length + selectedRoutes.value.length
})

const resetFilters = () => {
  searchName.value = ''
  selectedElements.value = []
  selectedJobs.value = []
  selectedRoutes.value = [] 
  activeDropdown.value = null
}


const toggleDropdown = (dropdownName) => {
  if (activeDropdown.value === dropdownName) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = dropdownName
  }
}


const pickUpList = () => {
  featuredCharacters.value = charaList.value.filter((item) => item.rerun_end_date > new Date() && Object.is(item.acquisition_method.label, '소환') );
  featuredCharacters.value = featuredCharacters.value.map((item)=> ({
      ...item,
      isNew : dayjs(item.rerun_start_date).startOf('day').isSame(dayjs(item.release_date).startOf('day'))
  }))
  
    console.log(featuredCharacters.value);
} 
  
const characterList = async () => {  
  console.log('characterList 실행됨')
  isLoading.value = true;
  try{  
    const res = await instance.post('rerunlist', {
      keyword: searchName.value,
      elements: selectedElements.value,
      jobs: selectedJobs.value,
      acquisitions: selectedRoutes.value
    });
    console.log(res);
    charaList.value = res.data.characters.map((item) =>({
          ...item,
          release_date : dayjs(item.release_date).startOf('day'),
          rerun_end_date : dayjs(item.rerun_end_date).startOf('day'),
          rerun_start_date : dayjs(item.rerun_start_date).startOf('day'),
    }))

   
    
    // console.log(charaList.value);   
  } catch(error){
      console.log(error);
      
  } finally {
    isLoading.value = false;
  }
  
}
  
const toggleHistoryTab = (characterId) => {
  if (hasExpanded.value.has(characterId)) {
    hasExpanded.value.delete(characterId)
  } else {
    hasExpanded.value.add(characterId)
  }
}
const isSameDay = (baseDate, compareDate) => {
  return baseDate.isSame(compareDate, 'day');
}

const handleImageError = (event) => {
  
}


//enum값 call 페이지 랜딩 시 한 번만
const callEnums = async () => {
  const rlt = await instance.get('enums/acquisition-methods');

  
  // acquisitonAuto.value = rlt.filter((item)=>item.category.includes["AUTO"])
  acquisitonAlways.value = rlt.data.filter((item)=>item.category.includes('ALWAYS'));
  acquisitonLimited.value = rlt.data.filter((item)=>item.category.includes('LIMITED'));
  console.log(acquisitonAlways.value);
}

//초기화
onMounted(async () => {
  isLoading.value = true;
  try{
    console.log(1);
    await callEnums();
    await characterList();
    await pickUpList();
  }catch (e) {
    console.log(e);
    
  }finally {
    isLoading.value = false
  }
  
})
</script>
  
<style scoped>
  .container {
    max-width: 1200px;
  }
</style>