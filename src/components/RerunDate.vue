<template>
    <div class="min-h-screen bg-white text-gray-900">
      <main class="flex-1">
    
        <div class="container mx-auto px-4 md:px-6">
          <section class="w-full py-8 md:py-16 bg-gradient-to-b border-b border-gray-200">
            <!-- Header -->
            <div class="max-w-4xl mx-auto text-center mb-8">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                <span class="text-amber-500">실장</span> 기록실
              </h1>
            </div>
            <form
              class="flex items-center gap-3 w-full max-w-6xl mx-auto mb-4"
              @submit.prevent="characterList"
            >
              <!-- 초기화 버튼 -->
              <button
                type="button"
                @click="resetSearch"
                class="h-14 w-14 flex-shrink-0 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-300 text-gray-500 rounded-md transition-colors"
                title="초기화"
              >
                <ListRestart class="w-6 h-6" />
              </button>

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
                    <span class="text-base">💧</span>
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
                        :key="element.value"
                        class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          :value="element.value"
                          v-model="selectedElements"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-base mr-2">{{ element.icon }}</span>
                        <span class="text-sm">{{ element.label }}</span>
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
                    <span class="text-base">⚔️</span>
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
                        :key="job.value"
                        class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          :value="job.value"
                          v-model="selectedJobs"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-base mr-2">{{ job.icon }}</span>
                        <span class="text-sm">{{ job.label }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- 획득 가능 여부 -->
                <div class="relative" ref="availabilityDropdown">
                  <button
                    type="button"
                    @click="toggleDropdown('availability')"
                    class="h-9 px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <CheckCircle class="w-4 h-4" />
                    획득 가능 여부
                    <span v-if="selectedAvailability" class="bg-green-200 text-green-800 px-1.5 py-0.5 rounded text-xs">
                      {{ getAvailabilityLabel(selectedAvailability) }}
                    </span>
                  </button>
                  <div
                    v-if="activeDropdown === 'availability'"
                    class="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <div class="p-2 border-b border-gray-100 text-sm font-medium text-gray-700">획득 가능 여부</div>
                    <div class="p-1">
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="radio"
                          value="always"
                          v-model="selectedAvailability"
                          @change="handleAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">상시</span>
                        <span class="ml-auto text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded">현재</span>
                      </label>
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="radio"
                          value="limited"
                          v-model="selectedAvailability"
                          @change="handleAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">비상시</span>
                        <span class="ml-auto text-xs text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">한정</span>
                      </label>
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="radio"
                          value="auto"
                          v-model="selectedAvailability"
                          @change="handleAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">자동영입</span>
                        <span class="ml-auto text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">무료</span>
                      </label>
                    </div>
                  </div>
                </div>

                

                <!-- Filter Reset Button -->
                <button
                  type="button"
                  @click="resetFilters"
                  class="h-9 px-3 py-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <X class="w-4 h-4" />
                  필터 초기화
                </button>
                <!-- v-if="getActiveFilterCount() > 0" -->
                <!-- Active Filter Count -->
                <div class="flex items-center text-sm text-gray-500">
                  <!-- <span>{{ getActiveFilterCount() }}개 필터 적용됨</span> -->
                </div>
              </div>

              <!-- Sub-filters: 상시 선택 시 - 재화 (인라인) -->
              <div v-if="selectedAvailability === 'always'" class="flex flex-wrap justify-center gap-2 animate-fadeIn">
                <div class="flex items-center text-xs text-blue-600 font-medium mr-2">
                  <ChevronRight class="w-3 h-3 mr-1" />
                  필요 재화:
                </div>
                <button
                  v-for="currency in currencies"
                  :key="currency.value"
                  @click="toggleCurrency(currency.value)"
                  :class="[
                    'h-8 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1',
                    selectedCurrencies.includes(currency.value)
                      ? 'bg-blue-500 text-white shadow-md transform scale-105'
                      : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  ]"
                >
                  <span>{{ currency.icon }}</span>
                  <span>{{ currency.label }}</span>
                </button>
              </div>

              <!-- Sub-filters: 비상시 선택 시 - 배너 (인라인) -->
              <div v-if="selectedAvailability === 'limited'" class="flex flex-wrap justify-center gap-2 animate-fadeIn">
                <div class="flex items-center text-xs text-orange-600 font-medium mr-2">
                  <ChevronRight class="w-3 h-3 mr-1" />
                  배너 타입:
                </div>
                <button
                  v-for="banner in banners"
                  :key="banner.value"
                  @click="toggleBanner(banner.value)"
                  :class="[
                    'h-8 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1',
                    selectedBanners.includes(banner.value)
                      ? 'bg-orange-500 text-white shadow-md transform scale-105'
                      : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
                  ]"
                >
                  <span>{{ banner.icon }}</span>
                  <span>{{ banner.label }}</span>
                </button>
              </div>

              <!-- Sub-filters: 자동영입 선택 시 - 안내 메시지 -->
              <div v-if="selectedAvailability === 'auto'" class="flex justify-center animate-fadeIn">
                <div class="flex items-center text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
                  <CheckCircle class="w-4 h-4 mr-2" />
                  스토리를 통해 무료로 획득 가능한 캐릭터입니다
                </div>
              </div>
            </div>
          </section> 

      
          <!-- 결과 list -->
          <section>
            <div class="w-full space-y-4 mx-auto">
              <div v-if="isLoading" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                <p class="mt-2 text-gray-600">캐릭터 정보를 불러오는 중...</p>
              </div>
  
              <div v-else-if="charaList.length === 0 && !isLoading" class="text-center py-8">
                <div class="text-gray-400 mb-2">검색 결과가 없습니다</div>
                <p class="text-sm text-gray-500">다른 이름으로 검색해보세요</p>
              </div>
  
              <div v-else v-for="chara in charaList" :key="chara.id" class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <!-- Character Info -->
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
                        <span class="text-gray-500 w-16">최근 복각기간:</span>
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
  
            <!-- Footer Note -->
            <div class="mt-8 text-center">
              <p class="text-sm text-gray-500">
                * 복각 일정은 공식 발표를 기준으로 하며, 예측 정보는 참고용입니다
              </p>
            </div>
          </section>
          </div>
       
      </main>
    </div>
  </template>
  
<script setup>
import { ref, onMounted,computed } from 'vue'
import { Search, ListRestart, History, ChevronDown } from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import dayjs from 'dayjs'


// Data states
const charaList = ref([])
const rerunList = ref([])
const searchName = ref('')
const hasExpanded = ref(new Set())
const isLoading = ref(false)
const activeDropdown = ref(null)
const elementsDropdown = ref(null)


// Filter states
const selectedElements = ref([])
const selectedJobs = ref([])
const availabilityFilter = ref([])
const dateFilter = ref([])
const filteredList = ref([])
// const selectedResultTypes = ref(['characters', 'skills', 'artifacts'])
const selectedAvailability = ref([])
const selectedCurrencies = ref([])


// Filter options
const elements = [{id: 1, value : '물'}, {id: 2, value : '불'}, {id: 3, value : '대지'}, '빛', '어둠']
const jobs = ['가디언', '워리어', '스트라이커', '슈터', '프리스트', '커맨더']
const acquisition = ['상시', '복각이력있음', '복각이력없음']

// Computed properties
const filteredCharacters = computed(() => {
  if (!selectedResultTypes.value.includes('characters')) return []
  
  return charaList.value.filter(character => {
    // Search query filter
    if (searchQuery.value && !character.cname.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }

    // Availability filter
    if (selectedAvailability.value && character.availability_type !== selectedAvailability.value) {
      return false
    }
    
    // Currency filter (상시 선택 시)
    if (selectedAvailability.value === 'always' && selectedCurrencies.value.length > 0) {
      if (!character.required_currency || !selectedCurrencies.value.some(currency => character.required_currency.includes(currency))) {
        return false
      }
    }
    
    // Banner filter (비상시 선택 시)
    if (selectedAvailability.value === 'limited' && selectedBanners.value.length > 0) {
      if (!character.banner_type || !selectedBanners.value.some(banner => character.banner_type.includes(banner))) {
        return false
      }
    }
    
    return true
  })
})

const filteredSkills = computed(() => {
  if (!selectedResultTypes.value.includes('skills')) return []
  return skills.value.filter(skill => 
    !searchQuery.value || skill.sname.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredArtifacts = computed(() => {
  if (!selectedResultTypes.value.includes('artifacts')) return []
  return artifacts.value.filter(artifact => 
    !searchQuery.value || artifact.aname.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getResultCount = computed(() => {
  return (filteredCharacters.value?.length || 0) + 
         (filteredSkills.value?.length || 0) + 
         (filteredArtifacts.value?.length || 0)
})

// Methods
const handleSearch = () => {
  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}


const handleAvailabilityChange = () => {
  selectedCurrencies.value = []
  selectedBanners.value = []
  activeDropdown.value = null
}

const toggleCurrency = (currency) => {
  const index = selectedCurrencies.value.indexOf(currency)
  if (index > -1) {
    selectedCurrencies.value.splice(index, 1)
  } else {
    selectedCurrencies.value.push(currency)
  }
}

const toggleBanner = (banner) => {
  const index = selectedBanners.value.indexOf(banner)
  if (index > -1) {
    selectedBanners.value.splice(index, 1)
  } else {
    selectedBanners.value.push(banner)
  }
}
const detailOpen = (idx) => {
  selectedId.value = idx
  isClick.value = true
}

// Label helper functions
const getAvailabilityLabel = (value) => {
  const labels = {
    'always': '상시',
    'limited': '비상시',
    'auto': '자동영입'
  }
  return labels[value] || value
}

const getAvailabilityBadgeClass = (type) => {
  const classes = {
    'always': 'bg-green-100 text-green-800',
    'limited': 'bg-orange-100 text-orange-800',
    'auto': 'bg-blue-100 text-blue-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getJobIcon = (jobId) => {
  const icons = {
    1: "🛡️",
    2: "⚔️",
    3: "🏹",
    4: "🔫",
    5: "✨",
    6: "👑",
  }
  return icons[jobId] || "🛡️"
}

const getElement = (elementId) => {
  const elements = {
    1: "💧",
    2: "🔥",
    3: "🌍",
    4: "💡",
    5: "🌙",
  }
  return elements[elementId] || "💧"
}

const getActiveFilterCount = computed(() => {
  return selectedElements.value.length + selectedJobs.value.length + availabilityFilter.value.length + dateFilter.value.length
})

// Methods
const applyFilters = () => {
  const filtered = charaList.value.filter((chara) => {
    // Name search
    if (searchName.value && !chara.cname.toLowerCase().includes(searchName.value.toLowerCase())) {
      return false
    }

    // Element filter
    if (selectedElements.value.length > 0 && !selectedElements.value.includes(chara.element_name)) {
      return false
    }

    // Job filter
    if (selectedJobs.value.length > 0 && !selectedJobs.value.includes(chara.job_name)) {
      return false
    }

    // Availability filter
    if (availabilityFilter.value.length > 0) {
      if (availabilityFilter.value.includes('always') && !chara.is_always_available) return false
      if (availabilityFilter.value.includes('limited') && chara.is_always_available) return false
    }

    // Date filter
    if (dateFilter.value.length > 0) {
      const releaseYear = new Date(chara.release_date).getFullYear().toString()
      if (!dateFilter.value.includes(releaseYear)) return false
    }

    return true
  })

  filteredList.value = filtered
}

const resetFilters = () => {
  searchName.value = ''
  selectedElements.value = []
  selectedJobs.value = []
  availabilityFilter.value = []
  dateFilter.value = []
  activeDropdown.value = null
}

const toggleExpanded = (id) => {
  const newExpanded = new Set(expandedItems.value)
  if (newExpanded.has(id)) {
    newExpanded.delete(id)
  } else {
    newExpanded.add(id)
  }
  expandedItems.value = newExpanded
}

const toggleDropdown = (dropdownName) => {
  if (activeDropdown.value === dropdownName) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = dropdownName
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const handleClickOutside = (event) => {
  const dropdowns = ['elementDropdown', 'jobDropdown', 'availabilityDropdown', 'dateDropdown']
  const clickedOutside = dropdowns.every(dropdown => {
    const element = document.querySelector(`[ref="${dropdown}"]`)
    return !element || !element.contains(event.target)
  })
  
  if (clickedOutside) {
    activeDropdown.value = null
  }
}



  
  
  
  const characterList = async () => {  
    console.log('characterList 실행됨')
    isLoading.value = true;
    try{
      const keywords = searchName.value;
      const res = await instance.get('rerunlist', {params: {keywords}});
      console.log(res);
      charaList.value = res.data.characters.map((item) =>({
            ...item,
            release_date : dayjs(item.release_date).startOf('day'),
            rerun_end_date : dayjs(item.rerun_end_date).startOf('day'),
            rerun_start_date : dayjs(item.rerun_start_date).startOf('day'),
          }))

        console.log(charaList.value);   
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
  const resetSearch = () => {
    characterList()
  }
  
  const handleImageError = (event) => {
    
  }

  const getDaysSince = (dateString) => {
    const today = new Date()
    const pastDate = new Date(dateString.replace(/년|월|일/g, '').replace(/\s+/g, '-'))
    const diffTime = today - pastDate
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }
  
  // Initialize
  onMounted(() => {
    characterList()
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>