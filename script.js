/* =========================================
   YouTube Money Calculator — script.js
   Vanilla JS, no dependencies
   ========================================= */

'use strict';

/* ===== CONSTANTS ===== */

/**
 * Default RPM values by content type and region.
 * Sources: YouTube creator reports, industry data.
 */
const RPM_DATA = {
  longform: {
    USA:    8.00,
    Europe: 5.00,
    India:  1.00,
    Other:  2.00
  },
  shorts: {
    USA:    0.120,
    Europe: 0.080,
    India:  0.015,
    Other:  0.030
  }
};

// Default Shorts RPM used in Basic Mode comparison
// (representative mid-range value)
const DEFAULT_SHORTS_RPM = 0.08;

/* ===== STATE ===== */
let currentMode        = 'basic';
let currentContentType = 'longform';

/* ===== UTILITY FUNCTIONS ===== */

function formatCurrency(value) {
  if (!isFinite(value) || value === null || value === undefined) return '—';
  if (Math.abs(value) >= 0.005) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
  return '$' + value.toFixed(4);
}

function formatRPM(value) {
  if (!isFinite(value)) return '—';
  if (value >= 0.10) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
  return '$' + value.toFixed(3);
}

function formatNumber(value) {
  if (!isFinite(value)) return '0';
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/* ===== WEIGHTED RPM ===== */

/**
 * Calculate weighted RPM from audience distribution.
 * Formula: Σ (region_pct / 100) × region_RPM
 */
function calcWeightedRPM(pcts, contentType) {
  const rpms = RPM_DATA[contentType];
  return (pcts.usa    / 100 * rpms.USA)
       + (pcts.europe / 100 * rpms.Europe)
       + (pcts.india  / 100 * rpms.India)
       + (pcts.other  / 100 * rpms.Other);
}

/* ===== AUDIENCE PERCENTAGE HELPERS ===== */

function getPercentages() {
  return {
    usa:    parseFloat(document.getElementById('pct-usa').value)    || 0,
    europe: parseFloat(document.getElementById('pct-europe').value) || 0,
    india:  parseFloat(document.getElementById('pct-india').value)  || 0,
    other:  parseFloat(document.getElementById('pct-other').value)  || 0
  };
}

function validatePercentages() {
  const pcts  = getPercentages();
  const total = pcts.usa + pcts.europe + pcts.india + pcts.other;
  const totalEl      = document.getElementById('pct-total');
  const totalDisplay = document.getElementById('pct-total-display');
  const valMsg       = document.getElementById('pct-validation');
  const valTotal     = document.getElementById('pct-total-val');

  totalEl.textContent = total.toFixed(1);
  if (valTotal) valTotal.textContent = total.toFixed(1);

  const isValid = Math.abs(total - 100) < 0.6;

  if (total === 0) {
    totalDisplay.className = 'pct-total-badge';
    valMsg.classList.add('hidden');
    return false;
  } else if (isValid) {
    totalDisplay.className = 'pct-total-badge valid';
    valMsg.classList.add('hidden');
    return true;
  } else {
    totalDisplay.className = 'pct-total-badge invalid';
    valMsg.classList.remove('hidden');
    return false;
  }
}

/* ===== RPM HINT LABELS ===== */

function updateRPMHints() {
  const rpms = RPM_DATA[currentContentType];
  document.getElementById('rpm-usa-hint').textContent    = `RPM: ${formatRPM(rpms.USA)}`;
  document.getElementById('rpm-europe-hint').textContent = `RPM: ${formatRPM(rpms.Europe)}`;
  document.getElementById('rpm-india-hint').textContent  = `RPM: ${formatRPM(rpms.India)}`;
  document.getElementById('rpm-other-hint').textContent  = `RPM: ${formatRPM(rpms.Other)}`;
}

/* ===== SLIDER STYLING ===== */

function updateSliderTrack() {
  const slider = document.getElementById('basic-rpm');
  const min    = parseFloat(slider.min);
  const max    = parseFloat(slider.max);
  const val    = parseFloat(slider.value);
  const pct    = ((val - min) / (max - min)) * 100;

  slider.style.background = `linear-gradient(to right,
    #FF0000 0%, #FF0000 ${pct}%,
    #E5E7EB ${pct}%, #E5E7EB 100%)`;
  slider.setAttribute('aria-valuenow', val);
}

/* ===== DISPLAY RESULTS ===== */

function displayResults({ rpm, monthly, views, mode, contentType }) {
  const daily  = monthly / 30;
  const yearly = monthly * 12;

  document.getElementById('monthly-revenue').textContent    = formatCurrency(monthly);
  document.getElementById('result-rpm').setAttribute('data-rpm', rpm);
  document.getElementById('result-per-mille').textContent   = formatRPM(rpm);
  document.getElementById('result-daily').textContent       = formatCurrency(daily);
  document.getElementById('result-yearly').textContent      = formatCurrency(yearly);
  document.getElementById('result-rpm-display').textContent = `at ${formatRPM(rpm)} RPM`;
  document.getElementById('results-mode-tag').textContent   =
    mode === 'basic'
      ? 'Basic Mode'
      : `Advanced · ${contentType === 'longform' ? 'Long-form' : 'Shorts'}`;
}

/* ===== COMPARISON CARD ===== */

/**
 * Always populates the Long-form vs Shorts comparison card.
 *
 * Basic Mode:
 *   - Long-form RPM  = the slider value the user set (#basic-rpm)
 *   - Shorts RPM     = DEFAULT_SHORTS_RPM (0.08, mid-range estimate)
 *
 * Advanced Mode:
 *   - Both RPMs computed via weighted audience distribution.
 *   - Runs even when percentages don't sum to 100 so the card
 *     never stays blank; the main results area handles the
 *     validation message separately.
 */
function updateComparisonCard() {
  let views, lfRPM, shRPM;

  if (currentMode === 'basic') {
    views = parseFloat(document.getElementById('basic-views').value) || 0;
    lfRPM = parseFloat(document.getElementById('basic-rpm').value)   || 0;
    shRPM = DEFAULT_SHORTS_RPM;
  } else {
    views = parseFloat(document.getElementById('adv-views').value) || 0;
    const pcts = getPercentages();
    lfRPM = calcWeightedRPM(pcts, 'longform');
    shRPM = calcWeightedRPM(pcts, 'shorts');
  }

  const lfRevenue = (views / 1000) * lfRPM;
  const shRevenue = (views / 1000) * shRPM;

  document.getElementById('comparison-views').textContent = formatNumber(views);
  document.getElementById('cmp-longform').textContent     = formatCurrency(lfRevenue);
  document.getElementById('cmp-shorts').textContent       = formatCurrency(shRevenue);
  document.getElementById('cmp-lf-rpm').textContent       = formatRPM(lfRPM);
  document.getElementById('cmp-sh-rpm').textContent       = formatRPM(shRPM);

  const noteEl = document.getElementById('comparison-note');
  if (lfRevenue > 0 && shRevenue > 0) {
    const ratio = Math.round(lfRevenue / shRevenue);
    noteEl.textContent = ratio > 1
      ? `Long-form earns approximately ${ratio}× more than Shorts for the same view count.`
      : '';
  } else {
    noteEl.textContent = '';
  }
}

/* ===== BASIC MODE CALCULATION ===== */

function calculateBasic() {
  const views = parseFloat(document.getElementById('basic-views').value) || 0;
  const rpm   = parseFloat(document.getElementById('basic-rpm').value)   || 0;

  const monthly = (views / 1000) * rpm;

  displayResults({ rpm, monthly, views, mode: 'basic', contentType: null });
  updateComparisonCard();
}

/* ===== ADVANCED MODE CALCULATION ===== */

function calculateAdvanced() {
  const views = parseFloat(document.getElementById('adv-views').value) || 0;
  const pcts  = getPercentages();
  const valid = validatePercentages();

  const customEnabled = document.getElementById('custom-rpm-toggle').checked;
  let rpm;

  if (customEnabled) {
    rpm = parseFloat(document.getElementById('custom-rpm-val').value) || 0;
  } else {
    rpm = calcWeightedRPM(pcts, currentContentType);
  }

  const monthly = (views / 1000) * rpm;

  displayResults({ rpm, monthly, views, mode: 'advanced', contentType: currentContentType });

  // Comparison card always updates — it does not depend on validation
  updateComparisonCard();

  // Visual feedback when distribution is invalid (main results only)
  if (!valid && !customEnabled) {
    document.getElementById('monthly-revenue').textContent = '—';
  }
}

/* ===== MASTER RECALCULATE ===== */

function recalculate() {
  if (currentMode === 'basic') {
    calculateBasic();
  } else {
    calculateAdvanced();
  }
}

/* ===== MODE SWITCHING ===== */

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentMode = btn.dataset.mode;

    document.querySelectorAll('.mode-btn').forEach(b => {
      const isActive = b.dataset.mode === currentMode;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', String(isActive));
    });

    document.getElementById('basic-mode').classList.toggle('hidden',    currentMode !== 'basic');
    document.getElementById('advanced-mode').classList.toggle('hidden', currentMode !== 'advanced');

    recalculate();
  });
});

/* ===== CONTENT TYPE SWITCHING ===== */

document.querySelectorAll('.content-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentContentType = btn.dataset.type;

    document.querySelectorAll('.content-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === currentContentType);
    });

    const rateInput = document.getElementById('monetized-rate');
    if (rateInput) {
      rateInput.value = currentContentType === 'longform' ? 40 : 100;
    }

    updateRPMHints();
    recalculate();
  });
});

/* ===== SLIDER: RPM DISPLAY ===== */

const rpmSlider  = document.getElementById('basic-rpm');
const rpmDisplay = document.getElementById('rpm-display');

rpmSlider.addEventListener('input', () => {
  const val = parseFloat(rpmSlider.value);
  rpmDisplay.textContent = formatRPM(val);
  updateSliderTrack();
  recalculate();
});

/* ===== CPM FIELD: SUGGEST RPM ===== */

document.getElementById('basic-cpm').addEventListener('input', e => {
  const cpm = parseFloat(e.target.value);
  if (isFinite(cpm) && cpm > 0) {
    const suggested = clamp(+(cpm * 0.45).toFixed(1), 0.5, 20);
    rpmSlider.value = suggested;
    rpmDisplay.textContent = formatRPM(suggested);
    updateSliderTrack();
    recalculate();
  }
});

/* ===== ADVANCED: LIVE INPUTS ===== */

['adv-views', 'pct-usa', 'pct-europe', 'pct-india', 'pct-other', 'monetized-rate'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', recalculate);
});

/* ===== CUSTOM RPM TOGGLE ===== */

document.getElementById('custom-rpm-toggle').addEventListener('change', function () {
  const inputWrap = document.getElementById('custom-rpm-input');
  const isChecked = this.checked;
  inputWrap.classList.toggle('hidden', !isChecked);
  inputWrap.setAttribute('aria-hidden', String(!isChecked));
  recalculate();
});

document.getElementById('custom-rpm-val').addEventListener('input', recalculate);

/* ===== BASIC: LIVE VIEWS INPUT ===== */

document.getElementById('basic-views').addEventListener('input', recalculate);

/* ===== FAQ ACCORDION ===== */

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    const answer = item.querySelector('.faq-a');

    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      el.querySelector('.faq-a').hidden = true;
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

/* ===== MOBILE NAV TOGGLE ===== */

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('click', e => {
    if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===== INITIALIZE ===== */

function init() {
  updateSliderTrack();
  rpmDisplay.textContent = formatRPM(parseFloat(rpmSlider.value));
  updateRPMHints();
  recalculate();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
