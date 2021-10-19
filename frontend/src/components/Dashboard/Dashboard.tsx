import React, { useEffect, FC } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { getUsageList } from '../../actions/usageActions';
import { getUsageTypeList } from '../../actions/usageTypeActions';
import { connect } from 'react-redux';
import { useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { Chart } from "react-google-charts";


interface IProps {
  getUsageTypes: (...data: any) => any;
  getUsages: (...data: any) => any;
}

const Dashboard: FC<IProps> = ({ getUsageTypes, getUsages }) => {
  const usageTypes = useSelector((state: any) => state.usageTypes.usageTypes);
  const usages = useSelector((state: any) => state.usages.usages);
  const [usageTypeFilter, setUsageTypeFilter] = React.useState("");

  var dataChart: any = [["Date", "Amount"]];

  for (let i = 0; i < usages.length; i++) {
    dataChart.push([new Date(usages[i].usage_at), usages[i].amount]);
  }

  const getUsageTypeList = () => {
    getUsageTypes({});
  }

  useEffect(() => {
    getUsageTypeList();
  }, []);


  const handleChangeUsageTypeFilter = (event: SelectChangeEvent) => {
    let value = event.target.value;
    setUsageTypeFilter(value);
  }

  const filterData = (event: any) => {
    event.preventDefault();
    getUsages({ usage_type: usageTypeFilter });
  }

  return (
    <Container disableGutters maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}>

        <Grid container spacing={3}>
          <Grid item xs={9} sm={9}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="select-usage-type-label">Usage Type</InputLabel>
              <Select
                required
                labelId="select-usage-type-label"
                id="usage_type"
                value={usageTypeFilter}
                onChange={handleChangeUsageTypeFilter}
              >
                <MenuItem value="">
                  <em>---Select---</em>
                </MenuItem>
                {usageTypes.map((usageType: any) =>
                  <MenuItem key={usageType.id} value={usageType.id}>{usageType.name} (Unit: {usageType.unit} - Factor: {usageType.factor})</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              onClick={filterData}
            >Filter</Button>
          </Grid>

          {usageTypeFilter !== "" ? <Grid item xs={12} sm={12}>

            <Chart
              width={'100%'}
              height={'600px'}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={dataChart}
              options={{
                chart: {
                  title: 'Chart',
                  subtitle: 'Last 100 records',
                },
              }}
              rootProps={{ 'data-testid': '3' }}
            />
          </Grid> : null}
        </Grid>


      </Paper>
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    usages: state.usages,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUsages: (data: any) => dispatch(getUsageList(data)),
    getUsageTypes: (...data: any) => dispatch(getUsageTypeList({ data })),
  }
}

const connectedUsagesPage = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export { connectedUsagesPage as Dashboard };