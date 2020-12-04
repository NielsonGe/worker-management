import WorkerInfo from '@/models/WorkerInfo';

const workerList: WorkerInfo[] = [
  new WorkerInfo('1', '310000000000000001', '0', 0, '张1', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 1, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 0, '13800000000', '1'),
  new WorkerInfo('2', '310000000000000002', '1', 1, '张2', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 2, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 1, '13800000000', '2'),
  new WorkerInfo('3', '310000000000000003', '2', 1, '张3', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 3, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 0, '13800000000', '3'),
  new WorkerInfo('4', '310000000000000004', '3', 0, '张4', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 4, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 1, '13800000000', '1'),
  new WorkerInfo('5', '310000000000000005', '0', 0, '张5', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 5, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 0, '13800000000', '2'),
  new WorkerInfo('6', '310000000000000006', '1', 0, '张6', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 6, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 1, '13800000000', '3'),
  new WorkerInfo('7', '310000000000000007', '2', 1, '张7', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 7, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 0, '13800000000', '1'),
  new WorkerInfo('8', '310000000000000008', '3', 1, '张8', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 8, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 1, '13800000000', '2'),
  new WorkerInfo('9', '310000000000000009', '0', 1, '张9', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 9, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 0, '13800000000', '3'),
  new WorkerInfo('10', '310000000000000010', '1', 1, '张10', 'assets/ch1.jpg', 'assets/ch1.jpg', 'assets/ch1.jpg', new Date(1999, 10, 1, 0, 0, 0), '测试地址测试地址测试地址测试地址测试地址测试地址测试地址', 1, '13800000000', '1'),
]

const getWorkerList = (id: string) => {
  return workerList;
}

const getWorkerInfo = (id: string) => {
  const info = workerList.find(x => x.getId() == id);
  return info;
}

export { getWorkerList, getWorkerInfo }