import { createMuiTheme } from '@material-ui/core';

export const OneSignalKey = process.env.NODE_ENV === 'development' ? '5af646ab-8c73-474b-9ebf-f19036693a2b' : '76b26e12-3abb-4faf-8ca2-a589f73a602c';
export const ApiServer = process.env.NODE_ENV === 'development' ? 'https://api.pierpontglobal.com' : 'http://ppm1.local:3000';
export const StripeKey = process.env.NODE_ENV === 'development' ? 'pk_test_mPENMxq3MENOAxDxZDVUZajS' : 'pk_live_Rnf6s2eReIqXTzHhZGFvFvMA';
export const WSConnection = process.env.NODE_ENV === 'development' ? 'ws://ppm1.local:3000/cable' : 'wss://api.pierpontglobal.com/cable';

export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#3A3E43' },
    secondary: { main: '#FAFAFA' },
    accent: { main: '#27E888' },
  },
  typography: {
    fontFamily: 'Raleway, serif',
    useNextVariants: true,
  },
});
export const CountriesList = [
  { key: 'DO', name: { en: 'Dominican Republic', es: 'República Dominicana' } },
  { key: 'US', name: { en: 'United States', es: 'Estados Unidos' } },
];
