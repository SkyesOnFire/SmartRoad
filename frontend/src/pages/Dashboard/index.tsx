/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useState } from 'react';

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';
import Listagem, { IRow } from 'components/Listagem';
import { ListHolder } from 'pages/Cadastros/styles';
import BoxContainer from 'components/BoxContainer';
import api from 'services/api';
import { AxiosError, AxiosResponse } from 'axios';
import ListagemNoGet from 'components/Listagem/no-get';
import { formatDateWithHour } from 'utils/formatData';
import { useToast } from 'hooks/toast';
import { Container } from './styles';
import WidgetsDropdown from './widgets/WidgetsDropdown';

import '@coreui/coreui/dist/css/coreui.min.css';

const Inicio: React.FC = () => {
  const random = (min: any, max: any) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const [loading, setLoading] = useState<boolean>(false);
  const [leituras, setLeitura] = useState<any[]>([]);
  const { addToast } = useToast();

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getLeituras = useCallback(async () => {
    setLoading(true);

    while (true) {
      await api
        .get('/leituras')
        .then(async (res: AxiosResponse) => {
          if (leituras.length !== res.data.length) {
            const data = [];
            for (let i = 0; i < res.data.length; i++) {
              const el = res.data[i];

              el.dt_ocorrencia = formatDateWithHour(el.dt_ocorrencia);

              data.push(el);
            }
            setLeitura(data);
          }
        })
        .catch((err: AxiosError) => {
          addToast({
            type: 'error',
            title:
              typeof err.response?.data.message === 'string'
                ? err.response?.data.message
                : 'Ocorreu um erro',
            description: `Ocorreu um erro ao buscar as leituras, tente novamente.`,
          });
          console.error(`Erro: ${err}`);
        })
        .finally(() => {
          setLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps

      await delay(1000);
    }
  }, [leituras.length]);

  useEffect(() => {
    getLeituras();
  }, [getLeituras]);

  const progressExample = [
    {
      title: 'Passagens',
      value: '29.703 Passagens',
      percent: 40,
      color: 'success',
    },
    { title: 'Carros', value: '24.093 Carros', percent: 20, color: 'info' },
    { title: 'Motos', value: '78.706 Motos', percent: 60, color: 'warning' },
    {
      title: 'Excessos de Velocidade',
      value: '22.123 Excessos de Velocidade',
      percent: 80,
      color: 'danger',
    },
    {
      title: 'Acidentes',
      value: 'Porcentagem de Acidentes',
      percent: 40.15,
      color: 'primary',
    },
  ];

  const rows: IRow[] = [
    {
      label: '#',
      data: 'id',
    },
    {
      label: 'Data',
      data: 'dt_ocorrencia',
    },
    {
      label: 'Tag',
      data: '__tag__.cod_tag',
    },
    {
      label: 'Local',
      data: '__local__.nome',
    },
  ];

  return (
    <Container>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Leituras
              </h4>
              <div className="small text-medium-emphasis">
                Janeiro - Julho 2022
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Dia', 'Mês', 'Ano'].map(value => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            type="line"
            data={{
              labels: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
              ],
              datasets: [
                {
                  label: 'Serra do Rio do Rastro',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'Serra Dona Francisca',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    1,
                    10,
                    100,
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'Serra da Garça',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress
                  thin
                  className="mt-2"
                  color={item.color}
                  value={item.percent}
                />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <ListHolder style={{ border: '1px solid #efefef' }}>
        {loading ? (
          'Carregando...'
        ) : (
          <ListagemNoGet
            data={leituras}
            indexUrl="/"
            module="leitura"
            template="100px 1fr 1fr 1fr"
            deleteUrl="/leituras/leitura"
            rows={rows}
            loading={loading}
          />
        )}
      </ListHolder>
    </Container>
  );
};

export default Inicio;
