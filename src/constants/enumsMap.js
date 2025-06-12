//아티팩트 타입
export const artifactType = {
    // RL: {"label" : "렐릭"},
    // NB: {"label" : "노블"},
    // NM: {"label" : "일반"}
    RL: "렐릭",
    NB: "노블",
    NM: "일반"
}


//스킬 타입
export const skillType = {
    AC: "액티브",
    PS: "패시브",
    PO: "잠재",
    CM: "커맨더"
}

//픽업 상태
export const pickupType ={
    PICKUP: "픽업중",
    UPCOMING: "픽업 예정",
    COMMON: "상시",
    NONE: "방랑중"

}

//문의 타입
export const contactType ={
    ER: "오류제보",
    FR: "기능추가요청",
    ET: "기타"

}

//획득방법
export const acquisitionMethodType={
    GOLD: "골드",
    CRYS:"크리스탈",
    FAME:"명성",
    FEDE:"연합포인트",
    INVI:"친구초대",
    PACK:"패키지",
    FATE:"운명의 결속",
    STORY:"스토리",
    EVET:"이벤트",
    SUMM:"소환"

}

//소환 방법
export const summonType = {
    AL: "인연",
    CT: "계약",
    RR: "운명",
    COL: "콜라보"
}

export const enumMap ={
    artifact : artifactType,
    skill : skillType,
    pickup: pickupType,
    contact: contactType,
    acqusition: acquisitionMethodType,
    summon: summonType
}