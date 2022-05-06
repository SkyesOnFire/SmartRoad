import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Line, List, LineItem } from 'styles/others';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BsFillLightningFill } from 'react-icons/bs';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import Spinner from 'components/Spinner';
import { v4 } from 'uuid';
import { IPaginateDTO, IPaginationDTO, ISelectDTO } from 'utils/DTOS';
import { createFilteredUrl, tratarValorObjeto } from 'utils/etc';
import UtilsBar from './UtilsBar';
import { ListHolder } from './styles';

export interface IRow {
  label: string;
  data: string;
  style?: React.CSSProperties;
}

export interface IPageInfo {
  current_page: number;
  last_page: number;
}

interface IProps {
  rows: IRow[];
  customEdit?: boolean;
  module: string; // clientes
  moduleLabel?: string; // clientes
  template: string; // 1fr 2.5fr 2.5fr 2fr 3fr 2fr 1.5fr 1.5fr 1.2fr 1.5fr 1.8fr
  otherId?: string;
  editUrl?: string; // /cadastros/clientes/cliente
  deleteUrl?: string; // /departamentos/departamento
  indexUrl: string; // /cadastros/clientes/cliente
  data?: IPaginateDTO;
  utilsBar?: boolean;
  pageActions?: boolean;
  csvExport?: boolean;
  getAllData?: () => Promise<any[]>;
  csvLoading?: boolean;
  loading?: boolean;
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
  actualPage: number;
  setActualPage: React.Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<SetStateAction<number>>;
  pageInfo?: IPageInfo;
  filter?: any;
  orderby?: ISelectDTO[];
  setOrderBy?: React.Dispatch<SetStateAction<string>>;
  orderByDir?: 'ASC' | 'DESC';
  setOrderByDir?: React.Dispatch<SetStateAction<'ASC' | 'DESC'>>;
}

type IData = Array<object | any> | any | undefined;

const ListagemNoGetPaginated: React.FC<IProps> = props => {
  const {
    rows,
    customEdit,
    module,
    moduleLabel,
    template,
    otherId,
    editUrl,
    deleteUrl,
    indexUrl,
    data: dataInit,
    utilsBar,
    pageActions,
    csvExport,
    getAllData,
    csvLoading,
    loading,
    update,
    setUpdate,
    actualPage,
    setActualPage,
    perPage,
    setPerPage,
    pageInfo,
    children,
    filter,
    orderby,
    setOrderBy,
    orderByDir,
    setOrderByDir,
  } = props;

  let data: IData;
  if (dataInit) {
    data = dataInit.data;
  }

  const [allData, setAllDATA] = useState<any[]>([]);
  const [csvData, setCsvData] = useState<any[][]>([[]]);
  const [csvClicked, setCsvClicked] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<
    IPaginationDTO | undefined
  >();

  const loadPaginationData = useCallback(() => {
    if (!dataInit) {
      return;
    }
    setPaginationData({
      from: dataInit.from,
      to: dataInit.to,
      per_page: dataInit.per_page,
      total: dataInit.total,
      current_page: dataInit.current_page,
      prev_page: dataInit.prev_page,
      next_page: dataInit.next_page,
    });
  }, [dataInit]);

  useEffect(() => {
    loadPaginationData();
  }, [loadPaginationData]);

  const history = useHistory();

  const goTo = useCallback(
    (id: string | number) => {
      history.push(`${indexUrl}/${id}`);
    },
    [history, indexUrl]
  );

  const goToEdit = useCallback(
    (id: string | number) => {
      history.push(`${editUrl}/${id}`);
    },
    [history, editUrl]
  );

  const getStatusColor = useCallback((status_code: number) => {
    // 0 - Iniciar / 1 - Andamento / 2 - Protocolado / 3 - Concluido / 4 - Stand-by / 5 - Cancelado / 6 - Contínuo / 7 - Stand-by / 8 - Cancelado

    switch (status_code) {
      case 0:
        return '#EBAD5F';
      case 1:
        return '#3f51b4';
      case 2:
        return '#03a8f3';
      case 3:
        return '#8ac24a';
      case 4:
        return '#ddc812';
      case 5:
        return '#f34336';
      case 6:
        return '#785548';
      case 7:
        return '#ddc812';
      case 8:
        return '#f34336';
      default:
        return '#ffffff';
    }
  }, []);

  const getValue = useCallback(
    (row_data: string, dat: any, isCSV?: boolean) => {
      if (typeof dat[row_data] === 'boolean') {
        return dat[row_data] ? (
          <MdCheckBox size={20} />
        ) : (
          <MdCheckBoxOutlineBlank size={20} />
        );
      }
      if (row_data.includes('.')) {
        return tratarValorObjeto(row_data, dat) || '-';
      }
      if (row_data === 'status' && dat[row_data] !== null) {
        if (isCSV) {
          return dat[`des_${row_data}`].toString();
        }
        return (
          <span
            style={{
              backgroundColor: getStatusColor(
                parseInt(dat[row_data].toString())
              ),
            }}
            className="status"
          >
            {dat[`des_${row_data}`].toString()}
          </span>
        );
      }
      if (dat[row_data] !== null) {
        return dat[row_data].toString();
      }
      return '-';
    },
    [getStatusColor]
  );

  // CSV generate all data
  const generateAllData = useCallback(async () => {
    if (!getAllData || !csvClicked) {
      return;
    }

    setAllDATA(await getAllData());
  }, [getAllData, csvClicked]);

  useEffect(() => {
    generateAllData();
  }, [generateAllData]);

  const generateCSVData = useCallback(async () => {
    if (!csvExport || !data) {
      return;
    }
    const final: any[] = [];
    const labels: any[] = [];
    rows.map(row => labels.push(row.label));
    final.push(labels);

    let finalData = data;

    if (csvLoading || allData.length === 0) {
      return;
    }
    if (getAllData !== undefined && allData.length !== 0) {
      finalData = allData;
    }

    finalData.forEach((dat: any) => {
      const rowDat: any[] = [];
      rows.forEach(row => rowDat.push(getValue(row.data, dat, true)));
      final.push(rowDat);
    });

    setCsvData(final);
  }, [csvExport, data, csvLoading, getAllData, allData, getValue, rows]);

  useEffect(() => {
    generateCSVData();
  }, [generateCSVData]);

  const modalChildren = useCallback(
    (id: any) => {
      const childrenWithProps = React.Children.map(children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { pagamento: id });
        }
        return child;
      });

      return childrenWithProps;
    },
    [children]
  );

  return (
    <ListHolder>
      {loading ? (
        <Spinner size={15} />
      ) : data ? (
        <>
          {utilsBar && (
            <UtilsBar
              module={module}
              csvData={csvData}
              csvExport={csvExport}
              pagination
              actualPage={actualPage}
              setActualPage={setActualPage}
              perPage={perPage}
              setPerPage={setPerPage}
              paginationData={paginationData}
              update={update}
              setUpdate={setUpdate}
              csvLoading={csvLoading}
              orderby={orderby}
              setOrderBy={setOrderBy}
              orderByDir={orderByDir}
              setOrderByDir={setOrderByDir}
              setCsvClicked={setCsvClicked}
            />
          )}
          <List className="list noget-list">
            <Line
              style={{
                gridTemplateColumns: `${template}${
                  (editUrl || deleteUrl) && ' 80px'
                }`,
              }}
              className="line indice"
            >
              {rows.map(row => (
                <LineItem key={v4()} className="indice lineitem">
                  {row.label}
                </LineItem>
              ))}
              <LineItem className="indice lineitem">
                <BsFillLightningFill size={15} />
              </LineItem>
            </Line>
            {data.map((dat: any) => (
              <Line
                className="line"
                style={{
                  gridTemplateColumns: `${template}${
                    (editUrl || deleteUrl) && ' 80px'
                  }`,
                }}
                key={dat.id}
              >
                {rows.map(row =>
                  customEdit && row.label === '#' ? (
                    <LineItem
                      className="lineitem"
                      style={{ padding: 0 }}
                      key={row.data}
                      id={row.data}
                    >
                      {modalChildren(dat)}
                    </LineItem>
                  ) : (
                    <LineItem
                      className="lineitem"
                      style={row.style && row.style}
                      key={row.data}
                      id={row.data}
                      onClick={() => {
                        goTo(
                          otherId === 'projeto' ? dat.__projeto__.id : dat.id
                        );
                      }}
                    >
                      {getValue(row.data, dat)}
                    </LineItem>
                  )
                )}
                {(editUrl || deleteUrl) && (
                  <LineItem className="lineitem">
                    {editUrl && !customEdit && (
                      <FaPencilAlt
                        onClick={() => {
                          goToEdit(dat.id);
                        }}
                        className="acao"
                      />
                    )}
                    {deleteUrl && (
                      <ConfirmDeleteModal
                        delete_url={deleteUrl}
                        id={dat.id}
                        module={moduleLabel || module}
                        setUpdate={setUpdate}
                        update={update}
                      >
                        <FaTrash className="acao" />
                      </ConfirmDeleteModal>
                    )}
                  </LineItem>
                )}
              </Line>
            ))}
          </List>
        </>
      ) : (
        `Nenhum ${moduleLabel || module} encontrado...`
      )}
    </ListHolder>
  );
};

export default ListagemNoGetPaginated;
