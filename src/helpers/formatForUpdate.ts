import type { UpdateSimpleData } from '../api/api.interfaces';
import type { UpdateDataForFormat } from './helpers.interfaces';

export function formatForUpdate({ ID, values, version }: UpdateDataForFormat): UpdateSimpleData {
  return {
    ID,
    version,
    actions: [
      {
        action: 'setFirstName',
        firstName: values.firstName
      },
      {
        action: 'setLastName',
        lastName: values.lastName
      },
      {
        action: 'changeEmail',
        email: values.email
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: values.dateOfBirth
      }
    ]
  };
}
