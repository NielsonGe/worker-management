import CompanyInfo from '@/models/CompanyInfo';

const companyList: CompanyInfo[] = [
  new CompanyInfo('1', '公司1'),
  new CompanyInfo('2', '公司2'),
  new CompanyInfo('3', '公司3'),
  new CompanyInfo('4', '公司4'),
  new CompanyInfo('5', '公司5'),
  new CompanyInfo('6', '公司6'),
  new CompanyInfo('7', '公司7'),
  new CompanyInfo('8', '公司8'),
  new CompanyInfo('9', '公司9'),
  new CompanyInfo('10', '公司10'),
]

const getCompanyList = () => {
  return companyList;
}

const getCompanyInfo = (id: string) => {
  const info = companyList.find(x => x.getId() == id);
  return info;
}

export { getCompanyList, getCompanyInfo }