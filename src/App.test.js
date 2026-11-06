import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { initializeTimes, updateTimes } from './timesReducer';

describe('Little Lemon Complete Test Suite', () => {

  // 1. LocalStorage Writing Test
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

  // 2. LocalStorage Reading Test
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

  // 3. Reducer initializeTimes Test
  test('initializeTimes returns a non-empty array of available booking times', () => {
    const initialTimes = initializeTimes();
    expect(Array.isArray(initialTimes)).toBe(true);
    expect(initialTimes.length).toBeGreaterThan(0);
  });

  // 4. Reducer updateTimes Test
  test('updateTimes returns available booking times when pre-selected date is dispatched', () => {
    const preSelectedDate = '2026-11-20';
    const action = { type: 'UPDATE_TIMES', payload: preSelectedDate };
    const previousState = [];

    const updatedTimes = updateTimes(previousState, action);
    expect(Array.isArray(updatedTimes)).toBe(true);
    expect(updatedTimes.length).toBeGreaterThan(0);
  });

  // 5. HTML5 Validation Attributes Test
  test('HTML5 validation attributes are correctly applied to form inputs', () => {
    render(<BookingForm availableTimes={['17:00', '18:00']} dispatch={jest.fn()} />);

    const dateInput = screen.getByLabelText(/Choose Date/i);
    const timeSelect = screen.getByLabelText(/Choose Time/i);
    const guestsInput = screen.getByLabelText(/Number of Guests/i);

    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('type', 'date');

    expect(timeSelect).toHaveAttribute('required');

    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  // 6. JavaScript Validation - Invalid State Test (Targeting button by text content)
  test('Submit button is disabled when guest count is invalid (< 1)', () => {
    render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} />);

    const guestsInput = screen.getByLabelText(/Number of Guests/i);
    const submitButton = screen.getByRole('button', { name: /Confirm and make reservation|Make Your Reservation/i });

    fireEvent.change(guestsInput, { target: { value: '0' } });
    expect(submitButton).toBeDisabled();
  });

  // 7. JavaScript Validation - Valid State Test (Targeting button by text content)
  test('Submit button is enabled when inputs contain valid data', () => {
    render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} />);

    const guestsInput = screen.getByLabelText(/Number of Guests/i);
    const submitButton = screen.getByRole('button', { name: /Confirm and make reservation|Make Your Reservation/i });

    fireEvent.change(guestsInput, { target: { value: '4' } });
    expect(submitButton).toBeEnabled();
  }); 

});