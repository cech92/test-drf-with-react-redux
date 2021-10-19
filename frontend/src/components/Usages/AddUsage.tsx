import React, { useEffect, FC } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createUsage } from '../../actions/usageActions';
import { getUsageTypeList } from '../../actions/usageTypeActions';
import { connect } from 'react-redux';
import { useSelector } from "react-redux";
import UsageForm from './UsageForm';
import { history } from '../../helpers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';


interface IProps {
  getUsageTypes: (...data: any) => any;
  addUsage: (data: any) => any;
}

const AddUsage: FC<IProps> = ({ getUsageTypes, addUsage }) => {
  const user = useSelector((state: any) => state.user.user);
  const usageTypes = useSelector((state: any) => state.usageTypes.usageTypes);

  const created = useSelector((state: any) => state.usages.created);

  if (created === true) {
    history.push('/usages');
  }

  const usage = {
    id: 0,
    user: user.id,
    usage_type: "",
    usage_at: new Date(),
    amount: 0.0
  }

  const getUsageTypeList = () => {
    getUsageTypes({});
  }

  useEffect(() => {
    getUsageTypeList();
  }, []);

  const handleSubmit = (data: any) => {
    addUsage(data);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>

        <UsageForm usage={usage} user={user} usageTypes={usageTypes} handleSubmit={handleSubmit} />

      </Paper>
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    usage: state.usage,
    usage_types: state.usage_types,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUsageTypes: (...data: any) => dispatch(getUsageTypeList({ data })),
    addUsage: (data: any) => dispatch(createUsage(data)),
  }
}

const connectedUsagePage = connect(mapStateToProps, mapDispatchToProps)(AddUsage);
export { connectedUsagePage as AddUsage };
