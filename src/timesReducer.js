// Meta's deterministic pseudo-random generator
const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = function (date) {
  let result = [];
  // Parse safely to avoid UTC offset shifting the day
  let day = 1;
  if (date instanceof Date) {
    day = date.getDate();
  } else if (typeof date === 'string' && date.includes('-')) {
    const parts = date.split('-');
    day = parseInt(parts[2], 10);
  } else {
    day = new Date().getDate();
  }

  let random = seededRandom(day);

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00');
    }
    if (random() < 0.5) {
      result.push(i + ':30');
    }
  }
  return result.length > 0 ? result : ['17:00', '18:00', '19:00', '20:00', '21:00'];
};

export const submitAPI = function (formData) {
  return true;
};

// Filter out slots already booked in localStorage for this exact date
export const filterBookedTimes = (dateStr, slots) => {
  if (typeof window === 'undefined' || !dateStr) return slots;
  try {
    const saved = localStorage.getItem('bookingData');
    if (!saved) return slots;
    const bookings = JSON.parse(saved);
    
    // Normalize string trim for guaranteed match across browsers
    const bookedTimesOnDate = bookings
      .filter((b) => String(b.date).trim() === String(dateStr).trim())
      .map((b) => String(b.time).trim());

    return slots.filter((slot) => !bookedTimesOnDate.includes(String(slot).trim()));
  } catch (e) {
    return slots;
  }
};

// 1. Initializer function: defaults to today's local date
export const initializeTimes = () => {
  const today = new Date();
  // Safe local date formatting: YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const localDateStr = `${year}-${month}-${day}`;

  const generatedSlots = fetchAPI(today);
  return filterBookedTimes(localDateStr, generatedSlots);
};

// 2. Reducer function
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES': {
      const dateStr = action.payload; // e.g. "2026-11-01"
      const generatedSlots = fetchAPI(dateStr);
      return filterBookedTimes(dateStr, generatedSlots);
    }
    case 'BOOK_TIME': {
      return state.filter((slot) => slot !== action.payload);
    }
    default:
      return state;
  }
};