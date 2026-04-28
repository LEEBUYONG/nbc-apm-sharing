// ============================================
// 밍글데이 수강생용 가이드 - JavaScript
// 작성일: 2026.04.28
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // 탭 전환 기능
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // 모든 탭 버튼 비활성화
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // 모든 탭 콘텐츠 숨기기
      tabContents.forEach(content => content.classList.remove('active'));

      // 클릭한 탭 활성화
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      // 페이지 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // URL 해시 업데이트 (뒤로가기 지원)
      history.pushState(null, '', `#${targetTab}`);
    });
  });

  // URL 해시로 직접 접근 시 해당 탭 활성화
  const hash = window.location.hash.substring(1);
  if (hash) {
    const targetButton = document.querySelector(`[data-tab="${hash}"]`);
    if (targetButton) {
      targetButton.click();
    }
  }

  // 뒤로가기/앞으로가기 지원
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'home';
    const targetButton = document.querySelector(`[data-tab="${hash}"]`);
    if (targetButton) {
      targetButton.click();
    }
  });

  // 스크롤 애니메이션 (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // 애니메이션 대상 요소들
  const animatedElements = document.querySelectorAll('.timeline-item, .map-card, .step, .award-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // 네비게이션 탭 스크롤 시 그림자 효과
  const navTabs = document.querySelector('.nav-tabs');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navTabs.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      navTabs.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });

  // 모바일 탭 네비게이션 자동 스크롤
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 활성화된 버튼이 보이도록 스크롤
      setTimeout(() => {
        button.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }, 100);
    });
  });

  // 이스터에그: 로고 클릭 시 홈으로 이동
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      const homeButton = document.querySelector('[data-tab="home"]');
      if (homeButton) {
        homeButton.click();
      }
    });
  }

  // 콘솔 메시지
  console.log('%c🎉 밍글데이에 오신 것을 환영합니다!', 'color: #7C3AED; font-size: 20px; font-weight: bold;');
  console.log('%c즐거운 시간 되세요! 💜', 'color: #A78BFA; font-size: 14px;');
});
