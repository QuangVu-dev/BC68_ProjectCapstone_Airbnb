import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listLanguages: [
    {
      name: "English",
      nation: "United States",
    },
    {
      name: "Azərbaycan dili",
      nation: "Azərbaycan",
    },
    {
      name: "Bahasa Indonesia",
      nation: "Indonesia",
    },
    {
      name: "Bosanski",
      nation: "Bosna i Hercegovina",
    },
    {
      name: "Català",
      nation: "Espanya",
    },
    {
      name: "Čeština",
      nation: "Česká republika",
    },
    {
      name: "Crnogorski",
      nation: "Crna Gora",
    },
    {
      name: "Dansk",
      nation: "Danmark",
    },
    {
      name: "Deutsch",
      nation: "Deutschland",
    },
    {
      name: "Deutsch",
      nation: "Österreich",
    },
    {
      name: "Deutsch",
      nation: "Schweiz",
    },
    {
      name: "Deutsch",
      nation: "Luxemburg",
    },
    {
      name: "Eesti",
      nation: "Eesti",
    },
    {
      name: "English",
      nation: "Australia",
    },
    {
      name: "English",
      nation: "Canada",
    },
    {
      name: "English",
      nation: "Guyana",
    },
    {
      name: "English",
      nation: "India",
    },
    {
      name: "English",
      nation: "Ireland",
    },
    {
      name: "English",
      nation: "New Zealand",
    },
    {
      name: "English",
      nation: "Singapore",
    },
    {
      name: "English",
      nation: "United Arab Emirates",
    },
    {
      name: "English",
      nation: "United Kingdom",
    },
    {
      name: "Español",
      nation: "Argentina",
    },
    {
      name: "Español",
      nation: "Belice",
    },
    {
      name: "Español",
      nation: "Bolivia",
    },
    {
      name: "Español",
      nation: "Chile",
    },
    {
      name: "Español",
      nation: "Colombia",
    },
    {
      name: "Español",
      nation: "Costa Rica",
    },
    {
      name: "Español",
      nation: "Ecuador",
    },
    {
      name: "Español",
      nation: "El Salvador",
    },
    {
      name: "Español",
      nation: "España",
    },
    {
      name: "Español",
      nation: "Estados Unidos",
    },
    {
      name: "Español",
      nation: "Guatemala",
    },
    {
      name: "Español",
      nation: "Honduras",
    },
    {
      name: "Tiếng Việt",
      nation: "Việt Nam",
    },
  ],
  listCurrency: [
    {
      name: "United States dollar",
      symbol: "USD – $",
    },
    {
      name: "Australian dollar",
      symbol: "AUD – $",
    },
    {
      name: "Brazilian real",
      symbol: "BRL – R$",
    },
    {
      name: "Bulgarian lev",
      symbol: "BGN – лв.",
    },
    {
      name: "Canadian dollar",
      symbol: "CAD – $",
    },
    {
      name: "Chilean peso",
      symbol: "CLP – $",
    },
    {
      name: "Chinese yuan",
      symbol: "CNY – ￥",
    },
    {
      name: "Colombian peso",
      symbol: "COP – $",
    },
    {
      name: "Costa Rican colon",
      symbol: "CRC – ₡",
    },
    {
      name: "Croatian kuna",
      symbol: "HRK – kn",
    },
    {
      name: "Czech koruna",
      symbol: "CZK – Kč",
    },
    {
      name: "Danish krone",
      symbol: "DKK – kr",
    },
    {
      name: "Egyptian pound",
      symbol: "EGP – ج.م",
    },
    {
      name: "Emirati dirham",
      symbol: "AED – ﺩ.ﺇ",
    },
    {
      name: "Euro",
      symbol: "EUR - €",
    },
    {
      name: "Hong Kong dollar",
      symbol: "HKD – $",
    },
    {
      name: "Hungarian forint",
      symbol: "HUF – Ft",
    },
    {
      name: "Indian rupee",
      symbol: "INR - ₹",
    },
    {
      name: "Indonesian rupiah",
      symbol: "IDR – Rp",
    },
    {
      name: "Israeli new shekel",
      symbol: "ILS – ₪",
    },
    {
      name: "Japanese yen",
      symbol: "JPY – ¥",
    },
    {
      name: "Kenyan shilling",
      symbol: "KES – KSh",
    },
    {
      name: "Malaysian ringgit",
      symbol: "MYR – RM",
    },
    {
      name: "Mexican peso",
      symbol: "MXN – $",
    },
    {
      name: "Moroccan dirham",
      symbol: "MAD",
    },
    {
      name: "New Taiwan dollar",
      symbol: "TWD – $",
    },
    {
      name: "New Zealand dollar",
      symbol: "NZD – $",
    },
    {
      name: "Norwegian krone",
      symbol: "NOK – kr",
    },
    {
      name: "Peruvian sol",
      symbol: "PEN – S/",
    },
    {
      name: "Philippine peso",
      symbol: "PHP – ₱",
    },
    {
      name: "Polish zloty",
      symbol: "PLN – zł",
    },
    {
      name: "Pound sterling",
      symbol: "GBP - £",
    },
    {
      name: "Singapore dollar",
      symbol: "SGD – $",
    },
    {
      name: "Thai baht",
      symbol: "THB – ฿",
    },
    {
      name: "Vietnamese dong",
      symbol: "VND – ₫",
    },
  ],
};

const listSlice = createSlice({
  name: "listSlice",
  initialState,
  reducers: {},
});

export const {} = listSlice.actions;

export default listSlice.reducer;
