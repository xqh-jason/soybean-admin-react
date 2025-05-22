import { Button, Modal, Table } from 'antd';

import { getLogList } from '@/service/api/label-manage';
import type { LogListItem } from '@/service/model/label-manage-model';

interface Props {
  id: number;
  onClose: () => void;
  open: boolean;
}

const LogModal = ({ id, onClose, open }: Props) => {
  const [logList, setLogList] = useState<LogListItem[]>([]);
  useEffect(() => {
    if (id > 0) {
      getLogList(id).then(res => {
        if (res.data) setLogList(res.data);
      });
    }
  }, [id]);
  return (
    <Modal
      open={open}
      title="日志"
      width={800}
      footer={() => (
        <Button
          type="primary"
          onClick={onClose}
        >
          关闭
        </Button>
      )}
      styles={{
        body: {
          height: 520
        }
      }}
      onCancel={onClose}
    >
      <Table
        dataSource={logList}
        rowKey="id"
        columns={[
          {
            dataIndex: 'createName',
            title: '操作人',
            width: 120
          },
          {
            dataIndex: 'createTime',
            title: '操作时间',
            width: 180
          },
          {
            dataIndex: 'remark',
            title: '操作内容',
            width: 400
          }
        ]}
        scroll={{
          y: 400
        }}
      />
    </Modal>
  );
};

export default LogModal;
