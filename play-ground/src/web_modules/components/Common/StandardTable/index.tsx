import React, { PureComponent, Fragment, ReactElement } from 'react';
import { Table, Alert, Row, Col } from 'antd';
import styles from './index.less';
import { TableProps } from 'antd/lib/table';

function initTotalList(columns) {
  const totalList: Array<any> = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

interface StandardTableProps extends TableProps<any> {
  columns: Array<any>;
  selectedRows: Array<any>;
  rowSelect?: boolean;
  data: {
    list: Array<any>;
    pagination: any;
  };
  actions?: ReactElement;
  showPagination?: boolean;
  onSelectRow?(selectedRows: Array<any>): void;
  onChange?(pagination: any, filters: any, sorter: any): void;
}

class StandardTable extends PureComponent<StandardTableProps, any> {
  static defaultProps = {
    selectedRows: [],
    columns: [],
    rowSelect: true,
    showPagination: true,
  };

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, rowKey, rowSelect, actions, showPagination, ...rest } = this.props;
    const { list = [], pagination } = data as any;

    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal(total) {
        return `共 ${total} 条`;
      },
      ...pagination,
    };

    const rowSelection: any = rowSelect
      ? {
          selectedRowKeys,
          onChange: this.handleRowSelectChange,
          getCheckboxProps: record => ({
            disabled: record.disabled,
          }),
        }
      : null;

    return (
      <div className={styles.standardTable}>
        <Row>
          <Col span={16}>
            {rowSelect && (
              <div className={styles.tableAlert}>
                <Alert
                  message={
                    <Fragment>
                      已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{' '}
                      项&nbsp;&nbsp;
                      {needTotalList.map(item => (
                        <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                          {item.title}
                          总计&nbsp;
                          <span style={{ fontWeight: 600 }}>
                            {item.render ? item.render(item.total) : item.total}
                          </span>
                        </span>
                      ))}
                      <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                        清空
                      </a>
                    </Fragment>
                  }
                  type="info"
                  showIcon
                />
              </div>
            )}
          </Col>
          <Col className={styles.actions} span={8}>
            {actions}
          </Col>
        </Row>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={showPagination && paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
