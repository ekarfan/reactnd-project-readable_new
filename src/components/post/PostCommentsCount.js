import React  from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Label, Icon } from "semantic-ui-react";

const PostCommentsCount = (props) => {
  //let countValue;

  const countValue = !props.count ? <Icon name="spinner" loading /> : <span>{props.coun}</span>;

  return (
    <Label color="orange" as={Link} to={props.path} >
      <Icon name='comment'/> &nbsp; {countValue}
    </Label>
  );
};

PostCommentsCount.propTypes = {
  path: PropTypes.string.isRequired,
  count: PropTypes.number
};

export default PostCommentsCount;
