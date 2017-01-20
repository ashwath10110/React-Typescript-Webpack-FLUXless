type EndPoint = {
  method: string;
  url: string;
}

type EndPointMap = {
  [name: string]: EndPoint;
}

export const endPoints: EndPointMap = {
  getFormsByEmpId: {
    method: 'GET',
    url: '/api/forms/{%empId%}'
  },
  getFormById: {
    method: 'GET',
    url: '/api/form/{%id%}'
  },
  createForm: {
    method: 'POST',
    url: '/api/form'
  },
  modifyForm: {
    method: 'PUT',
    url: '/api/form'
  },
  deleteForm: {
    method: 'DELETE',
    url: '/api/form/{%id%}'
  },
  getReportees : {
    method: 'GET',
    url: '/api/employee/{%id%}/reportees'
  },
  getPreferences: {
    method: 'GET',
    url: '/api/employees/preferences'
  },
  addPreferences: {
    method: 'POST',
    url: '/api/employees/preferences'
  },
  updatePreferences: {
    method: 'PUT',
    url: '/api/employees/preferences'
  }

};