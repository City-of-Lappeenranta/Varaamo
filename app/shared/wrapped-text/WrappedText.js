import React, { PropTypes } from 'react';
import Linkify from 'react-linkify';

function renderParagraph(text, index) {
  return <div key={index}><Linkify properties={{ target: '_blank' }}>{text}</Linkify></div>;
}

function WrappedText({ text }) {
  if (!text) {
    return <div />;
  }
  return (
    <div className="wrapped-text">
      {text.split('\n').map(renderParagraph)}
    </div>
  );
}

WrappedText.propTypes = {
  text: PropTypes.string,
};

export default WrappedText;
