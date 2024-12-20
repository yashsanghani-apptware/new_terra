import React from 'react';

const CurrencyFormatter = ({ value, locale, currency }) => {
  const formatCurrency = (value, locale, currency) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return (
    formatCurrency(value, locale='en-US', currency='USD')
  );
};

export default CurrencyFormatter;
