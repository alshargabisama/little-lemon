// Test for writing to local storage
  test('Writes booking data to localStorage correctly', () => {
    const newBooking = {
      date: '2026-11-10',
      time: '19:00',
      guests: 4,
      occasion: 'Birthday',
      seating: 'Indoor',
    };

    const bookingsList = [newBooking];
    localStorage.setItem('bookingData', JSON.stringify(bookingsList));

    const storedData = JSON.parse(localStorage.getItem('bookingData'));
    expect(storedData).toEqual(bookingsList);
    expect(storedData[0].time).toBe('19:00');
  });

  // Test for reading from local storage
  test('Reads existing booking data from localStorage correctly', () => {
    const mockBookings = [
      { date: '2026-11-12', time: '20:00', guests: 2, occasion: 'Anniversary' },
    ];
    localStorage.setItem('bookingData', JSON.stringify(mockBookings));

    const retrievedData = JSON.parse(localStorage.getItem('bookingData'));

    expect(Array.isArray(retrievedData)).toBe(true);
    expect(retrievedData).toHaveLength(1);
    expect(retrievedData[0].occasion).toBe('Anniversary');
  });