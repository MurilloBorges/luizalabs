import React from 'react';
import PropTypes from 'prop-types';
import icone from '../../assets/static/icons/symbol-defs.svg';

export default function IconSVG({
  icon,
  className,
  width,
  height,
  fill,
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      fill={fill}
    >
      <use xlinkHref={`${icone}#icon-${icon}`} />
    </svg>
  );
}

IconSVG.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};

IconSVG.defaultProps = {
  className: '',
  width: '100%',
  height: '100%',
  fill: '#000000',
};
