import Grid from '@material-ui/core/Grid';
import React, {memo} from 'react';
import Pod from '../../components/Pod';

function SettingsSelection () {
  return (
    <Grid
      container
      spacing={24}
    >
      <Grid
        item
        md={4}
        sm={6}
        xs={12}
      >
        <Pod
          content='Manage image sizes'
          link='/settings/images'
          title='Images'
        />
      </Grid>
    </Grid>
  );
}

export default memo(SettingsSelection);
