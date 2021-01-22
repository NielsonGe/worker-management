import TeamInfo from '@/models/TeamInfo';

const teamList: TeamInfo[] = [
  new TeamInfo('1', '310000000000000001', '机械班组','设备分包', '大顺建筑设备有限公司','1'),
  new TeamInfo('1', '310000000000000001', '电气班组','设备分包', '大顺建筑设备有限公司','1'),
  new TeamInfo('1', '310000000000000001', '点检班组','设备分包', '大顺建筑设备有限公司','1'),
  new TeamInfo('1', '310000000000000001', '运输班组','设备分包', '大顺建筑设备有限公司','1'),
  new TeamInfo('1', '310000000000000001', '木工班组','劳务分包', '宇康劳务派遣有限公司','2'),
  new TeamInfo('1', '310000000000000001', '油漆班组','劳务分包', '大顺劳务派遣有限公司','2'),
  ]

const getTeamList = (id: string) => {
  return teamList;
}

const getTeamInfo = (id: string) => {
  const info = teamList.find(x => x.getId() == id);
  return info;
}

export { getTeamList, getTeamInfo }