import React from 'react';
import PropTypes from 'prop-types';

const avatarStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  width: '48px',
};

const GitHub = ({gitUrl}) => {
  return (
    <a href={gitUrl} target="_blank" rel="noopener noreferrer">
      <img className="avatar"
           style={avatarStyle}
           src="https://github.githubassets.com/images/modules/site/logos/desktop-logo.png"
           alt="avatar"/>
    </a>
  );
};

GitHub.propTypes = {
  gitUrl: PropTypes.string.isRequired,
};

export default GitHub;
