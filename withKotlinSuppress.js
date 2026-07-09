const { withGradleProperties } = require('expo/config-plugins');

const withKotlinSuppress = (config) => {
  return withGradleProperties(config, (config) => {
    // Add suppressKotlinVersionCompatibilityCheck to gradle.properties
    const props = config.modResults;
    const newProp = { type: 'property', key: 'kotlin.suppressKotlinVersionCompatibilityCheck', value: 'true' };
    
    const existing = props.findIndex(p => p.key === 'kotlin.suppressKotlinVersionCompatibilityCheck');
    if (existing >= 0) {
      props[existing] = newProp;
    } else {
      props.push(newProp);
    }
    
    return config;
  });
};

module.exports = withKotlinSuppress;
