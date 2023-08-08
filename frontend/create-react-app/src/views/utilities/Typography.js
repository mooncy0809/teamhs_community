import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => (
  <MainCard title="문제" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <SubCard title="문제작성">
          <Grid container direction="column" spacing={1}>
            <form action="/board/writedo" method="post">
              <input type="text" name="title" style={{width:'50%'}}/><br/><br/>
              <textarea name="text" className="textarea" style={{width:'100%',height:'150px'}}></textarea><br/>
              <button>저장</button>
            </form>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="Sub title">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MuiTypography variant="subtitle1" gutterBottom>
                subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="subtitle2" gutterBottom>
                subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="Body">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MuiTypography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="body2" gutterBottom>
                body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="Extra">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MuiTypography variant="button" display="block" gutterBottom>
                button text
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="caption" display="block" gutterBottom>
                caption text
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="overline" display="block" gutterBottom>
                overline text
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography
                variant="body2"
                color="primary"
                component={Link}
                href="https://berrydashboard.io"
                target="_blank"
                display="block"
                underline="hover"
                gutterBottom
              >
                https://berrydashboard.io
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default Typography;
