import React, { SetStateAction, useCallback } from 'react';

import { Line, List, LineItem } from 'styles/others';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import Spinner from 'components/Spinner';
import { v4 } from 'uuid';
import { differenceInDays } from 'date-fns';
import { BsFillLightningFill } from 'react-icons/bs';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import { FaTrash } from 'react-icons/fa';

export interface IRow {
  label: string;
  data: string;
  date_original?: string;
  style?: React.CSSProperties;
}

interface IProps {
  rows: IRow[];
  module: string; // clientes
  moduleLabel?: string; // clientes
  template: string; // 1fr 2.5fr 2.5fr 2fr 3fr 2fr 1.5fr 1.5fr 1.2fr 1.5fr 1.8fr
  deleteUrl?: string; // /departamentos/departamento
  data: any[];
  loading?: boolean;
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
  update2?: boolean;
  setUpdate2?: React.Dispatch<SetStateAction<boolean>>;
  breakLine?: boolean;
  Modal: any;
  extraData?: any;
}

const ListagemNoGetModal: React.FC<IProps> = props => {
  const {
    data,
    rows,
    module,
    moduleLabel,
    deleteUrl,
    template,
    loading,
    update,
    setUpdate,
    update2,
    setUpdate2,
    breakLine,
    Modal,
    extraData,
  } = props;

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
    (row_data: string, dat: any, date_original?: string) => {
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
      if (
        row_data === 'data_prazo_formated' &&
        dat[row_data] !== null &&
        dat[row_data] !== undefined
      ) {
        return (
          <div
            style={
              differenceInDays(
                new Date(dat[date_original || row_data]),
                new Date()
              ) < 0 &&
              (dat.data_entrega === undefined || dat.data_entrega === null)
                ? {
                    color: 'red',
                    fontWeight: 500,
                  }
                : undefined
            }
          >
            {dat[row_data].toString()}
          </div>
        );
      }
      if (dat[row_data] !== null && dat[row_data] !== undefined) {
        return dat[row_data].toString();
      }
      return '-';
    },
    [getStatusColor]
  );

  return (
    <>
      {loading ? (
        <Spinner size={15} />
      ) : data.length !== 0 ? (
        <List className={`list noget-list${breakLine ? ' break-line' : ''}`}>
          <Line
            style={{
              gridTemplateColumns: `${template}${deleteUrl && ' 80px'}`,
            }}
            className="line indice"
          >
            {rows.map(row => (
              <LineItem key={v4()} className="indice lineitem">
                {row.label}
              </LineItem>
            ))}
            {deleteUrl && (
              <LineItem className="indice lineitem">
                <BsFillLightningFill size={15} />
              </LineItem>
            )}
          </Line>
          {data.map(dat => (
            <Line
              className="line"
              style={{
                gridTemplateColumns: `${template}${deleteUrl && ' 80px'}`,
              }}
              key={dat.id}
            >
              {rows.map(row => (
                <Modal
                  key={row.label}
                  update={update}
                  setUpdate={setUpdate}
                  id={dat.id}
                  usuarios={
                    extraData && extraData.usuarios
                      ? extraData.usuarios
                      : undefined
                  }
                  lps={extraData && extraData.lps ? extraData.lps : undefined}
                  clientes={
                    extraData && extraData.clientes
                      ? extraData.clientes
                      : undefined
                  }
                  servicos={
                    extraData && extraData.servicos
                      ? extraData.usuarios
                      : undefined
                  }
                >
                  <LineItem
                    className="lineitem"
                    style={row.style && row.style}
                    key={row.data}
                    id={row.data}
                  >
                    {getValue(row.data, dat, row.date_original)}
                  </LineItem>
                </Modal>
              ))}
              {deleteUrl && (
                <LineItem className="lineitem">
                  {deleteUrl && (
                    <ConfirmDeleteModal
                      delete_url={deleteUrl}
                      id={dat.id}
                      module={moduleLabel || module}
                      setUpdate={setUpdate2}
                      update={update2}
                    >
                      <FaTrash className="acao" />
                    </ConfirmDeleteModal>
                  )}
                </LineItem>
              )}
            </Line>
          ))}
        </List>
      ) : (
        `Nenhum ${moduleLabel || module} encontrado...`
      )}
    </>
  );
};

export default ListagemNoGetModal;
