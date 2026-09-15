/**
 * CCHS Esports — Version 3 Playground (v3.js)
 * Modern Apple / SwiftUI Interaction Engine
 * Features:
 *  - Cupertino Segmented Control (Interactive Glider & Filter)
 *  - VisionOS Specular Spotlight Hover (GPU-accelerated mouse coordinates)
 *  - Live Lab Status Beacon (Pacific Time auto-detection)
 * Zero external dependencies. Fully accessible.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCupertinoPicker();
  initVisionOSSpotlight();
  initLiveLabBeacon();
});

/**
 * 1. Cupertino Segmented Control (SwiftUI Picker style)
 */
function initCupertinoPicker() {
  const picker = document.querySelector('.cupertino-picker');
  if (!picker) return;

  const tabs = picker.querySelectorAll('.picker-tab');
  const glider = picker.querySelector('.picker-glider');
  const cards = document.querySelectorAll('.apple-card');
  const groupActive = document.querySelector('.games-group:not(.group-expansion)');
  const groupExpansion = document.querySelector('.group-expansion');

  function updateGlider(activeTab) {
    if (!glider || !activeTab) return;
    const tabRect = activeTab.getBoundingClientRect();
    const pickerRect = picker.getBoundingClientRect();
    
    const left = tabRect.left - pickerRect.left;
    const width = tabRect.width;
    
    glider.style.transform = `translateX(${left}px)`;
    glider.style.width = `${width}px`;
  }

  // Initial glider placement
  const initialActive = picker.querySelector('.picker-tab.is-active') || tabs[0];
  if (initialActive) {
    // Delay slightly to ensure fonts and layout have settled
    setTimeout(() => updateGlider(initialActive), 60);
  }

  window.addEventListener('resize', () => {
    const current = picker.querySelector('.picker-tab.is-active');
    if (current) updateGlider(current);
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      updateGlider(tab);

      const filter = tab.dataset.filter;
      applyFilter(filter);
    });
  });

  function applyFilter(filter) {
    if (filter === 'all') {
      if (groupActive) groupActive.style.display = 'block';
      if (groupExpansion) groupExpansion.style.display = 'block';
      cards.forEach(card => card.classList.remove('is-hidden'));
    } else if (filter === 'active') {
      if (groupActive) groupActive.style.display = 'block';
      if (groupExpansion) groupExpansion.style.display = 'none';
      cards.forEach(card => {
        const isForming = card.classList.contains('card-forming');
        card.classList.toggle('is-hidden', isForming);
      });
    } else if (filter === 'forming') {
      if (groupActive) groupActive.style.display = 'none';
      if (groupExpansion) groupExpansion.style.display = 'block';
      cards.forEach(card => {
        const isForming = card.classList.contains('card-forming');
        card.classList.toggle('is-hidden', !isForming);
      });
    }
  }
}

/**
 * 2. VisionOS Specular Spotlight Hover
 */
function initVisionOSSpotlight() {
  const cards = document.querySelectorAll('.apple-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

/**
 * 3. Live Lab Status Beacon (Pacific Time detection)
 */
function initLiveLabBeacon() {
  const pill = document.getElementById('liveStatusPill');
  const textEl = document.getElementById('liveStatusText');
  const beacon = document.querySelector('.live-beacon');
  if (!textEl || !beacon) return;

  function checkStatus() {
    // Current date in Pacific Time
    const now = new Date();
    const ptString = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const ptDate = new Date(ptString);

    const day = ptDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
    const hours = ptDate.getHours();
    const minutes = ptDate.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Open Lab: Tuesdays (2) and Thursdays (4) from 4:00 PM (960 min) to 5:00 PM (1020 min)
    const isLabDay = (day === 2 || day === 4);
    const isOpenHours = totalMinutes >= 960 && totalMinutes < 1020;

    if (isLabDay && isOpenHours) {
      beacon.className = 'live-beacon beacon-active';
      textEl.innerHTML = '<strong>LAB OPEN NOW</strong> • Room 315 Scrims';
      if (pill) pill.classList.add('pill-live-glow');
    } else {
      beacon.className = 'live-beacon beacon-standby';
      if (pill) pill.classList.remove('pill-live-glow');

      // Next session calculation
      let nextDayName = 'Tuesday';
      if (day === 2 && totalMinutes < 960) {
        nextDayName = 'Today';
      } else if (day === 2 && totalMinutes >= 1020) {
        nextDayName = 'Thursday';
      } else if (day === 3) {
        nextDayName = 'Thursday';
      } else if (day === 4 && totalMinutes < 960) {
        nextDayName = 'Today';
      } else if (day === 4 && totalMinutes >= 1020) {
        nextDayName = 'Tuesday';
      } else if (day === 5 || day === 6 || day === 0 || day === 1) {
        nextDayName = 'Tuesday';
      }

      textEl.innerHTML = `Next Lab: <strong>${nextDayName} at 4:00 PM</strong> • Room 315`;
    }
  }

  checkStatus();
  // Refresh status every 60 seconds
  setInterval(checkStatus, 60000);
}
