import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import LinkButton from '../LinkButton';

function Pod ({content, link, title}) {
  return (
    <Card>
      <CardContent>
        <Typography
          component='h3'
          gutterBottom
          variant='h5'
        >
          {title}
        </Typography>

        <Typography component='p'>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <LinkButton
          color='primary'
          size='small'
          to={link}
        >
          Go
        </LinkButton>
      </CardActions>
    </Card>
  );
}

Pod.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default memo(Pod);
