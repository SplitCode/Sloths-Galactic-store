import type { CustomerBody } from '../api/api.interfaces';
import type { RegisterValues } from '../components/Main/Main.interfaces';

export const formatForRegister = (values: RegisterValues): CustomerBody => {
  const shippingIndex = 0;
  const billingIndex = 1;

  const customerBody: CustomerBody = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    addresses: [
      {
        city: values.shipping.city,
        country: values.shipping.country,
        postalCode: values.shipping.postalCode,
        streetName: values.shipping.street
      }
    ],
    shippingAddresses: [shippingIndex],
    billingAddresses: values.shipping.isSameAddress ? [shippingIndex] : [billingIndex]
  };

  if (values.shipping.isSameAddress && values.shipping.isDefault) {
    customerBody.defaultShippingAddress = shippingIndex;
    customerBody.defaultBillingAddress = shippingIndex;
  } else if (!values.shipping.isSameAddress) {
    customerBody.addresses.push({
      city: values.billing.city,
      country: values.billing.country,
      postalCode: values.billing.postalCode,
      streetName: values.billing.street
    });

    if (values.shipping.isDefault) {
      customerBody.defaultShippingAddress = shippingIndex;
    }
    if (values.billing.isDefault) {
      customerBody.defaultBillingAddress = billingIndex;
    }
  }
  return customerBody;
};
