import constants from 'constants/AppConstants';

function getCurrentCustomization() {
  const host = window.location.host;
  return constants.CUSTOMIZATIONS[host] || null;
}

function getCustomizationClassName() {
  switch (getCurrentCustomization()) {

    case 'ESPOO': {
      return 'espoo-customizations';
    }

    case 'VANTAA': {
      return 'vantaa-customizations';
    }

    case 'LPR': {
      return 'lpr-customizations';
    }

    default: {
      return 'lpr-customizations';
    }
  }
}

export {
  getCurrentCustomization,
  getCustomizationClassName,
};
