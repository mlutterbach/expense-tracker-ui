import React, { useState } from "react";
import "../../styles/ExpenseFilter.css";

const ExpenseFilter = ({ onFilterChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState("");
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const applyFilters = () => {
    let filters = {};

    // Time filter
    if (timeFilter) {
      filters.filter = timeFilter;
    }

    // Custom date range filter
    if (startDate && endDate) {
      filters.start_date = startDate;
      filters.end_date = endDate;
    }

    // Amount range filter
    if (amountRange.min && amountRange.max) {
      filters.min_amount = amountRange.min;
      filters.max_amount = amountRange.max;
    } else if (amountRange.min) {
      filters.min_amount = amountRange.min;
    } else if (amountRange.max) {
      filters.max_amount = amountRange.max;
    }

    // Pass the filters to the parent component
    onFilterChange(filters);

    // Close the modal after applying filters
    setShowModal(false);
  };

  const clearFilters = () => {
    // Reset the local state
    setTimeFilter("");
    setAmountRange({ min: "", max: "" });
    setStartDate("");
    setEndDate("");

    // Pass empty filters to the parent component
    onFilterChange({});

    setShowModal(false);
  };

  return (
    <>
      <button className="floating-filter-btn" onClick={toggleModal}>
        Filter
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <h2>Filter Expenses</h2>

            {/* Time Filter */}
            <div className="filter-section">
              <label htmlFor="timeFilter">Time Filter:</label>
              <select
                id="timeFilter"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Custom Date Range (only show if "custom" is selected) */}
            {timeFilter === "custom" && (
              <>
                <div className="filter-section">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="filter-section">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Amount Range Filter */}
            <div className="filter-section">
              <label>Amount Range:</label>
              <input
                type="number"
                placeholder="Min"
                value={amountRange.min}
                onChange={(e) =>
                  setAmountRange({ ...amountRange, min: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Max"
                value={amountRange.max}
                onChange={(e) =>
                  setAmountRange({ ...amountRange, max: e.target.value })
                }
              />
            </div>

            <div className="filter-actions">
              <button onClick={applyFilters} className="apply-btn">
                Apply Filters
              </button>
              <button onClick={clearFilters} className="clear-btn">
                Clear Filters
              </button>
              <button onClick={toggleModal} className="close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseFilter;
