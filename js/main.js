var elementFromCurrency = document.getElementById('CurrencyConversionExtension_fromCurrency');
var elementToCurrency = document.getElementById('CurrencyConversionExtension_toCurrency');
var elementShortcutKey = document.getElementById('CurrencyConversionExtension_shortcutKey');
var elementConfirmButton = document.getElementById('CurrencyConversionExtension_confirmButton');

if (elementFromCurrency) {
  elementFromCurrency.addEventListener('change', function (e) {
    fillToCurrency();
  });
};
if (elementConfirmButton) {
  elementConfirmButton.addEventListener('click', function (e) {
    saveAppliedChanges();
  });
};
loadUserSettings();

document.addEventListener('keyup', (event) => {
  chrome.storage.sync.get("shortcutKey", function (items) {
    var receivedUserData = JSON.stringify(items);
    var currShortcutKey = JSON.parse(receivedUserData).shortcutKey;
    const keyName = event.key;
    if (keyName == currShortcutKey) {
      var text = getSelectionText();
      var onlyNumbers = text.replace(/[^,.\d+]/g, "");
      if (onlyNumbers < 999999999999 && onlyNumbers.length > 0) {
        var receivedFromCurrency;
        var receivedToCurrency;
        chrome.storage.sync.get("fromCurrency", function (items) {
          var receivedUserData = JSON.stringify(items);
          receivedFromCurrency = JSON.parse(receivedUserData).fromCurrency;
          chrome.storage.sync.get("toCurrency", function (items) {
            var receivedUserData = JSON.stringify(items);
            receivedToCurrency = JSON.parse(receivedUserData).toCurrency;
            if (text.includes(getCurrencySymbol(receivedToCurrency))) {
              return;
            }
            var proxyUrl = 'https://api.allorigins.win/raw?url=',
              targetUrl = 'https://www.freeforexapi.com/api/live?pairs=' + receivedFromCurrency + receivedToCurrency
            fetch(proxyUrl + targetUrl)
              .then(blob => blob.json())
              .then(data => {
                replaceSelectedText(getCurrencySymbol(receivedToCurrency) + (data['rates'][receivedFromCurrency + receivedToCurrency]['rate'] * onlyNumbers).toFixed(2));
              })
              .catch(e => {
                console.log(e);
                return e;
              });
          });
        });
      }
    }
  });
});


function getCurrencySymbol(currency) {
  var allCurrencies = {
    'AED': 'د.إ',
    'AFN': '؋',
    'ALL': 'L',
    'AMD': '֏',
    'ANG': 'ƒ',
    'AOA': 'Kz',
    'ARS': '$',
    'AUD': '$',
    'AWG': 'ƒ',
    'AZN': '₼',
    'BAM': 'KM',
    'BBD': '$',
    'BDT': '৳',
    'BGN': 'лв',
    'BHD': '.د.ب',
    'BIF': 'FBu',
    'BMD': '$',
    'BND': '$',
    'BOB': '$b',
    'BRL': 'R$',
    'BSD': '$',
    'BTC': '฿',
    'BTN': 'Nu.',
    'BWP': 'P',
    'BYR': 'Br',
    'BYN': 'Br',
    'BZD': 'BZ$',
    'CAD': '$',
    'CDF': 'FC',
    'CHF': 'CHF',
    'CLP': '$',
    'CNY': '¥',
    'COP': '$',
    'CRC': '₡',
    'CUC': '$',
    'CUP': '₱',
    'CVE': '$',
    'CZK': 'Kč',
    'DJF': 'Fdj',
    'DKK': 'kr',
    'DOP': 'RD$',
    'DZD': 'دج',
    'EEK': 'kr',
    'EGP': '£',
    'ERN': 'Nfk',
    'ETB': 'Br',
    'ETH': 'Ξ',
    'EUR': '€',
    'FJD': '$',
    'FKP': '£',
    'GBP': '£',
    'GEL': '₾',
    'GGP': '£',
    'GHC': '₵',
    'GHS': 'GH₵',
    'GIP': '£',
    'GMD': 'D',
    'GNF': 'FG',
    'GTQ': 'Q',
    'GYD': '$',
    'HKD': '$',
    'HNL': 'L',
    'HRK': 'kn',
    'HTG': 'G',
    'HUF': 'Ft',
    'IDR': 'Rp',
    'ILS': '₪',
    'IMP': '£',
    'INR': '₹',
    'IQD': 'ع.د',
    'IRR': '﷼',
    'ISK': 'kr',
    'JEP': '£',
    'JMD': 'J$',
    'JOD': 'JD',
    'JPY': '¥',
    'KES': 'KSh',
    'KGS': 'лв',
    'KHR': '៛',
    'KMF': 'CF',
    'KPW': '₩',
    'KRW': '₩',
    'KWD': 'KD',
    'KYD': '$',
    'KZT': 'лв',
    'LAK': '₭',
    'LBP': '£',
    'LKR': '₨',
    'LRD': '$',
    'LSL': 'M',
    'LTC': 'Ł',
    'LTL': 'Lt',
    'LVL': 'Ls',
    'LYD': 'LD',
    'MAD': 'MAD',
    'MDL': 'lei',
    'MGA': 'Ar',
    'MKD': 'ден',
    'MMK': 'K',
    'MNT': '₮',
    'MOP': 'MOP$',
    'MRO': 'UM',
    'MRU': 'UM',
    'MUR': '₨',
    'MVR': 'Rf',
    'MWK': 'MK',
    'MXN': '$',
    'MYR': 'RM',
    'MZN': 'MT',
    'NAD': '$',
    'NGN': '₦',
    'NIO': 'C$',
    'NOK': 'kr',
    'NPR': '₨',
    'NZD': '$',
    'OMR': '﷼',
    'PAB': 'B/.',
    'PEN': 'S/.',
    'PGK': 'K',
    'PHP': '₱',
    'PKR': '₨',
    'PLN': 'zł',
    'PYG': 'Gs',
    'QAR': '﷼',
    'RMB': '￥',
    'RON': 'lei',
    'RSD': 'Дин.',
    'RUB': '₽',
    'RWF': 'R₣',
    'SAR': '﷼',
    'SBD': '$',
    'SCR': '₨',
    'SDG': 'ج.س.',
    'SEK': 'kr',
    'SGD': '$',
    'SHP': '£',
    'SLL': 'Le',
    'SOS': 'S',
    'SRD': '$',
    'SSP': '£',
    'STD': 'Db',
    'STN': 'Db',
    'SVC': '$',
    'SYP': '£',
    'SZL': 'E',
    'THB': '฿',
    'TJS': 'SM',
    'TMT': 'T',
    'TND': 'د.ت',
    'TOP': 'T$',
    'TRL': '₤',
    'TRY': '₺',
    'TTD': 'TT$',
    'TVD': '$',
    'TWD': 'NT$',
    'TZS': 'TSh',
    'UAH': '₴',
    'UGX': 'USh',
    'USD': '$',
    'UYU': '$U',
    'UZS': 'лв',
    'VEF': 'Bs',
    'VND': '₫',
    'VUV': 'VT',
    'WST': 'WS$',
    'XAF': 'FCFA',
    'XBT': 'Ƀ',
    'XCD': '$',
    'XOF': 'CFA',
    'XPF': '₣',
    'YER': '﷼',
    'ZAR': 'R',
    'ZWD': 'Z$'
  };
  return allCurrencies[currency];
}

function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

function clearOptions(selectElement) {
  selectElement.options.length = 0;
}

function fillToCurrency() {
  var selectedFromCurrency = document.getElementById("CurrencyConversionExtension_fromCurrency").value;

  if (selectedFromCurrency == "AUD") {

    var select = document.getElementById("CurrencyConversionExtension_toCurrency");
    clearOptions(select);
    var options = ["USD"];
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

  }

  if (selectedFromCurrency == "EUR") {

    var select = document.getElementById("CurrencyConversionExtension_toCurrency");
    clearOptions(select);
    var options = ["GBP", "USD"];
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

  }

  if (selectedFromCurrency == "GBP") {

    var select = document.getElementById("CurrencyConversionExtension_toCurrency");
    clearOptions(select);
    var options = ["USD"];
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

  }


  if (selectedFromCurrency == "NZD") {

    var select = document.getElementById("CurrencyConversionExtension_toCurrency");
    clearOptions(select);
    var options = ["USD"];
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

  }

  if (selectedFromCurrency == "USD") {

    var select = document.getElementById("CurrencyConversionExtension_toCurrency");
    clearOptions(select);
    var options = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "ATS", "AUD", "AWG", "AZM", "AZN", "BAM", "BBD", "BDT", "BEF", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLP", "CNH", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CYP", "CZK", "DEM", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ESP", "ETB", "EUR", "FIM", "FJD", "FKP", "FRF", "GBP", "GEL", "GGP", "GHC", "GHS", "GIP", "GMD", "GNF", "GRD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "IEP", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "ITL", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LUF", "LVL", "LYD", "MAD", "MDL", "MGA", "MGF", "MKD", "MMK", "MNT", "MOP", "MRO", "MRU", "MTL", "MUR", "MVR", "MWK", "MXN", "MYR", "MZM", "MZN", "NAD", "NGN", "NIO", "NLG", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PTE", "PYG", "QAR", "ROL", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDD", "SDG", "SEK", "SGD", "SHP", "SIT", "SKK", "SLL", "SOS", "SPL", "SRD", "SRG", "STD", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMM", "TMT", "TND", "TOP", "TRL", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VAL", "VEB", "VEF", "VES", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBT", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "YER", "ZAR", "ZMK", "ZMW", "ZWD"];
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

  }

}


function saveAppliedChanges() {
  var fromCurrency = document.getElementById("CurrencyConversionExtension_fromCurrency").value;
  var toCurrency = document.getElementById("CurrencyConversionExtension_toCurrency").value;
  var shortcutKey = document.getElementById("CurrencyConversionExtension_shortcutKey").value;
  chrome.storage.sync.set({ "fromCurrency": fromCurrency }, function () { });
  chrome.storage.sync.set({ "toCurrency": toCurrency }, function () { });
  chrome.storage.sync.set({ "shortcutKey": shortcutKey }, function () { });
  elementConfirmButton.innerText = "Saved";
  setTimeout(function () {
    elementConfirmButton.innerText = "Apply Changes";
  }, 1500);

}

function changeSelected(currency, dom) {
  dom.selectedIndex = dom.querySelector('option[value="' + currency + '"]').index;
}

function setDefaultSettings() {
  chrome.storage.sync.set({ "fromCurrency": "USD" }, function () { });
  chrome.storage.sync.set({ "toCurrency": "EUR" }, function () { });
  chrome.storage.sync.set({ "shortcutKey": "F2" }, function () { });
  changeSelected("USD", elementFromCurrency);
  fillToCurrency();
  changeSelected("EUR", elementToCurrency);
  changeSelected("F2", elementShortcutKey);
}

function loadUserSettings() {

  chrome.storage.sync.get("fromCurrency", function (items) {
    var receivedUserData = JSON.stringify(items);
    if (JSON.parse(receivedUserData).fromCurrency === undefined) {
      setDefaultSettings();
    } else if (JSON.parse(receivedUserData).fromCurrency.length > 0) {
      changeSelected(JSON.parse(receivedUserData).fromCurrency, elementFromCurrency);
      fillToCurrency();
    }
  });

  chrome.storage.sync.get("toCurrency", function (items) {
    var receivedUserData = JSON.stringify(items);
    if (JSON.parse(receivedUserData).toCurrency === undefined) {
      setDefaultSettings();
    } else if (JSON.parse(receivedUserData).toCurrency.length > 0) {
      changeSelected(JSON.parse(receivedUserData).toCurrency, elementToCurrency);
    }
  });

  chrome.storage.sync.get("shortcutKey", function (items) {
    var receivedUserData = JSON.stringify(items);
    if (JSON.parse(receivedUserData).shortcutKey === undefined) {
      setDefaultSettings();
    } else if (JSON.parse(receivedUserData).shortcutKey.length > 0) {
      changeSelected(JSON.parse(receivedUserData).shortcutKey, elementShortcutKey);
    }
  });

}

function replaceSelectedText(replacementText) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(replacementText));
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.text = replacementText;
  }
}