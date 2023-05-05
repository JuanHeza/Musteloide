import React from 'react';
import {useStyletron} from 'baseui';
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
} from 'baseui/data-table';

import { Button, KIND, SIZE, SHAPE } from 'baseui/button';
// https://gist.github.com/6174/6062387
//https://www.harrytheo.com/blog/2021/07/placeholder-images-for-pwas/
function pseudoRandomString(rowIdx: any, columnIdx: any) {
  return (
    (0.88 * rowIdx)
      .toString(36)
      .replace('.', '')
      .substring(2) +
    (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 10);
}
function makeRowsFromColumns(columns: any, rowCount: any) {
  const rows = [];
    const rowActions = []
  for (let i = 0; i < rowCount; i++) {
      let row = {
      id: i,
      data: columns.map((column: any, j: number) => {
        switch (column.kind) {
          case COLUMNS.CATEGORICAL:
            switch (i % 11) {
              case 11:
                return 'UberX';
              case 10:
                return 'UberXL';
              case 9:
                return 'Uber Select';
              case 8:
                return 'Uber Comfort';
              case 7:
                return 'Uber Pool';
              case 6:
                return 'Uber Black';
              case 5:
                return 'Uber Assist';
              case 4:
                return 'Uber WAV';
              case 3:
                return 'Transit';
              case 2:
                return 'Taxi';
              case 1:
                return 'Bike';
              case 0:
              default:
                return 'Scooter';
            }
          case COLUMNS.NUMERICAL:
            return i % 2 ? i - 1 : i + 3;
          case COLUMNS.BOOLEAN:
            return i % 2 === 0;
          case COLUMNS.STRING:
            return pseudoRandomString(i, j);
          case COLUMNS.CUSTOM:
                if(column.title == "custom color"){
                    switch (i % 5) {
                      case 4:
                        return {color: '#e7cfa2'};
                      case 3:
                        return {color: '#d8a174'};
                      case 2:
                        return {color: '#b77d4e'};
                      case 1:
                        return {color: '#9f5723'};
                      case 0:
                      default:
                        return {color: '#7e3a02'};
                    }
                }else{
                    return <Button
                              onClick={() => console.log(i)}
                              startEnhancer={() => <span> ❌ </span>}
                              size={SIZE.compact}
                              shape={SHAPE.pill}
                              overrides={{
                                BaseButton: {
                                  style: ({ $theme }) => ({
                                      alignSelf: "center",
            margin: "5px",
  height: "24px",
        backgroundColor: "#74E885",
                                      width: "32px",
                                      padding: "0px"
                                  })
                                },
                                StartEnhancer: {
                                  style: ({ $theme }) => ({ 
                                        margin: "auto"
                                  })
                                }
                              }}/>
                }
          default:
            return 'default' + pseudoRandomString(i, j);
        }
      }),
    }
    rows.push(row);
    let rowAction = {
        label: row.id,
        onClick: ()=>{console.log(row.id)} ,
        renderIcon: Button,
        renderButton: <Button></Button>
    }
    //rowActions.push(rowAction)
    console.log(row, rowAction);
  }
    console.log(rows, rowActions);
  return [rows, rowActions];
}
const columns = [
  CategoricalColumn({
    title: 'categorical',
    mapDataToValue: (data) => data[0],
  }),
  StringColumn({
    title: 'string',
    mapDataToValue: (data) => data[1],
  }),
  NumericalColumn({
    title: 'three',
    mapDataToValue: (data) => data[2],
  }),
  NumericalColumn({
    title: 'neg std',
    highlight: n => n < 0,
    mapDataToValue: (data) => data[3],
  }),
  NumericalColumn({
    title: 'accounting',
    format: NUMERICAL_FORMATS.ACCOUNTING,
    precision: 2,
    mapDataToValue: (data) => data[4],
  }),
  CustomColumn({
    title: 'custom color',
    mapDataToValue: (data) => data[5],
    renderCell: function Cell(props) {
      const [css] = useStyletron();
      return (
        <div
          className={css({
            alignItems: 'center',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'flex',
          })}
        >
          <div
            className={css({
              backgroundColor: props.value.color,
              height: '12px',
              marginRight: '24px',
              width: '12px',
            })}
          />
          <div>{props.value.color}</div>
        </div>
      );
    },
  }),
  CustomColumn({
    title: 'action',
    maxWidth: 16,
    mapDataToValue: (data) => data[6],
    renderCell: function Cell(props) {
      const [css] = useStyletron();
      return (props.value);
    },
  }),
  BooleanColumn({
    title: 'boolean',
    mapDataToValue: (data) => data[7],
  }),
  CategoricalColumn({
    title: 'second category',
    mapDataToValue: (data) => data[8],
  }),
];
const [rows,rowActions]  = makeRowsFromColumns(columns, 20);
export function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '800px'})}>
      <StatefulDataTable columns={columns} rows={rows} rowActions={rowActions} />
    </div>
  );
}