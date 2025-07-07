<template>
  <div class="flex min-h-screen flex-col bg-white text-gray-900">
    
    <!-- Main Content -->
    <main class="flex-1">
      <!-- Search Hero Section -->
      <section class="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-6xl` mx-auto text-center">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
              <span class="text-amber-500">로드</span> 아카이브
            </h1>
          
            <form @submit.prevent="handleSearch" class="flex items-center justify-center w-full max-w-6xl mx-auto gap-3 mb-4">
              <!-- 검색 입력창 -->
              <div class="relative flex-1">
                <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                <input
                  type="search"
                  placeholder="검색"
                  class="w-full h-14 pl-12 pr-4 text-base bg-white border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 text-gray-900 shadow-sm rounded-md"
                  v-model="searchQuery"
                />
              </div>

              <!-- 검색 버튼 -->
              <button
                type="submit"
                class="h-14 px-6 flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium text-base flex items-center justify-center whitespace-nowrap"
              >
                검색
              </button>
            </form>


            <!-- 태그 -->
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
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          :checked="selectedElements.length === 5"
                          @change="selectedElementsChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm font-medium">전체 선택</span>
                      </label>
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
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          :checked="selectedJobs.length === 6"
                          @change="selectedJobChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm font-medium">전체 선택</span>
                      </label>
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
                <!-- 획득 가능 여부 -->
                <div class="relative" ref="availabilityDropdown">
                  <button
                    type="button"
                    @click="toggleDropdown('availability')"
                    class="h-9 px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    획득 가능 여부
                  </button>
                  <div
                    v-if="activeDropdown === 'availability'"
                    class="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <div class="p-2 border-b border-gray-100 text-sm font-medium text-gray-700">획득 가능 여부</div>
                    <div class="p-1">
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          :checked="selectedAvailability.length === 3"
                          @change="selectedAllAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm font-medium">전체 선택</span>
                      </label>
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          value="always"
                          v-model="selectedAvailability"
                          @change="handleAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">상시</span>
                      </label>
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          value="limited"
                          v-model="selectedAvailability"
                          @change="handleAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">한정</span>
                      </label>
                      <label class="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          value="auto"
                          v-model="selectedAvailability"
                          @change="handleAvailabilityChange"
                          class="mr-2 rounded border-gray-300"
                        />
                        <span class="text-sm">자동영입</span>
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
                
                <!-- filter count -->
                <div v-if="getActiveFilterCount > 0" class="flex items-center text-sm text-gray-500">
                  <span>{{ getActiveFilterCount }}개 필터 적용됨</span>
                </div>
              </div>

              <!-- Sub-filter: always -->
              <div v-if="selectedAvailability.includes('always')" class="flex flex-wrap justify-center gap-2 animate-fadeIn">
                <div class="flex items-center text-xs text-blue-600 font-medium mr-2">
                  상시 획득 방법:
                </div>
                <button
                  v-for="currency in acquisitonAlways"
                  @click="toggleCurrency(currency.value)"
                  :class="[
                    'h-8 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1',
                    selectedCurrencies.includes(currency.value)
                      ? 'bg-blue-500 text-white shadow-md transform scale-105'
                      : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  ]"
                >
                  <span>{{ currency.label }}</span>
                </button>
              </div>

              <!-- Sub-filter: 한정 -->
              <div v-if="selectedAvailability.includes('limited')" class="flex flex-wrap justify-center gap-2 animate-fadeIn">
                <div class="flex items-center text-xs text-orange-600 font-medium mr-2">
                  한정 획득 방법:
                </div>
                <button
                  v-for="banner in acquisitonLimited"
                  @click="toggleBanner(banner.value)"
                  :class="[
                    'h-8 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1',
                    selectedBanners.includes(banner.value)
                      ? 'bg-orange-500 text-white shadow-md transform scale-105'
                      : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
                  ]"
                >
                  <span>{{ banner.label }}</span>
                </button>
              </div>

              <!-- Sub-filter: 자동영입-->
              <!-- <div v-if="selectedAvailability.includes('auto')" class="flex justify-center animate-fadeIn">
                <div class="flex items-center text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
                  <CheckCircle class="w-4 h-4 mr-2" />
                  스토리를 통해 무료로 획득 가능한 캐릭터입니다
                </div>
              </div> -->
            </div>

          </div>
        </div>
      </section>

      <!-- 검색 결과 -->
      <section class="w-full py-8 md:py-12" >
        <div ref="scrollSection" class="container mx-auto px-4 md:px-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">
                 {{ searchQuery ? `"${searchQuery}"에 대한 결과` : "" }}
              </h2>
            </div>
          </div>        
          <!-- 리스트 -->
          <div class="w-full py-8 md:py-12">
            <!-- 캐릭터 -->
            <div ref="charaDiv" id="characters" v-if="characters?.length">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 mt-5"> 캐릭터 ({{ characters.length }})</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div v-for="ch in characters" class="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 cursor-pointer">
                  <img :src="getImgUrl(ch.cf_url)" class="w-16 h-16 rounded-full" />
                  <div class="flex-1" @click ="detailOpen(ch.id)">
                    <h2 class="text-lg text-black font-semibold">{{ ch.cname }} ({{ ch.cname_en }})</h2>
                    <div class="flex items-center gap-2 mt-1">
                      <img :src="getJobIcon(ch.job_id)" class="w-8 h-8" :alt="ch.job_name" title="직업" />
                      <img :src="getElement(ch.element_id)" class="w-8 h-8" :alt="ch.element_name" title="속성" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 스킬 -->
            <div ref="skillDiv" id="skills" v-if="skills?.length">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 mt-5"> 스킬 ({{ skills.length }})</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <template v-for="skill in skillWithHighlights"
                :key="skill.id">
                <!-- <div class="flex flex-col space-y-2"> -->
                  <div
                  class="flex gap-4 bg-white p-4 rounded-xl shadow-md hover:ring-2 hover:ring-amber-400 transition cursor-pointer"
                  @click ="detailOpen(skill.c_id)"
                  >
                  <!-- 스킬 이미지 -->
                    <img
                      :src="getImgUrl(skill.cf_url)" 
                      class="w-16 h-16 rounded-lg object-cover"
                      alt="스킬 이미지"
                    />

                  <!-- 오른쪽 텍스트 영역 -->
                    <div class="flex flex-col flex-1">
                      <!-- 스킬 이름 + 타입 -->
                      <div class="flex items-center gap-2">
                        <h2 class="text-base font-semibold truncate text-black">
                          {{ skill.sname }}
                        </h2>
                        <span class="text-xs px-2 py-0.5 rounded bg-blue-500 text-white">
                          {{ enumMap.skill[skill.stype] }}
                        </span>
                        
                      </div>
                      <div class="flex items-center gap-2">
                        <h2 class="text-base truncate text-gray-500">
                          {{ skill.cname }}
                        </h2>
                      </div>
            
                      <!-- 스킬 설명 -->

                      
                      <p class="mt-2 text-sm text-zinc-800 leading-relaxed whitespace-pre-line">
                        <!-- {{ skill.s_desc }} -->

                        <span v-for="(part, i) in skill.parsedDesc" :key="i" :class="{ 'font-bold text-amber-600': part.highlight }">
                          {{ part.text }}
                        </span>
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
      
            <!-- 아티팩트 -->
            <div ref="artifactDiv" id="artifacts" v-if="artifacts?.length">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 mt-5"> 아티팩트 ({{ artifacts.length }})</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="af in artifactWithHighlights"
                  @click ="detailOpen(af.c_id)"
                  :key="af.id"
                  class="flex gap-4 bg-white p-4 rounded-xl shadow-md hover:ring-2 hover:ring-amber-400 transition cursor-pointer overflow-hidden"
                >
                  <!-- 아티팩트 이미지 -->
                  <img
                    :src="getImgUrl(af.cf_url)" 
                    class="w-16 h-16 rounded-lg object-cover shrink-0"
                    alt="아티팩트 이미지"
                  />

                  <!-- 오른쪽 텍스트 영역 -->
                  <div class="flex flex-col flex-1 overflow-hidden">
                    <!-- 아티팩트 이름 + 타입 -->
                    <div class="flex items-center gap-2 overflow-hidden">
                      <h2 class="text-base font-semibold truncate text-black max-w-full">
                        {{ af.aname }}
                      </h2>
                      <span class="text-xs px-2 py-0.5 rounded bg-blue-500 text-white truncate">
                        {{ enumMap.artifact[af.atype] }}
                      </span>
                    </div>

                    <!-- 아티팩트 설명 -->
                    <p class="mt-2 text-sm text-zinc-800 leading-relaxed break-words whitespace-pre-line overflow-hidden">
                      <!-- {{ af.a_desc }} -->
                      <span v-for="(part, i) in af.parsedDesc" :key="i" :class="{ 'font-bold text-amber-600': part.highlight }">
                          {{ part.text }}
                        </span>
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
            <!-- </div> -->
            </div>

            <CharaDetailPopup v-if="isClick===true" @close="isClick=false" :cid="selectedId"></CharaDetailPopup>
          </div>

          <!-- No Results -->
          <div class="text-center py-12" v-if="!characters?.length && !skills?.length && !artifacts?.length">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Search class="h-8 w-8 text-amber-500" />
            </div>
            <h2 class="text-2xl font-bold mb-2">결과 없음</h2>
            <p class="text-gray-600 max-w-md mx-auto">
               "{{ searchQuery }}"
            </p>
          </div>
        <!-- </div> -->
      </section>

      <div class="fixed bottom-6 right-6 flex flex-col gap-1 z-50">
        <button @click="scrollToSection('top')" class="top-btn">⬆ Top</button>
        <button @click="scrollToSection('characters')" class="top-btn">캐릭터</button>
        <button @click="scrollToSection('skills')" class="top-btn">스킬</button>
        <button @click="scrollToSection('artifacts')" class="top-btn">아티팩트</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search, X } from 'lucide-vue-next'
import instance from '../api/axiosInstance.js'
import  { enumMap } from "../constants/enumsMap.js";
import CharaDetailPopup from './popup/CharacterDetailPopup.vue';
import CONST from '../constants/constant.js';


// States
const searchQuery = ref('')
const artifacts = ref([]); 
const characters = ref([]);
const skills = ref([]);
const selectedId = ref(null);
const isClick = ref(false);
const props = defineProps(['cid']);
const isLoading = ref(false)
const activeDropdown = ref(null)
const selectedAvailability = ref([])

const skillWithHighlights = ref([])
const artifactWithHighlights = ref([])

const isScrollShow = ref(false)

// Section id
const charaDiv = ref(null)
const skillDiv = ref(null)
const artifactDiv = ref(null)
const scrollSection = ref(null)

// Filter states
const selectedElements = ref([])
const selectedJobs = ref([])
const selectedRoutes = ref([])
const acquisitonUndetermine =ref([]) 
const acquisitonAuto = ref([])
const acquisitonAlways = ref([])
const acquisitonLimited = ref([])

// Sub-Filter states
const selectedCurrencies = ref([])
const selectedBanners = ref([])

//Sub-Filter-Backend
const selectedAcquisition = ref([])
const selectedSummons =ref([])



// Filter options
const elements = [{id: 1, value : '물'}, {id: 2, value : '불'}, {id: 3, value : '대지'},  {id: 4, value : '빛'},  {id: 5, value : '어둠'}]
const jobs = [{id: 1, value : '가디언'}, {id: 2, value : '워리어'}, {id: 3, value : '스트라이커'}, {id: 4, value : '슈터'}, {id: 5, value : '프리스트'}, {id: 6, value : '커맨더'}]


const getActiveFilterCount = computed(() => {
  return selectedElements.value.length + selectedJobs.value.length + selectedCurrencies.value.length + selectedBanners.value.length
})

const selectSearch = async() =>{
  if(selectedCurrencies.value.length > 0 && selectedBanners.value.length === 0){
    selectedSummons.value = selectedCurrencies.value.filter((item)=>item ==='AL' || item === 'CT');
    selectedAcquisition.value = selectedCurrencies.value.filter((item)=>(item !=='AL' && item !== 'CT'))

  }else if(selectedCurrencies.value.length === 0 && selectedBanners.value.length > 0){
    selectedSummons.value = selectedBanners.value.filter((item)=>item.includes('RR') || item.includes('COL'));
    selectedAcquisition.value = selectedBanners.value.filter((item)=>(item !== 'RR' && item !=='COL'));


  }else{
    selectedSummons.value = selectedCurrencies.value.filter((item)=>item ==='AL' || item ==='CT');
    selectedAcquisition.value = selectedCurrencies.value.filter((item)=>item !== 'AL' && item !=='CT')
    selectedSummons.value.push(
      ...selectedBanners.value.filter((item)=> (item =='RR' || item === 'COL'))
    )
    selectedAcquisition.value.push(
      ...selectedBanners.value.filter((item)=>(item !== 'RR' && item !=='COL'))
    )

  }

  if(selectedSummons.value.length > 0) selectedAcquisition.value.push('SUMM');

}
// Methods
const handleSearch = async () => {
  isLoading.value = true;
  
  await selectSearch();
  
  const keywords = searchQuery.value.split(' ');
  console.log(keywords);
  
  await instance.post('search', {
      keywords: keywords,
      elements: selectedElements.value,
      jobs: selectedJobs.value,
      acquisitions: selectedAcquisition.value,
      summons:selectedSummons.value
  })
  .then((response)=> {
    // 성공 
    artifacts.value = response.data.artifacts;  
    characters.value = response.data.characters;  
    skills.value = response.data.skills;

    
  })
  .catch((error)=> {
    // 에러
    console.log(error);
  })
  .finally(()=> {
    activeDropdown.value = null
    isLoading.value = false;
  });
}

const highlighting = async () => {

  skillWithHighlights.value = skills.value.map(skill => ({
    ...skill,
    parsedDesc: descFormat(skill.s_desc)
  }));

  artifactWithHighlights.value = artifacts.value.map(artifact => ({
    ...artifact,
    parsedDesc: descFormat(artifact.a_desc)
  }));
  
}
const descFormat = (desc) => {
  const pattern = /(~?\d+~?\d+%?|~?\d+턴|\([^)]+\))/g;
  const result = [];

  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(desc)) !== null) {
    const start = match.index;
    const end = pattern.lastIndex;

    // 하이라이트 전 일반 텍스트
    if (start > lastIndex) {
      result.push({ text: desc.slice(lastIndex, start), highlight: false });
    }

    // 하이라이트 텍스트
    result.push({ text: match[0], highlight: true });

    lastIndex = end;
  }

  // 마지막 남은 일반 텍스트
  if (lastIndex < desc.length) {
    result.push({ text: desc.slice(lastIndex), highlight: false });
  }

  return result;
};

const detailOpen = (idx) =>{
  selectedId.value = idx
  isClick.value = true;
  
  
}
//획득가능 선택 변경 (전체선택)
const selectedAllAvailabilityChange = () => {
  if(selectedAvailability.value.length === 3){
      selectedCurrencies.value = []
      selectedBanners.value = []
      selectedAvailability.value = []
  }else{
    selectedAvailability.value = ['auto', 'limited', 'always']
    selectedBanners.value = ['INVI', 'EVET', 'RR', 'COL']
    selectedCurrencies.value = ['GOLD', 'CRYS', 'FAME', 'FEDE', 'FATE', 'CT', 'AL']
  }
  activeDropdown.value = null
}

//직업 선택변경
const selectedJobChange = () => {
  if(selectedJobs.value.length === 6){
    selectedJobs.value = []
  }else{
    selectedJobs.value = [1, 2, 3, 4, 5, 6]
  }
  activeDropdown.value = null
}
//속성 선택변경
const selectedElementsChange = () => {
  if(selectedElements.value.length === 5){
    selectedElements.value = []
  }else{
    selectedElements.value = [1, 2, 3, 4, 5]
  }
  activeDropdown.value = null
}

const resetFilters =() => {
  selectedCurrencies.value = []
  selectedBanners.value = []
  selectedAvailability.value = []
  selectedJobs.value = []
  selectedElements.value = []
  activeDropdown.value = null
  searchQuery.value =''

}

const handleAvailabilityChange = () => {
  console.log(selectedAvailability.value);
  if(!selectedAvailability.value.includes('always')){
    selectedCurrencies.value = []
  }else if(!selectedAvailability.value.includes('limited')){
    selectedBanners.value = []
  }

  // else if(selectedAvailability.value.includes('always') &&  selectedAvailability.value.includes('limited')){
  //   selectedBanners.value = ['INVI', 'EVET', 'RR', 'COL']
  //   selectedCurrencies.value = ['GOLD', 'CRYS', 'FAME', 'FEDE', 'FATE', 'CT', 'AL']
  // }
  activeDropdown.value = null
}

const toggleDropdown = (dropdownName) => {
  if (activeDropdown.value === dropdownName) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = dropdownName
  }
}

const toggleCurrency = (currency) => {
  console.log(currency);
  console.log(selectedCurrencies.value);
  
  
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



const getJobIcon = (jobId) => {
  switch (jobId) {
    case 1:
      return `${CONST.IMG_BASE_URL}/${CONST.JOB_GUARDIAN}/${CONST.VARIANT}`;

    case 2: 
      return `${CONST.IMG_BASE_URL}/${CONST.JOB_WARRIOR}/${CONST.VARIANT}`;

    case 3:
      return `${CONST.IMG_BASE_URL}/${CONST.JOB_STRIKER}/${CONST.VARIANT}`;

    case 4:
      return `${CONST.IMG_BASE_URL}/${CONST.JOB_SHOOTER}/${CONST.VARIANT}`;
    case 5:
      return `${CONST.IMG_BASE_URL}/${CONST.JOB_PRIST}/${CONST.VARIANT}`;

    case 6:
      return `${CONST.IMG_BASE_URL}/${CONST.JOB_COMMANDER}/${CONST.VARIANT}`;
  }
}

const getElement = (elementId) => {
  switch (elementId) {
    case 1:
      return `${CONST.IMG_BASE_URL}/${CONST.ELEMENT_WATER}/${CONST.VARIANT}`;
  
    case 2: 
      return `${CONST.IMG_BASE_URL}/${CONST.ELEMENT_FIRE}/${CONST.VARIANT}`;

    case 3:
      return `${CONST.IMG_BASE_URL}/${CONST.ELEMENT_EARTH}/${CONST.VARIANT}`;
    case 4:
      return `${CONST.IMG_BASE_URL}/${CONST.ELEMENT_LIGHT}/${CONST.VARIANT}`;
    case 5:
      return `${CONST.IMG_BASE_URL}/${CONST.ELEMENT_DARK}/${CONST.VARIANT}`;
  }
}



const handleScroll = () => {
  const scrollTop = window.scrollY;
  // console.log('scrollTop:', scrollTop);
  isScrollShow.value = scrollTop > 200;
};

const scrollToSection = (id) => {
  
  switch (id) {
    case 'characters':
      charaDiv.value?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'skills':
      skillDiv.value?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'artifacts':
      artifactDiv.value?.scrollIntoView({ behavior: 'smooth' });
      break;
    default:
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
  }
};

const getImgUrl = (imgId) => {
  if (!imgId || imgId === 'placeholder') {
    return `${CONST.IMG_BASE_URL}/${CONST.PLACEHOLDER}/${CONST.VARIANT}`;
  }
  return `${CONST.IMG_BASE_URL}/${imgId}/${CONST.VARIANT}`;
};


//enum값 call 페이지 랜딩 시 한 번만
const callEnums = async () => {
  const acquisition = await instance.get('enums/acquisition-methods');
  const summon = await instance.get('enums/summon');

  acquisitonAuto.value = acquisition.data.filter((item)=>item.category.includes('AUTO'));
  acquisitonUndetermine.value = acquisition.data.filter((item)=>item.category.includes('UNDETERMINE'));
  acquisitonAlways.value = acquisition.data.filter((item)=>item.category.includes('ALWAYS'));
  acquisitonLimited.value = acquisition.data.filter((item)=>item.category.includes('LIMITED'));

  acquisitonAlways.value.push(
    ...summon.data.filter((item)=>item.category.includes('ALWAYS'))
  )
  acquisitonLimited.value.push(
    ...summon.data.filter((item)=>item.category.includes('LIMITED'))
  )
  
  console.log(acquisitonAlways.value);
}

//
onMounted(async () => {
  // isLoading.value = true;
  window.addEventListener('scroll', handleScroll);

  try{
    
    await callEnums();
    await handleSearch();
    await highlighting();
    
    // await pickUpList();
  }catch (e) {
    console.log(e);
    
  }finally {
    // isLoading.value = false
  }
  
})

onUnmounted(()=>{
  window.addEventListener('scroll', handleScroll);
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

<style scoped>
.top-btn {
  @apply bg-white/70 border rounded-full shadow-sm px-2 py-1 text-xs text-gray-800 hover:bg-white/90 transition;
}
</style>
