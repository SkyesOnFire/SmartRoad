import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Line, List, LineItem } from 'styles/others';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BsFillLightningFill } from 'react-icons/bs';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import Spinner from 'components/Spinner';
import { v4 } from 'uuid';
import UtilsBar from './UtilsBar';
import { ListHolder } from './styles';

export interface IRow {
  label: string;
  data: string;
  style?: React.CSSProperties;
}

interface IProps {
  rows: IRow[];
  module: string; // clientes
  moduleLabel?: string; // clientes
  template: string; // 1fr 2.5fr 2.5fr 2fr 3fr 2fr 1.5fr 1.5fr 1.2fr 1.5fr 1.8fr
  editUrl?: string; // /cadastros/clientes/cliente
  deleteUrl?: string; // /departamentos/departamento
  indexUrl: string; // /cadastros/clientes/cliente
  data: any[];
  utilsBar?: boolean;
  csvExport?: boolean;
  loading?: boolean;
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
}

const ListagemNoGet: React.FC<IProps> = props => {
  const {
    rows,
    module,
    moduleLabel,
    template,
    editUrl,
    deleteUrl,
    indexUrl,
    data,
    utilsBar,
    csvExport,
    loading,
    update,
    setUpdate,
  } = props;

  const [csvData, setCsvData] = useState<any[][]>([[]]);

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
        const tmp_dat = [row_data.split('.')[0], row_data.split('.')[1]];
        return dat[tmp_dat[0]] ? dat[tmp_dat[0]][tmp_dat[1]].toString() : '-';
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

  const generateCSVData = useCallback(() => {
    if (!csvExport) {
      return;
    }
    const final: any[] = [];
    const labels: any[] = [];
    rows.map(row => labels.push(row.label));
    final.push(labels);

    data.forEach(dat => {
      const rowDat: any[] = [];
      rows.forEach(row => rowDat.push(getValue(row.data, dat, true)));
      final.push(rowDat);
    });

    setCsvData(final);
  }, [csvExport, data, getValue, rows]);

  useEffect(() => {
    generateCSVData();
  }, [generateCSVData]);

  return (
    <ListHolder>
      {loading ? (
        <Spinner size={15} />
      ) : data.length !== 0 ? (
        <>
          {utilsBar && (
            <UtilsBar module={module} csvData={csvData} csvExport={csvExport} />
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
              {(editUrl || deleteUrl) && (
                <LineItem className="indice lineitem">
                  <BsFillLightningFill size={15} />
                </LineItem>
              )}
            </Line>
            {data.map(dat => (
              <Line
                className="line"
                style={{
                  gridTemplateColumns: `${template}${
                    (editUrl || deleteUrl) && ' 80px'
                  }`,
                }}
                key={dat.id}
              >
                {rows.map(row => (
                  <LineItem
                    className="lineitem"
                    style={row.style && row.style}
                    key={row.data}
                    id={row.data}
                    onClick={() => {
                      goTo(dat.id);
                    }}
                  >
                    {getValue(row.data, dat)}
                  </LineItem>
                ))}
                {(editUrl || deleteUrl) && (
                  <LineItem className="lineitem">
                    {editUrl && (
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

export default ListagemNoGet;
