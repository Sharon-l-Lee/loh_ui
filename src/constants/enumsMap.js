export const artifactType = {
    // RL: {"label" : "렐릭"},
    // NB: {"label" : "노블"},
    // NM: {"label" : "일반"}
    RL: "렐릭",
    NB: "노블",
    NM: "일반"
}

export const skillType = {
    AC: "액티브",
    PS: "패시브",
    PO: "잠재",
    CM: "커맨더"
}

export const pickupType ={
    PICKUP: "픽업중",
    UPCOMING: "픽업 예정",
    COMMON: "상시",
    NONE: "방랑중"

}

export const contactType ={
    ER: "오류제보",
    FR: "기능추가요청",
    ET: "기타"

}

export const enumMap ={
    artifact : artifactType,
    skill : skillType,
    pickup: pickupType,
    contact: contactType
}