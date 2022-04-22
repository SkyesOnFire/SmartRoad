import { FormHandles } from '@unform/core';
import Select from 'components/Select';
import Spinner from 'components/Spinner';
import { format } from 'date-fns';
import React, { SetStateAction, useCallback, useRef, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCloudDownloadAlt,
  FaFileCsv,
  FaSortAmountDown,
  FaSortAmountUp,
} from 'react-icons/fa';
import { IPaginateDTO, IPaginationDTO, ISelectDTO } from 'utils/DTOS';
import {
  UtilsBarHolder,
  LoadCsv,
  UtilCSV,
  PaginationHolder,
  Page,
  PageButton,
  OrderByForm,
} from './styles';

interface IProps {
  module: string;
  csvExport?: boolean;
  csvData?: string | any;
  csvLoading?: boolean;
  pagination?: boolean;
  actualPage?: number;
  setActualPage?: React.Dispatch<SetStateAction<number>>;
  perPage?: number;
  setPerPage?: React.Dispatch<SetStateAction<number>>;
  paginationData?: IPaginationDTO;
  update?: boolean;
  setOrderByDir?: React.Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  setOrderBy?: React.Dispatch<SetStateAction<string>>;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
  setCsvClicked?: React.Dispatch<SetStateAction<boolean>>;
  orderby?: ISelectDTO[];
  orderByDir?: 'ASC' | 'DESC';
}

const UtilsBar: React.FC<IProps> = props => {
  const {
    module,
    csvExport,
    csvData,
    csvLoading,
    pagination,
    paginationData,
    actualPage,
    setActualPage,
    setUpdate,
    update,
    perPage,
    setPerPage,
    setOrderBy,
    orderby,
    orderByDir,
    setOrderByDir,
    setCsvClicked,
  } = props;

  const OrderByFormRef = useRef<FormHandles>(null);

  const total_pages =
    paginationData && Math.ceil(paginationData.total / paginationData.per_page);

  const previousPage = useCallback(() => {
    if (
      !setUpdate ||
      !setActualPage ||
      actualPage === null ||
      !paginationData ||
      paginationData.current_page === 1
    ) {
      return;
    }
    const page = paginationData.current_page - 1;
    setActualPage(page);
    setUpdate(!update);
  }, [update, setUpdate, actualPage, setActualPage, paginationData]);

  const nextPage = useCallback(() => {
    if (
      !setUpdate ||
      !setActualPage ||
      actualPage === null ||
      !paginationData ||
      total_pages === 0 ||
      paginationData.current_page === total_pages
    ) {
      return;
    }
    const page = paginationData.current_page + 1;
    setActualPage(page);
    setUpdate(!update);
  }, [
    update,
    setUpdate,
    actualPage,
    setActualPage,
    total_pages,
    paginationData,
  ]);

  return (
    <UtilsBarHolder>
      <PaginationHolder>
        {pagination &&
          paginationData &&
          total_pages !== 1 &&
          total_pages !== 0 && (
            <>
              <PageButton onClick={() => previousPage()}>
                <FaArrowLeft size={20} />
              </PageButton>
              <Page>{`${paginationData.current_page} - ${total_pages}`}</Page>
              <PageButton onClick={() => nextPage()}>
                <FaArrowRight size={20} />
              </PageButton>
            </>
          )}
      </PaginationHolder>
      {orderby && setOrderBy && orderByDir && setOrderByDir && (
        <OrderByForm
          initialData={{ orderby_sel: 'id' }}
          ref={OrderByFormRef}
          onSubmit={data => {
            setOrderByDir(orderByDir);
            setOrderBy(data.orderby_sel);
          }}
        >
          <button
            type="button"
            className="orderButton"
            onClick={() => {
              orderByDir === 'DESC'
                ? setOrderByDir('ASC')
                : setOrderByDir('DESC');
            }}
          >
            {orderByDir === 'DESC' ? (
              <FaSortAmountDown size={20} />
            ) : (
              <FaSortAmountUp size={20} />
            )}
          </button>
          <Select
            options={orderby}
            name="orderby_sel"
            id="orderby_sel"
            placeholder="Ordenação"
            onChange={data => setOrderBy(data && data.value)}
          />
        </OrderByForm>
      )}
      {csvExport && csvLoading ? (
        <div style={{ width: '100px' }}>
          <Spinner noMinHeight size={15} />
        </div>
      ) : csvExport ? (
        csvData[0].length === 0 && setCsvClicked ? (
          <LoadCsv
            onClick={() => {
              setCsvClicked(true);
            }}
          >
            <FaCloudDownloadAlt size={20} />
            <span>CSV</span>
          </LoadCsv>
        ) : (
          <UtilCSV
            enclosingCharacter=""
            data={csvData}
            filename={`${module}-${format(
              new Date(),
              'dd-MM-yy-hh-mm'
            )}-insys.csv`}
          >
            <FaFileCsv size={20} />
          </UtilCSV>
        )
      ) : (
        <></>
      )}
    </UtilsBarHolder>
  );
};

export default UtilsBar;
