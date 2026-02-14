// 테마 상태 관리
let isGreenTheme = false;

// DOM 요소들
const toggleThemeBtn = document.getElementById('toggleTheme');
const changeImageBtn = document.getElementById('changeImage');
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');
let isCustomImage = false;

// 영웅 목록
const heroes = [
    '로드', '또 다른 로드', '프람', '요한', '샬롯', '미하일',
    '루인', '칸나', '린', '뮤', '엡실론', '아우레아', '아리에스', '오스왈드', 
    '나탈리', '슈나이더', '루이사', '필립', '메이링', '자이라', '크롬', '제라드', 
    '카를 3세', '루실리카', '라플라스', '다닐', '라샤드', '헤르야', '카디자', '라이레이', 
    '라이안', '즈라한', '헬가', '용기사 헬가', '크메르사트', '시프리에드', '온달', 
    '발터', '용사 발터', '이카테스톨', '라우젤릭', '아힐람', '미리안드', '히폴리타', 
    '라르곤', '브랜든', '브란두흐', '알카나스', '다르텔', '용병 아슬란', '아슬란', '로잔나', 
    '갈라레온', '베로니카', '루미에', '리카르도', '비앙카', '시안', '솔피', '바네사', 
    '빈센트', '올가', '프라우', '나인', '조슈아', '질리언', '유진', '프레데릭', 
    '바레타', '체자렛', '카르티스', '왕자 카르티스', '람다', '스칼렌', '프레하르트', 
    '테오데릭', '이안', '아란', '비류', '율', '한',
];
const heroesForCouple = [
    '로드(짧은머리)', '로드(긴머리)', '또 다른 로드', '프람', '요한', '샬롯', '미하일',
    '루인', '칸나', '린', '뮤', '엡실론', '아우레아', '아리에스', '오스왈드', 
    '나탈리', '슈나이더', '루이사', '필립', '메이링', '자이라', '크롬', '제라드', 
    '카를 3세', '루실리카', '라플라스', '다닐', '라샤드', '헤르야', '카디자', '라이레이', 
    '라이안', '즈라한', '헬가', '용기사 헬가', '크메르사트', '시프리에드', '온달', 
    '발터', '용사 발터', '이카테스톨', '라우젤릭', '아힐람', '미리안드', '히폴리타', 
    '라르곤', '브랜든', '브란두흐', '알카나스', '다르텔', '용병 아슬란', '아슬란', '로잔나', 
    '갈라레온', '베로니카', '루미에', '리카르도', '비앙카', '시안', '솔피', '바네사', 
    '빈센트', '올가', '프라우', '나인', '조슈아', '질리언', '유진', '프레데릭', 
    '바레타', '체자렛', '카르티스', '왕자 카르티스', '람다', '스칼렌', '프레하르트', 
    '테오데릭', '이안', '아란', '비류', '율', '한',
];

const heroesWithoutElements = ['또 다른 로드', '엡실론', '로드', '뮤', '람다',
    '카르티스', '루이사', '필립', '크메르사트', '프레데릭', '히폴리타', '헤르야', '칸나', '갈라레온', '질리언',
    '유진', '다닐','제라드','베로니카', '왕자 카르티스', '빈센트', '테오데릭','한','카디자','다르텔'];
const elements = ['빛', '물', '불', '대지', '어둠'];
let selectedHeroes = [];
let selectedCouples = [];
let currentCoupleStep = null;
let tempCouple = { first: null, second: null };

// 테마 토글 함수
function toggleTheme() {
    isGreenTheme = !isGreenTheme;
    document.body.classList.toggle('green-theme', isGreenTheme);
    
    // 프로필 이미지 변경 (커스텀 이미지가 아닐 때만)
    if (!isCustomImage) {
        if (isGreenTheme) {
            profileImage.src = 'img/proimg_g.png';
        } else {
            profileImage.src = 'img/proimg_p.png';
        }
    }
    
    // 버튼 텍스트 변경
    if (isCustomImage) {
        toggleThemeBtn.textContent = '테마 변경';
    } else {
        toggleThemeBtn.textContent = '로드 변경';
    }

    // 이미 추가된 영웅 카드 이미지 갱신
    document.querySelectorAll('.hero-card').forEach(card => {
        const heroName = card.querySelector('.hero-name').textContent;
        if (heroName === '로드') {
            card.querySelector('img').src = `img/heropro/${isGreenTheme ? '로드(긴머리)' : '로드(짧은머리)'}.png`;
        }
    });

    // 이미 추가된 커플 선택기 이미지 갱신
    document.querySelectorAll('.couple-hero-display img').forEach(img => {
        const name = img.closest('.couple-hero-display').querySelector('.couple-hero-name')?.textContent;
        if (name === '로드') {
            img.src = `img/heropro/${isGreenTheme ? '로드(긴머리)' : '로드(짧은머리)'}.png`;
        }
    });

    // 드롭다운 목록 이미지 갱신
    document.querySelectorAll('.hero-option, .couple-hero-dropdown .hero-option').forEach(option => {
        if (option.dataset.hero === '로드') {
            option.querySelector('img').src = `img/heropro/${isGreenTheme ? '로드(긴머리)' : '로드(짧은머리)'}.png`;
        }
    });
}

// 이미지 업로드 함수
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            isCustomImage = true;
            toggleThemeBtn.textContent = '테마 변경';  // 이 줄 추가
        };
        reader.readAsDataURL(file);
    }
}

// 버튼 선택 토글 함수
function toggleButtonSelection(button) {
    const section = button.closest('.select-setion');
    const isAbilitySection = section && section.id === 'ability';
    
    // ability 섹션이 아닌 경우만 단일 선택
    if (!isAbilitySection) {
        const buttons = section.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('selected');
            }
        });
    }
    
    // 현재 버튼 토글
    button.classList.toggle('selected');

    const unionSection = document.getElementById('union');
    if (section === unionSection) {
        const anySelected = [...unionSection.querySelectorAll('button')].some(btn => btn.classList.contains('selected'));
        const unionName = document.getElementById('union-name');
        unionName.style.display = anySelected ? 'none' : '';
        unionSection.style.paddingLeft = anySelected ? '30px' : '';
    }
}

// 영웅 드롭다운 생성
function createHeroDropdown() {
    const dropdown = document.querySelector('.hero-dropdown');
    dropdown.innerHTML = `
        <input type="text" class="hero-search" placeholder="영웅 검색..." autocomplete="off">
        ${heroes.map(hero => `
            <div class="hero-option" data-hero="${hero}">
                <img src="img/heropro/${hero === '로드' ? (isGreenTheme ? '로드(긴머리)' : '로드(짧은머리)') : hero}.png" alt="${hero}">
                <span>${hero}</span>
            </div>
        `).join('')}
    `;

    dropdown.querySelector('.hero-search').addEventListener('input', function(e) {
        e.stopPropagation();
        const query = this.value.trim().toLowerCase();
        dropdown.querySelectorAll('.hero-option').forEach(option => {
            option.style.display = option.dataset.hero.toLowerCase().includes(query) ? '' : 'none';
        });
    });

    dropdown.addEventListener('click', (e) => {
        const option = e.target.closest('.hero-option');
        if (option && selectedHeroes.length < 4) {
            addHero(option.dataset.hero);
            dropdown.style.display = 'none';
        }
    });
}

// 영웅 추가
function addHero(heroName) {
    if (selectedHeroes.includes(heroName)) return;
    
    selectedHeroes.push(heroName);
    
    const showElements = !heroesWithoutElements.includes(heroName);
    
    const heroCard = document.createElement('div');
    heroCard.className = 'hero-card adding';
    heroCard.innerHTML = `
        <button class="remove-hero-btn">×</button>
        <img src="img/heropro/${heroName === '로드' ? (isGreenTheme ? '로드(긴머리)' : '로드(짧은머리)') : heroName}.png" alt="${heroName}">
        <div class="hero-name">${heroName}</div>
        ${showElements ? `
            <div class="element-buttons">
                ${elements.map(el => `
                    <button class="element-btn" style="background-image: url('img/${el}.png')" data-element="${el}"></button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    // X 버튼 클릭 시 삭제
    heroCard.querySelector('.remove-hero-btn').addEventListener('click', () => {
        heroCard.classList.add('removing');
        setTimeout(() => {
            selectedHeroes = selectedHeroes.filter(h => h !== heroName);
            heroCard.remove();
            document.querySelector('.add-hero-btn').style.display = 'block';
        }, 300);
    });
    
    // 속성 버튼 토글 (있는 경우만)
    if (showElements) {
        heroCard.querySelectorAll('.element-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
            });
        });
    }
    
    const addBtn = document.querySelector('.add-hero-btn');
    document.querySelector('.selected-heroes').insertBefore(heroCard, addBtn);
    
    // 애니메이션 시작
    setTimeout(() => {
        heroCard.classList.remove('adding');
    }, 10);
    
    if (selectedHeroes.length >= 4) {
        addBtn.style.display = 'none';
    }
}

// 커플 추가
function addCouple() {
    if (selectedCouples.length >= 3) return;
    
    const coupleSelector = document.createElement('div');
    coupleSelector.className = 'couple-selector adding';
    
    const hero1Container = document.createElement('div');
    hero1Container.className = 'couple-hero-container';
    hero1Container.innerHTML = `
        <div class="couple-hero-display">
            <button class="select-couple-hero" data-position="hero1">
                <span>+</span>
            </button>
        </div>
        <div class="couple-hero-dropdown" style="display: none;">
            <input type="text" class="hero-search" placeholder="영웅 검색..." autocomplete="off">
            ${heroesForCouple.map(hero => `
                <div class="hero-option" data-hero="${hero}">
                    <img src="img/heropro/${hero}.png" alt="${hero}">
                    <span>${hero}</span>
                </div>
            `).join('')}
        </div>
    `;

    hero1Container.querySelector('.hero-search').addEventListener('input', function(e) {
        e.stopPropagation();
        const query = this.value.trim().toLowerCase();
        const drop = this.closest('.couple-hero-dropdown');
        drop.querySelectorAll('.hero-option').forEach(option => {
            option.style.display = option.dataset.hero.toLowerCase().includes(query) ? '' : 'none';
        });
    });
    
    const iconBtn = document.createElement('button');
    iconBtn.className = 'couple-icon-btn';
    iconBtn.innerHTML = '<i class="fas fa-star"></i>';
    
    const hero2Container = document.createElement('div');
    hero2Container.className = 'couple-hero-container';
    hero2Container.innerHTML = `
        <div class="couple-hero-display">
            <button class="select-couple-hero" data-position="hero2">
                <span>+</span>
            </button>
        </div>
        <div class="couple-hero-dropdown" style="display: none;">
            <input type="text" class="hero-search" placeholder="영웅 검색..." autocomplete="off">
            ${heroesForCouple.map(hero => `
                <div class="hero-option" data-hero="${hero}">
                    <img src="img/heropro/${hero}.png" alt="${hero}">
                    <span>${hero}</span>
                </div>
            `).join('')}
        </div>
    `;

    hero2Container.querySelector('.hero-search').addEventListener('input', function(e) {
        e.stopPropagation();
        const query = this.value.trim().toLowerCase();
        const drop = this.closest('.couple-hero-dropdown');
        drop.querySelectorAll('.hero-option').forEach(option => {
            option.style.display = option.dataset.hero.toLowerCase().includes(query) ? '' : 'none';
        });
    });
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-couple-btn';
    removeBtn.textContent = '×';
    
    coupleSelector.appendChild(removeBtn);
    coupleSelector.appendChild(hero1Container);
    coupleSelector.appendChild(iconBtn);
    coupleSelector.appendChild(hero2Container);
    
    // 영웅 선택 버튼 클릭
    const selectBtns = coupleSelector.querySelectorAll('.select-couple-hero');
    selectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const container = btn.closest('.couple-hero-container');
            const dropdown = container.querySelector('.couple-hero-dropdown');
            
            dropdown.targetContainer = container;
            
            if (dropdown.parentElement !== document.body) {
                document.body.appendChild(dropdown);
            }
            
            const rect = btn.getBoundingClientRect();
            dropdown.style.position = 'fixed';
            dropdown.style.top = `${rect.bottom + 5}px`;
            dropdown.style.left = `${rect.left}px`;
            
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';

            if (dropdown.style.display === 'block') {
                const search = dropdown.querySelector('.hero-search');
                search.value = '';
                dropdown.querySelectorAll('.hero-option').forEach(o => o.style.display = '');
                setTimeout(() => search.focus(), 50);
            }
        });
    });

    // 영웅 선택
    coupleSelector.querySelectorAll('.couple-hero-dropdown').forEach(drop => {
        drop.addEventListener('click', (e) => {
            const option = e.target.closest('.hero-option');
            if (!option) return;
            e.stopPropagation();
            const heroName = option.dataset.hero;
            const dropdown = option.closest('.couple-hero-dropdown');
            const targetContainer = dropdown.targetContainer;
            if (!targetContainer) return;

            const display = targetContainer.querySelector('.couple-hero-display');
            display.innerHTML = `
                <img src="img/heropro/${heroName}.png" alt="${heroName}" class="selected-hero-image">
                <div class="couple-hero-name">${heroName}</div>
            `;

            const selectedImg = display.querySelector('.selected-hero-image');
            selectedImg.addEventListener('click', () => {
                display.innerHTML = `<button class="select-couple-hero"><span>+</span></button>`;
                const newBtn = display.querySelector('.select-couple-hero');
                newBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rect = newBtn.getBoundingClientRect();
                    dropdown.style.position = 'fixed';
                    dropdown.style.top = `${rect.bottom + 5}px`;
                    dropdown.style.left = `${rect.left}px`;
                    dropdown.style.display = 'block';
                });
            });

            dropdown.style.display = 'none';
        });
    });
    
    // 아이콘 버튼 토글
    iconBtn.addEventListener('click', () => {
        iconBtn.classList.toggle('heart');
        if (iconBtn.classList.contains('heart')) {
            iconBtn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            iconBtn.innerHTML = '<i class="fas fa-star"></i>';
        }
    });
    
    // X 버튼 클릭 시 삭제
    removeBtn.addEventListener('click', () => {
        coupleSelector.classList.add('removing');
        setTimeout(() => {
            const index = selectedCouples.indexOf(coupleSelector);
            if (index > -1) {
                selectedCouples.splice(index, 1);
            }
            coupleSelector.remove();
            document.querySelector('.add-couple-btn').style.display = 'block';
        }, 300);
    });
    
    const addBtn = document.querySelector('.add-couple-btn');
    document.querySelector('.selected-couples').insertBefore(coupleSelector, addBtn);
    
    selectedCouples.push(coupleSelector);
    
    setTimeout(() => {
        coupleSelector.classList.remove('adding');
    }, 10);
    
    if (selectedCouples.length >= 3) {
        addBtn.style.display = 'none';
    }
    
    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.couple-hero-container')) {
            coupleSelector.querySelectorAll('.couple-hero-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 테마 토글 버튼
    toggleThemeBtn.addEventListener('click', toggleTheme);
    
    // 프로필 이미지 변경 버튼
    changeImageBtn.addEventListener('click', function() {
        imageUpload.click();
    });
    
    // 이미지 업로드
    imageUpload.addEventListener('change', handleImageUpload);
    
    // 모든 unselect 버튼에 클릭 이벤트 추가
    const unselectButtons = document.querySelectorAll('.select-setion button');
    unselectButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtonSelection(this);
        });
    });
    
    // 영웅 드롭다운 생성
    createHeroDropdown();
    
    
    // 영웅 + 버튼
    document.querySelector('.add-hero-btn').addEventListener('click', function() {
        const dropdown = document.querySelector('.hero-dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // 커플 + 버튼
    document.querySelector('.add-couple-btn').addEventListener('click', function() {
        addCouple();
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.hero-dropdown');
        if (dropdown.style.display === 'block' && !e.target.closest('.hero-dropdown') && !e.target.closest('.add-hero-btn')) {
            dropdown.style.display = 'none';
        }
    });

    // 한마디 자동 높이 조절
    const speechInput = document.getElementById('speechInput');
    if (speechInput) {
        speechInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }

    const levelInput = document.querySelector('input[type="number"]');
    if (levelInput) {
        levelInput.addEventListener('input', function() {
            this.style.maxWidth = this.value ? '60px' : '';
        });
    }

    const unionNameInput = document.getElementById('union-name');
    if (unionNameInput) {
        const ruler = document.createElement('span');
        ruler.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;';
        document.body.appendChild(ruler);

        unionNameInput.addEventListener('input', function() {
            const style = getComputedStyle(this);
            ruler.style.fontSize = style.fontSize;
            ruler.style.fontFamily = style.fontFamily;
            ruler.style.letterSpacing = style.letterSpacing;
            ruler.style.padding = style.padding;
            ruler.textContent = this.value || this.placeholder;
            this.style.maxWidth = (ruler.offsetWidth + 17) + 'px';
            document.getElementById('union-suffix').style.display = this.value ? 'inline' : 'none';
            document.getElementById('union').style.display = this.value ? 'none' : '';
        });
    }

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
        img.addEventListener('dragstart', e => e.preventDefault());
    });

    let saveCount = 0;
    document.getElementById('saveImageBtn').addEventListener('click', function() {
        const card = document.querySelector('.card');

        // placeholder 숨기기
        const allInputs = card.querySelectorAll('input, textarea');
        allInputs.forEach(el => {
            el._placeholder = el.placeholder;
            el.placeholder = '';
        });
        const placehold = card.querySelectorAll('.placehold');
        placehold.forEach(el => el.style.visibility = 'hidden');

        // object-fit: cover 수동 시뮬레이션
        const profileImg = document.getElementById('profileImage');
        const proImgEl = document.querySelector('.pro_img');
        const containerW = proImgEl.offsetWidth;
        const containerH = proImgEl.offsetHeight;
        const naturalW = profileImg.naturalWidth;
        const naturalH = profileImg.naturalHeight;
        const scale = Math.max(containerW / naturalW, containerH / naturalH);
        const displayW = naturalW * scale;
        const displayH = naturalH * scale;
        const offsetX = (containerW - displayW) / 2;
        const offsetY = (containerH - displayH) / 2;
        const savedStyle = profileImg.getAttribute('style') || '';
        profileImg.style.objectFit = 'unset';
        profileImg.style.width = displayW + 'px';
        profileImg.style.height = displayH + 'px';
        profileImg.style.marginLeft = offsetX + 'px';
        profileImg.style.marginTop = offsetY + 'px';

        html2canvas(card, {
            useCORS: true,
            scale: 2,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight,
        }).then(canvas => {
            // 복원
            profileImg.setAttribute('style', savedStyle);
            allInputs.forEach(el => { el.placeholder = el._placeholder; });
            placehold.forEach(el => el.style.visibility = '');

            saveCount++;
            const link = document.createElement('a');
            link.download = `껍질-미리-깐-롷소표 ${saveCount}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});