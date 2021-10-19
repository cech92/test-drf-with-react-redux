import React, { useEffect, FC } from 'react';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import { getUsageList, deleteUsage } from '../../actions/usageActions';
import { connect } from 'react-redux';
import { useSelector } from "react-redux";
import UsagesTable from "./UsagesTable";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ModalDelete from '../ModalDelete';
import { history } from '../../helpers';

interface IProps {
  getUsages: (...data: any) => any;
  delUsage: (...data: any) => any;
}

const Usages: FC<IProps> = ({ getUsages, delUsage }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [idSelected, setIdSelected] = React.useState(null);

  const usages = useSelector((state: any) => state.usages.usages);
  const count = useSelector((state: any) => state.usages.count);
  const deleted = useSelector((state: any) => state.usages.deleted);

  if (deleted === true) {
    getUsages({ "page": page + 1, "limit": rowsPerPage });
  }

  const getUsageList = () => {
    getUsages({ "page": 1, "limit": rowsPerPage });
  }

  useEffect(() => {
    getUsageList();
  }, [])

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
    getUsages({ "page": newPage + 1, "limit": rowsPerPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    let newRowsForPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsForPage);
    setPage(0);
    getUsages({ "page": 1, "limit": newRowsForPage });
  };

  const handleDeleteUsage = (id: any) => {
    setShowDeleteModal(!showDeleteModal);
    setIdSelected(id);
  }

  const cancelDelete = () => {
    setShowDeleteModal(!showDeleteModal);
    setIdSelected(null);
  }

  const deleteItem = () => {
    setShowDeleteModal(false);
    setIdSelected(null);
    delUsage(idSelected);
  }

  const openCreateUsage = () => {
    history.push("/usages/new");
  }

  return (
    <Container disableGutters maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <ModalDelete id={idSelected} showDeleteModal={showDeleteModal} cancelDelete={cancelDelete} deleteItem={deleteItem} />

      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}>

        <UsagesTable
          page={page}
          rowsPerPage={rowsPerPage}
          usages={usages}
          count={count}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleDeleteUsage={handleDeleteUsage}
        />

        <Fab sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }} aria-label="Add" color="primary" onClick={openCreateUsage}>
          <AddIcon />
        </Fab>

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
    delUsage: (id: BigInteger) => dispatch(deleteUsage(id)),
  }
}

const connectedUsagesPage = connect(mapStateToProps, mapDispatchToProps)(Usages);
export { connectedUsagesPage as Usages };