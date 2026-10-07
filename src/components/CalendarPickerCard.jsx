import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CalendarPickerCard.css';

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export default function CalendarPickerCard({
  selectedDate,
  selectedSlot,
  onDateChange,
  onSlotChange,
  minDaysNotice = 7,
  bookedSlots = {}
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minAllowedDate = new Date(today);
  minAllowedDate.setDate(today.getDate() + minDaysNotice);

  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    return new Date(minAllowedDate.getFullYear(), minAllowedDate.getMonth(), 1);
  });

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthTitle = currentMonthDate.toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric'
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  const handlePrevMonth = () => {
    const prevMonth = new Date(year, month - 1, 1);
    setCurrentMonthDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(year, month + 1, 1);
    setCurrentMonthDate(nextMonth);
  };

  const isPrevDisabled = new Date(year, month, 0) < minAllowedDate;

  const formatDateString = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const dayCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    dayCells.push(<div key={`empty-${i}`} className="clean-cal-day-cell empty" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    const dateStr = formatDateString(cellDate);
    const isPastOrTooEarly = cellDate < minAllowedDate;

    const dayBookings = bookedSlots[dateStr] || [];
    const isFullyBooked = dayBookings.length >= 2;

    const isDisabled = isPastOrTooEarly || isFullyBooked;
    const isSelected = selectedDate === dateStr;

    dayCells.push(
      <button
        key={d}
        type="button"
        disabled={isDisabled}
        onClick={() => onDateChange(dateStr)}
        className={`clean-cal-day-cell ${isSelected ? 'selected' : ''}`}
        aria-label={`Giorno ${d}`}
      >
        {d}
      </button>
    );
  }

  // Calculate dynamic slots for selected date
  const getSlotsForDate = (dateStr) => {
    if (!dateStr) return { slots: [], isWeekend: false };
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const slots = isWeekend
      ? [
          '09:00', '10:00', '11:00', '12:00',
          '14:00', '15:00', '16:00', '17:00',
          '18:00', '19:00', '20:00'
        ]
      : ['19:00', '19:30', '20:00', '20:30', '21:00'];

    return { slots, isWeekend };
  };

  const { slots: availableTimes, isWeekend } = getSlotsForDate(selectedDate);
  const selectedDayBookings = selectedDate ? (bookedSlots[selectedDate] || []) : [];

  return (
    <div className="clean-cal-card">
      <div className="clean-cal-header">
        <h3 className="clean-cal-month">{monthTitle}</h3>
        <div className="clean-cal-nav">
          <button
            type="button"
            className="clean-cal-nav-btn"
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            aria-label="Mese precedente"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="clean-cal-nav-btn"
            onClick={handleNextMonth}
            aria-label="Mese successivo"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="clean-cal-grid">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="clean-cal-day-name">
            {day}
          </div>
        ))}
        {dayCells}
      </div>

      {selectedDate && (
        <div className="clean-slots-box">
          <div className="clean-slots-header">
            <span className="clean-slots-title">
              {isWeekend
                ? 'Orario nel weekend (tutto il giorno)'
                : 'Orario serale feriale (19:00 - 21:00)'}
            </span>
          </div>

          <div className="clean-slots-grid-flexible">
            {availableTimes.map((timeStr) => {
              const isTaken = selectedDayBookings.includes(timeStr);
              const isSelected = selectedSlot === timeStr;
              return (
                <button
                  key={timeStr}
                  type="button"
                  disabled={isTaken}
                  onClick={() => onSlotChange(timeStr)}
                  className={`clean-time-chip ${isSelected ? 'selected' : ''}`}
                >
                  {timeStr}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
