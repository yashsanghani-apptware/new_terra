import React from 'react';

const NumberFormatter = ({ value, locale = 'en-US' }) => {
  const formatNumber = (value, locale) => {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
    }).format(value);
  };

  return (
    <span>{formatNumber(value, locale)}</span>
  );
};

export default NumberFormatter;
