import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from '../../Helpers/Markdown/markdown';

const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  }
}));

const AboutPage = () => {
  const [markdown, setMarkdown] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/pages/About.md`)
      .then(res => res.text())
      .then(text => setMarkdown(text));
  });

  return (
    <>
      <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        Webb Trade Center
      </Typography>
      <Divider />
      <Markdown className={classes.markdown}>
        {markdown}
      </Markdown>
      </Grid>
    </>
  );
};

export default AboutPage;
